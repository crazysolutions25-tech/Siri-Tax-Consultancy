
import React, { useState } from 'react';
import { User } from '../types';
import { MockAPI } from '../services/api';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onBack }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    pan: user.pan || '',
    aadhaar: user.aadhaar || '',
    phone: user.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const result = await MockAPI.auth.updateProfile(user.id, formData);
    if (result.success) {
      onUpdate(result.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif text-slate-900">Tax Profile</h2>
            <p className="text-slate-500 mt-2 text-sm">Securely manage your tax identifiers for faster filing.</p>
          </div>
          <button onClick={onBack} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start space-x-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div className="text-xs text-amber-800 leading-relaxed">
            <p className="font-bold mb-1">Security Warning</p>
            <p>Your data is stored locally in your browser's database. We do not transmit your sensitive identifiers (PAN/Aadhaar) unless you explicitly submit a service request. Avoid using this feature on shared or public computers.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Phone</label>
              <input 
                type="tel" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                placeholder="89777 XXXXX"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">PAN Number</label>
            <input 
              type="text" 
              maxLength={10}
              value={formData.pan} 
              onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})} 
              placeholder="ABCDE1234F"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none font-mono" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Aadhaar Number</label>
            <input 
              type="text" 
              maxLength={12}
              value={formData.aadhaar} 
              onChange={(e) => setFormData({...formData, aadhaar: e.target.value.replace(/\D/g, '')})} 
              placeholder="12 digit number"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" 
            />
          </div>

          <div className="flex items-center justify-between pt-6">
            {success && <span className="text-emerald-600 text-sm font-bold flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Profile Saved</span>}
            <button 
              disabled={loading}
              type="submit"
              className="ml-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 active:scale-95"
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
