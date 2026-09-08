import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionLabel = activeSection
    ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1)
    : 'Home';

  return (
    <>
      {/* DESKTOP STICKY NAVBAR */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? 'glass-nav backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                : 'bg-black/30 backdrop-blur-md border border-white/5'
            }`}
          >
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#0B0B0F] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  NAVEEN<span className="text-cyan-400">.DEV</span>
                </span>
                <span className="text-[10px] font-mono text-gray-400 -mt-1">
                  QA & Full-Stack
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 rounded-full"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? 'text-cyan-300 font-semibold relative z-10'
                          : 'text-gray-400 hover:text-white relative z-10 transition-colors'
                      }
                    >
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Desktop Action CTA */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE / TABLET DYNAMIC ISLAND NAVBAR */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="lg:hidden fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {!mobileMenuOpen ? (
            <motion.div
              layout
              key="island-collapsed"
              onClick={() => setMobileMenuOpen(true)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              className={`bg-black/90 backdrop-blur-xl text-white rounded-full border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex items-center justify-between cursor-pointer select-none transition-all duration-300 ${
                scrolled
                  ? 'w-[160px] h-8 px-3 text-xs'
                  : 'w-[250px] h-10 px-4 text-xs'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold tracking-wider text-white font-mono text-xs">
                  {scrolled ? sectionLabel : 'NAVEEN.DEV'}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-cyan-300 font-mono">
                <span>MENU</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="island-expanded"
              initial={{ scale: 0.85, opacity: 0, borderRadius: '24px' }}
              animate={{ scale: 1, opacity: 1, borderRadius: '28px' }}
              exit={{ scale: 0.85, opacity: 0, borderRadius: '24px' }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              className="w-[92vw] max-w-sm rounded-[28px] p-4 bg-black/95 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_25px_60px_rgba(0,0,0,1)] flex flex-col gap-3 text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="font-bold text-xs tracking-wider text-white font-mono">
                    <span className="text-cyan-400">NAVIGATION</span> • {sectionLabel}
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-2 gap-2 py-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all border ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Action Button */}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
