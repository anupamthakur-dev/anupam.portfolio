
import React, { useState } from 'react';
import { PROJECTS, CATEGORIES } from '../constants';
import { Category } from '../types';
import { ArrowRightIcon } from './Icons';
import Flammable from './Flammable';

const ProjectGallery: React.FC = () => {
  const [filter, setFilter] = useState<Category>('All');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // Keep track of the last active project to display it while fading out
  const [lastActiveProjectId, setLastActiveProjectId] = useState<string | null>(PROJECTS[0].id);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  // Derive the project to show (current or last)
  const displayProjectId = activeProjectId || lastActiveProjectId;
  const displayProject = filteredProjects.find(p => p.id === displayProjectId) || filteredProjects[0];
  
  // Is the image currently visible?
  const isImageVisible = activeProjectId !== null;

  // Calculate vertical offset for the "live" following effect
  // We center the movement range around 0
  const centerIndex = (filteredProjects.length - 1) / 2;
  const verticalOffset = (activeIndex - centerIndex) * 60; // 60px per step

  return (
    <section id="projects" className="relative py-32 pt-48 overflow-visible min-h-screen">
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <div>
               <span className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2 block">/ Selected Cases</span>
               <h2 className="text-[10vw] md:text-[6vw] font-black sculptural-text leading-[0.8]">
                 WORKS
               </h2>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-0 mt-8 md:mt-0 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-full p-1">
              {CATEGORIES.map((cat) => (
                <Flammable key={cat}>
                    <button 
                    onClick={() => setFilter(cat)}
                    className={`
                        relative px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                        ${filter === cat 
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                        }
                    `}
                    >
                    {cat}
                    </button>
                </Flammable>
              ))}
            </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
            
            {/* LEFT COLUMN: Sticky Image Preview */}
            <div className="hidden lg:block lg:col-span-5 relative">
                <div className="sticky top-0 h-screen flex items-center justify-center py-20">
                    
                    {/* Moving Wrapper for the "Live" alignment feel */}
                    <div 
                        className="w-full transition-transform duration-700 ease-out will-change-transform"
                        style={{ transform: `translateY(${verticalOffset}px)` }}
                    >
                        {/* Image Container with Fade Transition & 16:9 Aspect Ratio */}
                        <div className={`
                            relative w-full aspect-video overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 shadow-2xl
                            transition-all duration-500 ease-cubic
                            ${isImageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                        `}>
                        {displayProject && (
                            <Flammable forcedHover={isImageVisible} key={displayProject.id}>
                                <a href={`#/project/${displayProject.slug}`} className="block w-full h-full relative group cursor-none">
                                    <img 
                                        src={displayProject.heroImage} 
                                        alt={displayProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    
                                    {/* Overlay Text */}
                                    <div className="absolute bottom-8 left-8 z-10">
                                        <span className="bg-white/90 text-neutral-900 px-2 py-1 text-[9px] uppercase font-bold tracking-widest backdrop-blur-md mb-2 inline-block">
                                            {displayProject.client}
                                        </span>
                                        <h3 className="text-white text-2xl font-bold uppercase tracking-tighter">
                                            {displayProject.title}
                                        </h3>
                                    </div>
                                </a>
                            </Flammable>
                        )}
                        </div>
                    </div>

                </div>
            </div>

            {/* RIGHT COLUMN: Project List */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-center min-h-[50vh] lg:min-h-screen py-24">
                <div className="flex flex-col space-y-2">
                    {filteredProjects.map((project, index) => (
                        <a 
                            key={project.id}
                            href={`#/project/${project.slug}`}
                            className="group relative py-6 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 block"
                            onMouseEnter={() => {
                                setActiveProjectId(project.id);
                                setLastActiveProjectId(project.id);
                                setActiveIndex(index);
                            }}
                            onMouseLeave={() => setActiveProjectId(null)}
                        >
                            <div className="flex items-center gap-6 md:gap-10">
                                {/* Index */}
                                <span className="text-xl md:text-2xl font-bold font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-primary transition-colors">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                                
                                {/* Name */}
                                <h3 className={`
                                    text-3xl md:text-5xl font-black uppercase tracking-tight leading-none transition-all duration-300
                                    ${activeProjectId === project.id 
                                        ? 'text-neutral-900 dark:text-white translate-x-4' 
                                        : 'text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                                    }
                                `}>
                                    {project.title}
                                </h3>
                            </div>

                            {/* Mobile Only Preview */}
                            <div className="lg:hidden h-0 overflow-hidden group-hover:h-48 transition-all duration-500 ease-out mt-0 group-hover:mt-4 opacity-50 group-hover:opacity-100">
                                <img src={project.thumbnail} className="w-full h-full object-cover rounded-sm grayscale" alt="Preview"/>
                            </div>

                            {/* Aesthetic Underline */}
                            <div className={`
                                absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out
                                ${activeProjectId === project.id ? 'w-full opacity-100' : 'w-0 opacity-0'}
                            `}></div>
                        </a>
                    ))}
                </div>

                <div className="mt-24">
                    <Flammable>
                        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-1 hover:text-primary hover:border-primary transition-all">
                            All Projects Archive <ArrowRightIcon className="w-4 h-4" />
                        </a>
                    </Flammable>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectGallery;
