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
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [islandOpen, setIslandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setScrolled(currentY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeSection = activeSection === 'home' || scrollY < 200;
  const isShrunk = scrollY > 40;

  return (
    <>
      {/* DESKTOP STICKY NAVBAR (Hidden on mobile) */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? 'glass-nav backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-black/20 backdrop-blur-md border border-white/5'
            }`}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-home-bounce'))}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#0B0B0F] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  NAVEEN<span className="text-cyan-400">.DEV</span>
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
                    onClick={() => {
                      if (item.href === '#home') {
                        window.dispatchEvent(new CustomEvent('trigger-home-bounce'));
                      }
                    }}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]"
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

            {/* Desktop Action Button */}
            <div className="flex items-center">
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Talk</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE BLACK iPHONE DYNAMIC ISLAND NAVBAR (Visible ONLY on Home Page section) */}
      <AnimatePresence>
        {isHomeSection && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="md:hidden fixed top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          >
            {!islandOpen ? (
              /* COLLAPSED iPHONE DYNAMIC ISLAND PILL (Shrinks smoothly on scroll up/down) */
              <motion.div
                layout
                key="island-collapsed"
                onClick={() => setIslandOpen(true)}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className={`bg-black text-white rounded-full border border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.95)] flex items-center justify-between cursor-pointer select-none transition-all duration-300 ${
                  isShrunk
                    ? 'w-[140px] h-7 px-2.5 text-[10px]'
                    : 'w-[230px] sm:w-[250px] h-9 px-3.5 text-xs'
                }`}
              >
                {/* Left Brand Logo / Icon */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <span className="font-bold tracking-wider text-white font-mono">
                    {isShrunk ? 'NK.DEV' : 'NAVEEN.DEV'}
                  </span>
                </div>

                {/* iPhone Camera Sensor Pill */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#0B0D14] border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {!isShrunk && <span className="w-1 h-1 rounded-full bg-cyan-400" />}
                </div>

                {/* Touch Chevron Trigger */}
                {!isShrunk && (
                  <div className="flex items-center gap-0.5 text-[10px] text-cyan-300 font-mono">
                    <span>NAV</span>
                    <ChevronDown className="w-3 h-3 text-cyan-400" />
                  </div>
                )}
              </motion.div>
            ) : (
              /* EXPANDED BLACK iPHONE DYNAMIC ISLAND POPUP WIDGET */
              <motion.div
                key="island-expanded"
                initial={{ scale: 0.85, opacity: 0, borderRadius: '24px' }}
                animate={{ scale: 1, opacity: 1, borderRadius: '28px' }}
                exit={{ scale: 0.85, opacity: 0, borderRadius: '24px' }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className="w-[92vw] max-w-xs rounded-[28px] p-4 bg-black border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,1)] flex flex-col gap-3 text-white"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <span className="font-bold text-xs tracking-wider text-white font-mono">
                      DYNAMIC <span className="text-cyan-400">ISLAND</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setIslandOpen(false)}
                    className="p-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links Grid */}
                <div className="grid grid-cols-2 gap-2 py-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setIslandOpen(false);
                          if (item.href === '#home') {
                            window.dispatchEvent(new CustomEvent('trigger-home-bounce'));
                          }
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all border ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                            : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border-slate-800'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>

                {/* Action CTA Button */}
                <a
                  href="#contact"
                  onClick={() => setIslandOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Let's Talk</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

