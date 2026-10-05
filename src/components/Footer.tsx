import React from 'react';
import { Waves, Dna, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#05111c] border-t border-white/10 py-12 px-4 sm:px-8 font-sans text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-300/30 flex items-center justify-center text-sky-300">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-white text-sm">
              MARIANA BIO-LABS
            </h4>
            <p className="text-[11px] text-sky-200/60">
              Pastel Oceanic Specimen Showcase & Telemetry Directive
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px] text-slate-300">
          <span>Chondrichthyes Survey #809</span>
          <span className="text-white/20">•</span>
          <span>Hadopelagic Zone (8,400m)</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-300 font-medium">Model Status: Auto-Framed & Active</span>
        </div>
      </div>
    </footer>
  );
}
