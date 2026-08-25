import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { SkillItem } from '../data/portfolioData';
import {
  Code2,
  Terminal,
  Bot,
  Cpu,
  FileCode,
  ShieldCheck,
  Zap,
  Container,
  GitBranch,
  Cloud,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

interface SkillsSectionProps {
  onSelectSkill: (skill: SkillItem) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
  Terminal: <Terminal className="w-6 h-6 text-blue-400" />,
  Bot: <Bot className="w-6 h-6 text-emerald-400" />,
  Cpu: <Cpu className="w-6 h-6 text-orange-400" />,
  FileCode: <FileCode className="w-6 h-6 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-500" />,
  Zap: <Zap className="w-6 h-6 text-teal-400" />,
  Container: <Container className="w-6 h-6 text-sky-400" />,
  GitBranch: <GitBranch className="w-6 h-6 text-purple-400" />,
  Cloud: <Cloud className="w-6 h-6 text-yellow-400" />,
};

const categories = ['All', 'Frontend', 'Backend', 'Automation', 'DevOps & Cloud'];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['5%', '-20%']
  );
  const orbY2 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-5%', '20%']
  );

  const filteredSkills =
    selectedCategory === 'All'
      ? portfolioData.skills
      : portfolioData.skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative px-4 sm:px-8 z-10" ref={sectionRef}>
      {/* Parallax background glow orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[150px] pointer-events-none"
        style={{ y: orbY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[150px] pointer-events-none"
        style={{ y: orbY2, willChange: 'transform' }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Tech Stack & <span className="text-gradient-purple">Expertise</span>
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Click any skill card to explore detailed experience, project applications, and metrics.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-mono mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 scale-105'
                  : 'glass-pill text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectSkill(skill)}
              className="glass-card p-6 rounded-3xl border border-white/10 relative group cursor-pointer hover:border-cyan-500/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 group-hover:scale-110 transition-transform"
                  style={{ borderColor: skill.borderColor + '40' }}
                >
                  {iconMap[skill.icon] || <Sparkles className="w-6 h-6 text-cyan-400" />}
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {skill.yearsOfExp}+ Yrs Exp
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-gray-400 mb-4">{skill.category}</p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
                  <span>Proficiency</span>
                  <span className="font-mono text-cyan-300 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-gray-400 group-hover:text-cyan-300 transition-colors">
                <span>View Technology Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
