
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './Icons';
import Flammable from './Flammable';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* 
        NAVBAR LAYOUT
        1. Top Left: Stacked Links (High Contrast, No Line)
        2. Top Center: Logo (Capsule, Glassmorphism)
        3. Top Right: Theme Toggle
      */}

      {/* 1. TOP LEFT: Navigation Links */}
      <nav className="fixed top-10 left-10 z-50 flex flex-col items-start gap-2">
        {navLinks.map((link) => (
          <Flammable key={link.name}>
            <a 
              href={link.href}
              className="block py-2 pr-4"
            >
              {/* High Contrast Text */}
              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-white drop-shadow-md">
                {link.name}
              </span>
            </a>
          </Flammable>
        ))}
      </nav>

      {/* 2. TOP CENTER: Logo in Glass Capsule */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
         <Flammable>
            <div className="glass-nav px-8 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300">
                <a href="#top" className="text-sm font-black tracking-widest uppercase text-neutral-900 dark:text-white">
                    Anupam.
                </a>
            </div>
        </Flammable>
      </div>

      {/* 3. TOP RIGHT: Theme Toggle */}
      <div className="fixed top-8 right-8 z-50">
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
    </>
  );
};

export default Navbar;
