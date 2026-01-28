
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './Icons';
import Flammable from './Flammable';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'About', href: '#about', external: false },
    { name: 'Projects', href: '#projects', external: false },
    { name: 'Contact', href: '#contact', external: false },
    { name: 'Resume', href: PERSONAL_INFO.resume, external: true },
  ];

  return (
    <>
      {/* 1. TOP LEFT: Desktop Links & Mobile Menu Toggle */}
      <nav className="fixed top-8 left-6 md:top-10 md:left-10 z-[60] flex flex-col items-start gap-2">
        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex flex-col gap-2">
          {navLinks.map((link) => (
            <Flammable key={link.name}>
              <a 
                href={link.href} 
                className="block py-2 pr-4"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-white drop-shadow-md">
                  {link.name}
                </span>
              </a>
            </Flammable>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <Flammable>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex flex-col gap-1.5 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-neutral-200/20 dark:border-neutral-800/20"
              aria-label="Toggle Menu"
            >
              <div className={`h-0.5 w-6 bg-neutral-900 dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`h-0.5 w-6 bg-neutral-900 dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45' : ''}`} />
            </button>
          </Flammable>
        </div>
      </nav>

      {/* 2. TOP CENTER: Logo Capsule - Mapped to TOP */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60]">
         <Flammable>
            <div className="glass-nav px-6 md:px-8 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300">
                <a href="#/" className="text-xs md:text-sm font-black tracking-widest uppercase text-neutral-900 dark:text-white">
                    Anupam.
                </a>
            </div>
        </Flammable>
      </div>

      {/* 3. TOP RIGHT: Theme Toggle */}
      <div className="fixed top-8 right-6 md:right-8 z-[60]">
        <Flammable>
            <button 
                onClick={toggleTheme}
                className="p-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-neutral-200/20 dark:border-neutral-800/20 rounded-full hover:scale-110 transition-transform shadow-lg text-neutral-900 dark:text-white"
                aria-label="Toggle Theme"
            >
                {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
        </Flammable>
      </div>

      {/* 4. FULLSCREEN MOBILE MENU */}
      <div className={`fixed inset-0 z-50 bg-neutral-50 dark:bg-neutral-950 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="h-full w-full flex flex-col justify-center items-center p-10">
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link, idx) => (
              <Flammable key={link.name} forcedHover={isMenuOpen}>
                <a 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`group relative overflow-hidden transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white block group-hover:italic transition-all">
                    {link.name}
                  </span>
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-300" />
                </a>
              </Flammable>
            ))}
          </div>

          {/* Social Links in Menu Bottom */}
          <div className={`mt-24 flex gap-8 transition-all duration-700 delay-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">GitHub</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href={PERSONAL_INFO.resume} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Resume</a>
          </div>
        </div>

        {/* Decorative Graphic in Menu */}
        <div className="absolute bottom-10 right-10 pointer-events-none opacity-5 dark:opacity-10">
          <span className="text-[20vw] font-black uppercase leading-none">ANUPAM.</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
