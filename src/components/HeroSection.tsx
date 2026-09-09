import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/personalInfo';
import { ProfileIdCard } from './ProfileIdCard';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import {
  Download,
  FolderKanban,
  Mail,
  Sparkles,
  ArrowRight,
  Phone,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface HeroSectionProps {
  activeSection?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ activeSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bgParallaxEnd = prefersReducedMotion ? '0%' : isMobile ? '15%' : '40%';
  const glowParallaxEnd = prefersReducedMotion ? '0%' : isMobile ? '10%' : '25%';

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', bgParallaxEnd]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', glowParallaxEnd]);

  // Confetti burst on "Download Resume" action
  const handleDownloadResume = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#3B82F6', '#8B5CF6', '#10B981'],
    });

    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Naveenkumar_Boominathan_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 flex items-center justify-center overflow-hidden px-4 sm:px-8"
    >
      {/* Soft Ambient Hero Glow Layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <div
          className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] opacity-[0.04] blur-3xl scale-125 pointer-events-none bg-cover bg-center filter saturate-200"
          style={{ backgroundImage: `url(${personalInfo.profileImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/30 to-[#0B0B0F]/80 pointer-events-none" />
      </motion.div>

      {/* Hero Ambient Radial Spotlights */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ y: glowY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ y: glowY, willChange: 'transform' }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center justify-items-center z-10">
        {/* Left Column: Heading, Titles & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left w-full"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-white/15 text-xs sm:text-sm font-medium text-gray-200 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:scale-105 transition-transform cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="font-dirtyline tracking-wider">{personalInfo.availability}</span>
          </motion.div>

          {/* Subtitle / Intro */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-base sm:text-lg font-mono text-gray-400 tracking-wider mb-2 font-medium"
          >
            Hello, I'm
          </motion.span>

          {/* Animated Name */}
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-[1.05]"
          >
            {personalInfo.displayName}
          </motion.h1>

          {/* Dual Title Badges: Full-Stack & Test Automation */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-sm sm:text-base font-medium mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-gray-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Test Automation Architect
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-panel border border-white/10 text-gray-200">
              <Code2 className="w-4 h-4 text-purple-400" />
              Senior Full-Stack Developer
            </span>
          </motion.div>

          {/* Short Bio Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal font-body"
          >
            {personalInfo.shortBio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto"
          >
            {/* View Projects CTA */}
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <FolderKanban className="w-5 h-5 text-black" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Download Resume with Confetti */}
            <button
              onClick={handleDownloadResume}
              className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Download className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </button>

            {/* Contact Me CTA */}
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full glass-panel border border-white/10 text-gray-300 font-semibold text-sm hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-gray-300" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Social Links & Quick Connect */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mr-1">
              Connect:
            </span>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.phone}
              aria-label="Phone"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/15 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Developer Access ID Card */}
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
            profileImage={personalInfo.profileImage}
            name={personalInfo.displayName}
            title={personalInfo.displayTitles[0] + " & " + personalInfo.displayTitles[1]}
            email={personalInfo.email}
            location={personalInfo.location}
            availability={personalInfo.availability}
            activeSection={activeSection}
          />
        </motion.div>
      </div>
    </section>
  );
};
