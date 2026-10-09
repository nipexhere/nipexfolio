import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-8 * aspect, 8 * aspect, 8, -8, 0.1, 50);
    camera.position.z = 20;

    const field = new THREE.Group();
    scene.add(field);

    const palette = [0x7650a0, 0xdb4655, 0xef8741];
    const rings = palette.map((color, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(5 + index * 1.25, 0.009, 4, 220),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.13, depthWrite: false }),
      );
      ring.scale.set(aspect, 0.74 + index * 0.08, 1);
      ring.rotation.set(0.22 + index * 0.18, 0.12, index * 0.72);
      field.add(ring);
      return ring;
    });

    const particleCount = 360;
    const normalizedPositions = new Float32Array(particleCount * 4);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 4;
      normalizedPositions[offset] = Math.random() * 2 - 1;
      normalizedPositions[offset + 1] = Math.random() * 2 - 1;
      normalizedPositions[offset + 2] = Math.random() * -9;
      normalizedPositions[offset + 3] = Math.random() * Math.PI * 2;
      positions[index * 3] = normalizedPositions[offset] * 8 * aspect;
      positions[index * 3 + 1] = normalizedPositions[offset + 1] * 8;
      positions[index * 3 + 2] = normalizedPositions[offset + 2];

      const color = new THREE.Color(palette[index % palette.length]);
      color.multiplyScalar(0.75 + Math.random() * 0.35);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.055,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        sizeAttenuation: false,
      }),
    );
    field.add(particles);

    const pointer = new THREE.Vector2();
    const target = new THREE.Vector2();
    const handlePointerMove = (event) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const resize = () => {
      const nextAspect = window.innerWidth / window.innerHeight;
      camera.left = -8 * nextAspect;
      camera.right = 8 * nextAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      rings.forEach((ring) => ring.scale.set(nextAspect, ring.scale.y, 1));
      for (let index = 0; index < particleCount; index += 1) {
        positions[index * 3] = normalizedPositions[index * 4] * 8 * nextAspect;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) renderer.render(scene, camera);
    };
    window.addEventListener('resize', resize);
    resize();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    let previousFrame = 0;
    let elapsed = 0;
    const animate = (timestamp) => {
      frameId = window.requestAnimationFrame(animate);
      if (timestamp - previousFrame < 32) return;
      const delta = Math.min((timestamp - previousFrame) / 1000, 0.06);
      previousFrame = timestamp;
      elapsed += delta;
      pointer.lerp(target, 0.025);
      field.rotation.y = pointer.x * 0.025 + Math.sin(elapsed * 0.12) * 0.012;
      field.rotation.x = pointer.y * 0.018;
      rings.forEach((ring, index) => {
        ring.rotation.z += delta * (index % 2 === 0 ? 0.006 : -0.004);
      });

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 4;
        const phase = normalizedPositions[offset + 3];
        positions[index * 3] = normalizedPositions[offset] * 8 * (window.innerWidth / window.innerHeight)
          + Math.sin(elapsed * 0.16 + phase) * 0.12;
        positions[index * 3 + 1] = normalizedPositions[offset + 1] * 8
          + Math.cos(elapsed * 0.14 + phase) * 0.1;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) renderer.render(scene, camera);
    else animate(0);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resize);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div aria-hidden="true" className="ambient-background">
      <canvas className="ambient-canvas" ref={canvasRef} />
    </div>
  );
}

export default AmbientBackground;
