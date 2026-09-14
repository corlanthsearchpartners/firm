document.addEventListener('DOMContentLoaded', () => {
  const canvasContainer = document.getElementById('hero-3d-canvas');
  if (!canvasContainer) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dynamic import of Three.js from CDN (lazy loading)
  import('https://unpkg.com/three@0.160.0/build/three.module.js').then(THREE => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    canvasContainer.appendChild(renderer.domElement);

    // Abstract Shape: Icosahedron (low poly, premium look)
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xC4A484, // Accent gold/copper
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x0F172A, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        shape.rotation.x += 0.002;
        shape.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
  }).catch(err => {
    console.warn('Three.js failed to load, showing static fallback.', err);
    canvasContainer.style.background = 'radial-gradient(circle, rgba(196,164,132,0.1) 0%, rgba(0,0,0,0) 70%)';
  });
});