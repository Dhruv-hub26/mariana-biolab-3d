import React, { useState, useEffect } from 'react';
import { ChevronDown, Compass } from 'lucide-react';

export function DepthHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentDepth = Math.round(scrollProgress * 8400);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center space-y-3 pointer-events-none">
      {/* DEPTH DISPLAY PILL */}
      <div className="pastel-glass px-3.5 py-2.5 rounded-2xl border border-white/10 text-right font-sans pointer-events-auto shadow-xl">
        <div className="flex items-center space-x-1 justify-end text-sky-300 text-[10px] font-semibold uppercase">
          <Compass className="w-3 h-3" />
          <span>ALTIMETER</span>
        </div>
        <p className="text-sm font-bold text-white mt-0.5">
          {currentDepth.toLocaleString()} <span className="text-[10px] text-sky-200 font-normal">m</span>
        </p>
      </div>

      {/* VERTICAL SCROLL BAR */}
      <div className="relative w-1.5 h-44 bg-slate-900/60 rounded-full border border-white/10 overflow-hidden">
        <div 
          className="absolute top-0 w-full bg-gradient-to-b from-sky-300 via-teal-300 to-rose-300 transition-all duration-150"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        <div 
          className="absolute w-3 h-3 bg-white rounded-full -left-0.75 border border-sky-400 shadow-md transition-all duration-150"
          style={{ top: `calc(${scrollProgress * 100}% - 6px)` }}
        />
      </div>

      <div className="text-[9px] font-sans text-sky-200/70 uppercase flex flex-col items-center tracking-wide">
        <span>SCROLL</span>
        <ChevronDown className="w-3 h-3 animate-bounce mt-0.5" />
      </div>
    </div>
  );
}
