
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProjectGallery from '../components/ProjectGallery';
import About from '../components/About';
import Contact from '../components/Contact';
import Blog from '../components/Experience';
import MarqueeBreaker from '../components/MarqueeBreaker';
import { useLocation } from 'react-router';

const Home: React.FC = () => {
  const location = useLocation()
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

  useEffect(() => {
    const targetId = location.state?.targetId;
    if (!targetId) return;

    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: "smooth" });
  }, [])

  return (
    <main id='top'>
      <Hero />
      <About />
      <MarqueeBreaker />
      <ProjectGallery />
      <Blog />
      <Contact />
      <footer className="py-12 bg-neutral-950 text-neutral-500 border-t border-neutral-900 text-center text-sm font-medium">
        <div className="container mx-auto px-6">
          Made with ❤️ by Anupam
        </div>
      </footer>
    </main>
  );
};

export default Home;
