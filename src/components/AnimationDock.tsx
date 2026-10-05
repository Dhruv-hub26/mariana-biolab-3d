import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Flame, Zap, ShieldAlert, Sparkles, RotateCw } from 'lucide-react';
import { ActionName } from './LeviathanModel';
import { audioEngine } from '../utils/audio';

interface AnimationDockProps {
  currentAction: ActionName;
  onSelectAction: (action: ActionName) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export function AnimationDock({
  currentAction,
  onSelectAction,
  autoRotate,
  onToggleAutoRotate,
}: AnimationDockProps) {
  const actionsList: { name: ActionName; label: string; icon: React.ReactNode; colorClass: string; activeBg: string }[] = [
    {
      name: 'Swimming',
      label: 'Swim Mode',
      icon: <Waves className="w-4 h-4" />,
      colorClass: 'text-sky-300',
      activeBg: 'bg-sky-400/20 border-sky-300/40 text-sky-200',
    },
    {
      name: 'Lunge Bite',
      label: 'Lunge Bite',
      icon: <Flame className="w-4 h-4" />,
      colorClass: 'text-rose-300',
      activeBg: 'bg-rose-400/20 border-rose-300/40 text-rose-200',
    },
    {
      name: 'Tail Attack',
      label: 'Tail Attack',
      icon: <Zap className="w-4 h-4" />,
      colorClass: 'text-amber-300',
      activeBg: 'bg-amber-400/20 border-amber-300/40 text-amber-200',
    },
    {
      name: 'Intimidate',
      label: 'Intimidate',
      icon: <ShieldAlert className="w-4 h-4" />,
      colorClass: 'text-emerald-300',
      activeBg: 'bg-emerald-400/20 border-emerald-300/40 text-emerald-200',
    },
    {
      name: 'Take Damage (Heavy)',
      label: 'Take Damage',
      icon: <Sparkles className="w-4 h-4" />,
      colorClass: 'text-indigo-300',
      activeBg: 'bg-indigo-400/20 border-indigo-300/40 text-indigo-200',
    },
  ];

  const handleActionClick = (actionName: ActionName) => {
    audioEngine.playClick();
    onSelectAction(actionName);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center max-w-[95vw]"
    >
      {/* Pastel Rounded Action Dock */}
      <div className="pastel-glass px-3 py-2.5 rounded-full border border-white/15 shadow-2xl flex items-center justify-center gap-2 backdrop-blur-xl">
        {actionsList.map((item) => {
          const isActive =
            currentAction === item.name ||
            (item.name === 'Swimming' && currentAction === 'Idle') ||
            (item.name === 'Take Damage (Heavy)' && (currentAction === 'Take Damage (Heavy)' || currentAction === 'Take Damage (Light)'));

          return (
            <button
              key={item.label}
              onClick={() => handleActionClick(item.name)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold flex items-center space-x-2 transition-all duration-300 ${
                isActive
                  ? `${item.activeBg} shadow-md`
                  : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className={isActive ? item.colorClass : 'text-slate-400'}>
                {item.icon}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        <div className="h-5 w-[1px] bg-white/15 mx-1"></div>

        {/* Orbit Auto-Rotate Toggle */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onToggleAutoRotate();
          }}
          title="Toggle Auto Rotation"
          className={`px-3 py-2 rounded-full text-xs font-sans font-medium flex items-center space-x-1.5 transition-all ${
            autoRotate
              ? 'bg-sky-400/20 text-sky-200 border border-sky-300/30'
              : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          <span className="hidden sm:inline">Orbit</span>
        </button>
      </div>
    </motion.div>
  );
}
