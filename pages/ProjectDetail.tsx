
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowRightIcon } from '../components/Icons';
import Flammable from '../components/Flammable';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const found = PROJECTS.find(p => p.slug === slug);
    if (found) {
      setProject(found);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <a href="#/" className="text-primary hover:underline">Return Home</a>
      </div>
    </div>
  );

  return (
    <main className="pt-24 relative">
       {/* Background for readability */}
       <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-3xl -z-10 pointer-events-none"></div>

      {/* Hero Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="mb-12">
          <Flammable>
            <a href="#/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-primary transition-colors mb-8">
                <span className="rotate-180 inline-block"><ArrowRightIcon /></span> Back to Projects
            </a>
          </Flammable>
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">{project.category}</span>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">
            {project.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-neutral-200 dark:border-neutral-800 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl px-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Client</span>
            <span className="font-bold">{project.client}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Role</span>
            <span className="font-bold">{project.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Year</span>
            <span className="font-bold">{project.year}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Tech Stack</span>
            <div className="flex flex-wrap gap-1">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-bold bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-24">
        <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl">
          <img 
            src={project.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 border-l-4 border-primary pl-4">The Challenge</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 border-l-4 border-primary pl-4">The Solution</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 border-l-4 border-primary pl-4">The Outcome</h3>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery/Additional Visuals */}
      <section className="py-24 bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={`https://picsum.photos/800/600?random=${project.id}1`} alt="Detail 1" className="rounded-2xl shadow-lg" />
          <img src={`https://picsum.photos/800/600?random=${project.id}2`} alt="Detail 2" className="rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Next Project</span>
          <Flammable>
            <a href="#/projects" className="inline-block text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none hover:text-outline hover:text-neutral-400 transition-all text-neutral-900 dark:text-white">
                Ready for <br /> More?
            </a>
          </Flammable>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
