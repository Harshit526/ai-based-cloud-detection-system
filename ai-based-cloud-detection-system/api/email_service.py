import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_SERVER = os.getenv("SMTP_SERVER", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

def send_email(to_email: str, subject: str, body: str):
    """
    Attempts to send a real email using SMTP.
    If credentials are not provided or fail, it gracefully falls back
    to logging the email contents to the terminal for local testing.
    """
    if SMTP_SERVER and SMTP_USER and SMTP_PASSWORD:
        try:
            msg = MIMEMultipart()
            msg['From'] = SMTP_USER
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'html'))

            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
            print(f"✅ Real email successfully sent to {to_email}")
            return True
        except Exception as e:
            print(f"⚠️ SMTP Error: {e}. Falling back to terminal log.")
            _log_email_to_terminal(to_email, subject, body)
            return False
    else:
        # Graceful fallback for development
        _log_email_to_terminal(to_email, subject, body)
        return True

def _log_email_to_terminal(to_email: str, subject: str, body: str):
    print("\n" + "="*60)
    print(" 📧  MOCK EMAIL SENT (Backend Terminal Fallback)")
    print("="*60)
    print(f"TO:      {to_email}")
    print(f"SUBJECT: {subject}")
    print("-" * 60)
    # Strip basic HTML for terminal readability
    text_body = body.replace("<br>", "\n").replace("<b>", "").replace("</b>", "").replace("<p>", "").replace("</p>", "\n").replace('href="', '').replace('">Click', ' -> Click').replace("</a>", "")
    print(text_body)
    print("="*60 + "\n")
