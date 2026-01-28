
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingCodeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // --- Resources ---
    const keywords = [
      'const', 'let', 'import', 'return', 'async', 'await', 
      'function', 'class', '=>', '{}', '[]', '<Component />', 
      'if', 'else', 'try', 'catch', 'interface', 'type',
      'npm', 'git', 'docker', 'void', 'public', 'static',
      'useEffect', 'useState', 'props', 'div', 'span'
    ];

    const getSyntaxColor = (text: string) => {
        // VS Code Dark+ inspired colors
        if (['import', 'from', 'return', 'if', 'else', 'try', 'catch', 'async', 'await'].includes(text)) return '#C586C0'; // Purple/Pink
        if (['const', 'let', 'var', 'void', 'public', 'static', 'function', 'div', 'span'].includes(text)) return '#569CD6'; // Blue
        if (['class', 'interface', 'type', '<Component />'].includes(text)) return '#4EC9B0'; // Teal
        if (['useEffect', 'useState'].includes(text)) return '#DCDCAA'; // Yellow
        if (['=>', '{}', '[]'].includes(text)) return '#D4D4D4'; // Light Grey/White (Standard operator)
        if (['npm', 'git', 'docker', 'props'].includes(text)) return '#9CDCFE'; // Light Blue
        return '#D4D4D4';
    };

    const createTextTexture = (text: string) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if(ctx) {
            ctx.font = 'bold 40px "Courier New", monospace';
            ctx.fillStyle = getSyntaxColor(text); 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width/2, canvas.height/2);
        }
        const tex = new THREE.CanvasTexture(canvas);
        return tex;
    };

    const particleCount = 45;
    const geometry = new THREE.PlaneGeometry(4, 2);
    const particles: { mesh: THREE.Mesh, velocity: THREE.Vector3, rotVelocity: THREE.Vector3 }[] = [];

    const group = new THREE.Group();
    scene.add(group);

    // Pre-generate textures
    const textures = keywords.map(createTextTexture);

    // Create meshes
    for(let i = 0; i < particleCount; i++) {
        const texture = textures[Math.floor(Math.random() * textures.length)];
        
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1, // Will be controlled by theme
            side: THREE.DoubleSide,
            depthWrite: false, 
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // Random Position
        const range = 40;
        mesh.position.set(
            (Math.random() - 0.5) * range * 1.5,
            (Math.random() - 0.5) * range,
            (Math.random() - 0.5) * range
        );

        // Random Rotation
        mesh.rotation.set(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
        );

        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            0
        );
        
        const rotVelocity = new THREE.Vector3(
             (Math.random() - 0.5) * 0.002,
             (Math.random() - 0.5) * 0.002,
             (Math.random() - 0.5) * 0.002
        );

        group.add(mesh);
        particles.push({ mesh, velocity, rotVelocity });
    }

    // --- Animation ---
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      particles.forEach(p => {
          p.mesh.position.add(p.velocity);
          p.mesh.rotation.x += p.rotVelocity.x;
          p.mesh.rotation.y += p.rotVelocity.y;
          p.mesh.rotation.z += p.rotVelocity.z;

          // Wrap around logic
          const limit = 30;
          if (p.mesh.position.x > limit) p.mesh.position.x = -limit;
          if (p.mesh.position.x < -limit) p.mesh.position.x = limit;
          if (p.mesh.position.y > limit) p.mesh.position.y = -limit;
          if (p.mesh.position.y < -limit) p.mesh.position.y = limit;
      });
      
      group.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // --- Theme Handling ---
    const updateThemeColors = () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Use White (0xffffff) to show original texture colors in Dark Mode.
        // Use Dark Grey (0x444444) to darken the texture colors in Light Mode for contrast.
        const color = isDark ? new THREE.Color(0xffffff) : new THREE.Color(0x444444);
        const opacity = isDark ? 0.6 : 0.4; // Slightly more visible in dark mode to pop against black

        particles.forEach(p => {
            (p.mesh.material as THREE.MeshBasicMaterial).color = color;
            (p.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
        });
    };

    updateThemeColors();
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            if(m.type === 'attributes' && m.attributeName === 'class') updateThemeColors();
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    // --- Resize ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
        cancelAnimationFrame(animationId);
        if(container && renderer.domElement) container.removeChild(renderer.domElement);
        
        particles.forEach(p => {
            p.mesh.geometry.dispose();
            (p.mesh.material as THREE.Material).dispose();
        });
        textures.forEach(t => t.dispose());
        renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default FloatingCodeBackground;
