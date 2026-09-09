import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillItem } from '../data/portfolioData';
import {
  X,
  Sparkles,
  Layers,
  Award,
  Calendar,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

interface SkillModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  useEffect(() => {
    if (!skill) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleHashOrNav = () => onClose();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('hashchange', handleHashOrNav);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('hashchange', handleHashOrNav);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg rounded-3xl glass-panel-glow p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header section */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${skill.borderColor}30 0%, rgba(11,11,15,0.8) 100%)`,
                borderColor: skill.borderColor,
                boxShadow: `0 0 25px ${skill.borderColor}40`,
              }}
            >
              <Sparkles className="w-7 h-7" style={{ color: skill.borderColor }} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-1">
                <Layers className="w-3 h-3" />
                <span>{skill.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {skill.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
            {skill.description}
          </p>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Proficiency Bar Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-cyan-400" /> Mastery Level
                </span>
                <span className="text-cyan-300 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                />
              </div>
            </div>

            {/* Experience Years */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-center">
              <span className="flex items-center gap-1 text-xs font-medium text-gray-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-400" /> Practice Period
              </span>
              <span className="text-xl font-bold text-white">
                {skill.yearsOfExp}+ Years
              </span>
            </div>
          </div>

          {/* Related Projects */}
          {skill.relatedProjects && skill.relatedProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-cyan-400" /> Applied In Projects
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.relatedProjects.map((proj, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
          >
            Got It
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
