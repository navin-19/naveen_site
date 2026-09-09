import React, { useState, useRef, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Code2,
  Film,
  Palette,
  FileText,
  Sparkles,
} from 'lucide-react';

const categories = [
  'All',
  'Web Development',
  'Automation & Testing',
  'Video Editing',
  'Graphics Designing',
  'Script Writing',
] as const;

type CategoryType = (typeof categories)[number];

const categoryBadgeStyles: Record<string, { badge: string; border: string; glow: string }> = {
  'Web Development': {
    badge: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    border: 'hover:border-cyan-500/50',
    glow: 'rgba(6, 182, 212, 0.2)',
  },
  'Automation & Testing': {
    badge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    border: 'hover:border-emerald-500/50',
    glow: 'rgba(16, 185, 129, 0.2)',
  },
  'Video Editing': {
    badge: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
    border: 'hover:border-pink-500/50',
    glow: 'rgba(236, 72, 153, 0.2)',
  },
  'Graphics Designing': {
    badge: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    border: 'hover:border-amber-500/50',
    glow: 'rgba(245, 158, 11, 0.2)',
  },
  'Script Writing': {
    badge: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
    border: 'hover:border-indigo-500/50',
    glow: 'rgba(99, 102, 241, 0.2)',
  },
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Web Development':
      return <Code2 className="w-3.5 h-3.5" />;
    case 'Automation & Testing':
      return <ShieldCheck className="w-3.5 h-3.5" />;
    case 'Video Editing':
      return <Film className="w-3.5 h-3.5" />;
    case 'Graphics Designing':
      return <Palette className="w-3.5 h-3.5" />;
    case 'Script Writing':
      return <FileText className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  // Reset carousel index when category changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  const totalSlides = filteredProjects.length;

  const nextSlide = () => {
    if (totalSlides === 0) return;
    setCarouselIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides === 0) return;
    setCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section
      id="projects"
      className="py-24 relative px-4 sm:px-8 z-10 border-t border-white/[0.04] overflow-hidden"
    >
      {/* Ambient Parallax Glows */}
      <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-cyan-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-[420px] h-[420px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/15 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-dirtyline tracking-wider">Multi-Disciplinary Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Featured Projects & Creative Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base mt-4 font-body font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Explore real-world case studies spanning full-stack web engineering, QA automation frameworks, cinematic video editing, brand design systems, and creative scriptwriting.
          </motion.p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full glass-nav max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Bar Header */}
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {String(carouselIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-mono text-gray-500">/</span>
            <span className="text-xs font-mono text-gray-400">
              {String(Math.max(totalSlides, 1)).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-400 ml-2 hidden sm:inline">
              ({activeCategory === 'All' ? 'All Disciplines' : activeCategory})
            </span>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous project"
              disabled={totalSlides <= 1}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next project"
              disabled={totalSlides <= 1}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE CAROUSEL STAGE */}
        <div ref={carouselContainerRef} className="relative w-full">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-gray-400">No projects found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredProjects.map((project, index) => {
                const style = categoryBadgeStyles[project.category] || {
                  badge: 'bg-white/10 border-white/20 text-gray-200',
                  border: 'hover:border-cyan-500/50',
                  glow: 'rgba(255,255,255,0.1)',
                };
                const isCurrent = index === carouselIndex;

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className={`glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group ${style.border} transition-all duration-400 shadow-xl relative ${
                      isCurrent ? 'ring-1 ring-white/30' : ''
                    }`}
                  >
                    <div>
                      {/* Header Image & Badges */}
                      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#0A0C10]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${style.badge}`}
                          >
                            {project.tag}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gray-300">
                            {project.category}
                          </span>
                        </div>

                        {/* Title on Image */}
                        <div className="absolute bottom-3.5 left-5 right-5">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-300 font-medium mt-0.5 line-clamp-1">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Case Study Content Breakdown */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Challenge / Problem */}
                        <div className="p-3.5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                          <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>The Challenge</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                            {project.problem}
                          </p>
                        </div>

                        {/* Approach */}
                        <div className="p-3.5 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20">
                          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                            <span>The Approach</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                            {project.approach}
                          </p>
                        </div>

                        {/* Measurable Outcome */}
                        <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Measured Outcome</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                            {project.outcome}
                          </p>
                        </div>

                        {/* Key Metrics Chips */}
                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                            {project.metrics.map((metric, i) => (
                              <div
                                key={i}
                                className="p-2 rounded-xl bg-white/[0.03] border border-white/5"
                              >
                                <span className="text-sm sm:text-base font-bold text-cyan-300 block font-mono">
                                  {metric.value}
                                </span>
                                <span className="text-[9.5px] sm:text-[10px] text-gray-400 block leading-tight truncate">
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {project.techStack.slice(0, 5).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="px-1.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                              +{project.techStack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-3 flex items-center justify-between">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/btn"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>Inspect Full Case Study</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Carousel Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === carouselIndex
                    ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
