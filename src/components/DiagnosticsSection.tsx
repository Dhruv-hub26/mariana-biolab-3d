import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Zap, Waves, Activity, Sparkles, Compass, Dna } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  gradient: string;
  delay?: number;
}

function StatBar({ label, value, max, unit, gradient, delay = 0 }: StatBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs font-sans">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className="text-white font-bold">{value.toLocaleString()} <span className="text-sky-300 font-normal">{unit}</span></span>
      </div>
      <div className="h-2 w-full bg-slate-900/60 rounded-full overflow-hidden border border-white/10 p-0.5 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${gradient}`}
        />
      </div>
    </div>
  );
}

export function DiagnosticsSection() {
  const [selectedCard, setSelectedCard] = useState<number>(0);

  const diagnosticCards = [
    {
      id: 0,
      title: 'Heavy Dermal Plating',
      subtitle: 'Exoskeletal Chitin & Denticles',
      icon: <Shield className="w-5 h-5 text-sky-300" />,
      accent: 'border-sky-400/30',
      badge: 'Chitinous Hull',
      description:
        'Overlapping biogenic titanium chitin plates capable of withstanding extreme hydrostatic press of 1,100 atmospheres in deep trenches.',
    },
    {
      id: 1,
      title: 'Dual Hydraulic Jaws',
      subtitle: 'Pharyngeal Snatcher System',
      icon: <Zap className="w-5 h-5 text-rose-300" />,
      accent: 'border-rose-400/30',
      badge: '4,200 PSI Bite',
      description:
        'Dual-hinge extensible pharyngeal jaw mechanism delivering 4,200 PSI bite force with high-frequency tooth replacement cycles.',
    },
    {
      id: 2,
      title: 'Cephalofoil Bio-Sonar',
      subtitle: 'Electro-Receptive Matrix',
      icon: <Eye className="w-5 h-5 text-emerald-300" />,
      accent: 'border-emerald-400/30',
      badge: 'Phase Array',
      description:
        'Elongated hammerhead cephalofoil with over 14,000 Ampullae de Lorenzini detecting microvolt electromagnetic signals up to 850m away.',
    },
    {
      id: 3,
      title: 'Caudal Hydro-Thrust',
      subtitle: 'Bio-Hydraulic Propulsion',
      icon: <Waves className="w-5 h-5 text-teal-300" />,
      accent: 'border-teal-400/30',
      badge: '52 Knots Sprint',
      description:
        'Asymmetrical caudal peduncle fins driven by hypertrophied bio-hydraulic muscle tissue generating 18,500 N thrust.',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#081926] py-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-20 border-t border-white/10">
      {/* SECTION HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-200 text-xs font-sans font-semibold">
          <Dna className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
          <span>MARINE ANATOMICAL ANALYSIS & METRICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
          Anatomical Diagnostics & Metrics
        </h2>
        <p className="text-sm font-sans text-sky-200/70 max-w-2xl mx-auto leading-relaxed">
          Comprehensive physiological survey derived from subsea bathymetric scans and bio-telemetry probes in the Mariana Trench Abyssal Plain.
        </p>
      </div>

      {/* DIAGNOSTIC CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {diagnosticCards.map((card) => {
          const isSelected = selectedCard === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.id * 0.1 }}
              onClick={() => {
                audioEngine.playClick();
                setSelectedCard(card.id);
              }}
              className={`pastel-glass p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                isSelected ? `${card.accent} shadow-2xl scale-[1.02]` : 'border-white/10 hover:border-sky-300/30'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-sky-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-sans font-bold text-white group-hover:text-sky-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-sans text-sky-300/70 mb-3">{card.subtitle}</p>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PERFORMANCE METRICS SUB-PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pastel-glass p-8 rounded-3xl border border-white/10 space-y-8"
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-5">
          <div>
            <span className="text-[11px] font-sans font-semibold text-teal-300 uppercase tracking-wider">
              BIOMEDICAL EVALUATION
            </span>
            <h3 className="text-xl font-sans font-bold text-white mt-1">
              Biomechanical Performance Index
            </h3>
          </div>
          <Sparkles className="w-5 h-5 text-sky-300 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StatBar
            label="Hydrostatic Pressure Tolerance"
            value={1105}
            max={1200}
            unit="ATM"
            gradient="bg-gradient-to-r from-sky-400 to-teal-300"
            delay={0.1}
          />
          <StatBar
            label="Hydraulic Bite Force"
            value={4200}
            max={5000}
            unit="PSI"
            gradient="bg-gradient-to-r from-rose-400 to-pink-300"
            delay={0.2}
          />
          <StatBar
            label="Electro-Reception Array Sensitivity"
            value={96}
            max={100}
            unit="μV/cm"
            gradient="bg-gradient-to-r from-emerald-400 to-teal-200"
            delay={0.3}
          />
          <StatBar
            label="Sprint Acceleration Capacity"
            value={52}
            max={60}
            unit="Knots"
            gradient="bg-gradient-to-r from-sky-300 to-indigo-300"
            delay={0.4}
          />
        </div>
      </motion.div>
    </section>
  );
}
