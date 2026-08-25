import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { SkillItem } from '../data/portfolioData';
import { ProfileIdCard } from './ProfileIdCard';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import {
  Download,
  FolderKanban,
  Mail,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface HeroSectionProps {
  onSelectSkill: (skill: SkillItem) => void;
  activeSection?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ activeSection }) => {
  const { user } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: background moves at ~50% rate of scroll (0 → 50% down)
  // Mobile gets a smaller range (0 → 20%) to prevent layout jank
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bgParallaxEnd = prefersReducedMotion ? '0%' : isMobile ? '20%' : '50%';
  const glowParallaxEnd = prefersReducedMotion ? '0%' : isMobile ? '10%' : '25%';

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', bgParallaxEnd]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', glowParallaxEnd]);

  const handleDownloadResume = () => {
    const blob = new Blob([
      `NAVEEN KUMAR - RESUME\n\nTitle: ${user.title}\nEmail: ${user.email}\nLocation: ${user.location}\n\nSummary:\n${user.longBio}\n\nKey Skills:\nReact, Python, Playwright, Selenium, TypeScript, FastAPI, Docker, AWS, GitHub Actions.`,
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Naveen_Kumar_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 flex items-center justify-center overflow-hidden px-4 sm:px-8"
    >
      {/* Full-screen Home Page Atmospheric Background Profile Overlay — parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <div
          className="absolute -top-1/4 -right-1/4 w-[140%] h-[140%] opacity-[0.08] blur-3xl scale-125 pointer-events-none bg-cover bg-center filter saturate-200"
          style={{ backgroundImage: `url(${user.profileImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/70 via-[#0B0B0F]/90 to-[#0B0B0F]" />
        
        {/* Subtle Cyber Grid Lines Effect */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </motion.div>

      {/* Ambient radial glow spots — subtle parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ y: glowY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ y: glowY, willChange: 'transform' }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center justify-items-center z-10">
        {/* Left Side Column - Centered on Mobile/Tablet */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left w-full"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/40 text-xs sm:text-sm font-medium text-cyan-300 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:scale-105 transition-transform cursor-default"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{user.availability}</span>
          </motion.div>

          {/* Greeting & Dynamic Name */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl font-mono text-cyan-400 tracking-wider mb-2 font-semibold"
          >
            {user.greeting}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-lg"
          >
            <span className="text-gradient-cyan bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {user.name}
            </span>
          </motion.h1>

          {/* Dynamic Professional Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold text-gray-300 mb-6"
          >
            <Shield className="w-6 h-6 text-purple-400 hidden sm:inline-block" />
            <span className="text-gradient bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-300 bg-clip-text text-transparent">
              {user.title}
            </span>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal"
          >
            {user.shortBio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={handleDownloadResume}
              className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-[1.04] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Button Shimmer Light */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </button>

            <a
              href="#projects"
              className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl glass-panel border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:scale-[1.04] transition-all duration-300 cursor-pointer"
            >
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Social Icons with glowing hover animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mr-1">
              Connect:
            </span>
            {[
              { icon: <GithubIcon className="w-5 h-5" />, href: user.socials.github, label: 'GitHub', color: 'hover:text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' },
              { icon: <LinkedinIcon className="w-5 h-5" />, href: user.socials.linkedin, label: 'LinkedIn', color: 'hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' },
              { icon: <InstagramIcon className="w-5 h-5" />, href: user.socials.instagram, label: 'Instagram', color: 'hover:text-purple-400 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]' },
              { icon: <Mail className="w-5 h-5" />, href: user.socials.email, label: 'Email', color: 'hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]' },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                aria-label={soc.label}
                className={`w-11 h-11 rounded-full bg-white/[0.05] border border-white/15 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 ${soc.color}`}
              >
                {soc.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side Column - Developer 3D ID Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0 w-full"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-3xl pointer-events-none animate-pulse" />

          {/* 3D Developer Access ID Card */}
          <ProfileIdCard
            profileImage={user.profileImage}
            name={user.name}
            title={user.title}
            email={user.email}
            location={user.location}
            availability={user.availability}
            activeSection={activeSection}
          />
        </motion.div>
      </div>
    </section>
  );
};
