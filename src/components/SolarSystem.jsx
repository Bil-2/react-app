


import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SolarSystem = ({ speeds, isPaused }) => {
  const mountRef = useRef(null);
  const planetsRef = useRef([]);
  const rendererRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 40;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(0, 0, 0);
    scene.add(light);

    const sunGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const planetData = [
      { name: 'Mercury', radius: 0.3, distance: 5 },
      { name: 'Venus', radius: 0.6, distance: 7 },
      { name: 'Earth', radius: 0.65, distance: 9 },
      { name: 'Mars', radius: 0.5, distance: 11 },
      { name: 'Jupiter', radius: 1.1, distance: 14 },
      { name: 'Saturn', radius: 1.0, distance: 17 },
      { name: 'Uranus', radius: 0.9, distance: 20 },
      { name: 'Neptune', radius: 0.9, distance: 23 },
    ];

    const planets = planetData.map((data) => {
      const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff * Math.random() });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      return {
        name: data.name,
        mesh,
        distance: data.distance,
        angle: 0,
      };
    });

    planetsRef.current = planets;
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      if (!isPaused) {
        const delta = clock.getDelta();
        planetsRef.current.forEach((planet) => {
          const speed = speeds[planet.name] || 1;
          planet.angle += delta * speed * 0.5;
          planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
          planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [speeds, isPaused]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default SolarSystem;
