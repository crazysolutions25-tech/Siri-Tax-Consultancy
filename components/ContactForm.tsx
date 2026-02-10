
import React, { useState, useEffect } from 'react';
import { ContactFormData, User } from '../types';
import { MockAPI } from '../services/api';

interface ContactFormProps {
  user?: User;
}

const ContactForm: React.FC<ContactFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<ContactFormData & { pan?: string }>({
    name: '',
    email: '',
    service: 'General Inquiry',
    message: '',
    pan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from user profile
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        pan: user.pan || prev.pan
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Call Mock Backend API
    await MockAPI.leads.create(formData);
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: user?.name || '', email: user?.email || '', service: 'General Inquiry', message: '', pan: user?.pan || '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const locations = [
    { city: 'Visakhapatnam', type: 'Branch Office', phone: '89777 56656' },
    { city: 'Srikakulam', type: 'Branch Office', phone: '89777 56671' }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white overflow-hidden relative" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
            <h2 id="contact-heading" className="text-3xl md:text-5xl font-serif mb-8">Visit Our Branches Across Andhra Pradesh</h2>
            
            <div className="space-y-6">
              {locations.map((loc) => (
                <div key={loc.city} className="flex items-start space-x-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{loc.city} <span className="text-[10px] uppercase tracking-widest text-indigo-400 ml-2">{loc.type}</span></h3>
                    <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-slate-400 hover:text-indigo-400 text-xl font-bold">+91 {loc.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-2xl border border-white/10">
              {submitted ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-3xl font-serif mb-4">Request Received</h4>
                  <p className="text-slate-500 text-lg">Your inquiry has been stored in our backend. A consultant will review it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {user && (
                    <div className="mb-4 p-3 bg-indigo-50 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600">Authenticated Session</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-400">Pre-filled enabled</span>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                      <input required id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                      <input required id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-service" className="text-xs font-bold uppercase tracking-wider text-slate-400">Consultancy Required</label>
                      <select id="contact-service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none appearance-none cursor-pointer">
                        <option>General Inquiry</option>
                        <option>GST License (Registration)</option>
                        <option>GST Returns Filing</option>
                        <option>Tally Accounts & Finalisation</option>
                        <option>Income Tax Returns (ITR)</option>
                        <option>MSME Registrations</option>
                        <option>Pending & Part-time Works</option>
                        <option>General Accounts</option>
                        <option>TDS Returns</option>
                        <option>Bank Projections & CMA</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-pan" className="text-xs font-bold uppercase tracking-wider text-slate-400">PAN Number (Optional)</label>
                      <input id="contact-pan" type="text" value={formData.pan} onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none font-mono" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-slate-400">Message</label>
                    <textarea required id="contact-message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none resize-none" />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 active:scale-95">
                    {isSubmitting && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                    <span>{isSubmitting ? 'Communicating with Backend...' : 'Submit to Backend'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
