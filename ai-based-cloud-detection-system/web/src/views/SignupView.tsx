import { useState } from 'react';
import { Cloud, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function SignupView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('cloudai_users') || '[]');
    const userExists = users.some((u: any) => u.email === email);
    
    if (userExists) {
      setError('This email is already registered.');
      return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('cloudai_users', JSON.stringify(users));
    
    // Automatically log them in by setting a dummy token
    localStorage.setItem('cloudai_auth', email);
    navigate('/app');
  };

  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4 text-white font-sans">
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="bg-primary/20 p-2 rounded-xl border border-primary/50">
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight">CloudAI<span className="text-primary">.</span></span>
      </Link>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative overflow-hidden mt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join the next-gen meteorological network</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholder="Dr. Sarah Connor"
              />
            </div>
          </div>

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
                placeholder="sarah@meteorology.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
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
            className="w-full py-3 px-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 group mt-6"
          >
            Deploy Instance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have access?{' '}
          <Link to="/login" className="text-primary hover:text-indigo-400 font-medium">Authenticate</Link>
        </div>
      </div>
    </div>
  );
}
