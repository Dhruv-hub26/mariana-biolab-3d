import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { LeviathanModel, ActionName } from './LeviathanModel';

// Soft Translucent Marine Particles
function MarineAtmosphereParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const seafoam = new THREE.Color('#a7f3d0');
    const cyan = new THREE.Color('#7dd3fc');
    const mist = new THREE.Color('#e0f2fe');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const rand = Math.random();
      const color = rand > 0.6 ? seafoam : rand > 0.3 ? cyan : mist;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y += 0.004;
      if (y > 6) y = -6;
      posAttr.setY(i, y);

      let x = posAttr.getX(i);
      x += Math.sin(time * 0.8 + i) * 0.0012;
      posAttr.setX(i, x);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface SharkCanvasProps {
  currentAction: ActionName;
  autoRotate?: boolean;
}

export function SharkCanvas({ currentAction, autoRotate = true }: SharkCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-0 select-none">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <color attach="background" args={['#081926']} />
        <fog attach="fog" args={['#081926', 10, 40]} />

        {/* Ocean Studio Lighting */}
        <ambientLight intensity={1.5} color="#e0f2fe" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.2}
          color="#bae6fd"
          castShadow
        />
        <directionalLight
          position={[-5, -4, -3]}
          intensity={1.2}
          color="#0284c7"
        />
        <pointLight
          position={[0, 3, 2]}
          intensity={1.8}
          color="#f0f9ff"
        />

        <Suspense fallback={<Html center><span className="text-cyan-300 font-sans font-medium bg-slate-900/80 px-4 py-2 rounded-lg border border-sky-400/30 whitespace-nowrap shadow-xl">Loading Creature Specimen...</span></Html>}>
          <LeviathanModel currentAction={currentAction} />
          <MarineAtmosphereParticles count={200} />
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.6}
            scale={10}
            blur={2.0}
            far={4}
            color="#040e17"
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          dampingFactor={0.05}
          target={[0, 0, 0]}
          enableDamping={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
