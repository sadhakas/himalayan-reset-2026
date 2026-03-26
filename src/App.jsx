import React from 'react';
import HimalayanInfo from './components/Himalayan2026/HimalayanInfo';
import HimalayanForm from './components/Himalayan2026/HimalayanForm';

export default function App() {
  return (
    // Main Wrapper (Full screen gradient)
    <div className="relative min-h-screen bg-gradient-to-b from-sky-950 via-slate-900 to-black flex items-center justify-center p-6 md:p-12 font-sans selection:bg-yellow-400 selection:text-slate-900 overflow-hidden">
      
      {/* --- THE MAGIC LAYER ---
        This is a minimalistic SVG of large mountain peaks.
        Faded to 7% opacity to look like a subtle background brushing.
      */}
      <div className="absolute inset-x-0 bottom-0 z-0 opacity-[0.07] text-white">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-auto">
          <path 
            fill="currentColor" 
            d="M0,224L48,197.3C96,171,192,117,288,112C384,107,480,149,576,170.7C672,192,768,192,864,165.3C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          {/* Second, slightly taller layer to add depth */}
          <path 
            fill="currentColor" 
            opacity="0.5" 
            d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,138.7C840,149,960,235,1080,240C1200,245,1320,171,1380,133.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content Layer (Must have high z-index to stay above the mountains) */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Info */}
        <div className="order-1">
          <HimalayanInfo />
        </div>

        {/* Right Side: Form */}
        <div className="order-2">
          <HimalayanForm />
        </div>

      </div>
      
    </div>
  );
}