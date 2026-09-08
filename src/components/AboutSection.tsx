import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import {
  UserCheck,
  ShieldCheck,
  Zap,
  CheckCircle,
  Layers,
  Award,
  TrendingUp,
  Workflow,
  Sparkles,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['10%', '-15%']
  );
  const orbY2 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-10%', '15%']
  );

  const statCards = [
    {
      label: 'Years Experience',
      value: personalInfo.stats.yearsExp,
      subtitle: 'Automation & Dev',
      icon: <Award className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/30 group-hover:border-cyan-400/60',
    },
    {
      label: 'Projects Delivered',
      value: personalInfo.stats.projectsCount,
      subtitle: 'Web Apps & Frameworks',
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      color: 'border-blue-500/30 group-hover:border-blue-400/60',
    },
    {
      label: 'Automation Reliability',
      value: personalInfo.stats.testAutomationPassRate,
      subtitle: 'CI/CD Pass Rate',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/30 group-hover:border-emerald-400/60',
    },
    {
      label: 'Tech Stack & Tools',
      value: personalInfo.stats.techStackCount,
      subtitle: 'Frameworks & Languages',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/30 group-hover:border-purple-400/60',
    },
  ];

  const corePillars = [
    {
      title: 'UI Test Automation',
      desc: 'Scalable POM, DDT, and Hybrid frameworks with Selenium and Pytest.',
      icon: <Workflow className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'REST API Testing',
      desc: 'Postman testing with JSON schema validations and CI execution.',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'CI/CD Pipelines',
      desc: 'Automated regression suites integrated into GitHub Actions and Jenkins.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Python Development',
      desc: 'Backend web apps with Python, Django, Flask, and MySQL.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 relative px-4 sm:px-8 z-10 bg-gradient-to-b from-transparent via-cyan-500/[0.018] to-transparent border-t border-white/[0.04]"
      ref={sectionRef}
    >
      {/* Soft Ambient Section Glow */}
      <motion.div
        className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-cyan-500/8 rounded-full blur-[130px] pointer-events-none"
        style={{ y: orbY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-[380px] h-[380px] bg-purple-500/8 rounded-full blur-[130px] pointer-events-none"
        style={{ y: orbY2, willChange: 'transform' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>About Me</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Engineering Quality Through <span className="text-gradient-cyan">Code & Precision</span>
          </motion.h2>
        </div>

        {/* Story Card & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Summary Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Professional Summary
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  SDET & Python Dev
                </span>
              </div>

              <p className="text-gray-300 text-base leading-relaxed mb-6 font-normal">
                {personalInfo.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Available for Hire</span>
                </div>
              </div>
            </div>

            {/* Core Competencies Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {['Selenium', 'Pytest', 'POM', 'Postman API', 'GitHub Actions', 'Python/Django', 'MySQL'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:border-cyan-500/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Counter Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {statCards.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card p-6 rounded-3xl border ${stat.color} flex flex-col justify-between group transition-all duration-300`}
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {stat.value}
                  </span>
                  <p className="text-xs text-white font-semibold mt-1">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Core Architectural Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {corePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit mb-3 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
