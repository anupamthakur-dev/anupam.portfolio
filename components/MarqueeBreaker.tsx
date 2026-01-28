
import React from 'react';

const MARQUEE_ONE = "CREATIVE DEVELOPMENT → UI/UX DESIGN → MOTION GRAPHICS → FRONTEND ARCHITECTURE → ";
const MARQUEE_TWO = "REACT → TYPESCRIPT → NODE.JS → TAILWIND → THREE.JS → NEXT.JS → ";

const MarqueeBreaker: React.FC = () => {
  return (
    <div className="relative w-full h-0 z-30 select-none -mt-6">
        
        {/* CSS for Marquee Animation */}
        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
            }
            .animate-marquee {
                animation: marquee 60s linear infinite;
            }
            .animate-marquee-reverse {
                animation: marquee-reverse 60s linear infinite;
            }
        `}</style>

        {/* 
            The Breaker Content
            - h-0 wrapper ensures it doesn't push sections apart.
            - absolute positioning anchors it to the exact seam.
            - z-30 places it above the adjacent sections.
        */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none">
            
            {/* Strap 1: Bottom Layer, Negative Rotation */}
            <div className="absolute w-[150vw] bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white py-10 md:py-12 shadow-2xl transform -rotate-3 md:-rotate-6 border-y border-neutral-300 dark:border-neutral-700">
                <div className="flex w-fit animate-marquee-reverse opacity-80">
                    <span className="whitespace-nowrap text-3xl md:text-5xl font-black uppercase tracking-widest px-4">
                        {MARQUEE_TWO.repeat(12)}
                    </span>
                </div>
            </div>

            {/* Strap 2: Top Layer, Positive Rotation */}
            <div className="absolute w-[150vw] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-10 md:py-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transform rotate-3 md:rotate-6 border-y border-white dark:border-neutral-900">
                 <div className="flex w-fit animate-marquee">
                    <span className="whitespace-nowrap text-3xl md:text-5xl font-black uppercase tracking-widest px-4">
                        {MARQUEE_ONE.repeat(12)}
                    </span>
                </div>
            </div>

        </div>

    </div>
  );
};

export default MarqueeBreaker;
