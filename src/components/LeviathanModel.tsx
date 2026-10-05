import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, Bounds } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type ActionName = 
  | 'Swimming' 
  | 'Idle' 
  | 'Intimidate' 
  | 'Tail Attack' 
  | 'Lunge' 
  | 'Lunge Bite' 
  | 'Take Damage (Heavy)' 
  | 'Take Damage (Light)';

interface LeviathanModelProps {
  currentAction: ActionName;
  onActionComplete?: () => void;
}

export const LEVIATHAN_MODEL_PATH = '/snatcher_-_mutant_hammerhead_shark_creature.glb';

export function LeviathanModel({ currentAction }: LeviathanModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(LEVIATHAN_MODEL_PATH);
  const { actions, names } = useAnimations(animations, groupRef);
  const prevActionRef = useRef<string | null>(null);

  // Material setup for marine studio look
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.3;
            mat.metalness = 0.1;
            mat.envMapIntensity = 1.5;
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  // Animation handling
  useEffect(() => {
    if (!actions || names.length === 0) return;

    let targetName = currentAction as string;
    if (!actions[targetName]) {
      const match = names.find((n) => n.toLowerCase().includes(currentAction.toLowerCase()));
      if (match) {
        targetName = match;
      } else {
        targetName = names[0];
      }
    }

    const nextAction = actions[targetName];
    const prevActionName = prevActionRef.current;
    const prevAction = prevActionName ? actions[prevActionName] : null;

    if (nextAction) {
      if (prevAction && prevAction !== nextAction) {
        prevAction.fadeOut(0.4);
      }

      nextAction.reset().fadeIn(0.4).play();

      const nonLoopingActions = ['Lunge Bite', 'Tail Attack', 'Intimidate', 'Take Damage (Heavy)', 'Take Damage (Light)'];
      const isOneShot = nonLoopingActions.some(a => targetName.toLowerCase().includes(a.toLowerCase()));

      if (isOneShot) {
        nextAction.setLoop(THREE.LoopOnce, 1);
        nextAction.clampWhenFinished = true;
      } else {
        nextAction.setLoop(THREE.LoopRepeat, Infinity);
      }

      prevActionRef.current = targetName;
    }
  }, [actions, currentAction, names]);

  // Continuous subtle swimming float sine wave
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.position.y = Math.sin(time * 1.3) * 0.15 - 0.2;
    groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.03;
  });

  return (
    <group ref={groupRef} dispose={null}>
      <Bounds clip fit margin={1.1} observe>
        <group position={[0, 0, 0]}>
          <primitive 
            object={scene} 
            scale={22} 
            position={[0, -0.2, 0]}
            rotation={[0, -Math.PI / 3, 0]} 
          />
        </group>
      </Bounds>
    </group>
  );
}

useGLTF.preload('/snatcher_-_mutant_hammerhead_shark_creature.glb');
