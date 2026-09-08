import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { QrCode, MapPin, Mail, Shield, User } from 'lucide-react';

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

      mouseX.set(offsetX * 18);
      mouseY.set(offsetY * 14);

      rotateX.set(-offsetY * 11);
      rotateY.set(offsetX * 11);
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
      className="relative flex flex-col items-center justify-center pointer-events-auto select-none py-2 px-2 w-full max-w-[440px]"
      style={{ perspective: '1200px' }}
    >
      {/* DROP AND ELASTIC BOUNCE MOTION STAGE */}
      <motion.div
        key={`card-stage-${bounceKey}`}
        initial={{ y: -650, opacity: 0, rotate: -10, scale: 0.88 }}
        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 210,
          damping: 10,
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
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing z-20"
      >
        {/* BLACK WOVEN LANYARD STRAPS HANGING FROM TOP OF PAGE */}
        <div className="hidden lg:flex relative w-full h-[320px] -mt-[300px] mb-[-42px] justify-center overflow-visible pointer-events-none z-30">
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
                {/* Woven Charcoal/Black Lanyard Strap Texture Left */}
                <linearGradient id="blackStrapLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#111215" />
                  <stop offset="25%" stopColor="#24272E" />
                  <stop offset="50%" stopColor="#353A45" />
                  <stop offset="75%" stopColor="#22252C" />
                  <stop offset="100%" stopColor="#0E0F12" />
                </linearGradient>

                {/* Woven Charcoal/Black Lanyard Strap Texture Right */}
                <linearGradient id="blackStrapRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#111215" />
                  <stop offset="25%" stopColor="#24272E" />
                  <stop offset="50%" stopColor="#353A45" />
                  <stop offset="75%" stopColor="#22252C" />
                  <stop offset="100%" stopColor="#0E0F12" />
                </linearGradient>

                {/* Natural Soft Drop Shadow */}
                <filter id="realBlackStrapShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.85" />
                </filter>
              </defs>

              {/* Left Black Woven Strap */}
              <path
                d="M -50 -140 Q 40 100 140 268"
                stroke="url(#blackStrapLeft)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#realBlackStrapShadow)"
              />

              {/* Right Black Woven Strap */}
              <path
                d="M 330 -140 Q 240 100 140 268"
                stroke="url(#blackStrapRight)"
                strokeWidth="28"
                strokeLinecap="round"
                filter="url(#realBlackStrapShadow)"
              />
            </svg>

            {/* REALISTIC MACHINED STAINLESS STEEL LANYARD HARDWARE ASSEMBLY */}
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
              className="absolute bottom-[-18px] z-50 flex flex-col items-center drop-shadow-[0_12px_15px_rgba(0,0,0,0.85)]"
            >
              {/* 1. Brushed Steel Lanyard Strap Crimp Clamp */}
              <div className="w-9 h-4 rounded-sm bg-gradient-to-r from-[#94A3B8] via-[#F1F5F9] to-[#64748B] border border-[#CBD5E1] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.6)] flex items-center justify-center">
                <div className="w-5 h-1 bg-[#475569] rounded-full border-t border-black/50 border-b border-white/60" />
              </div>

              {/* 2. Heavy-Duty Steel O-Ring / Link */}
              <div className="w-8 h-8 -my-1 rounded-full border-[3px] border-[#CBD5E1] bg-gradient-to-b from-[#E2E8F0] via-[#94A3B8] to-[#475569] shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_3px_rgba(0,0,0,0.7)] flex items-center justify-center relative z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-[#0E1015] border border-[#64748B]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" />
              </div>

              {/* 3. Real Machined Swivel Lobster Clip with Tongue Clamping Into Card Slot */}
              <div className="relative flex flex-col items-center -mt-1.5 z-20">
                {/* Swivel Barrel Base */}
                <div className="w-5 h-3.5 rounded-t-md bg-gradient-to-r from-[#94A3B8] via-[#F8FAFC] to-[#475569] border border-[#CBD5E1] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center">
                  <div className="w-2.5 h-1 bg-[#64748B] rounded-sm" />
                </div>

                {/* Main Machined Steel Carabiner Body & Hook Tongue */}
                <div className="relative w-6 h-10 bg-gradient-to-r from-[#64748B] via-[#E2E8F0] to-[#475569] rounded-b-md border-x border-b border-[#CBD5E1] shadow-[0_6px_12px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between p-0.5">
                  {/* Spring Lever Pin Accent */}
                  <div className="w-3.5 h-2.5 rounded-sm bg-gradient-to-b from-[#F8FAFC] to-[#94A3B8] border border-[#CBD5E1] shadow-inner mt-0.5" />
                  
                  {/* Steel Clamping Jaw / Hook Loop Passing Through Slot */}
                  <div className="w-4 h-4 rounded-b-sm bg-gradient-to-b from-[#CBD5E1] via-[#64748B] to-[#334155] border-t-2 border-[#1E293B] shadow-[0_3px_5px_rgba(0,0,0,0.6)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1E293B] shadow-inner" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BRUSHED TITANIUM / GUNMETAL METALLIC DEV PASS ID CARD */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative z-20 w-[295px] sm:w-[325px] aspect-[2.63/4.08] rounded-[28px] border-2 border-[#5E6677] hover:border-[#CBD5E1] shadow-[0_35px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.05),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(0,0,0,0.9)] group overflow-hidden flex flex-col items-center justify-between p-3.5 pt-3 transition-all duration-500"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 65%),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 4px),
              linear-gradient(180deg, #4A515D 0%, #353B47 30%, #252A34 70%, #161920 100%)
            `,
          }}
        >
          {/* Top Real Punched Slot Cutout for Clip Hardware */}
          <div className="w-full flex justify-center pt-0 pb-2 relative z-10">
            <div className="w-16 h-3.5 bg-[#0A0C10] rounded-full border border-[#4F5665] shadow-[inset_0_3px_6px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-center">
              <div className="w-12 h-1 bg-[#050608] rounded-full opacity-90" />
            </div>
          </div>

          {/* Dynamic Interactive Mouse Metal Sheen Reflection */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30 rounded-[28px]"
            style={{
              background: `radial-gradient(320px circle at ${glowPos.x}px ${glowPos.y}px, rgba(255, 255, 255, 0.16), rgba(210, 230, 255, 0.05) 50%, transparent 80%)`,
            }}
          />

          {/* INTERNAL CONTENT CONTAINER */}
          <div className="relative w-full h-full flex flex-col items-center justify-between z-20">
            
            {/* 1. Top Header Banner: OFFICIAL DEV PASS + VERIFIED Indicator */}
            <div className="w-full flex items-center justify-between px-1">
              {/* Left: Shield + OFFICIAL DEV PASS */}
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8] p-0.5 shadow-sm flex items-center justify-center">
                  <Shield className="w-3 h-3 text-[#1E293B] fill-[#1E293B]" />
                </div>
                <span 
                  className="text-[9px] font-mono tracking-widest font-extrabold uppercase text-[#ECE5DA]"
                  style={{
                    textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.25)',
                  }}
                >
                  + OFFICIAL DEV PASS
                </span>
              </div>

              {/* Right: Glowing Green LED + VERIFIED */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
                <span 
                  className="text-[9px] font-mono tracking-wider font-extrabold text-[#ECE5DA] uppercase"
                  style={{
                    textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.25)',
                  }}
                >
                  VERIFIED
                </span>
              </div>
            </div>

            {/* 2. CIRCULAR PHOTO WITH MULTI-TIER METAL BEZEL RING */}
            <div className="relative my-2 flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-b from-[#6B7586] via-[#3E4552] to-[#1E222A] shadow-[0_8px_25px_rgba(0,0,0,0.75),inset_0_2px_3px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.85)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {/* Inner Inset Bezel Ring */}
                <div className="w-full h-full rounded-full p-1 bg-gradient-to-b from-[#181B22] via-[#2D333E] to-[#4A5362] shadow-inner flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border border-black/80 bg-[#12141A] relative shadow-[inset_0_3px_8px_rgba(0,0,0,0.95)]">
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. ENGRAVED METALLIC NAME & DESIGNATION BLOCK */}
            <div className="w-full flex flex-col items-center text-center px-1">
              <h3 
                className="text-lg sm:text-[21px] font-black tracking-[0.1em] uppercase text-[#F2ECE1] transition-all"
                style={{
                  textShadow: '0 -1px 1px rgba(0, 0, 0, 0.95), 0 1px 1px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.7)',
                }}
              >
                {name}
              </h3>
              <p 
                className="text-[10px] sm:text-[10.5px] font-medium text-[#B8C0CC] leading-tight tracking-tight mt-0.5 max-w-[270px]"
                style={{
                  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.8), 0 1px 1px rgba(255, 255, 255, 0.2)',
                }}
              >
                {title || 'Senior Full-Stack Developer & Test Automation Architect'}
              </p>
            </div>

            {/* 4. METADATA SECTION */}
            <div className="w-full grid grid-cols-12 gap-2 mt-2 px-1 pt-2 border-t border-[#4E5666]/70">
              {/* Left Column: Location & Email */}
              <div className="col-span-7 flex flex-col gap-1.5 text-left">
                <div className="flex items-center gap-1.5 text-[#D1D5DB]">
                  <MapPin className="w-3 h-3 text-[#9CA3AF] shrink-0" />
                  <span 
                    className="text-[9px] font-medium text-[#E5E7EB] truncate"
                    style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.2)' }}
                  >
                    {location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#D1D5DB]">
                  <Mail className="w-3 h-3 text-[#9CA3AF] shrink-0" />
                  <span 
                    className="text-[9px] font-medium text-[#E5E7EB] truncate"
                    style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.2)' }}
                  >
                    {email}
                  </span>
                </div>
              </div>

              {/* Right Column: ID Badge & Status Pill */}
              <div className="col-span-5 flex flex-col gap-1.5 items-end text-right">
                {/* ID Number Badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#181B22]/90 border border-[#525B6C] shadow-sm">
                  <User className="w-2.5 h-2.5 text-[#9CA3AF]" />
                  <span 
                    className="font-mono font-bold text-[8.5px] text-[#F3F4F6] tracking-wider"
                    style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.25)' }}
                  >
                    #NK-2026
                  </span>
                </div>

                {/* Status Pill */}
                <div className="flex flex-col items-end">
                  <span className="text-[7px] font-mono uppercase text-[#9CA3AF] font-bold tracking-wider -mb-0.5">
                    STATUS
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#243324] border border-[#3E5C3E] text-[#86EFAC] font-mono font-bold text-[8px] tracking-wider shadow-sm">
                    {availability.includes('Available') ? 'AVAILABLE' : 'ACTIVE'}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. BOTTOM BAR: QR CODE PASS & WEBSITE URL */}
            <div className="w-full mt-2 pt-2 pb-0.5 flex items-center justify-between px-1 border-t border-[#4E5666]/70">
              {/* Left QR Code Box */}
              <div className="flex items-center gap-1.5">
                <div className="p-0.5 rounded-sm bg-[#F3F4F6] shadow-sm flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-[#111317]" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span 
                    className="text-[7.5px] font-mono text-[#F3F4F6] font-bold uppercase tracking-wider"
                    style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.9)' }}
                  >
                    VERIFIED
                  </span>
                  <span className="text-[7px] font-mono text-[#9CA3AF] font-medium uppercase tracking-wider">
                    PASS
                  </span>
                </div>
              </div>

              {/* Right Website URL */}
              <span 
                className="text-[9.5px] font-mono font-semibold text-[#D1D5DB] tracking-wide"
                style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.2)' }}
              >
                www.naveen.dev
              </span>
            </div>

          </div>

          {/* Brushed Metal Fine Horizontal Grain Lines Overlay */}
          <div 
            className="absolute inset-0 rounded-[28px] pointer-events-none opacity-40 mix-blend-overlay z-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)',
            }}
          />

          {/* Metal Specular Highlight Sheen */}
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-30 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
        </div>
      </motion.div>
    </div>
  );
};









