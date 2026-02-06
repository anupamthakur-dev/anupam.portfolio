import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import PROJECTS from "../db/projects.json" with { type: "json" };

import { ArrowInBoxIcon, ArrowRightIcon, GithubIcon } from "../components/Icons";
import Flammable from "../components/Flammable";
import type { Project, Projects } from "@/types";
import { nextProject } from "@/utils/nextProject";
import NotFound from "@/components/NotFound";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const projects = PROJECTS as Projects;

  useEffect(() => {
    const found = projects.find((p) => p.slug === slug);
    if (found) {
      setProject(found);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!project) return <NotFound/>
    

  return (
    <main className="pt-24 relative">
      {/* Background for readability */}
      <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-3xl -z-10 pointer-events-none"></div>

      {/* Hero Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="mb-12">
          <Flammable>
            <a
              href="#/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-primary transition-colors mb-8"
            >
              <span className="rotate-180 inline-block">
                <ArrowRightIcon />
              </span>{" "}
              Back to Home
            </a>
          </Flammable>
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">
            {project.title}
          </h1>
        </div>

        <div className="w-full py-2 flex items-center justify-end gap-4 ">
          {project.live_url && (
            <Flammable>
              <a
                href={project.live_url}
                target="_blank"
                className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-900 text-primary py-2 px-4 rounded-lg shadow-lg"
              >
                <ArrowInBoxIcon/> <span>Live</span>
              </a>
            </Flammable>
          )}
          {
            project.source_code_url && <Flammable>
            <a
              href={project.source_code_url}
              target="_blank"
              className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-900 text-primary py-2 px-4 rounded-lg shadow-lg"
            >
              <GithubIcon className="w-5 h-5" /> <span>Source code</span>
            </a>
          </Flammable>
          }
          
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-neutral-200 dark:border-neutral-800 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl px-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
              Client
            </span>
            <span className="font-bold">{project.client}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
              Role
            </span>
            <span className="font-bold">{project.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
              Year
            </span>
            <span className="font-bold">
              {project.date_started} - {project.date_completed}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-bold bg-white/50 dark:bg-black/50 px-2 py-0.5 rounded uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-24">
        <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl">
          <img
            src={project.hero_image_link}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 mb-24"> 
         <p>{project.short_description}</p>
         <p>{project.description}</p>
      </section>
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight border-l-4 border-primary pl-4">
              The Challenge
            </h3>
          </div>
          <div className= " mb-8 md:col-span-2 ">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight border-l-4 border-primary pl-4">
              The Solution
            </h3>
          </div>
          <div className=" mb-8 md:col-span-2">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-black uppercase tracking-tight border-l-4 border-primary pl-4">
              The Outcome
            </h3>
          </div>
          <div className="mb-8  md:col-span-2">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery/Additional Visuals */}
      {project.gallery_links && project.gallery_links.length > 0 && (
        <section className="py-24 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery_links.map((link) => (
              <img
                key={link}
                src={link}
                alt="Detail 1"
                className="rounded-2xl shadow-lg"
              />
            ))}
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
            Next Project
          </span>

          <NavLink
            to={nextProject(projects,slug)}
            className="inline-block text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none hover:text-outline hover:text-neutral-400 transition-all text-neutral-900 dark:text-white"
          >
            Ready for <br /> More?
          </NavLink>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
