import { useState } from 'react';
import { Cloud, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Admin backdoor
    if (email === 'admin@cloudai.com' && password === 'admin') {
      localStorage.setItem('cloudai_auth', email);
      navigate('/admin');
      return;
    }

    const users = JSON.parse(localStorage.getItem('cloudai_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('cloudai_auth', email);
      navigate('/app');
    } else {
      setError('Invalid email or password. Please sign up if you don\'t have an account.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(`If an account exists for ${email}, a password reset link has been sent.`);
    setTimeout(() => {
      setIsForgotPassword(false);
      setSuccess('');
    }, 4000);
  };

  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4 text-white font-sans">
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="bg-primary/20 p-2 rounded-xl border border-primary/50">
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight">CloudAI<span className="text-primary">.</span></span>
      </Link>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{isForgotPassword ? 'Reset Password' : 'Welcome Back'}</h2>
          <p className="text-gray-400 text-sm">
            {isForgotPassword 
              ? 'Enter your email and we will send you a reset link' 
              : 'Sign in to access the intelligence dashboard'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-sm text-center">
            {success}
          </div>
        )}

        {isForgotPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="operator@cloudai.com"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group mt-4"
            >
              Send Reset Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => { setIsForgotPassword(false); setError(''); setSuccess(''); }}
              className="w-full py-3 px-4 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="operator@cloudai.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)} 
                  className="text-xs text-primary hover:text-indigo-400 focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group mt-4"
            >
              Authenticate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        {!isForgotPassword && (
          <div className="mt-6 text-center text-sm text-gray-400">
            New to CloudAI?{' '}
            <Link to="/signup" className="text-primary hover:text-indigo-400 font-medium">Request Access</Link>
          </div>
        )}
      </div>
    </div>
  );
}
