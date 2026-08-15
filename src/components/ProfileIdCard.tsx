import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { QrCode, MapPin, Mail, ShieldCheck, Sparkles } from 'lucide-react';

interface ProfileIdCardProps {
  profileImage: string;
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  activeSection?: string;
}

export const ProfileIdCard: React.FC<ProfileIdCardProps> = ({
  profileImage,
  name,
  title,
  email,
  location,
  availability,
  activeSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [bounceKey, setBounceKey] = useState(0);

  // Trigger bounce on activeSection becoming 'home' or custom home-click event
  useEffect(() => {
    if (activeSection === 'home') {
      setBounceKey((prev) => prev + 1);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleHomeTrigger = () => {
      setBounceKey((prev) => prev + 1);
    };

    window.addEventListener('trigger-home-bounce', handleHomeTrigger);
    return () => window.removeEventListener('trigger-home-bounce', handleHomeTrigger);
  }, []);

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
      className="relative flex flex-col items-center justify-center pointer-events-auto select-none py-2 px-2 w-full max-w-[420px]"
      style={{ perspective: '1200px' }}
    >
      {/* DROP AND ELASTIC BOUNCE MOTION STAGE */}
      <motion.div
        key={`card-stage-${bounceKey}`}
        initial={{ y: -650, opacity: 0, rotate: -12, scale: 0.88 }}
        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 210,
          damping: 9, // Low damping for elastic spring physics
          mass: 1.15,
          delay: 0.05,
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing z-20"
      >
        {/* LANYARD STRAPS HANGING FROM TOP OF PAGE (Hidden on Mobile & Tablet, Visible on Desktop) */}
        <div className="hidden lg:flex relative w-full h-[300px] -mt-[280px] mb-[-12px] justify-center overflow-visible pointer-events-none z-10">
          <motion.div
            key={`strap-elastic-${bounceKey}`}
            initial={{ scaleY: 1.5, y: -90, rotate: -8 }}
            animate={{
              scaleY: [1.5, 0.72, 1.28, 0.86, 1.1, 0.96, 1.02, 1],
              y: [-90, 25, -15, 10, -5, 2, 0],
              scaleX: [0.85, 1.2, 0.9, 1.08, 0.96, 1.02, 1],
              rotate: [-8, 6, -4, 2.5, -1, 0.5, 0],
            }}
            transition={{
              duration: 1.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="w-full h-full flex flex-col items-center justify-center relative origin-top"
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 280 280"
              fill="none"
            >
              <defs>
                {/* Left Deep Red Woven Lanyard Fabric Texture (Matte, Non-glow) */}
                <linearGradient id="redStrapTextureLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#450A0A" />
                  <stop offset="25%" stopColor="#7F1D1D" />
                  <stop offset="55%" stopColor="#B91C1C" />
                  <stop offset="85%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>

                {/* Right Deep Red Woven Lanyard Fabric Texture (Matte, Non-glow) */}
                <linearGradient id="redStrapTextureRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#450A0A" />
                  <stop offset="25%" stopColor="#7F1D1D" />
                  <stop offset="55%" stopColor="#B91C1C" />
                  <stop offset="85%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>

                {/* Natural Soft Drop Shadow */}
                <filter id="realRedStrapShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Left Solid Red Lanyard Fabric Strap */}
              <path
                d="M -50 -140 Q 40 100 140 268"
                stroke="url(#redStrapTextureLeft)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#realRedStrapShadow)"
              />

              {/* Right Solid Red Lanyard Fabric Strap */}
              <path
                d="M 330 -140 Q 240 100 140 268"
                stroke="url(#redStrapTextureRight)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#realRedStrapShadow)"
              />
            </svg>

            {/* Silver Metallic Swivel Clip Hook Hardware */}
            <motion.div
              key={`clip-wobble-${bounceKey}`}
              animate={{
                rotate: [18, -14, 10, -5, 2, 0],
                y: [0, 8, -4, 2, 0],
              }}
              transition={{
                duration: 1.35,
                ease: 'easeOut',
              }}
              className="absolute bottom-[2px] z-40 flex flex-col items-center"
            >
              {/* Silver Metallic Fabric Crimp Clamp */}
              <div className="w-7.5 h-3 rounded-t-sm bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 border border-slate-200 shadow-md flex items-center justify-center -mb-1">
                <div className="w-4 h-1 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-full border border-slate-500" />
              </div>
              {/* Silver Metallic Ring */}
              <div className="w-6.5 h-6.5 rounded-full border-2 border-slate-200 bg-gradient-to-b from-white via-slate-300 to-slate-500 shadow-md flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#0B0F19] border border-slate-400" />
              </div>
              {/* Silver Swivel Hook Clip */}
              <div className="w-4.5 h-6.5 bg-gradient-to-b from-white via-slate-300 to-slate-600 rounded-b-md border border-slate-200 shadow-lg flex flex-col items-center justify-end p-0.5">
                <div className="w-2.5 h-1.5 bg-slate-200 rounded-sm border border-slate-400 shadow-inner" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DARK NAVY PLASTIC HOLDER CASE - VERTICAL CR100 FORMAT (2.63" x 3.88") */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative z-20 w-[275px] sm:w-[295px] aspect-[2.63/3.88] rounded-[24px] bg-[#081022] backdrop-blur-2xl border-2 border-[#1E293B] hover:border-cyan-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.2)] group overflow-hidden flex flex-col items-center justify-between p-2.5 transition-colors duration-500"
        >
          {/* Top Extended Curved Arch Tab with Center Slot & Side Holes */}
          <div className="w-full flex justify-center pt-1.5 pb-1 bg-[#081022] border-b border-slate-800/80 z-30 relative">
            <div className="w-36 h-5.5 bg-[#0E1B35] rounded-full border border-slate-700/80 flex items-center justify-between px-3 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-[#040814] border border-slate-700" />
              <div className="w-8 h-2 rounded-full bg-[#040814] border border-slate-700 shadow-inner" />
              <div className="w-2 h-2 rounded-full bg-[#040814] border border-slate-700" />
            </div>
          </div>

          {/* Dynamic Interactive Mouse Glass Spotlight Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30 rounded-[24px]"
            style={{
              background: `radial-gradient(280px circle at ${glowPos.x}px ${glowPos.y}px, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2) 45%, transparent 80%)`,
            }}
          />

          {/* PRINTED VERTICAL ELECTRIC CYAN & MIDNIGHT SLATE ID CARD */}
          <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#0284C7] via-[#0369A1] to-[#0A0E1A] overflow-hidden flex flex-col items-center justify-between text-white text-center p-3.5 border border-white/20 shadow-2xl">
            
            {/* 1. Top Minimal Header Banner */}
            <div className="w-full flex items-center justify-between z-10 pb-2 border-b border-white/15">
              <div className="flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-md bg-white p-0.5 shadow-md flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7] font-bold" />
                </div>
                <span className="text-[9px] font-mono tracking-wider font-bold uppercase text-white drop-shadow">
                  OFFICIAL DEV PASS
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[8px] font-mono font-bold text-white uppercase">VERIFIED</span>
              </div>
            </div>

            {/* 2. DEDICATED SEPARATED PROFILE IMAGE SECTION (Increased Size: 96px - 112px) */}
            <div className="relative z-10 mt-2 mb-1 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-cyan-400 p-1 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/40 bg-slate-950 relative">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top filter contrast-[1.08] saturate-[1.1]"
                  />
                </div>

                {/* Verified Sparkle Glass Badge */}
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#060A14] text-cyan-300 border-2 border-cyan-400 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* 3. SEPARATED NAME & DESIGNATION BLOCK */}
            <div className="w-full bg-[#060A14]/90 border border-cyan-400/40 rounded-xl py-2 px-3 flex flex-col items-center justify-center text-center shadow-xl z-10 relative">
              <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1 h-3 bg-cyan-400 rounded-full" />
                <span className="text-[10px] font-bold text-cyan-200 tracking-tight">
                  {title}
                </span>
              </div>
            </div>

            {/* 4. SEPARATED LOWER METADATA SECTION */}
            <div className="w-full grid grid-cols-12 gap-2 my-1 z-10 text-[9.5px]">
              {/* Left Column: Location & Email */}
              <div className="col-span-7 flex flex-col gap-1 text-cyan-50 pr-1 border-r border-white/20 text-left">
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-bold uppercase tracking-wider text-cyan-200 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-white" /> Location
                  </span>
                  <span className="font-semibold text-white truncate text-[9px]">
                    {location.split('/')[0].trim()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[7.5px] font-bold uppercase tracking-wider text-cyan-200 flex items-center gap-1">
                    <Mail className="w-2.5 h-2.5 text-white" /> Email
                  </span>
                  <span className="font-semibold text-white truncate text-[9px]">
                    {email}
                  </span>
                </div>
              </div>

              {/* Right Column: ID Pills */}
              <div className="col-span-5 flex flex-col gap-1 justify-center items-end text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[7.5px] font-bold text-cyan-200 uppercase">ID Number :</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono font-bold text-[8.5px]">
                    #NK-2026
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[7.5px] font-bold text-cyan-200 uppercase">Status :</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-emerald-200 font-bold text-[8.5px]">
                    {availability.includes('Available') ? 'AVAILABLE' : 'ACTIVE'}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. BOTTOM CONTRAST BAR: QR CODE & WEBSITE LINK */}
            <div className="w-full mt-1 pt-1.5 pb-1 px-3 bg-[#050811] rounded-xl flex items-center justify-between z-10 border border-slate-800 shadow-xl">
              {/* Left QR Code Box */}
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-white shadow flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-[#050811]" />
                </div>
                <span className="text-[8.5px] font-mono text-slate-300 font-semibold uppercase">
                  VERIFIED PASS
                </span>
              </div>

              {/* Right Website URL */}
              <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-wider">
                www.naveen.dev
              </span>
            </div>

          </div>

          {/* Plastic Gloss Reflective Sheen Overlay */}
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none z-40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </div>
  );
};







