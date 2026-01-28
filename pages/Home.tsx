
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProjectGallery from '../components/ProjectGallery';
import About from '../components/About';
import Contact from '../components/Contact';
import Blog from '../components/Blog';
import MarqueeBreaker from '../components/MarqueeBreaker';

const Home: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section, article, div.reveal-on-scroll');
    sections.forEach(section => {
      section.classList.add('reveal-on-scroll');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <MarqueeBreaker />
      <ProjectGallery />
      <Blog />
      <Contact />
      <footer className="py-12 bg-neutral-950 text-neutral-500 border-t border-neutral-900 text-center text-sm font-medium">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Anupam Kumar. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-8 opacity-60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
