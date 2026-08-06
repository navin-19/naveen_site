import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { ArrowUp, Terminal, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { user } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0B0B0F]/90 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-[#0B0B0F] rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-wider">
              NAVEEN<span className="text-cyan-400">.DEV</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">
            Designed with Apple-inspired glossy glassmorphism, dark charcoal theme, and interactive micro-animations.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-medium">
          <a href="#home" className="hover:text-cyan-400 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons & Back To Top Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={user.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={user.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={user.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={user.socials.email}
              aria-label="Email"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 text-center text-xs text-gray-500 font-mono">
        © {new Date().getFullYear()} Naveen Kumar. All rights reserved. Powered by React, Vite, Framer Motion & Tailwind CSS.
      </div>
    </footer>
  );
};
