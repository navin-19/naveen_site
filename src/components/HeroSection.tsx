import React from 'react';
import { motion } from 'framer-motion';
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
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { user } = portfolioData;

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
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 flex items-center justify-center overflow-hidden px-4 sm:px-8"
    >
      {/* Full-screen Home Page Atmospheric Background Profile Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-1/4 -right-1/4 w-[140%] h-[140%] opacity-[0.07] blur-3xl scale-125 pointer-events-none bg-cover bg-center filter saturate-200"
          style={{ backgroundImage: `url(${user.profileImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/70 via-[#0B0B0F]/90 to-[#0B0B0F]" />
      </div>

      {/* Ambient radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Side Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-xs sm:text-sm font-medium text-cyan-300 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
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
            className="text-lg sm:text-xl font-mono text-cyan-400 tracking-wider mb-2"
          >
            {user.greeting}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            <span className="text-gradient-cyan">{user.name}</span>
          </motion.h1>

          {/* Dynamic Professional Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-300 mb-6"
          >
            <Shield className="w-6 h-6 text-purple-400 hidden sm:inline-block" />
            <span className="text-gradient">{user.title}</span>
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
          >
            {user.shortBio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto"
          >
            <button
              onClick={handleDownloadResume}
              className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_45px_rgba(6,182,212,0.5)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </button>

            <a
              href="#projects"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl glass-panel border border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-cyan-500/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Social Icons with glowing hover animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">
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
                className={`p-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 transition-all duration-300 hover:scale-110 ${soc.color}`}
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
          className="lg:col-span-6 flex items-center justify-center relative mt-4 lg:mt-0"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-purple-500/25 blur-3xl pointer-events-none animate-pulse" />

          {/* 3D Developer Access ID Card */}
          <ProfileIdCard
            profileImage={user.profileImage}
            name={user.name}
            title={user.title}
            email={user.email}
            location={user.location}
            availability={user.availability}
          />
        </motion.div>
      </div>
    </section>
  );
};
