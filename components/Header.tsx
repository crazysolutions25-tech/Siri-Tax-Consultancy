
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen || currentPage !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
        role="banner"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-4 rounded-lg z-50" 
          >
            <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
            <span className="text-xl font-bold tracking-tight text-indigo-900">
              Siri Tax <span className="text-indigo-600">Consultancy</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Main Navigation">
            <button onClick={() => onNavigate('home')} className={`text-sm font-semibold transition-colors ${currentPage === 'home' ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'}`}>Home</button>
            <button onClick={() => onNavigate('about')} className={`text-sm font-semibold transition-colors ${currentPage === 'about' ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'}`}>About</button>
            <button onClick={() => onNavigate('rules')} className={`text-sm font-semibold transition-colors ${currentPage === 'rules' ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'}`}>Tax Rules</button>
            <button onClick={() => onNavigate('gst-calculator')} className={`text-sm font-semibold transition-colors ${currentPage === 'gst-calculator' ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'}`}>GST Calc</button>
            
            <div className="h-6 w-px bg-slate-200"></div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onNavigate(isAdmin ? 'admin-dashboard' : 'profile')}
                  className={`text-sm font-bold flex items-center hover:text-indigo-600 transition-colors ${currentPage === (isAdmin ? 'admin-dashboard' : 'profile') ? 'text-indigo-600' : 'text-slate-700'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 shadow-inner">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  {isAdmin ? 'Admin Dashboard' : 'My Profile'}
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Sign In</button>
            )}

            <button 
              onClick={handleConsultClick} 
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-md active:scale-95 transition-all"
            >
              Consult Now
            </button>
          </nav>

          <button className="md:hidden z-50 p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-white transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          <button onClick={() => { setIsMenuOpen(false); onNavigate('home'); }} className="text-2xl font-bold text-slate-800">Home</button>
          <button onClick={() => { setIsMenuOpen(false); onNavigate('about'); }} className="text-2xl font-bold text-slate-800">About</button>
          <button onClick={() => { setIsMenuOpen(false); onNavigate('rules'); }} className="text-2xl font-bold text-slate-800">Tax Rules</button>
          <button onClick={() => { setIsMenuOpen(false); onNavigate('gst-calculator'); }} className="text-2xl font-bold text-slate-800">GST Calc</button>
          {user ? (
            <>
              <button onClick={() => { setIsMenuOpen(false); onNavigate(isAdmin ? 'admin-dashboard' : 'profile'); }} className="text-2xl font-bold text-indigo-600">
                 {isAdmin ? 'Admin Dashboard' : 'My Profile'}
              </button>
              <button onClick={() => { setIsMenuOpen(false); onLogout(); }} className="text-xl font-bold text-red-600 flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button onClick={() => { setIsMenuOpen(false); onNavigate('login'); }} className="text-2xl font-bold text-indigo-600">Member Portal</button>
          )}
          <button onClick={handleConsultClick} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-bold">Consult Now</button>
        </div>
      </div>
    </>
  );
};

export default Header;
