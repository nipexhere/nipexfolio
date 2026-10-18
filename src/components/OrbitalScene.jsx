import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function OrbitalScene({ pulseKey = 0 }) {
  const canvasRef = useRef(null);
  const pulseHandlerRef = useRef(() => {});

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
    const FOV = 42;
    const CAMERA_Z = 8.4;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 40);
    camera.position.set(0, 0, CAMERA_Z);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene.add(new THREE.AmbientLight(0xd5a7df, 1.2));
    const keyLight = new THREE.PointLight(0xff873a, 42, 16);
    keyLight.position.set(2.8, 2.4, 3.5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x8c45b8, 34, 14);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.13, 2),
      new THREE.MeshBasicMaterial({ color: 0x8c45b8 }),
    );
    sculpture.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.18, 1),
      new THREE.MeshBasicMaterial({ color: 0xff873a, wireframe: true, transparent: true, opacity: 0.72 }),
    );
    sculpture.add(wire);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.68, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xff873a, transparent: true, opacity: 0.9 }),
    );
    orbit.rotation.set(0.82, 0.38, 0.54);
    sculpture.add(orbit);

    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.94, 0.006, 6, 180),
      new THREE.MeshBasicMaterial({ color: 0xea3e56, transparent: true, opacity: 0.7 }),
    );
    orbitTwo.rotation.set(-0.63, 0.2, -0.8);
    sculpture.add(orbitTwo);

    const traceNodes = [];
    const traces = [
      { points: [[1.2, 1.25, 0.05], [1.85, 1.25, 0.05], [1.85, 0.72, 0.05], [2.55, 0.72, 0.05]], color: 0xff873a },
      { points: [[-1.15, -1.15, 0.1], [-1.95, -1.15, 0.1], [-1.95, -0.48, 0.1], [-2.6, -0.48, 0.1]], color: 0x8c45b8 },
      { points: [[0.18, -1.45, -0.1], [0.18, -2.05, -0.1], [0.84, -2.05, -0.1], [0.84, -2.58, -0.1]], color: 0xea3e56 },
    ];

    traces.forEach(({ points, color }) => {
      const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
      sculpture.add(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 48, 0.014, 6, false),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.48, metalness: 0.45, roughness: 0.3 }),
      ));

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 16, 12),
        new THREE.MeshBasicMaterial({ color }),
      );
      node.position.copy(curve.getPoint(1));
      sculpture.add(node);
      traceNodes.push(node);
    });

    const satelliteMeshes = [];
    const satellites = [
      { geometry: new THREE.OctahedronGeometry(0.17, 0), position: [1.62, 0.8, 0.1], color: 0xea3e56 },
      { geometry: new THREE.TetrahedronGeometry(0.18, 0), position: [-1.55, -0.72, 0.48], color: 0x8c45b8 },
      { geometry: new THREE.IcosahedronGeometry(0.12, 0), position: [0.15, 1.91, -0.38], color: 0xff873a },
    ];

    satellites.forEach(({ geometry, position, color }, index) => {
      const satellite = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.42, metalness: 0.68, roughness: 0.25 }),
      );
      satellite.position.set(...position);
      satellite.userData.phase = index * 2.1;
      sculpture.add(satellite);
      satelliteMeshes.push(satellite);
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
      new THREE.PointsMaterial({ color: 0xf7f0f8, size: 0.02, transparent: true, opacity: 0.72, sizeAttenuation: true }),
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
      if (prefersReducedMotion) {
        core.scale.setScalar(1.1);
        orbit.material.opacity = 1;
        renderer.render(scene, camera);
      }
    };
    pulseHandlerRef.current = handlePointerDown;
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    if (!prefersReducedMotion) canvas.addEventListener('pointerdown', handlePointerDown);

    // The sculpture always sits at the centre of its container and is scaled to
    // fit the container's smaller side, so it lines up on any screen size.
    // The widest part of the artwork (trace lines) spans about 5.4 units, so we
    // leave a little padding around that.
    const SCULPTURE_SPAN = 6;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = CAMERA_Z;
      camera.updateProjectionMatrix();

      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
      const visibleWidth = visibleHeight * camera.aspect;
      const fitScale = Math.min(visibleWidth, visibleHeight) / SCULPTURE_SPAN;
      sculpture.scale.setScalar(Math.min(fitScale, 1));
      sculpture.position.set(0, 0, 0);

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
      traceNodes.forEach((node, index) => {
        const phase = elapsed * 3.2 + index * 2.1;
        node.scale.setScalar(0.85 + (Math.sin(phase) + 1) * 0.24 + interactionPulse * 0.35);
      });
      core.rotation.set(elapsed * 0.1, elapsed * 0.13, elapsed * 0.06);
      wire.rotation.set(-elapsed * 0.07, elapsed * 0.04, elapsed * 0.08);
      orbit.rotation.z = elapsed * 0.11;
      orbitTwo.rotation.y = elapsed * 0.08;
      satelliteMeshes.forEach((satellite) => {
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
      pulseHandlerRef.current = () => {};
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

  useEffect(() => {
    if (pulseKey > 0) pulseHandlerRef.current();
  }, [pulseKey]);

  // Sizing is handled with Tailwind so it no longer depends on separate CSS.
  // The parent decides the height; the canvas fills it.
  return (
    <div className="orbital-scene relative h-full w-full">
      <canvas className="orbital-canvas absolute inset-0 block h-full w-full" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

export default OrbitalScene;