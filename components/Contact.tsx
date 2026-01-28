
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowRightIcon } from './Icons';
import Flammable from './Flammable';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-48 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 overflow-hidden relative">
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Modern Bento Grid Layout - Refined */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-min">
          
          {/* Main Hero Contact Block (Now Spans 12 for full impact) */}
          <div className="md:col-span-12 p-10 md:p-24 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] flex flex-col justify-between group overflow-hidden relative min-h-[50vh] md:min-h-[60vh]">
             <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-12 block">/ Contact Protocol</span>
                <h2 className="text-7xl md:text-[12vw] font-black sculptural-text leading-[0.75] mb-8">
                  INITIATE <br/> 
                  <span className="text-outline-bold opacity-20 group-hover:opacity-100 transition-opacity duration-700">DIALOG</span>
                </h2>
             </div>
             
             {/* Large Interactive Email Area */}
             <div className="relative z-10 mt-20 md:mt-32">
                <Flammable>
                  <button 
                    onClick={copyEmail}
                    className="flex flex-col items-start group/btn text-left focus:outline-none"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 block group-hover/btn:text-primary transition-colors">
                        {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY ADDRESS'}
                    </span>
                    <span className="text-2xl md:text-7xl font-black lowercase tracking-tighter transition-all duration-500 group-hover/btn:text-primary group-hover/btn:translate-x-4">
                      {PERSONAL_INFO.email}
                    </span>
                  </button>
                </Flammable>
             </div>

             {/* Background Decoration */}
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none">
                <span className="text-[30vw] font-black leading-none">@</span>
             </div>
          </div>

          {/* Social Links Matrix (Spans 12) */}
          <div className="md:col-span-12 p-10 md:p-16 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm flex flex-col md:flex-row justify-between items-center gap-12">
            
            <div className="flex flex-col gap-2 text-center md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Social Matrix</span>
                <h4 className="text-2xl font-black uppercase">Follow the path</h4>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { label: 'GitHub', url: PERSONAL_INFO.github },
                { label: 'LinkedIn', url: PERSONAL_INFO.linkedin },
                { label: 'Twitter', url: '#' },
                { label: 'Behance', url: '#' }
              ].map((link) => (
                <Flammable key={link.label}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300 flex items-center gap-3 group"
                  >
                    {link.label} 
                    <ArrowRightIcon className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </a>
                </Flammable>
              ))}
            </div>

            <div className="hidden md:block">
               <span className="text-[10px] font-mono text-neutral-400">V.2025.REL</span>
            </div>
          </div>

        </div>

        {/* Massive Decorative Background Text */}
        <div className="mt-24 md:mt-32 opacity-[0.02] dark:opacity-[0.04] pointer-events-none select-none">
            <span className="text-[28vw] font-black uppercase leading-none whitespace-nowrap block text-center tracking-tighter">
              GET IN TOUCH
            </span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
