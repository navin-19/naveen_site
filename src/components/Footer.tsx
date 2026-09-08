import React from 'react';
import { personalInfo } from '../data/personalInfo';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Terminal, Heart, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#07070A] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#0B0B0F] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-wider">
                  NAVEEN<span className="text-cyan-400">.DEV</span>
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  QA Automation & Full-Stack
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Results-oriented QA Automation Engineer and Python Developer specializing in Page Object Model frameworks, REST API testing, and scalable backend applications.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-cyan-300 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect Directly
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition-all hover:scale-110"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.email}
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-blue-400 hover:border-blue-500/40 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.phone}
                aria-label="Phone"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 flex items-center justify-center transition-all hover:scale-110"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-gray-500 font-mono">
              Available for full-time opportunities & projects.
            </p>
          </div>
        </div>

        {/* Bottom Bar with Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="flex items-center gap-1">
            Designed & Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for {personalInfo.displayName}
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-gray-500">
              © {new Date().getFullYear()} Naveen Kumar. All rights reserved.
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-all cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
