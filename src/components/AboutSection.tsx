import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import {
  UserCheck,
  ShieldCheck,
  Zap,
  CheckCircle,
  Layers,
  Award,
  TrendingUp,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { user, stats } = portfolioData;
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
    { label: 'Years Experience', value: stats.yearsExp, icon: <Award className="w-6 h-6 text-cyan-400" /> },
    { label: 'Projects Completed', value: stats.projectsCompleted, icon: <TrendingUp className="w-6 h-6 text-blue-400" /> },
    { label: 'Automation Reliability', value: stats.automationRate, icon: <ShieldCheck className="w-6 h-6 text-emerald-400" /> },
    { label: 'Tech Stack Count', value: stats.techStackCount, icon: <Layers className="w-6 h-6 text-purple-400" /> },
  ];

  const highlights = [
    'Architecting high-availability web applications with modern React & TypeScript',
    'Building enterprise self-healing E2E test suites using Playwright & Selenium',
    'Optimizing web performance, LCP Core Web Vitals, and responsive UI accessibility',
    'Containerizing microservices and crafting CI/CD matrix build pipelines',
  ];

  return (
    <section id="about" className="py-24 relative px-4 sm:px-8 z-10" ref={sectionRef}>
      {/* Parallax background glow orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none"
        style={{ y: orbY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none"
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
            Driven by <span className="text-gradient-cyan">Precision & Innovation</span>
          </motion.h2>
        </div>

        {/* Story Card & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Story Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Professional Background
            </h3>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {user.longBio}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              I specialize in designing resilient web applications and robust test automation architectures that eliminate human error, accelerate deployment velocity, and captivate users with pixel-perfect visual aesthetics.
            </p>

            {/* Bullet points */}
            <div className="space-y-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Counter Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {statCards.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40"
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {stat.value}
                  </span>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
