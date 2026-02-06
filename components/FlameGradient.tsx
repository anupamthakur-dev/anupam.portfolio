
import React from 'react';

const FlameGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 
         VORTEX COMPOSITION 
         We layer multiple conic gradients with transparency to create distinct "flame tongues" 
         that rotate at different speeds, simulating a chaotic 3D spiral.
      */}

      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Layer 1: Outer Swirl (Slow, Wide Arms) */}
        <div 
          className="absolute w-[130vmax] h-[130vmax] animate-[spin_60s_linear_infinite] opacity-40 dark:opacity-50 mix-blend-normal dark:mix-blend-screen blur-[60px] md:blur-[80px]"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              var(--flame-base) 45deg,
              transparent 100deg,
              var(--flame-mid) 180deg,
              transparent 240deg,
              var(--flame-base) 310deg,
              transparent 360deg
            )`
          }}
        />

        {/* Layer 2: Inner Vortex (Fast, Tight Arms, Reverse Spin) */}
        <div 
          className="absolute w-[90vmax] h-[90vmax] animate-[spin_20s_linear_infinite_reverse] opacity-50 dark:opacity-70 mix-blend-normal dark:mix-blend-screen blur-[40px] md:blur-[60px]"
          style={{
            background: `conic-gradient(
              from 120deg at 50% 50%,
              transparent 0deg,
              var(--flame-mid) 20deg,
              transparent 60deg,
              var(--flame-core) 90deg,
              transparent 120deg,
              var(--flame-mid) 200deg,
              transparent 240deg,
              var(--flame-core) 290deg,
              transparent 360deg
            )`
          }}
        />

        {/* Layer 3: The Eye (Pulsing Center) */}
        <div 
           className="absolute w-[40vmax] h-[40vmax] animate-pulse opacity-60 dark:opacity-90 mix-blend-normal dark:mix-blend-screen blur-[50px]"
           style={{
             background: `radial-gradient(
               circle at center,
               var(--flame-core) 0%,
               var(--flame-mid) 40%,
               transparent 70%
             )`
           }}
        />

      </div>

      <style>{`
        :root {
            /* Light Mode: Blue Flame (Visible against White) */
            --flame-base: #bfdbfe;  /* Blue 200 */
            --flame-mid: #60a5fa;   /* Blue 400 */
            --flame-core: #2563eb;  /* Blue 600 */
        }
        .dark {
            /* Dark Mode: Magma (Glowing against Black) */
            --flame-base: #7f1d1d;  /* Red 900 */
            --flame-mid: #ea580c;   /* Orange 600 */
            --flame-core: #fcd34d;  /* Amber 300 */
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FlameGradient;
