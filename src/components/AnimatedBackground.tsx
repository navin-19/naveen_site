import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4';

export const AnimatedBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Optimized GSAP Parallax (only runs on desktop fine-pointer devices when needed)
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      targetX = offsetX * 16;
      targetY = offsetY * 16;
    };

    const ticker = () => {
      if (!isRunning) return;
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;

      // Only update DOM when movement is noticeable
      if (Math.abs(diffX) > 0.05 || Math.abs(diffY) > 0.05) {
        currentX += diffX * 0.06;
        currentY += diffY * 0.06;

        if (parallaxLayerRef.current) {
          gsap.set(parallaxLayerRef.current, {
            x: currentX,
            y: currentY,
            force3D: true,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    gsap.ticker.add(ticker);

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [prefersReducedMotion, isMobile]);

  // Animation configurations for the drifting gradient blobs (desktop only)
  const shouldAnimateBlobs = !prefersReducedMotion && !isMobile;

  const blob1Animation = shouldAnimateBlobs
    ? {
        x: [0, 60, -30, 45, 0],
        y: [0, -45, 35, -20, 0],
        scale: [1, 1.12, 0.95, 1.08, 1],
      }
    : {};

  const blob2Animation = shouldAnimateBlobs
    ? {
        x: [0, -70, 40, -50, 0],
        y: [0, 50, -40, 30, 0],
        scale: [1, 0.92, 1.1, 0.96, 1],
      }
    : {};

  const blob3Animation = shouldAnimateBlobs
    ? {
        x: [0, 45, -60, 30, 0],
        y: [0, 60, -30, 45, 0],
        scale: [1, 1.08, 0.92, 1.05, 1],
      }
    : {};

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0B0B0F]"
    >
      {/* 0. Full-bleed Looping Background Video */}
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
            className="absolute inset-0 w-full h-full object-cover scale-[1.03] origin-center opacity-55"
          />
          <div className="absolute inset-0 bg-[#0B0B0F]/70" />
        </>
      )}

      <div ref={parallaxLayerRef} className="absolute inset-0 will-change-transform">
        {/* 1. Optimized Ambient Gradient Blobs */}
        {/* Blob 1: Cyan / Neon Teal (Top-Left) */}
        <motion.div
          animate={blob1Animation}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -left-[10%] w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/6 blur-[80px] sm:blur-[140px] transform-gpu"
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
          className="absolute -top-[5%] -right-[10%] w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-bl from-purple-500/10 to-indigo-600/6 blur-[80px] sm:blur-[140px] transform-gpu"
        />

        {/* Blob 3: Mid-page ambient wash (Hidden on small mobile to conserve GPU fill-rate) */}
        <motion.div
          animate={blob3Animation}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="hidden sm:block absolute top-[45%] -left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/8 to-cyan-400/6 blur-[140px] transform-gpu"
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
