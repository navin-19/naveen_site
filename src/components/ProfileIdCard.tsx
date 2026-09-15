import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { QrCode, MapPin, Mail, User } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

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
    // Only track 3D tilt on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

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

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
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

  const isAvailable = availability.toLowerCase().includes('available');

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center pointer-events-auto select-none py-2 px-2 w-full max-w-[440px]"
      style={{ perspective: '1200px' }}
    >
      {/* DROP AND ELASTIC BOUNCE MOTION STAGE */}
      <motion.div
        key={`card-stage-${bounceKey}`}
        initial={{
          y: prefersReducedMotion ? 0 : isMobile ? -180 : -650,
          opacity: 0,
          rotate: prefersReducedMotion ? 0 : -10,
          scale: prefersReducedMotion ? 1 : 0.88,
        }}
        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 210,
          damping: 10,
          mass: 1.15,
          delay: 0.05,
        }}
        drag={!isMobile}
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
        <div className="hidden lg:flex relative w-full h-[320px] -mt-[300px] mb-[-6px] justify-center overflow-visible pointer-events-none z-30">
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

            {/* MODERN PRECISION CNC TITANIUM & GUNMETAL LANYARD HARDWARE */}
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
              className="absolute bottom-[-10px] z-50 flex flex-col items-center drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
            >
              {/* 1. Sleek Matte Gunmetal Strap End-Cap / Crimp Clamp */}
              <div className="w-10 h-3.5 rounded-sm bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] border border-[#64748B]/60 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-between px-1.5">
                <div className="w-1 h-1 rounded-full bg-[#64748B] border border-black/80" />
                <div className="w-4 h-0.5 bg-[#475569] rounded-full" />
                <div className="w-1 h-1 rounded-full bg-[#64748B] border border-black/80" />
              </div>

              {/* 2. Precision CNC Swivel Link Barrel */}
              <div className="w-3.5 h-3.5 -my-0.5 rounded-sm bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#475569] border border-[#94A3B8] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A] border border-white/40" />
              </div>

              {/* 3. Modern Sleek Tactical Carabiner / Clasp Body */}
              <div className="relative flex flex-col items-center z-20">
                {/* Clasp Upper Shoulder */}
                <div className="w-5 h-2 rounded-t-md bg-gradient-to-r from-[#1E293B] via-[#475569] to-[#1E293B] border-t border-x border-[#64748B] shadow-sm flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-[#0F172A] rounded-full" />
                </div>

                {/* Main Matte Titanium Clasp Frame with Recessed Spring Gate */}
                <div className="relative w-5 h-9 bg-gradient-to-b from-[#1E293B] via-[#334155] to-[#0F172A] rounded-b-lg border border-[#64748B]/80 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col items-center justify-between p-0.5">
                  {/* Internal Negative Cutout */}
                  <div className="w-3 h-4 rounded-md bg-[#090B0E] border border-white/10 shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* Metallic Silver Spring Gate Pin */}
                    <div className="absolute right-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F8FAFC] via-[#94A3B8] to-[#64748B] shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
                  </div>

                  {/* Machined Lower Hook Jaw Tongue clamping through the card cutout */}
                  <div className="w-3.5 h-3 rounded-b-md bg-gradient-to-b from-[#475569] via-[#334155] to-[#1E293B] border-t border-[#0F172A] shadow-[0_2px_4px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A] border border-[#64748B]/60 shadow-inner" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FULL-BLEED PHOTO GLASS DEV PASS ID CARD */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          className="relative z-20 w-[295px] sm:w-[325px] aspect-[2.63/4.08] rounded-[28px] border-2 border-white/35 hover:border-white/60 ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_25px_60px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.5)] group overflow-hidden flex flex-col justify-between p-3.5 pt-2.5 transition-all duration-500 bg-[#0B0C10]"
        >
          {/* 1. Full-Bleed Profile Image */}
          <img
            src={profileImage}
            alt={name}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[center_12%] filter contrast-[1.05] brightness-[1.02] pointer-events-none"
          />

          {/* 2. Soft Edge Vignette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 50% 35%, transparent 45%, rgba(0,0,0,0.75) 100%)',
            }}
          />

          {/* 3. Deep Bottom Readability Gradient Overlay */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              top: '32%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(8,9,12,0.4) 20%, rgba(8,9,12,0.85) 50%, rgba(8,9,12,0.97) 100%)',
            }}
          />

          {/* Inner Glass Border Line */}
          <div className="absolute inset-1 rounded-[24px] border border-white/15 pointer-events-none z-30" />

          {/* 4. Top Punched Slot Cutout for Clip Hardware */}
          <div className="w-full flex justify-center pt-0 pb-2 relative z-20">
            <div className="w-16 h-3.5 bg-[#0A0C10]/95 rounded-full border border-white/25 shadow-[inset_0_3px_6px_rgba(0,0,0,0.95),0_1px_2px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <div className="w-12 h-1 bg-[#050608] rounded-full opacity-90" />
            </div>
          </div>

          {/* 5. Dynamic Interactive Mouse Specular Sheen (Soft Light Sweep over Photo) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30 rounded-[28px]"
            style={{
              background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(255, 255, 255, 0.12), transparent 75%)`,
            }}
          />

          {/* 6. Lower Card Content Stack */}
          <div className="relative z-20 w-full flex flex-col justify-end mt-auto pt-4">
            {/* Name + Title */}
            <div className="px-1 text-left">
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase drop-shadow-md leading-tight">
                {name}
              </h3>
              <p className="text-[10px] sm:text-[11px] font-medium text-gray-300 leading-tight mt-0.5 max-w-[270px] drop-shadow-sm">
                {title || 'Senior Full-Stack Developer & Test Automation Architect'}
              </p>
            </div>

            {/* Translucent Glass Contact Info Strip */}
            <div className="w-full rounded-xl bg-black/40 backdrop-blur-md border border-white/10 p-2 my-2 flex flex-col gap-1 text-left">
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-[9px] font-medium text-gray-200 truncate">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-[9px] font-medium text-gray-200 truncate">
                  {email}
                </span>
              </div>
            </div>

            {/* ID Chip + Status Pill Row */}
            <div className="w-full flex items-center justify-between px-1 mb-2">
              {/* ID Chip */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                <User className="w-2.5 h-2.5 text-gray-400" />
                <span className="font-mono font-bold text-[8.5px] text-gray-200 tracking-wider">
                  #NK-2026
                </span>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono font-semibold text-[8px] tracking-wider text-emerald-300 uppercase">
                  {isAvailable ? 'AVAILABLE' : 'ACTIVE'}
                </span>
              </div>
            </div>

            {/* Bottom Row: QR Code + Website Tagline */}
            <div className="w-full pt-1.5 border-t border-white/10 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <div className="p-0.5 rounded-md bg-white shadow-sm flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-[#0B0B0F]" />
                </div>
                <span className="text-[8px] font-mono text-gray-400 tracking-wider uppercase font-semibold">
                  PASS
                </span>
              </div>

              <span className="text-[9.5px] font-mono font-semibold text-gray-300 tracking-wide">
                www.naveen.dev
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
