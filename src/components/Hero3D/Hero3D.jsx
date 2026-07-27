import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import './Hero3D.css';

function MainCube({ mouse }) {
  const meshRef = useRef();
  const edgesRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.current.y * 0.15;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
      edgesRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.current.y * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
      glowRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.current.y * 0.15;
      const scale = 1.05 + Math.sin(t * 2) * 0.03;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const cubeGeometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(cubeGeometry), [cubeGeometry]);

  return (
    <group>
      {/* Inner glowing cube */}
      <mesh ref={glowRef} geometry={cubeGeometry}>
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main cube body */}
      <mesh ref={meshRef} geometry={cubeGeometry}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#8B5CF6"
          emissiveIntensity={0.15}
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.9} linewidth={1} />
      </lineSegments>

      {/* Front face text */}
      <Text
        position={[0, 0, 1.01]}
        fontSize={0.9}
        color="#A78BFA"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
        fontWeight={700}
      >
        AK
        <meshStandardMaterial
          color="#A78BFA"
          emissive="#8B5CF6"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Text>

      {/* Corner accents - small glowing spheres at cube corners */}
      {[[-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
        [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function SatelliteCubes({ mouse }) {
  const cubes = useMemo(() => [
    { color: '#8B5CF6', emissive: '#8B5CF6', distance: 2.8, speed: 0.4, offset: 0, size: 0.35 },
    { color: '#22D3EE', emissive: '#22D3EE', distance: 3.0, speed: 0.3, offset: Math.PI / 2, size: 0.3 },
    { color: '#A78BFA', emissive: '#A78BFA', distance: 2.6, speed: 0.5, offset: Math.PI, size: 0.28 },
    { color: '#06B6D4', emissive: '#06B6D4', distance: 3.2, speed: 0.35, offset: Math.PI * 1.5, size: 0.32 },
  ], []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <OrbitingCube key={i} {...cube} mouse={mouse} index={i} />
      ))}
    </group>
  );
}

function OrbitingCube({ color, emissive, distance, speed, offset, size, mouse, index }) {
  const ref = useRef();
  const edgesRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const angle = t * speed + offset;
      ref.current.position.x = Math.cos(angle) * distance;
      ref.current.position.z = Math.sin(angle) * distance;
      ref.current.position.y = Math.sin(t * 0.5 + offset) * 0.4;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.y = t * 0.3 + index;
    }
    if (edgesRef.current) {
      const angle = t * speed + offset;
      edgesRef.current.position.x = Math.cos(angle) * distance;
      edgesRef.current.position.z = Math.sin(angle) * distance;
      edgesRef.current.position.y = Math.sin(t * 0.5 + offset) * 0.4;
      edgesRef.current.rotation.x = t * 0.5;
      edgesRef.current.rotation.y = t * 0.3 + index;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group>
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

function Particles({ count = 80 }) {
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const purple = new THREE.Color('#8B5CF6');
    const cyan = new THREE.Color('#22D3EE');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixFactor = Math.random();
      const c = purple.clone().lerp(cyan, mixFactor);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.02;
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowRing() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2;
      ref.current.rotation.z = t * 0.1;
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#8B5CF6"
        emissive="#8B5CF6"
        emissiveIntensity={2}
        transparent
        opacity={0.4}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#22D3EE" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#A78BFA" />

      <MainCube mouse={mouse} />
      <SatelliteCubes mouse={mouse} />
      <Particles count={80} />
      <GlowRing />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Hero3D() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current = { x: x * 0.5, y: y * 0.5 };
  }, []);

  return (
    <div
      className="hero-3d-container"
      ref={containerRef}
      onPointerMove={handlePointerMove}
    >
      <div className="hero-3d-glow" />
      <Canvas
        orthographic
        camera={{
          position: [5, 5, 5],
          zoom: 90,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
