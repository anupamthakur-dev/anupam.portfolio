
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { GithubIcon, LinkedinIcon, ArrowRightIcon } from './Icons';
import Flammable from './Flammable';

const Contact: React.FC = () => {
  return (
    // Changed bg-neutral-950 to transparent/glass style
    <section id="contact" className="py-24 text-neutral-900 dark:text-white overflow-hidden relative">
      
      {/* Glass overlay for the section to ensure text readability over flame */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/40 backdrop-blur-xl -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none mb-10">
              Let's build <br /> <span className="text-outline text-neutral-600 dark:text-neutral-400">Something New.</span>
            </h2>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-md">
              Whether you have a project in mind or just want to say hi, feel free to reach out. I'm always open to new opportunities.
            </p>

            <div className="space-y-8">
              <Flammable>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="block group">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Email</span>
                    <span className="text-2xl md:text-3xl font-display font-bold hover:text-primary transition-colors border-b-2 border-neutral-300 dark:border-neutral-800 pb-2 group-hover:border-primary">
                    {PERSONAL_INFO.email}
                    </span>
                </a>
              </Flammable>

              <div className="flex space-x-6">
                <Flammable>
                    <a href={PERSONAL_INFO.github} className="p-4 rounded-full border border-neutral-300 dark:border-neutral-800 hover:border-primary hover:text-primary transition-all bg-white/20 dark:bg-black/20">
                    <GithubIcon className="w-6 h-6" />
                    </a>
                </Flammable>
                <Flammable>
                    <a href={PERSONAL_INFO.linkedin} className="p-4 rounded-full border border-neutral-300 dark:border-neutral-800 hover:border-primary hover:text-primary transition-all bg-white/20 dark:bg-black/20">
                    <LinkedinIcon className="w-6 h-6" />
                    </a>
                </Flammable>
              </div>
            </div>
          </div>

          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 focus:border-primary focus:outline-none transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 focus:border-primary focus:outline-none transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Subject</label>
                <select className="w-full bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 focus:border-primary focus:outline-none transition-colors appearance-none text-neutral-900 dark:text-white">
                  <option>New Project</option>
                  <option>Collaboration</option>
                  <option>Job Opportunity</option>
                  <option>Just Saying Hi</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Message</label>
                <textarea 
                  rows={5} 
                  placeholder="Tell me about your vision..." 
                  className="w-full bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-4 focus:border-primary focus:outline-none transition-colors resize-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                ></textarea>
              </div>

              <Flammable>
                <button className="w-full py-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg">
                    Send Message <ArrowRightIcon />
                </button>
              </Flammable>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
