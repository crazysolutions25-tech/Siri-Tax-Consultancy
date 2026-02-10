
import React, { useState } from 'react';
import { MockAPI } from '../services/api';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await MockAPI.auth.login({ email, password });
        if (result.success) {
          onLoginSuccess(result.data);
        } else {
          setError(result.message || 'Login failed');
        }
      } else {
        const result = await MockAPI.auth.register({ name, email, password });
        if (result.success) {
          setIsLogin(true);
          setError('Account created! Sign in using your credentials.');
        } else {
          setError(result.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl mb-4 shadow-lg">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-serif text-slate-900">{isLogin ? 'Member Access' : 'Register Account'}</h2>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-xl text-sm border font-medium ${error.includes('created') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-indigo-600 font-semibold hover:underline">
            {isLogin ? "New to Siri Tax? Join here" : "Member? Sign in here"}
          </button>
          <div className="flex items-center justify-center space-x-2 py-2">
             <div className="h-px bg-slate-100 flex-1"></div>
             <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">or</span>
             <div className="h-px bg-slate-100 flex-1"></div>
          </div>
          <button onClick={onBack} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Return to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
