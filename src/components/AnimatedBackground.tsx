import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useMediaQuery';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4';

export const AnimatedBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const [heroInView, setHeroInView] = useState(true);

  // Pause the looping background video when the hero is off-screen or the tab is hidden
  useEffect(() => {
    if (prefersReducedMotion) return;

    const hero = document.getElementById('home');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      const shouldPlay = heroInView && !document.hidden;
      if (shouldPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const startPlayback = () => {
      syncPlayback();
    };

    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', startPlayback);
    }

    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();

    return () => {
      video.removeEventListener('loadedmetadata', startPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [prefersReducedMotion, heroInView]);

  // Mouse parallax — desktop only; GSAP is dynamically imported so it stays out of the main bundle
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let cancelled = false;
    let ticker: (() => void) | null = null;
    let gsapTicker: { add: (fn: () => void) => void; remove: (fn: () => void) => void } | null =
      null;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 16;
      targetY = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * 16;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    import('gsap').then(({ default: gsap }) => {
      if (cancelled) return;
      gsapTicker = gsap.ticker;
      ticker = () => {
        const diffX = targetX - currentX;
        const diffY = targetY - currentY;
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
      gsap.ticker.add(ticker);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('mousemove', onMove);
      if (gsapTicker && ticker) gsapTicker.remove(ticker);
    };
  }, [prefersReducedMotion, isMobile]);

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
      {!prefersReducedMotion && (
        <>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload={isMobile ? 'metadata' : 'auto'}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover scale-[1.03] origin-center opacity-55"
          />
          <div className="absolute inset-0 bg-[#0B0B0F]/70" />
        </>
      )}

      <div ref={parallaxLayerRef} className="absolute inset-0">
        <motion.div
          animate={blob1Animation}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -left-[10%] w-[280px] h-[280px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/6 blur-[48px] sm:blur-[140px] transform-gpu"
        />

        <motion.div
          animate={blob2Animation}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="absolute -top-[5%] -right-[10%] w-[240px] h-[240px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-bl from-purple-500/10 to-indigo-600/6 blur-[48px] sm:blur-[140px] transform-gpu"
        />

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

        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none hidden sm:block"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.012] pointer-events-none hidden sm:block"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '96px 96px',
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/20 to-[#0B0B0F]/60 pointer-events-none" />
    </div>
  );
};
