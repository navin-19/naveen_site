import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { OrbitSkill } from '../data/skills';
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
  Database,
  Gauge,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface OrbitingSkillsProps {
  skills: OrbitSkill[];
  onSelectSkill: (skill: OrbitSkill) => void;
  profileImage: string;
  name: string;
  title: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4 text-teal-400" />,
  Terminal: <Terminal className="w-4 h-4 text-blue-400" />,
  Bot: <Bot className="w-4 h-4 text-cyan-400" />,
  Cpu: <Cpu className="w-4 h-4 text-emerald-400" />,
  FileCode: <FileCode className="w-4 h-4 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
  Zap: <Zap className="w-4 h-4 text-orange-400" />,
  Container: <Container className="w-4 h-4 text-pink-400" />,
  GitBranch: <GitBranch className="w-4 h-4 text-purple-400" />,
  Database: <Database className="w-4 h-4 text-sky-400" />,
  Gauge: <Gauge className="w-4 h-4 text-yellow-400" />,
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

  // Smooth orbital rotation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      if (!isPaused) {
        setRotationAngle((prev) => (prev + delta * 15) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // 3D perspective tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 12;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12;
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
        {/* Orbit Ring Guides */}
        <div
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-cyan-500/20 pointer-events-none transition-transform duration-500"
          style={{
            transform: 'rotateX(72deg) translateZ(-20px)',
            boxShadow: '0 0 50px rgba(6,182,212,0.15), inset 0 0 50px rgba(139,92,246,0.15)',
          }}
        />

        <div
          className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-purple-500/25 pointer-events-none animate-spin-slow"
          style={{
            transform: 'rotateX(72deg) translateZ(-10px)',
          }}
        />

        {/* Central Profile Card */}
        <div
          className="relative z-20 w-52 h-72 sm:w-64 sm:h-88 md:w-72 md:h-[380px] rounded-3xl p-3 glass-panel-glow border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] hover:border-cyan-400/70"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          {/* Top Status */}
          <div className="flex items-center justify-between z-10 px-2 pt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] sm:text-[11px] font-medium text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available for Hire</span>
            </div>
            <div className="p-1 rounded-full bg-black/50 border border-white/10 text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative w-full h-[70%] rounded-2xl overflow-hidden my-2 border border-white/10">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover object-top rounded-2xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Info */}
          <div className="z-10 px-2 pb-1 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">{name}</h3>
              <p className="text-[11px] sm:text-xs text-cyan-300 font-medium">{title}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Orbiting Skill Badges */}
        {skills.map((skill, index) => {
          const angle = (rotationAngle + (index * 360) / skills.length) % 360;
          const angleRad = (angle * Math.PI) / 180;

          const rx = typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : typeof window !== 'undefined' && window.innerWidth < 768 ? 195 : 230;
          const ry = rx * 0.42;

          const x = Math.cos(angleRad) * rx;
          const y = Math.sin(angleRad) * ry;

          const depth = Math.sin(angleRad);
          const isBack = depth < 0;

          const dynamicZIndex = isBack ? 10 : 30;
          const dynamicScale = isBack
            ? 0.75 + (depth + 1) * 0.20
            : 0.95 + depth * 0.18;
          const dynamicOpacity = isBack ? 0.5 + (depth + 1) * 0.45 : 1.0;
          const dynamicBlur = isBack ? (1 - (depth + 1)) * 1.5 : 0;

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
                className="group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl glass-panel-glow border backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-cyan-500/30"
                style={{
                  borderColor: skill.borderColor + (isBack ? '40' : '90'),
                  boxShadow: isBack
                    ? `0 4px 15px ${skill.borderColor}15`
                    : `0 8px 30px ${skill.borderColor}40`,
                }}
              >
                <div className="p-1 rounded-lg bg-black/60 border border-white/10 group-hover:scale-110 transition-transform">
                  {iconMap[skill.icon] || <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                </div>

                <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  {skill.name}
                </span>

                <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
