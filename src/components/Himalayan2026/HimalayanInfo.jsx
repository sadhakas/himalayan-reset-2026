import React from 'react';

export default function HimalayanInfo() {
  return (
    <div className="text-white space-y-8">
      <div>
        <h3 className="text-sky-300 font-medium tracking-widest uppercase text-sm mb-2">
          SOVESA
        </h3>
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 leading-tight tracking-tight drop-shadow-lg">
          HIMALAYAN <br /> RESET
        </h1>
        <p className="text-xl text-sky-100 mt-4 italic font-light">
          "Travel above the clouds, beneath the peaks where you feel something deeper."
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
        <h4 className="text-yellow-400 font-semibold mb-4 text-lg">The Journey (May 17 - 24)</h4>
        <ul className="space-y-4 text-sky-50">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-sky-400"></div>
            <span><strong className="text-white">Pilani</strong> — Start 17th Eve</span>
          </li>
          <li className="flex items-center gap-3 border-l-2 border-white/20 ml-1 pl-4 pb-2">
            <div className="w-2 h-2 rounded-full bg-sky-300 -ml-[21px]"></div>
            <span><strong className="text-white">Haridwar & Rishikesh</strong></span>
          </li>
          <li className="flex items-center gap-3 border-l-2 border-white/20 ml-1 pl-4 pb-2">
            <div className="w-2 h-2 rounded-full bg-sky-200 -ml-[21px]"></div>
            <span><strong className="text-white">Devprayag</strong></span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white ml-1"></div>
            <span><strong className="text-white">Badrinath</strong> — End 24th Aft</span>
          </li>
        </ul>
      </div>
      
      <p className="text-sm text-sky-200/80">
        *Limited seats available. Submit your interest below and we will contact you if selected for the final roster.
      </p>
    </div>
  );
}