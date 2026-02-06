
import { MarqueeStripString } from '@/utils/marquee';
import React from 'react';
import PROFILE from "../db/profile.json" with {type:'json'};
import type { Skills } from '@/types';


const SKILLS = PROFILE.skills as Skills; 
 const MARQUEE_ONE = MarqueeStripString([...SKILLS.backend,...SKILLS.frontend,...SKILLS.tools],"leftArrow");
 const MARQUEE_TWO = MarqueeStripString([...SKILLS.backend,...SKILLS.frontend,...SKILLS.tools],"rightArrow");
const MarqueeBreaker: React.FC = () => {
  return (
    <div className="relative w-full h-0 z-30 select-none">
        
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
            Asymmetric Criss-Cross Alignment:
            - Offset the intersection point to the right (approx 75% of width).
            - Maintained bold thickness (py-16) and high-impact font sizes.
            - Overlapping intersection moved via translateX on the inner container.
        */}
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none h-[600px] md:h-[900px] -translate-y-1/2 flex items-center justify-center">
            
            {/* 
                We move the relative container to the right (translate-x) 
                so the rotation centers (where they cross) shift away from the screen center.
            */}
            <div className="relative w-full h-full flex items-center justify-center translate-x-[20vw] md:translate-x-[25vw]">
                
                {/* 
                    Strap 1: Bottom Layer, Negative Rotation 
                */}
                <div className="absolute w-[200vw] bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white py-10 md:py-16 shadow-xl transform translate-y-12 lg:translate-y-6 -rotate-[6deg] lg:-rotate-[4deg] border-y border-neutral-300 dark:border-neutral-700 will-change-transform">
                    <div className="flex w-fit animate-marquee-reverse opacity-70">
                        <span className="whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.2em] px-4">
                            {MARQUEE_TWO.repeat(8)}
                        </span>
                    </div>
                </div>

                {/* 
                    Strap 2: Top Layer, Positive Rotation 
                */}
                <div className="absolute w-[200vw] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-10 md:py-16 shadow-[0_30px_100px_-10px_rgba(0,0,0,0.7)] transform rotate-[5deg] md:rotate-[4deg] border-y border-white dark:border-neutral-900 will-change-transform">
                     <div className="flex w-fit animate-marquee">
                        <span className="whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.2em] px-4">
                            {MARQUEE_ONE.repeat(8)}
                        </span>
                    </div>
                </div>

            </div>
        </div>

    </div>
  );
};

export default MarqueeBreaker;
