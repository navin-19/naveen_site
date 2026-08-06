import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Zap,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark blurred overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl glass-panel-glow p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Header Image */}
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Metrics summary */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-xl font-bold text-cyan-300 block">{m.value}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> Key Engineering Features
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
              <Cpu className="w-4 h-4 text-purple-400" /> Technologies Used
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
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl glass-panel border border-white/15 font-semibold text-white text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 hover:bg-white/10 hover:scale-[1.02] transition-all"
              >
                <GithubIcon className="w-4 h-4 text-gray-400" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
