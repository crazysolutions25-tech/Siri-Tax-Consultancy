
import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onServiceSelect: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onServiceSelect }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold text-indigo-900 tracking-tight">Siri Tax</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              Professional taxation and financial consultancy serving Visakhapatnam and Srikakulam.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Branch Offices</span>
                <p className="text-sm text-slate-600 font-bold">Visakhapatnam & Srikakulam</p>
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-indigo-600">89777 56671</p>
                <p className="text-xs text-slate-400">siritaxconsultancy56@gmail.com</p>
              </div>
            </div>
          </div>

          <nav aria-labelledby="footer-services">
            <h4 id="footer-services" className="font-bold text-slate-900 mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onServiceSelect('gst-license')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">GST License</button></li>
              <li><button onClick={() => onServiceSelect('income-tax')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">Income Tax (ITR)</button></li>
              <li><button onClick={() => onServiceSelect('tally-accounts')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">Tally Accounts</button></li>
              <li><button onClick={() => onNavigate('services-list')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left font-semibold">View All 9 Services</button></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h4 id="footer-company" className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('about')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">About Siri Tax</button></li>
              <li><button onClick={() => onNavigate('rules')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">Tax Rules 2024</button></li>
              <li><button onClick={() => onNavigate('gst-calculator')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">GST Calculator</button></li>
              <li><button onClick={() => onNavigate('login')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm text-left">Member Login</button></li>
            </ul>
          </nav>

          <div>
            <h4 id="footer-newsletter" className="font-bold text-slate-900 mb-6">Stay Updated</h4>
            <p className="text-slate-500 mb-4 text-sm">Join our newsletter for the latest tax updates and Indian compliance news.</p>
            {status === 'success' ? (
              <div className="p-3 bg-green-50 text-green-700 rounded-xl text-xs font-medium animate-in zoom-in-95">Successfully Subscribed!</div>
            ) : (
              <form className="flex space-x-2" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Your Email" 
                  required 
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md active:scale-95">Join</button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] uppercase font-bold tracking-widest gap-4">
          <p>© 2024 Siri Tax Consultancy. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span>Vizag | Srikakulam</span>
            <span className="text-indigo-500">Authorized Partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
