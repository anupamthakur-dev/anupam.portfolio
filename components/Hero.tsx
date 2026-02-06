
import React from 'react';
import profile from'../db/profile.json' with {type : 'json'};
import Flammable from './Flammable';
import me from '@/assets/me.png';

const SocialLinks = [
              { label: 'GITHUB', url: profile.personal_info.github },
              { label: 'LINKEDIN', url: profile.personal_info.linkedin },
              { label: 'RESUME', url: profile.personal_info.resume_link }
            ]

const Hero: React.FC = () => {
  // Use the direct export link for the Google Drive image
  const heroImageUrl = `https://drive.google.com/uc?export=view&id=1PAjnP-y5SqUBbfQP0dLrzChpE9WbjUGW`;

  return (
    <div>
    <section id="top" className="relative h-[100dvh] md:h-screen w-full overflow-hidden flex flex-col justify-end items-center  transition-colors duration-500">
      
      {/* SVG Pencil Filter Definition for hand-drawn effects */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <filter id="pencil-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 1. BACKGROUND NAME: Single line, solid color, behind the top part of the image */}
      <div className="absolute inset-x-0 top-[22%] md:top-[20%] flex justify-center z-0 pointer-events-none select-none">
        <h1 className="text-[11vw] font-black leading-none text-neutral-900 dark:text-neutral-100 tracking-tighter uppercase text-center animate-slide-up whitespace-nowrap">
          ANUPAM KUMAR
        </h1>
      </div>

      {/* 2. CENTERED IMAGE & SPEECH BUBBLE */}
      <div className="relative z-10 w-full max-w-[95vw] md:max-w-5xl h-fit max-h-[70vh] md:max-h-[72vh] flex justify-center items-end ">
        
        {/* Improved Sketchy Cloud Speech Bubble */}
        <div className="absolute top-[8%] -right-2 md:right-[12%] z-30 animate-[float_5s_ease-in-out_infinite]">
            <div className="relative p-8 md:p-12 flex items-center justify-center min-w-[140px] md:min-w-[220px] ">
                {/* Enhanced Hand-Drawn Cloud Path */}
                <svg 
                    viewBox="0 0 220 130" 
                    className="absolute inset-0 w-full h-full text-white dark:text-neutral-900 drop-shadow-xl"
                    style={{ filter: 'url(#pencil-texture)' }}
                >
                    <path 
                        fill="currentColor" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        d="M50,110 C30,110 10,100 10,75 C10,50 30,40 50,40 C50,20 80,10 110,10 C140,10 170,20 170,40 C190,40 210,50 210,75 C210,100 190,110 170,110 C160,125 130,125 110,120 C90,125 60,125 50,110 Z"
                        className="text-white dark:text-neutral-800"
                    />
                    <path 
                        fill="none" 
                        stroke="black" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                        d="M50,110 C30,110 10,100 10,75 C10,50 30,40 50,40 C50,20 80,10 110,10 C140,10 170,20 170,40 C190,40 210,50 210,75 C210,100 190,110 170,110 C160,125 130,125 110,120 C90,125 60,125 50,110 Z"
                        className="dark:stroke-neutral-100 opacity-80"
                    />
                </svg>
                {/* Bubble Text */}
                <span className="relative z-10 text-2xl md:text-5xl font-black italic tracking-tighter text-neutral-900 dark:text-neutral-50 font-serif">
                  Hello !
                </span>
            </div>
        </div>

        {/* The Hero Image: Touches the exact bottom of the container */}
        <div className="relative h-full w-auto ">
          <img 
            src={me} 
            alt="Anupam Kumar Portrait" 
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_60px_rgba(255,255,255,0.03)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/1000/1500?grayscale";
            }}
          />
        </div>
      </div>

      {/* 3. LEFT ASIDE: Subtext & Scroll indicator */}
      <div className="hidden  absolute bottom-12 left-8 md:left-16 z-20 lg:flex flex-col items-start gap-12 md:gap-20">
        <div className="max-w-[140px] md:max-w-[200px]">
           <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-primary mb-4 block">/ Discipline</span>
           <p className="text-[10px] md:text-xs font-black leading-relaxed text-neutral-500 dark:text-neutral-400 uppercase tracking-widest editorial-justify">
             {profile.about.tagline}
           </p>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer">
            <div className="h-[50px] md:h-[80px] w-px bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-primary animate-[scrollLine_3s_ease-in-out_infinite]"></div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.6em] rotate-180 [writing-mode:vertical-lr]  text-primary transition-colors">EXPLORE</span>
        </div>
      </div>

      {/* 4. RIGHT ASIDE: Stacked Quick Social Links */}
      <div className="hidden lg:absolute right-8 md:right-16 bottom-16 z-20 flex flex-col items-center">
        <div className="flex flex-col items-center gap-10 md:gap-12 mb-10">
            {SocialLinks.map((link) => (
              <Flammable key={link.label}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 [writing-mode:vertical-rl] py-2 hover:-translate-y-1"
                >
                  {link.label}
                </a>
              </Flammable>
            ))}
        </div>
        <div className="w-px h-16 md:h-24 bg-neutral-100 dark:bg-neutral-800"></div>
      </div>

      <style>{`
        @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>

    </section>
    {/*Mobile only  subtext */}
     <section className="lg:hidden   px-8 py-12  flex flex-col items-start gap-12 ">
        <div className=" ">
           <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-primary mb-4 block">/ Discipline</span>
           <p className="text-[14px] md:text-xs font-black leading-relaxed text-neutral-500 dark:text-neutral-400 uppercase tracking-widest editorial-justify">
             {profile.about.tagline}
           </p>
        </div>
        {/*Mobile only  Quick Social Links */}
      
        <div className="flex  items-center gap-10  mb-10">
            {SocialLinks.map((link) => (
              <Flammable key={link.label}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300  py-2 hover:-translate-y-1"
                >
                  {link.label}
                </a>
              </Flammable>
            ))}
        </div>
       
     
        
      </section>
    </div>
  );
};

export default Hero;
