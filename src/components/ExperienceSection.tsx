import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-24 relative px-4 sm:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Professional <span className="text-gradient-cyan">Experience</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Glowing Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0B0B0F] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#06B6D4] transition-all duration-300">
                {exp.current && (
                  <span className="absolute -inset-1 rounded-full bg-cyan-400/30 animate-ping" />
                )}
              </div>

              {/* Period Badge - Desktop Floating Left */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 block">
                  {exp.period}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 group-hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="sm:hidden text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 mb-6">
                  <span className="font-semibold text-gray-200">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {exp.location}
                  </span>
                </div>

                {/* Description Bullets */}
                <div className="space-y-2.5 mb-6">
                  {exp.description.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
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
