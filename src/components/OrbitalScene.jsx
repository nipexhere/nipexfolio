import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function OrbitalScene() {
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0, 7.2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0xf2dcf7, 1.5));
    const keyLight = new THREE.PointLight(0xff684f, 34, 12);
    keyLight.position.set(2.8, 2.4, 3.5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x9c6bd1, 24, 12);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.13, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x382344,
        emissive: 0x572a61,
        emissiveIntensity: 0.38,
        roughness: 0.22,
        metalness: 0.82,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        flatShading: true,
      }),
    );
    sculpture.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.18, 1),
      new THREE.MeshBasicMaterial({ color: 0xd8a4ef, wireframe: true, transparent: true, opacity: 0.36 }),
    );
    sculpture.add(wire);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.68, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xff8052, transparent: true, opacity: 0.82 }),
    );
    orbit.rotation.set(0.82, 0.38, 0.54);
    sculpture.add(orbit);

    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.94, 0.006, 6, 180),
      new THREE.MeshBasicMaterial({ color: 0xa876d1, transparent: true, opacity: 0.55 }),
    );
    orbitTwo.rotation.set(-0.63, 0.2, -0.8);
    sculpture.add(orbitTwo);

    const satellites = [
      { geometry: new THREE.OctahedronGeometry(0.17, 0), position: [1.62, 0.8, 0.1], color: 0xff795f },
      { geometry: new THREE.TetrahedronGeometry(0.18, 0), position: [-1.55, -0.72, 0.48], color: 0xb993e5 },
      { geometry: new THREE.IcosahedronGeometry(0.12, 0), position: [0.15, 1.91, -0.38], color: 0xffad68 },
    ];

    satellites.forEach(({ geometry, position, color }, index) => {
      const satellite = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.42, metalness: 0.68, roughness: 0.25 }),
      );
      satellite.position.set(...position);
      satellite.userData.phase = index * 2.1;
      sculpture.add(satellite);
    });

    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const vertical = Math.random() * 2 - 1;
      const spread = Math.sqrt(1 - vertical * vertical);
      particlePositions[index * 3] = radius * spread * Math.cos(theta);
      particlePositions[index * 3 + 1] = radius * vertical;
      particlePositions[index * 3 + 2] = radius * spread * Math.sin(theta);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xf4d9ea, size: 0.018, transparent: true, opacity: 0.68, sizeAttenuation: true }),
    );
    scene.add(particles);

    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let interactionPulse = 0;
    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      target.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      if (prefersReducedMotion) {
        sculpture.rotation.y = target.x * 0.36;
        sculpture.rotation.x = target.y * 0.24;
        renderer.render(scene, camera);
      }
    };
    const resetPointer = () => {
      target.set(0, 0);
      if (prefersReducedMotion) {
        sculpture.rotation.set(0, 0, 0);
        renderer.render(scene, camera);
      }
    };
    const handlePointerDown = () => {
      interactionPulse = 1;
    };
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    if (!prefersReducedMotion) canvas.addEventListener('pointerdown', handlePointerDown);

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 8 : 7.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (prefersReducedMotion) renderer.render(scene, camera);
    });
    resizeObserver.observe(canvas.parentElement);

    let frameId;
    const timer = new THREE.Timer();
    timer.connect(document);
    const animate = (timestamp) => {
      frameId = window.requestAnimationFrame(animate);
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const delta = timer.getDelta();
      interactionPulse *= Math.exp(-delta * 3.5);
      pointer.lerp(target, 0.035);
      sculpture.rotation.y = elapsed * 0.12 + pointer.x * 0.42 + interactionPulse * 0.7;
      sculpture.rotation.x = Math.sin(elapsed * 0.16) * 0.1 + pointer.y * 0.3;
      core.scale.setScalar(1 + interactionPulse * 0.1);
      orbit.material.opacity = 0.82 + interactionPulse * 0.16;
      core.rotation.set(elapsed * 0.1, elapsed * 0.13, elapsed * 0.06);
      wire.rotation.set(-elapsed * 0.07, elapsed * 0.04, elapsed * 0.08);
      orbit.rotation.z = elapsed * 0.11;
      orbitTwo.rotation.y = elapsed * 0.08;
      sculpture.children.slice(4).forEach((satellite) => {
        satellite.rotation.x = elapsed * 0.35 + satellite.userData.phase;
        satellite.rotation.y = elapsed * 0.42;
      });
      particles.rotation.y = -elapsed * 0.012;
      renderer.render(scene, camera);
    };
    if (prefersReducedMotion) renderer.render(scene, camera);
    else animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      timer.dispose();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas className="orbital-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default OrbitalScene;