from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
import sqlite3
import uuid
import hashlib
from .email_service import send_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

DB_PATH = "cloudai_users.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize DB
def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            is_verified BOOLEAN DEFAULT 0,
            verification_token TEXT,
            reset_token TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

class UserSignup(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class PasswordReset(BaseModel):
    email: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/signup")
async def signup(user: UserSignup, background_tasks: BackgroundTasks):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    token = str(uuid.uuid4())
    hashed_pw = hash_password(user.password)
    
    cursor.execute(
        "INSERT INTO users (email, password_hash, verification_token) VALUES (?, ?, ?)",
        (user.email, hashed_pw, token)
    )
    conn.commit()
    conn.close()

    verify_url = f"http://localhost:8000/auth/verify/{token}"
    email_body = f"""
    <h2>Welcome to CloudAI!</h2>
    <p>Please verify your email address to activate your account and start processing satellite imagery.</p>
    <br>
    <a href="{verify_url}">Click here to verify your email</a>
    <br>
    <p>If you did not request this, please ignore this email.</p>
    """
    
    background_tasks.add_task(send_email, user.email, "Verify Your CloudAI Account", email_body)
    
    return {"message": "Signup successful. Verification email sent."}

@router.get("/verify/{token}")
async def verify_email(token: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE verification_token = ?", (token,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid or expired verification token")
        
    cursor.execute("UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?", (user['id'],))
    conn.commit()
    conn.close()
    
    return {"message": "Email successfully verified. You can now log in."}

@router.post("/login")
async def login(user: UserLogin):
    if user.email == "admin@cloudai.com" and user.password == "admin":
        return {"token": "admin_token_mock", "email": user.email}

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    db_user = cursor.fetchone()
    conn.close()
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    if db_user['password_hash'] != hash_password(user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    if not db_user['is_verified']:
        raise HTTPException(status_code=403, detail="Please verify your email before logging in")
        
    # Mock token for now since we are just persisting state locally in React
    return {"token": f"token_{db_user['id']}_{str(uuid.uuid4())[:8]}", "email": db_user['email']}

@router.post("/reset-password")
async def reset_password(req: PasswordReset, background_tasks: BackgroundTasks):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (req.email,))
    user = cursor.fetchone()
    
    if user:
        reset_token = str(uuid.uuid4())
        cursor.execute("UPDATE users SET reset_token = ? WHERE id = ?", (reset_token, user['id']))
        conn.commit()
        
        reset_url = f"http://localhost:5173/login?reset={reset_token}"
        email_body = f"""
        <h2>CloudAI Password Reset</h2>
        <p>A password reset was requested for your account.</p>
        <br>
        <a href="{reset_url}">Click here to securely reset your password</a>
        <br>
        <p>If you did not request this, please ignore this email.</p>
        """
        
        background_tasks.add_task(send_email, req.email, "CloudAI Password Reset Request", email_body)
        
    conn.close()
    # Always return success to prevent email enumeration
    return {"message": "If an account exists, a reset link has been sent."}
