
import React, { useEffect, useRef } from 'react';
import { useFire } from '../context/FireContext';

type ParticleType = 'fire' | 'accent';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: ParticleType;
  active: boolean;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 0;
    this.maxLife = 0;
    this.size = 0;
    this.type = 'fire';
    this.active = false;
  }

  spawn(x: number, y: number, vx: number, vy: number, size: number, life: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.type = Math.random() < 0.2 ? 'accent' : 'fire'; // Kept for potential subtle variations
    this.active = true;
  }

  update(windX: number, windY: number) {
    if (!this.active) return;
    
    // Apply velocity
    this.x += this.vx + windX;
    this.y += this.vy + windY;
    
    // Physics
    this.vy -= 0.08; // Natural rise
    this.size *= 0.96; // Shrink
    this.life--;

    // Turbulence
    this.x += (Math.random() - 0.5) * 0.5;

    if (this.life <= 0 || this.size < 0.2) {
      this.active = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    if (!this.active) return;

    const progress = this.life / this.maxLife; // 0.0 to 1.0
    
    let r = 0, g = 0, b = 0, a = progress;

    if (isDark) {
        // DARK MODE: Reddish Flame (Additive 'lighter' blend)
        if (progress > 0.8) {
           r = 255; g = 255; b = 200; // White/Yellow Core
           a = 0.8;
        } else if (progress > 0.4) {
           r = 255; 
           g = Math.floor(progress * 120); // Red-Orange
           b = 0;
           a = 0.7;
        } else {
           r = 150; g = 20; b = 20; // Deep Red
           a = progress * 0.4;
        }
    } else {
        // LIGHT MODE: Blue Flame (Standard 'source-over' blend)
        // Needs to be darker to show on white background
        if (progress > 0.8) {
            r = 0; g = 180; b = 255; // Bright Blue/Cyan
            a = 0.6;
        } else if (progress > 0.4) {
            r = 0; g = 80; b = 220; // Medium Blue
            a = 0.5;
        } else {
            r = 0; g = 0; b = 160; // Dark Blue Smoke
            a = progress * 0.3;
        }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.fill();
  }
}

const FireLayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { sourcesRef } = useFire();
  
  // Mouse state
  const mouse = useRef({ x: -100, y: -100 });
  const lastMouse = useRef({ x: -100, y: -100 });
  const wind = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Particle Pool
    const MAX_PARTICLES = 1500;
    const particles: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Particle());
    }

    // Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');
      // Use 'lighter' for glowing effect in dark mode, 'source-over' for paint effect in light mode
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

      // Check if hovering any flammable element
      let isHoveringFlammable = false;
      sourcesRef.current.forEach((source) => {
          if (source.isHovered) isHoveringFlammable = true;
      });

      // 1. Calculate Global Wind from Mouse
      const mvx = mouse.current.x - lastMouse.current.x;
      const mvy = mouse.current.y - lastMouse.current.y;
      
      // Decay wind
      wind.current.x = wind.current.x * 0.9 + mvx * 0.02;
      wind.current.y = wind.current.y * 0.9 + mvy * 0.02;

      // Clamp wind
      wind.current.x = Math.max(-3, Math.min(3, wind.current.x));
      wind.current.y = Math.max(-3, Math.min(3, wind.current.y));

      // 2. Handle Mouse Cursor Fire (Only if NOT hovering a flammable element)
      if (mouse.current.x > 0 && !isHoveringFlammable) {
        const speed = Math.sqrt(mvx*mvx + mvy*mvy);
        const count = Math.min(8, 2 + speed);
        
        for(let k=0; k<count; k++) {
            const p = particles.find(p => !p.active);
            if(p) {
                p.spawn(
                    mouse.current.x,
                    mouse.current.y,
                    (Math.random() - 0.5) * 2 + mvx * 0.2, // Inertia
                    (Math.random() - 1) * 2 + mvy * 0.2, 
                    Math.random() * 6 + 4,
                    Math.random() * 20 + 20
                );
            }
        }
      }
      lastMouse.current = { ...mouse.current };

      // 3. Handle Element Fire (Perimeter Burning)
      sourcesRef.current.forEach((source) => {
          if (source.isHovered && source.element) {
              // MEASURE LIVE for accurate tracking of moving elements (transforms)
              const rect = source.element.getBoundingClientRect();

              // Skip if off-screen to save performance
              if (rect.bottom < 0 || rect.top > window.innerHeight) return;

              const perimeter = (rect.width + rect.height) * 2;
              const spawnCount = Math.ceil(perimeter / 60); 

              for (let i = 0; i < spawnCount; i++) {
                  const p = particles.find(p => !p.active);
                  if (p) {
                      const edge = Math.floor(Math.random() * 4); // 0:Top, 1:Right, 2:Bottom, 3:Left
                      let sx = 0, sy = 0, svx = 0, svy = 0;

                      if (edge === 0) { // Top
                         sx = rect.left + Math.random() * rect.width;
                         sy = rect.top;
                         svx = (Math.random() - 0.5) * 1;
                         svy = -Math.random() * 2 - 1; // Up
                      } else if (edge === 1) { // Right
                         sx = rect.left + rect.width;
                         sy = rect.top + Math.random() * rect.height;
                         svx = Math.random() * 1.5; // Out right
                         svy = -Math.random() * 2; // Up
                      } else if (edge === 2) { // Bottom (Corners)
                         const isLeftCorner = Math.random() > 0.5;
                         if (isLeftCorner) {
                             sx = rect.left + Math.random() * 20; 
                             svx = -Math.random(); 
                         } else {
                             sx = rect.left + rect.width - Math.random() * 20;
                             svx = Math.random();
                         }
                         sy = rect.top + rect.height;
                         svy = -Math.random() * 2;
                      } else { // Left
                         sx = rect.left;
                         sy = rect.top + Math.random() * rect.height;
                         svx = -Math.random() * 1.5; // Out left
                         svy = -Math.random() * 2; // Up
                      }

                      p.spawn(
                          sx,
                          sy,
                          svx, 
                          svy,
                          Math.random() * 6 + 3,
                          Math.random() * 25 + 15
                      );
                  }
              }
          }
      });

      // 4. Update & Draw
      particles.forEach(p => {
          p.update(wind.current.x * 0.5, wind.current.y * 0.5);
          p.draw(ctx, isDark);
      });
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [sourcesRef]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[40]"
    />
  );
};

export default FireLayer;
