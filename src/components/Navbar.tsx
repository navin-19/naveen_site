import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
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

          {/* Quick Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl glass-panel p-6 border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.href.substring(1)
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
