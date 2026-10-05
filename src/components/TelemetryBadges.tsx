import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Waves, Activity, Sparkles, Compass } from 'lucide-react';

export function TelemetryBadges() {
  return (
    <div className="absolute inset-x-4 sm:inset-x-8 top-28 bottom-28 z-20 pointer-events-none flex justify-between items-center max-w-7xl mx-auto">
      {/* LEFT SYMMETRICAL CARD: SPECIMEN CLASSIFICATION & ANATOMY */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-72 sm:w-80 pastel-glass p-5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto backdrop-blur-xl hidden md:block space-y-4"
      >
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-teal-400/15 text-teal-200 border border-teal-400/25 uppercase">
            Classification
          </span>
          <span className="text-xs font-sans text-slate-300">Specimen #809-DELTA</span>
        </div>

        <div>
          <h3 className="text-base font-sans font-bold text-white tracking-tight">
            Mutant Hammerhead Shark
          </h3>
          <p className="text-xs font-sans text-sky-200/80 mt-1 leading-relaxed">
            Abyssal apex organism endemic to the Hadal trenches. Exhibits advanced biomechanical adaptations for ultra-deep water survival.
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-sans">
          <div className="flex items-center space-x-2.5 text-slate-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <span><strong>Cephalofoil:</strong> Electro-receptive Ampullae</span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-200">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
            <span><strong>Dermal Plating:</strong> Titan-reinforced denticles</span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-200">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
            <span><strong>Pharyngeal Jaws:</strong> Dual hydraulic hinge</span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SYMMETRICAL CARD: LIVE BIOLOGICAL METRICS */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-72 sm:w-80 pastel-glass p-5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto backdrop-blur-xl hidden md:block space-y-4"
      >
        <div className="flex justify-between items-center">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-sky-400/15 text-sky-200 border border-sky-400/25 uppercase">
            Live Telemetry
          </span>
          <Activity className="w-4 h-4 text-sky-300 animate-pulse" />
        </div>

        <h3 className="text-base font-sans font-bold text-white tracking-tight">
          Biological Performance
        </h3>

        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Metric 1: Bite Force */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-[10px] font-sans text-rose-300 block font-medium">BITE FORCE</span>
            <p className="text-base font-sans font-extrabold text-white">4,200 <span className="text-xs font-normal text-rose-300">PSI</span></p>
          </div>

          {/* Metric 2: Hydro Velocity */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-[10px] font-sans text-emerald-300 block font-medium">VELOCITY</span>
            <p className="text-base font-sans font-extrabold text-white">52 <span className="text-xs font-normal text-emerald-300">Knots</span></p>
          </div>

          {/* Metric 3: Sonar Freq */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-[10px] font-sans text-sky-300 block font-medium">SONAR PULSE</span>
            <p className="text-base font-sans font-extrabold text-white">120 <span className="text-xs font-normal text-sky-300">kHz</span></p>
          </div>

          {/* Metric 4: Pressure Yield */}
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="text-[10px] font-sans text-sky-200 block font-medium">DEPTH YIELD</span>
            <p className="text-base font-sans font-extrabold text-white">840 <span className="text-xs font-normal text-sky-200">ATM</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
