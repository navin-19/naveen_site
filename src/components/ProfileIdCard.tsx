import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, QrCode, MapPin, ShieldCheck } from 'lucide-react';

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
  availability,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  // Mouse position tracking across hero section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  const rotateX = useSpring(0, { stiffness: 240, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 240, damping: 20 });
  const rotateZ = useSpring(0, { stiffness: 200, damping: 18 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      mouseX.set(offsetX * 20);
      mouseY.set(offsetY * 15);

      rotateX.set(-offsetY * 12);
      rotateY.set(offsetX * 12);
      rotateZ.set(offsetX * 2);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY, rotateZ]);

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
      className="relative flex flex-col items-center justify-center pointer-events-auto select-none py-2 px-2 w-full max-w-[320px]"
      style={{ perspective: '1200px' }}
    >
      {/* DROP AND BOUNCE MOTION STAGE */}
      <motion.div
        initial={{ y: -650, opacity: 0, rotate: -8, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 15,
          mass: 1.1,
          delay: 0.1,
        }}
        drag
        dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
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
        {/* LANYARD STRAPS HANGING FROM TOP OF PAGE (HIDDEN ON MOBILE VIEW) */}
        <div className="hidden sm:flex relative w-full h-[260px] sm:h-[300px] -mt-[240px] sm:-mt-[280px] mb-[-14px] justify-center overflow-visible pointer-events-none z-10">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 280 280"
            fill="none"
          >
            <defs>
              <linearGradient id="lanyardTextureLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B0F19" />
                <stop offset="30%" stopColor="#1E293B" />
                <stop offset="70%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="lanyardTextureRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B0F19" />
                <stop offset="30%" stopColor="#1E293B" />
                <stop offset="70%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <filter id="lanyardShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* Left Thick Woven Lanyard Strap (Extending to Top Page) */}
            <path
              d="M -50 -140 Q 40 100 140 268"
              stroke="url(#lanyardTextureLeft)"
              strokeWidth="26"
              strokeLinecap="round"
              filter="url(#lanyardShadow)"
            />

            {/* Right Thick Woven Lanyard Strap (Extending to Top Page) */}
            <path
              d="M 330 -140 Q 240 100 140 268"
              stroke="url(#lanyardTextureRight)"
              strokeWidth="26"
              strokeLinecap="round"
              filter="url(#lanyardShadow)"
            />

            {/* Cyan Accent Edge Stitching Line (Left Strap) */}
            <path
              d="M -50 -140 Q 40 100 140 268"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="8 4"
              strokeOpacity="0.9"
            />

            {/* Emerald Accent Edge Stitching Line (Right Strap) */}
            <path
              d="M 330 -140 Q 240 100 140 268"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="8 4"
              strokeOpacity="0.9"
            />
          </svg>

          {/* Silver Swivel Lobster Clip */}
          <div className="absolute bottom-[2px] z-40 flex flex-col items-center">
            {/* Metallic Ring */}
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-md flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#0F172A] border border-slate-400" />
            </div>
            {/* Silver Clip Hook */}
            <div className="w-4 h-6 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 rounded-b-md border border-slate-300 shadow-xl flex flex-col items-center justify-end p-0.5">
              <div className="w-2.5 h-1.5 bg-cyan-400 rounded-sm animate-pulse" />
            </div>
          </div>
        </div>

        {/* BLACK PLASTIC HOLDER CASE WITH EXTENDED TOP TAB */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative z-20 w-[270px] sm:w-[285px] rounded-[22px] p-2.5 bg-[#0A0D14] border-2 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-xl group overflow-hidden flex flex-col items-center"
        >
          {/* Top Extension Tab with Slot Hole */}
          <div className="w-full flex justify-center pt-0.5 pb-2 relative z-30">
            <div className="w-12 h-4 rounded-full bg-[#141A28] border border-slate-700 flex items-center justify-center shadow-inner">
              <div className="w-6 h-1.5 rounded-full bg-[#05070B] border border-slate-800" />
            </div>
          </div>

          {/* Mouse Spotlight Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30 rounded-[22px]"
            style={{
              background: `radial-gradient(240px circle at ${glowPos.x}px ${glowPos.y}px, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.1) 50%, transparent 80%)`,
            }}
          />

          {/* INNER PRINTED ID CARD (Matching Reference Design Layout) */}
          <div className="relative w-full rounded-xl bg-gradient-to-b from-[#0F172A] via-[#0B1120] to-[#070A14] overflow-hidden border border-slate-700/60 shadow-xl flex flex-col items-center text-center pb-3">
            
            {/* Top Dark Carbon Texture Header Banner */}
            <div className="relative w-full pt-3 pb-2 px-3 bg-gradient-to-b from-slate-900 to-[#0F172A] border-b border-slate-800 flex items-center justify-between z-10">
              {/* Carbon Diagonal Lines Background Texture Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none z-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)`,
                }}
              />
              
              <div className="flex items-center gap-1.5 z-10">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950 font-bold" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow">
                  NAVEEN PORTFOLIO
                </span>
              </div>

              <div className="flex items-center gap-1 z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">OFFICIAL</span>
              </div>
            </div>

            {/* CIRCULAR PROFILE PHOTO (Matching Reference Avatar Circle) */}
            <div className="relative z-10 mt-3 mb-2 flex items-center justify-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-emerald-400 to-teal-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-900 bg-slate-950">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                </div>

                {/* Verified Sparkle Badge */}
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-950 text-cyan-400 border border-cyan-400/60 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* ID NUMBER & DETAILS (Reference Layout) */}
            <div className="relative z-10 px-3 w-full flex flex-col items-center">
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                DEV ID • #NK-2026
              </span>

              {/* Bold Vibrant Green/Cyan Name */}
              <h3 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-wide uppercase mt-0.5 drop-shadow">
                {name}
              </h3>

              {/* Designation */}
              <p className="text-[11px] font-semibold text-slate-200 mt-0.5 tracking-tight max-w-[230px] leading-snug">
                {title}
              </p>

              {/* Location & Status Pill */}
              <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[10px]">
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {location.split('/')[0].trim()}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold">
                  {availability.includes('Available') ? 'Available' : availability}
                </span>
              </div>
            </div>

            {/* BOTTOM GREEN & CYAN CURVED WAVE GRAPHIC */}
            <div className="relative w-full mt-3 pt-2 px-3 flex items-center justify-between border-t border-slate-800/80 z-10 text-[9px] font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300 font-semibold">VERIFIED DEV</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                FULL ACCESS
              </span>
            </div>

            {/* BOTTOM DECORATIVE SWOOP GRAPHICS */}
            <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-0 overflow-hidden opacity-30">
              <div className="absolute -bottom-6 -left-6 right-0 h-16 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-[100%] transform rotate-[-8deg]" />
              <div className="absolute -bottom-4 -left-6 right-0 h-12 bg-[#070A14] rounded-[100%] transform rotate-[-5deg]" />
            </div>

          </div>

          {/* Plastic Gloss Light Sheen Overlay */}
          <div className="absolute inset-0 rounded-[22px] bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-40" />
        </div>
      </motion.div>
    </div>
  );
};



