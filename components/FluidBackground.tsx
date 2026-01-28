
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FluidBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = containerRef.current;
    const { offsetWidth: width, offsetHeight: height } = container;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Shader Material ---
    // A customized shader that generates moving noise
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      
      varying vec2 vUv;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        
        // Aspect ratio correction
        st.x *= uResolution.x / uResolution.y;

        // Mouse interaction influence
        vec2 mouse = uMouse * 0.5;
        
        // Create shifting coordinates
        float time = uTime * 0.1;
        
        // Layered noise for smoke effect
        float n1 = snoise(vec2(st.x * 2.0 + time, st.y * 2.0 - time));
        float n2 = snoise(vec2(st.x * 4.0 - time * 0.5 + mouse.x, st.y * 4.0 + time * 0.5 + mouse.y));
        
        float finalNoise = n1 * 0.5 + n2 * 0.25;
        
        // Soften the noise
        float mask = smoothstep(-0.5, 0.8, finalNoise);

        // Mix colors based on noise
        vec3 color = mix(uColor1, uColor2, mask + st.y * 0.2); // Gradient from top to bottom roughly
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Initial colors (will be updated)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color(0xffffff) }, // Background
        uColor2: { value: new THREE.Color(0xf5f5f5) }, // Clouds
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // --- Animation & Interaction ---
    let time = 0;
    const animate = () => {
      time += 0.01;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Smoothly interpolate current value to target could be done here, 
      // but we'll let the shader handle the raw input for now or add lerp in animation loop if needed.
      // For responsiveness, direct update is fine for this subtle effect.
      material.uniforms.uMouse.value.set(x, y);
    };

    // --- Theme Observer ---
    // We need to check if .dark class exists on html
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        // Dark Mode: Deep Black/Grey with subtle movement
        material.uniforms.uColor1.value.set('#0a0a0a'); // Background (neutral-950)
        material.uniforms.uColor2.value.set('#171717'); // Smoke (neutral-900)
      } else {
        // Light Mode: White/Light Grey
        material.uniforms.uColor1.value.set('#ffffff');
        material.uniforms.uColor2.value.set('#e5e5e5'); // neutral-200
      }
    };

    // Initial check
    updateColors();

    // Observer for class changes on <html>
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />
  );
};

export default FluidBackground;
