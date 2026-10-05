import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, Dna, Waves } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export function Navbar() {
  const [audioActive, setAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const isPlaying = audioEngine.toggle();
    setAudioActive(isPlaying);
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-6xl pointer-events-none">
      <div className="pastel-glass-pill px-5 py-3 rounded-full flex items-center justify-between pointer-events-auto border border-white/15 shadow-2xl backdrop-blur-xl">
        {/* SPECIMEN IDENTITY */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-300/30 flex items-center justify-center text-sky-300">
            <Dna className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-sans font-semibold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                ACTIVE LAB FEED
              </span>
              <span className="text-[11px] font-sans text-sky-200/70 hidden sm:inline">
                Chondrichthyes Specimen #809
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-sans font-bold text-slate-100 tracking-wide">
              MARIANA BIO-LAB <span className="text-sky-300 font-normal">/</span> OCEANIC DOSSIER
            </h1>
          </div>
        </div>

        {/* DEPTH INDICATOR & AUDIO ATMOSPHERE TOGGLE */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Depth Indicator Pill */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-sans text-sky-200 bg-sky-950/40 px-3.5 py-1.5 rounded-full border border-sky-400/20">
            <Compass className="w-3.5 h-3.5 text-sky-300" />
            <span>Mariana Trench — <strong className="text-white">8,400m</strong></span>
          </div>

          {/* Sound Atmosphere Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-4 py-1.5 rounded-full font-sans text-xs font-semibold flex items-center space-x-2 transition-all duration-300 ${
              audioActive
                ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/25'
                : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
            }`}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>Audio Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-300" />
                <span>Sound Atmosphere</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
