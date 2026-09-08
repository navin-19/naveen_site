import React from 'react';
import { motion } from 'framer-motion';
import { experiencesData } from '../data/experience';
import { Briefcase, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-24 relative px-4 sm:px-8 z-10 bg-gradient-to-b from-transparent via-purple-500/[0.015] to-transparent border-t border-white/[0.04]"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Professional <span className="text-gradient-cyan">Work Experience</span>
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Hands-on test automation architecture, REST API validation, and full-stack Python engineering.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-36 space-y-12">
          {experiencesData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Glowing Timeline Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0B0B0F] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#06B6D4] transition-all duration-300">
                {exp.current && (
                  <span className="absolute -inset-1 rounded-full bg-cyan-400/40 animate-ping" />
                )}
              </div>

              {/* Period Badge - Left aligned on Desktop */}
              <div className="hidden sm:block absolute -left-40 top-1 text-right w-32">
                <span className="text-xs font-mono font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 block shadow-sm">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="text-[10px] font-mono text-emerald-400 block mt-1 font-semibold">
                    ● Current Role
                  </span>
                )}
              </div>

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 group-hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        Present
                      </span>
                    )}
                  </div>

                  <span className="sm:hidden text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {exp.period}
                  </span>
                </div>

                {/* Company & Location */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 mb-4">
                  <span className="font-semibold text-cyan-400 text-sm">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {exp.location}
                  </span>
                  <span>•</span>
                  <span className="text-gray-400">{exp.type}</span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed font-normal">
                  {exp.summary}
                </p>

                {/* Metrics Highlights if available */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                    {exp.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <span className="text-lg sm:text-xl font-bold text-cyan-300 block">
                          {metric.value}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                <div className="space-y-2.5 mb-6">
                  {exp.description.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {exp.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
