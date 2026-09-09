import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import type { ProjectItem } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './SocialIcons';
import {
  FolderKanban,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="py-24 relative px-4 sm:px-8 z-10 border-t border-white/[0.04]"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-cyan-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/15 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4"
          >
            <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-dirtyline tracking-wider">Case Studies & Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Featured Engineering Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base mt-3 font-body font-normal"
          >
            In-depth case studies showcasing problem analysis, automation frameworks, and measurable outcomes.
          </motion.p>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Header Image / Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/40 text-xs font-semibold text-cyan-300">
                      {project.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-gray-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium">{project.subtitle}</p>
                  </div>
                </div>

                {/* Case Study Content (Problem -> Approach -> Outcome) */}
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Problem */}
                  <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                      <Lightbulb className="w-4 h-4" />
                      <span>The Approach & Architecture</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {project.approach}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>The Measurable Outcome</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-base sm:text-lg font-bold text-cyan-300 block">
                          {metric.value}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-gray-400 block leading-tight">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Inspect Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Repository"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
