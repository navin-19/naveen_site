import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4';

export const AnimatedBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable Autoplay Trigger for Background Video
  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', startPlayback);
      return () => {
        video.removeEventListener('loadedmetadata', startPlayback);
      };
    }
  }, [prefersReducedMotion]);

  // Subtle GSAP-based parallax / mouse tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      targetX = offsetX * 20;
      targetY = offsetY * 20;
    };

    const ticker = () => {
      if (!isRunning) return;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (parallaxLayerRef.current) {
        gsap.set(parallaxLayerRef.current, {
          x: currentX,
          y: currentY,
          force3D: true,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    gsap.ticker.add(ticker);

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [prefersReducedMotion]);

  // Animation configurations for the drifting gradient blobs
  const blob1Animation = prefersReducedMotion
    ? {}
    : {
        x: [0, 80, -40, 60, 0],
        y: [0, -60, 50, -30, 0],
        scale: [1, 1.18, 0.92, 1.1, 1],
      };

  const blob2Animation = prefersReducedMotion
    ? {}
    : {
        x: [0, -90, 50, -70, 0],
        y: [0, 70, -50, 40, 0],
        scale: [1, 0.88, 1.15, 0.95, 1],
      };

  const blob3Animation = prefersReducedMotion
    ? {}
    : {
        x: [0, 60, -80, 40, 0],
        y: [0, 80, -40, 60, 0],
        scale: [1, 1.12, 0.9, 1.08, 1],
      };

  const blob4Animation = prefersReducedMotion
    ? {}
    : {
        x: [0, -70, 60, -50, 0],
        y: [0, -50, 60, -30, 0],
        scale: [1, 0.92, 1.14, 0.98, 1],
      };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B0B0F]"
    >
      {/* 0. Full-bleed Looping Background Video (Skipped if prefersReducedMotion) */}
      {!prefersReducedMotion && (
        <>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover scale-[1.05] origin-center opacity-60"
          />
          <div className="absolute inset-0 bg-[#0B0B0F]/70" />
        </>
      )}

      <div ref={parallaxLayerRef} className="absolute inset-0 will-change-transform">
        {/* 1. Large Animated Gradient Blobs */}
        {/* Blob 1: Cyan / Neon Teal (Top-Left) */}
        <motion.div
          animate={blob1Animation}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -left-[10%] w-[650px] h-[650px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/6 blur-[130px] sm:blur-[160px] transform-gpu will-change-transform"
        />

        {/* Blob 2: Violet / Royal Purple (Top-Right) */}
        <motion.div
          animate={blob2Animation}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-[5%] -right-[10%] w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-bl from-purple-500/10 to-indigo-600/6 blur-[130px] sm:blur-[160px] transform-gpu will-change-transform"
        />

        {/* Blob 3: Deep Sky Blue / Indigo (Center-Left / Mid-Page) */}
        <motion.div
          animate={blob3Animation}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute top-[45%] -left-[15%] w-[550px] h-[550px] sm:w-[680px] sm:h-[680px] rounded-full bg-gradient-to-r from-blue-600/8 to-cyan-400/6 blur-[130px] sm:blur-[160px] transform-gpu will-change-transform"
        />

        {/* Blob 4: Emerald / Teal / Purple (Bottom-Right) */}
        <motion.div
          animate={blob4Animation}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute bottom-[-10%] -right-[10%] w-[650px] h-[650px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-tl from-emerald-500/8 via-cyan-500/6 to-purple-600/8 blur-[130px] sm:blur-[160px] transform-gpu will-change-transform"
        />

        {/* 2. Micro Dot Pattern Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* 3. Subtle Cyber Grid Lines for Modern Dashboard Feel */}
        <div
          className="absolute inset-0 opacity-[0.012] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '96px 96px',
          }}
        />
      </div>

      {/* 4. Soft Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/20 to-[#0B0B0F]/60 pointer-events-none" />
    </div>
  );
};
