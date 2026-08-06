import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  ExternalLink,
} from 'lucide-react';

interface OrbitingSkillsProps {
  skills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
  profileImage: string;
  name: string;
  title: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
  Terminal: <Terminal className="w-5 h-5 text-blue-400" />,
  Bot: <Bot className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-orange-400" />,
  FileCode: <FileCode className="w-5 h-5 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-blue-500" />,
  Zap: <Zap className="w-5 h-5 text-teal-400" />,
  Container: <Container className="w-5 h-5 text-sky-400" />,
  GitBranch: <GitBranch className="w-5 h-5 text-purple-400" />,
  Cloud: <Cloud className="w-5 h-5 text-yellow-400" />,
};

export const OrbitingSkills: React.FC<OrbitingSkillsProps> = ({
  skills,
  onSelectSkill,
  profileImage,
  name,
  title,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Continuous smooth orbital rotation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      if (!isPaused) {
        setRotationAngle((prev) => (prev + delta * 16) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Mouse tilt tracking in 3D perspective space
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 14;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] aspect-square flex items-center justify-center pointer-events-auto select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Stage Container */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Background Orbit Ring Visual Guides */}
        <div
          className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-500/20 pointer-events-none transition-transform duration-500"
          style={{
            transform: 'rotateX(72deg) translateZ(-20px)',
            boxShadow: '0 0 50px rgba(6,182,212,0.15), inset 0 0 50px rgba(139,92,246,0.15)',
          }}
        />

        <div
          className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-purple-500/25 pointer-events-none animate-spin-slow"
          style={{
            transform: 'rotateX(72deg) translateZ(-10px)',
          }}
        />

        {/* ---------------------------------------------------- */}
        {/* CENTRAL 3D PROFILE IMAGE CARD (z-index: 20)           */}
        {/* ---------------------------------------------------- */}
        <div
          className="relative z-20 w-56 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[410px] rounded-3xl p-3 glass-panel-glow border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] hover:border-cyan-400/70"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          {/* Top Glass Badge */}
          <div className="flex items-center justify-between z-10 px-2 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[11px] font-medium text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available</span>
            </div>
            <div className="p-1.5 rounded-full bg-black/50 border border-white/10 text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          </div>

          {/* Large Profile Image */}
          <div className="relative w-full h-[72%] rounded-2xl overflow-hidden my-2 border border-white/10">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover rounded-2xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Glossy Sheen & Shadow overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Info Bar */}
          <div className="z-10 px-2 pb-1 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">{name}</h3>
              <p className="text-xs text-cyan-300 font-medium">{title}</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3D ORBITING SKILL CARDS (Back to Front depth)        */}
        {/* ---------------------------------------------------- */}
        {skills.map((skill, index) => {
          // Calculate orbital positions in 3D space
          const angle = (rotationAngle + (index * 360) / skills.length) % 360;
          const angleRad = (angle * Math.PI) / 180;

          // Radii (rx = horizontal radius, ry = squashed vertical height)
          const rx = window.innerWidth < 640 ? 165 : window.innerWidth < 768 ? 215 : 245;
          const ry = rx * 0.42;

          const x = Math.cos(angleRad) * rx;
          const y = Math.sin(angleRad) * ry;

          // Depth parameter ranges from -1 (Backmost point) to +1 (Frontmost point)
          const depth = Math.sin(angleRad);
          const isBack = depth < 0;

          // Dynamic Z-Index: Back cards = 10 (behind profile z-20), Front cards = 30 (in front of profile z-20)
          const dynamicZIndex = isBack ? 10 : 30;

          // Dynamic scale: ranges from ~0.72 (back) to ~1.15 (front)
          const dynamicScale = isBack
            ? 0.72 + (depth + 1) * 0.23
            : 0.95 + depth * 0.20;

          // Dynamic opacity & blur
          const dynamicOpacity = isBack
            ? 0.45 + (depth + 1) * 0.45
            : 1.0;

          const dynamicBlur = isBack
            ? (1 - (depth + 1)) * 1.5
            : 0;

          return (
            <motion.div
              key={skill.id}
              onClick={() => onSelectSkill(skill)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute cursor-pointer transition-all duration-300 ease-out"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${depth * 40}px) scale(${dynamicScale})`,
                zIndex: dynamicZIndex,
                opacity: dynamicOpacity,
                filter: `blur(${dynamicBlur}px)`,
              }}
              whileHover={{
                scale: dynamicScale * 1.25,
                zIndex: 50,
                opacity: 1,
                filter: 'blur(0px)',
              }}
            >
              <div
                className="group relative flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-2xl glass-panel-glow border backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-cyan-500/30"
                style={{
                  borderColor: skill.borderColor + (isBack ? '40' : '90'),
                  boxShadow: isBack
                    ? `0 4px 15px ${skill.borderColor}15`
                    : `0 8px 30px ${skill.borderColor}40`,
                }}
              >
                {/* Skill Icon */}
                <div className="p-1 rounded-lg bg-black/50 border border-white/10 group-hover:scale-110 transition-transform">
                  {iconMap[skill.icon] || <Sparkles className="w-4 h-4 text-cyan-400" />}
                </div>

                {/* Skill Name */}
                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  {skill.name}
                </span>

                {/* Level Tag */}
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {skill.level}%
                </span>

                {/* Hover Glow Light */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.borderColor}40 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
