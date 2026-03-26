import React, { useState } from 'react';

export default function HimalayanForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', query: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Cooldown check (Stops spam clicking)
    const lastSubmit = localStorage.getItem('himalayanSubmitTime');
    if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < 60000) { 
      alert("Please wait a minute before submitting again.");
      return;
    }

    setStatus('loading');

    try {
      // THE FIX: We use text/plain to bypass the Google Apps Script CORS Preflight issue!
      const response = await fetch(import.meta.env.VITE_GAS_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setStatus('success');
        localStorage.setItem('himalayanSubmitTime', Date.now().toString());
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
    }
  };

  // 1. SUCCESS STATE UI (This replaces the form completely when successful)
  if (status === 'success') {
    return (
      <div className="bg-sky-900/40 backdrop-blur-xl rounded-3xl p-8 border border-sky-400/30 text-center shadow-2xl transition-all duration-500">
        <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/50">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Interest Captured</h3>
        <p className="text-sky-100">We have received your application. Keep an eye on your inbox—we will reach out soon regarding the next steps.</p>
      </div>
    );
  }

  // 2. DEFAULT & ERROR STATE UI
  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10">
      <h3 className="text-2xl font-bold text-white mb-6">Register Interest</h3>
      
      {/* ERROR BANNER: Shows up if the fetch fails */}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Something went wrong. Please check your connection and try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sky-200 text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            minLength="3"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition"
            placeholder="Arjun..."
          />
        </div>

        <div>
          <label className="block text-sky-200 text-sm font-medium mb-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition"
            placeholder="arjun@example.com"
          />
        </div>

        <div>
          <label className="block text-sky-200 text-sm font-medium mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            required
            pattern="[0-9]{10,15}"
            title="Please enter a valid phone number (at least 10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition"
            placeholder="9876543210"
          />
        </div>

        <div>
          <label className="block text-sky-200 text-sm font-medium mb-1">Any Questions? (Optional)</label>
          <textarea 
            name="query"
            rows="2"
            value={formData.query}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition resize-none"
            placeholder="Is there a specific packing list?"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
        >
          {status === 'loading' ? (
             <span className="flex items-center gap-2">
               <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Connecting...
             </span>
          ) : 'Join Waitlist'}
        </button>
      </form>
    </div>
  );
}