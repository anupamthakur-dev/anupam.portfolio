
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRightIcon } from './Icons';
import Flammable from './Flammable';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[8vw] font-black sculptural-text editorial-justify edge-to-edge border-b border-neutral-100 dark:border-neutral-900 pb-8">
              Journal Archive
            </h2>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
            {BLOG_POSTS.map((post) => (
              <Flammable key={post.id}>
                  <article className="group py-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-start cursor-pointer hover:opacity-70 transition-opacity">
                    <div className="md:col-span-3">
                    <span className="text-[10px] font-mono opacity-40">{post.date}</span>
                    </div>
                    <div className="md:col-span-6">
                    <h3 className="text-3xl font-bold tracking-tighter mb-4">{post.title}</h3>
                    <p className="text-sm font-medium leading-relaxed editorial-justify opacity-60">
                        {post.excerpt}
                    </p>
                    </div>
                    <div className="md:col-span-3 md:text-right flex items-center md:justify-end gap-6">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{post.category}</span>
                    <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-full group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-all">
                        <ArrowRightIcon className="w-4 h-4" />
                    </div>
                    </div>
                </article>
              </Flammable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
