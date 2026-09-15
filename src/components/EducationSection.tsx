import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { educationData, certificationsData } from '../data/education';
import { useIsMobile } from '../hooks/useMediaQuery';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Trophy,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const edu = educationData[0];
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const freezeOrbs = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    freezeOrbs ? ['0%', '0%'] : ['8%', '-15%']
  );
  const orbY2 = useTransform(
    scrollYProgress,
    [0, 1],
    freezeOrbs ? ['0%', '0%'] : ['-8%', '15%']
  );

  return (
    <section
      id="education"
      className="py-24 relative px-4 sm:px-8 z-10 bg-gradient-to-b from-transparent via-blue-500/[0.015] to-transparent border-t border-white/[0.04]"
      ref={sectionRef}
    >
      {/* Decorative Soft Glowing Background Spotlights in Corners */}
      <motion.div
        className="hidden md:block absolute top-10 left-10 w-[420px] h-[420px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none"
        style={{ y: orbY }}
      />
      <motion.div
        className="hidden md:block absolute bottom-10 right-10 w-[420px] h-[420px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none"
        style={{ y: orbY2 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Decorative flourishes (visible on desktop) */}
        <div className="hidden lg:flex justify-between items-center text-[11px] font-mono text-cyan-400/40 select-none -mb-6 px-4">
          <span className="tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400/40" />
            Learning // Never Stops
          </span>
          <span className="tracking-widest uppercase flex items-center gap-1.5">
            Learn // Build // Grow
            <Sparkles className="w-3 h-3 text-purple-400/40" />
          </span>
        </div>

        {/* Hero Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/15 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-dirtyline tracking-wider">MY LEARNING JOURNEY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Education & Certifications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base mt-3 font-normal font-body"
          >
            Building skills for a better tomorrow
          </motion.p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ---------------------------------------------------- */}
          {/* LEFT COLUMN: Large Formal Education Card (5 cols)     */}
          {/* ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? -12 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-[#0F111A]/85 backdrop-blur-xl border border-blue-500/30 p-7 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-blue-400/60 transition-all duration-400">
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute -top-24 -right-24 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors" />

              {/* Top Row: Graduation Cap Icon Badge & Eyebrow */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#0B0D17] rounded-[15px] flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-blue-400" />
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  FORMAL EDUCATION
                </span>
              </div>

              {/* Degree Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-blue-300 transition-colors">
                {edu.degree}
              </h3>

              {/* Institution with accent link style & sub-line */}
              <div className="mb-4">
                <span className="text-base font-bold text-cyan-400 hover:text-cyan-300 transition-colors block">
                  {edu.institution}
                </span>
                <span className="text-xs text-gray-400 font-medium block mt-0.5">
                  {edu.subInstitution}
                </span>
              </div>

              {/* CGPA Pill Badge in Teal/Green */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs sm:text-sm font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {edu.score}
                </span>
              </div>

              {/* Meta Row: Calendar + Location */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mb-6 pb-6 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {edu.period}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  {edu.location}
                </span>
              </div>

              {/* Core Coursework Sub-Card */}
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Core Coursework</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  {edu.coursework}
                </p>
              </div>

              {/* Folded Achievement Line with Trophy Icon in Green */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-emerald-400">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <span>{edu.achievementBadge}</span>
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------- */}
          {/* RIGHT COLUMN: Stacked Industry Certifications (7 cols)*/}
          {/* ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 12 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                <Award className="w-5 h-5 text-purple-400" />
                <span>INDUSTRY CERTIFICATIONS</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25">
                Verified skills. Real-world ready.
              </span>
            </div>

            {/* Certification Cards */}
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl bg-[#0F111A]/85 backdrop-blur-xl border p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  borderColor: `${cert.borderColor}40`,
                }}
              >
                {/* Header: Logo Badge, Title, Year Pill */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-md group-hover:scale-105 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${cert.borderColor}30 0%, rgba(15,17,26,0.9) 100%)`,
                        borderColor: `${cert.borderColor}60`,
                        boxShadow: `0 0 15px ${cert.borderColor}30`,
                      }}
                    >
                      <Award className="w-5 h-5" style={{ color: cert.borderColor }} />
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="font-semibold text-gray-200">{cert.issuer}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {cert.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Year Pill */}
                  <span
                    className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${cert.borderColor}15`,
                      borderColor: `${cert.borderColor}40`,
                      color: cert.borderColor,
                    }}
                  >
                    {cert.year}
                  </span>
                </div>

                {/* 2-Column Skills Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-5 pt-3 border-t border-white/5">
                  {cert.skillsLearned.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${cert.borderColor}20`,
                          color: cert.borderColor,
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Row: Verified Certificate & Issuing Org */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {cert.credentialStatus}
                  </span>

                  <div className="flex items-center gap-1 text-gray-400 hover:text-cyan-300 transition-colors">
                    <span>{cert.issuer}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Centered Tagline with Flanking Divider Lines */}
        <div className="mt-16 pt-8 flex items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase text-gray-400">
          <div className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] bg-gradient-to-r from-transparent via-cyan-500/30 to-purple-500/30" />
          <span className="text-cyan-300 font-bold drop-shadow">
            SKILLS TODAY • BETTER TOMORROW
          </span>
          <div className="h-[1px] flex-1 max-w-[120px] sm:max-w-[200px] bg-gradient-to-l from-transparent via-cyan-500/30 to-purple-500/30" />
        </div>
      </div>
    </section>
  );
};
