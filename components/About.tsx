
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import Flammable from './Flammable';

const About: React.FC = () => {
  return (
    <section id="about" className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-white dark:bg-neutral-950">
        
        {/* 
            Content Layer 
            Modern Minimalist Layout: Clean grid, no boxes, high typographic contrast.
        */}
        <div className="container relative z-10 mx-auto px-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                
                {/* 
                    Column 1: The Visual 
                    Modern Approach: Clean, sharp image, no decorative borders.
                    Spanning 5 columns.
                */}
                <div className="md:col-span-5 relative group">
                     <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900 z-10">
                        <img 
                            src="https://picsum.photos/800/1000?random=101" 
                            alt="Portrait" 
                            className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                        />
                        {/* Minimalist overlay on hover instead of border */}
                        <div className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     </div>
                     {/* Modern caption */}
                     <div className="mt-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-2">
                        <span>Fig. 01</span>
                        <span>Portrait</span>
                     </div>
                </div>

                {/* 
                    Column 2: The Typography 
                    Modern Approach: Raw text, high contrast, no containers.
                    Spanning 7 columns.
                */}
                <div className="md:col-span-7 flex flex-col justify-center h-full pt-12 md:pt-0">
                    
                    <div className="mb-16">
                         <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">/ The Narrative</span>
                         <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-neutral-900 dark:text-white mb-8">
                            Design <span className="text-neutral-400 dark:text-neutral-600 font-serif italic font-light">&</span><br/> Code.
                         </h2>
                         {/* Minimal separator */}
                         <div className="h-px w-24 bg-neutral-900 dark:bg-white mt-8"></div>
                    </div>

                    <div className="space-y-12 max-w-2xl">
                        <p className="text-2xl md:text-3xl font-light leading-snug text-neutral-800 dark:text-neutral-200">
                            {PERSONAL_INFO.aboutShort}
                        </p>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-between items-start md:items-end">
                            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md editorial-justify">
                                {PERSONAL_INFO.aboutLong}
                            </p>

                            <Flammable>
                                <a href="#contact" className="group inline-flex flex-col items-start gap-1 min-w-max">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Status</span>
                                    <span className="text-sm font-bold border-b border-neutral-900 dark:border-white pb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                                        Open for Work <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">↗</span>
                                    </span>
                                </a>
                            </Flammable>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </section>
  );
};

export default About;
