"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = 80;

  // Generate random particle positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.002,
      y: (Math.random() - 0.5) * 0.002,
      z: (Math.random() - 0.5) * 0.001,
    }));
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return { positions: pos, velocities: vel };
  }, []);

  // Line geometry for connections
  const linePositions = useMemo(() => new Float32Array(count * count * 6), []);
  const lineColors = useMemo(() => new Float32Array(count * count * 6), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    elapsedRef.current += delta;
    const t = elapsedRef.current;
    const pts = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Animate particles
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pts[ix] += velocities[i].x + Math.sin(t * 0.3 + i) * 0.001;
      pts[ix + 1] += velocities[i].y + Math.cos(t * 0.2 + i) * 0.001;
      pts[ix + 2] += velocities[i].z;

      // Bounce boundaries
      if (Math.abs(pts[ix]) > 5.5) velocities[i].x *= -1;
      if (Math.abs(pts[ix + 1]) > 3.5) velocities[i].y *= -1;
      if (Math.abs(pts[ix + 2]) > 2.5) velocities[i].z *= -1;

      // Mouse repulsion
      const dx = pts[ix] - mx * 5;
      const dy = pts[ix + 1] - my * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        pts[ix] += (dx / dist) * 0.02;
        pts[ix + 1] += (dy / dist) * 0.02;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    let lineIdx = 0;
    const maxDist = 2.5;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ax = pts[i * 3], ay = pts[i * 3 + 1], az = pts[i * 3 + 2];
        const bx = pts[j * 3], by = pts[j * 3 + 1], bz = pts[j * 3 + 2];
        const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);

        if (d < maxDist) {
          const alpha = 1 - d / maxDist;
          linePositions[lineIdx * 6] = ax;
          linePositions[lineIdx * 6 + 1] = ay;
          linePositions[lineIdx * 6 + 2] = az;
          linePositions[lineIdx * 6 + 3] = bx;
          linePositions[lineIdx * 6 + 4] = by;
          linePositions[lineIdx * 6 + 5] = bz;
          // Lime color: R=0.78, G=1.0, B=0.0
          const c = alpha * 0.5;
          lineColors[lineIdx * 6] = 0.78 * c;
          lineColors[lineIdx * 6 + 1] = 1.0 * c;
          lineColors[lineIdx * 6 + 2] = 0;
          lineColors[lineIdx * 6 + 3] = 0.78 * c;
          lineColors[lineIdx * 6 + 4] = 1.0 * c;
          lineColors[lineIdx * 6 + 5] = 0;
          lineIdx++;
        }
      }
    }

    // Clear remaining
    for (let i = lineIdx * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#C8FF00"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} />
      </lineSegments>
    </>
  );
}

export default function ParticleNetwork() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
