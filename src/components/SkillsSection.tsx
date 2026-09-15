import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { skillsData } from '../data/skills';
import type { SkillItem } from '../data/skills';
import { useIsMobile } from '../hooks/useMediaQuery';
import {
  Terminal,
  Bot,
  Code2,
  Cloud,
  Film,
  Palette,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

interface SkillsSectionProps {
  onSelectSkill: (skill: SkillItem) => void;
}

// Icon mappings for each skill category
const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5 text-blue-400" />,
  Bot: <Bot className="w-5 h-5 text-emerald-400" />,
  Code2: <Code2 className="w-5 h-5 text-purple-400" />,
  Cloud: <Cloud className="w-5 h-5 text-amber-400" />,
  Film: <Film className="w-5 h-5 text-pink-400" />,
  Palette: <Palette className="w-5 h-5 text-cyan-400" />,
};

// Filter tabs matching exact specification
const filterTabs = [
  'All',
  'Programming',
  'Testing',
  'Video Editing',
  'Graphics Design',
  'Full Stack Development',
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkill }) => {
  const [activeTab, setActiveTab] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const reduceMotionFx = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : reduceMotionFx ? ['0%', '0%'] : ['5%', '-20%']
  );
  const orbY2 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : reduceMotionFx ? ['0%', '0%'] : ['-5%', '20%']
  );

  // Filter logic: "Testing" maps to "Automation & Testing" or "Testing"
  const filteredSkills = skillsData.filter((skill) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Testing') {
      return skill.category === 'Automation & Testing' || skill.category === 'Testing';
    }
    return skill.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section
      id="skills"
      className="py-24 relative px-4 sm:px-8 z-10 border-t border-white/[0.04]"
      ref={sectionRef}
    >
      {/* Ambient Parallax Radial Spotlights */}
      <motion.div
        className="hidden md:block absolute top-10 right-1/4 w-[450px] h-[450px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none"
        style={{ y: orbY }}
      />
      <motion.div
        className="hidden md:block absolute bottom-10 left-1/4 w-[420px] h-[420px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none"
        style={{ y: orbY2 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/15 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-dirtyline tracking-wider">Learning Modules & Competencies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Upgrade Your Skills for a Brighter Career
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto font-normal font-body"
          >
            Industry-focused learning paths with hands-on projects and real-world practice.
          </motion.p>
        </div>

        {/* Filter Tabs Bar (Horizontal scrolling / graceful wrap) */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full glass-nav max-w-full overflow-x-auto">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid (3 on desktop, 2 on tablet, 1 on mobile) */}
        <motion.div
          layout={!isMobile}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
        >
          {filteredSkills.map((skill, index) => {
            return (
              <motion.div
                layout={!isMobile}
                key={skill.id}
                initial={{ opacity: 0, y: isMobile ? 12 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: isMobile ? Math.min(index, 4) * 0.04 : index * 0.08, duration: isMobile ? 0.35 : 0.5 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#0F111A]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{
                  borderColor: `${skill.borderColor}30`,
                }}
              >
                {/* Subtle ambient gradient highlight behind each card */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: skill.borderColor }}
                />

                {/* Top Half: Icon, Badge, Title, Category & Description */}
                <div>
                  {/* Top Row: Icon Badge & Category Pill */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {/* Category Icon Badge */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${skill.borderColor}25 0%, rgba(15,17,26,0.9) 100%)`,
                        borderColor: `${skill.borderColor}60`,
                        boxShadow: `0 0 20px ${skill.borderColor}25`,
                      }}
                    >
                      {iconMap[skill.icon] || <Award className="w-5 h-5 text-cyan-400" />}
                    </div>

                    {/* Small Category Pill */}
                    <span
                      className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full border backdrop-blur-md"
                      style={{
                        backgroundColor: `${skill.borderColor}15`,
                        borderColor: `${skill.borderColor}40`,
                        color: skill.borderColor,
                      }}
                    >
                      {skill.badge || skill.category}
                    </span>
                  </div>

                  {/* Title & Category Label */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p
                    className="text-xs font-mono font-medium mb-3"
                    style={{ color: `${skill.borderColor}` }}
                  >
                    {skill.category}
                  </p>

                  {/* 2-3 Line Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 font-normal min-h-[3.6rem]">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Half: Proficiency bar & Action Button */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                  {/* Proficiency label and percentage bar */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-medium">
                      <span>Proficiency</span>
                      <span
                        className="font-mono font-bold"
                        style={{ color: skill.borderColor }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: isMobile ? 0.6 : 1, ease: 'easeOut', delay: 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} origin-left transform-gpu`}
                        style={{
                          width: `${skill.level}%`,
                          boxShadow: `0 0 10px ${skill.borderColor}80`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Pinned "View Details & Projects" Button */}
                  <button
                    onClick={() => onSelectSkill(skill)}
                    className="w-full py-3 px-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold text-gray-200 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group/btn"
                    style={{
                      boxShadow: `0 4px 15px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <span>View Details & Projects</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
