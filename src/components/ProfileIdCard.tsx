import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, QrCode } from 'lucide-react';

interface ProfileIdCardProps {
  profileImage: string;
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
}

export const ProfileIdCard: React.FC<ProfileIdCardProps> = ({
  profileImage,
  name,
  title,
  location,
  email,
  availability,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  // Mouse position tracking across full hero home page
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement across hero section
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const rotateX = useSpring(0, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 18 });
  const rotateZ = useSpring(0, { stiffness: 180, damping: 16 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Move offset tuned to stay inside section
      mouseX.set(offsetX * 30);
      mouseY.set(offsetY * 20);

      // 3D Tilt
      rotateX.set(-offsetY * 14);
      rotateY.set(offsetX * 14);
      rotateZ.set(offsetX * 3);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY, rotateZ]);

  // Local card mouse pointer spotlight position tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center pointer-events-auto select-none py-1 px-2 w-full max-w-[440px]"
      style={{ perspective: '1200px' }}
    >
      {/* UNIFIED SINGLE MOTION STAGE - STRAP & CLIP & CARD ARE PERMANENTLY FIXED TOGETHER */}
      <motion.div
        drag
        dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
        dragElastic={0.12}
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing"
      >
        {/* ---------------------------------------------------- */}
        {/* FIXED V-LANYARD STRAP ASSEMBLY (PERMANENTLY ATTACHED) */}
        {/* ---------------------------------------------------- */}
        <div className="relative w-full h-16 mb-[-16px] flex justify-center overflow-visible pointer-events-none z-10">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 300 60"
            fill="none"
          >
            <defs>
              <linearGradient id="blackStrapLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252836" />
                <stop offset="50%" stopColor="#111217" />
                <stop offset="100%" stopColor="#1A1C24" />
              </linearGradient>
              <linearGradient id="blackStrapRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#252836" />
                <stop offset="50%" stopColor="#111217" />
                <stop offset="100%" stopColor="#1A1C24" />
              </linearGradient>
              <filter id="strapShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Left Black Woven V-Strap */}
            <path
              d="M 20 -20 Q 70 25 150 54"
              stroke="url(#blackStrapLeft)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#strapShadow)"
            />

            {/* Right Black Woven V-Strap */}
            <path
              d="M 280 -20 Q 230 25 150 54"
              stroke="url(#blackStrapRight)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#strapShadow)"
            />

            {/* Ribbon Edge Neon Highlights */}
            <path
              d="M 20 -20 Q 70 25 150 54"
              stroke="#06B6D4"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <path
              d="M 280 -20 Q 230 25 150 54"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          </svg>

          {/* Heavy Black Metallic Swivel Hook Clip (Locked to V Apex) */}
          <div className="absolute bottom-[2px] z-40 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full border-4 border-[#1F2430] bg-[#0D0F14] shadow-md flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#333A4A] border border-gray-600" />
            </div>
            <div className="w-4.5 h-6 bg-gradient-to-b from-[#2A2E3D] via-[#151720] to-[#0A0B10] rounded-b-md border border-gray-700 shadow-xl flex flex-col items-center justify-end p-0.5">
              <div className="w-2.5 h-1.5 bg-cyan-500/90 rounded-sm mb-0.5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* COMPACT PLASTIC SLEEVE & FULL SIZE USER PHOTO CARD */}
        {/* ---------------------------------------------------- */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative z-20 w-72 sm:w-80 md:w-[350px] lg:w-[370px] rounded-[24px] p-3 glass-panel border-[2.5px] border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl group overflow-hidden"
        >
          {/* Subtle Mouse Pointer Spotlight Glow Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30 rounded-[24px]"
            style={{
              background: `radial-gradient(280px circle at ${glowPos.x}px ${glowPos.y}px, rgba(6, 182, 212, 0.22), rgba(139, 92, 246, 0.08) 50%, transparent 80%)`,
            }}
          />

          {/* Heat-Sealed Dotted Border Edge Pattern */}
          <div className="absolute inset-1 rounded-[20px] border-2 border-dashed border-white/20 pointer-events-none z-30" />

          {/* Clear Plastic Sleeve Top Punch Hole */}
          <div className="w-full flex justify-center pt-0.5 pb-1.5 relative z-30">
            <div className="w-7 h-7 rounded-full bg-[#0B0B0F]/90 border-2 border-white/50 shadow-inner flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400/50 border border-cyan-400" />
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* INNER PRINTED ID CARD (Full Size Photo Fit Layout)   */}
          {/* ---------------------------------------------------- */}
          <div className="relative w-full rounded-xl bg-gradient-to-b from-[#0F2042] via-[#0B1426] to-[#080D1A] overflow-hidden border border-white/20 shadow-xl p-3 sm:p-3.5 flex flex-col justify-between">
            
            {/* Top Decorative Blue & Gold Curved Wave Background */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 pointer-events-none z-0">
              <div className="absolute -bottom-4 -left-8 right-0 h-12 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 rounded-[100%] transform rotate-[-6deg] opacity-90" />
              <div className="absolute -bottom-2 -left-8 right-0 h-10 bg-[#0F2042] rounded-[100%] transform rotate-[-4deg]" />
            </div>

            {/* Header Title Banner */}
            <div className="relative z-10 text-center pt-0.5 pb-1.5">
              <h2 className="text-base sm:text-lg font-black text-white tracking-wider uppercase drop-shadow-md">
                NAVEEN PORTFOLIO
              </h2>
              <p className="text-[9px] sm:text-[10px] font-semibold text-cyan-300 tracking-widest uppercase">
                FULL STACK & AUTOMATION SPECIALIST
              </p>
            </div>

            {/* FULL-WIDTH SQUARE USER PROFILE IMAGE CONTAINER */}
            <div className="relative z-10 w-full my-2 flex justify-center">
              <div className="relative w-full aspect-square rounded-2xl p-1 bg-gradient-to-b from-white via-cyan-200 to-white shadow-2xl border-2 border-cyan-400 overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover rounded-xl filter contrast-105"
                />
                {/* Sparkles Watermark Pill */}
                <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-black/75 backdrop-blur-md text-cyan-400 border border-cyan-400/40">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Dynamic Name Banner Ribbon */}
            <div className="relative z-10 w-full my-1">
              <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 py-1 px-2.5 rounded-lg text-center shadow-md border border-cyan-300/40">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase drop-shadow">
                  {name}
                </h3>
                <div className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-black/40 text-cyan-200 text-[10px] font-mono font-semibold border border-white/20">
                  {title}
                </div>
              </div>
            </div>

            {/* Structured Key-Value Details Table */}
            <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-lg p-2.5 my-1 border border-white/10 space-y-1 text-[11px] font-medium">
              <div className="flex justify-between items-center border-b border-white/10 pb-0.5">
                <span className="text-gray-400 font-mono">Role:</span>
                <span className="text-white font-semibold">{title}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-0.5">
                <span className="text-gray-400 font-mono">Location:</span>
                <span className="text-cyan-300 font-semibold">{location}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-0.5">
                <span className="text-gray-400 font-mono">Email:</span>
                <span className="text-gray-200 font-mono text-[10px]">{email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-mono">Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {availability}
                </span>
              </div>
            </div>

            {/* Bottom Security Footer & Signature Accent */}
            <div className="relative z-10 pt-1 flex items-center justify-between border-t border-white/15">
              <div className="flex items-center gap-1">
                <QrCode className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-[8px] font-mono text-gray-400 uppercase">ID: #2026-NK99</p>
                  <p className="text-[7px] font-mono text-cyan-400">VERIFIED ACCESS</p>
                </div>
              </div>

              {/* Developer Signature Graphic Accent */}
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-serif italic text-cyan-300 tracking-wider font-bold">
                  Naveen Kumar
                </span>
                <div className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-600 text-[7px] font-bold text-white uppercase tracking-wider shadow">
                  Developer Signature
                </div>
              </div>
            </div>
          </div>

          {/* Glossy Plastic Sleeve Light Sheen */}
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};
