
import React from 'react';

import EXPERIENCE from '../db/experiences.json' with {type:'json'};

import { Exp } from '@/types';

const Experience: React.FC = () => {
  const experiences = EXPERIENCE as Exp[];
  if(experiences.length ===0) return ;
  return (
    <section id="blog" className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[8vw] font-black sculptural-text editorial-justify edge-to-edge border-b border-neutral-100 dark:border-neutral-900 pb-8">
              Experience
            </h2>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
            {experiences.map((post) => (
             
                  <article className="group py-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-start cursor-pointer hover:opacity-70 transition-opacity">
                    <div className="md:col-span-3  flex items-center gap-6" >
                    <span className="text-xl font-black uppercase tracking-widest ">{post.company}</span>
                    </div>
                    <div className="md:col-span-6">
                    <h3 className="text-3xl font-bold tracking-tighter mb-4">{post.role}</h3>
                    <p className="text-sm font-medium leading-relaxed editorial-justify opacity-60">
                        {post.description}
                    </p>
                    </div>
                    
                    <div className="md:col-span-3 flex items-center gap-2 font-semibold">
                    <span className="text-[12px] w-fit ">{post.startDate}</span> <span>&mdash;</span>
                    <span className="text-[12px] w-fit">{post.endDate}</span>
                    </div>
                </article>
             
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
