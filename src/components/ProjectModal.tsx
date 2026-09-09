import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../data/projects';
import { GithubIcon } from './SocialIcons';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Zap,
  AlertCircle,
  Lightbulb,
  Mail,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and listen for navigation/hash events to prevent card overlapping
  useEffect(() => {
    if (!project) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleHashOrNav = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('hashchange', handleHashOrNav);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('hashchange', handleHashOrNav);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#contact';
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark blurred overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl glass-panel-glow p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Header Image */}
          <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden mb-6 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-gray-300">
                {project.tag}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-cyan-300 font-medium mb-4 font-body">{project.subtitle}</p>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Case Study Breakdown (Problem / Approach / Outcome) */}
          <div className="space-y-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
                <AlertCircle className="w-3.5 h-3.5" /> Challenge
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                <Lightbulb className="w-3.5 h-3.5" /> Approach & Architecture
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{project.approach}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Measured Impact
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Metrics summary */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-lg sm:text-xl font-bold text-cyan-300 block">{m.value}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> Key Engineering Implementations
            </h4>
            <div className="space-y-2">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-400" /> Tech Stack & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl glass-panel border border-white/15 font-semibold text-white text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 hover:bg-white/10 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-gray-300" />
                <span>View GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
