
import React from 'react';
import me from "./../assets/me.jpg";

const Hero: React.FC = () => {
  /**
   * We use the URL constructor instead of a static import for assets.
   * In a browser-native ESM environment without a bundler to transform imports,
   * standard 'import' statements are strictly for JavaScript/TypeScript files.
   */
  

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-16 bg-white dark:bg-neutral-950">
      
      {/* 
        EDITORIAL HERO COMPOSITION
        - Dominant Bold Typography
        - Intentional Asymmetry
        - Overlapping Sticker Elements
        - Minimalist Palette
      */}

      <div className="relative w-full max-w-[1600px] mx-auto flex flex-col items-start justify-center">
        
        {/* Playful Greeting SVG (Visual Cue) acting as an introductory label */}
        <div className="absolute top-[-4vw] left-0 md:left-4 z-30 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-[80px] md:w-[140px] transform -rotate-6">
            <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter saturate-150 drop-shadow-sm">
              <path d="M185 60C185 30 165 10 140 12C130 8 120 5 105 10C90 -2 70 2 55 15C40 8 15 15 8 45C0 55 0 75 15 90C8 105 25 115 45 112C55 116 75 116 90 105C100 112 120 116 145 105C160 112 180 108 188 90C200 75 192 64 185 60Z" fill="#FF453A" />
              <g transform="translate(35, 45) rotate(-2)">
                <text x="0" y="40" fontFamily='"Comic Sans MS", "Chalkboard SE", sans-serif' fontSize="48" fontWeight="900" fill="#1a1a1a">Hi!</text>
              </g>
              <g transform="translate(100, 50) rotate(2)">
                <text x="0" y="35" fontFamily='"Comic Sans MS", "Chalkboard SE", sans-serif' fontSize="36" fontWeight="900" fill="#1a1a1a">I'm</text>
              </g>
            </svg>
          </div>
        </div>

        {/* DOMINANT TYPOGRAPHY STACK: Large-scale, modern typography with confident spacing */}
        <div className="relative z-10 leading-[0.78] tracking-tighter select-none">
          <h1 className="text-[18vw] md:text-[14vw] font-black text-neutral-900 dark:text-white uppercase flex flex-col">
            <span className="block overflow-hidden">
               <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>ANUPAM</span>
            </span>
            <span className="block overflow-hidden ml-[8vw] md:ml-[12vw]">
               <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>KUMAR</span>
            </span>
          </h1>
        </div>

        {/* STICKER CUTOUT IMAGE (Intersecting Depth): Balanced asymmetry with a professional yet playful tone */}
        <div className="absolute right-[5vw] bottom-[-2vw] md:right-[15vw] md:bottom-[-4vw] z-20 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="relative group">
            {/* Sticker Effect: Precise white border and intentional tilt */}
            <div className="w-[180px] h-[180px] md:w-[380px] md:h-[380px] bg-white p-1 md:p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform rotate-6 hover:rotate-2 hover:scale-105 transition-all duration-700 ease-out cursor-default">
              <div className="w-full h-full overflow-hidden rounded-full bg-neutral-100">
                <img 
                  src={me} 
                  alt="Anupam Portrait" 
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  onError={(e) => {
                    // Failover to a high-quality placeholder if the local asset is missing
                    (e.target as HTMLImageElement).src = "https://picsum.photos/800/800?random=44";
                  }}
                />
              </div>
              {/* Subtle surface detail for a premium physical feel */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-transparent to-white/20 pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
