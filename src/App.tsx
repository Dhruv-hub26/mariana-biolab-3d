import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { SharkCanvas } from './components/SharkCanvas';
import { TelemetryBadges } from './components/TelemetryBadges';
import { AnimationDock } from './components/AnimationDock';
import { DiagnosticsSection } from './components/DiagnosticsSection';
import { DepthHUD } from './components/DepthHUD';
import { Footer } from './components/Footer';
import { ActionName } from './components/LeviathanModel';

export default function App() {
  const [currentAction, setCurrentAction] = useState<ActionName>('Swimming');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#081926] text-slate-100 overflow-x-hidden select-none font-sans ocean-radial-light">
      {/* FIXED VIEWPORT 3D CANVAS BACKGROUND (NO SCROLL SHIFT) */}
      <SharkCanvas
        currentAction={currentAction}
        autoRotate={autoRotate}
      />

      {/* Top Floating Pill Navigation */}
      <Navbar />

      {/* Depth Altimeter HUD */}
      <DepthHUD />

      {/* HERO SECTION OVERLAY */}
      <section className="relative w-full h-screen z-10 pointer-events-none flex flex-col justify-between items-center overflow-hidden">
        {/* Symmetrical Floating Soft-Frosted Showcase Cards */}
        <TelemetryBadges />

        {/* Bottom Motion Action Bar */}
        <AnimationDock
          currentAction={currentAction}
          onSelectAction={(action) => setCurrentAction(action)}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        />
      </section>

      {/* DIAGNOSTICS & ANATOMY SECTION (SCROLLABLE OVER THE CANVAS) */}
      <div className="relative z-10 bg-[#081926]">
        <DiagnosticsSection />
        <Footer />
      </div>
    </div>
  );
}
