import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { GalleryItem } from '../data/portfolioData';
import {
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Tag,
} from 'lucide-react';

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
  reducedMotion: boolean;
  isTouchDevice: boolean;
}

const GalleryTile: React.FC<GalleryTileProps> = ({
  item,
  index,
  onClick,
  reducedMotion,
  isTouchDevice,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven rotation values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Map pointer offset (−0.5..0.5) → rotation (±12°)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [reducedMotion, isTouchDevice, mouseX, mouseY, glareX, glareY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  }, [mouseX, mouseY, glareX, glareY]);

  // Glare gradient as a derived string
  const glareGradient = useTransform(
    [glareX, glareY] as const,
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.13), transparent 62%)`
  );

  // Entrance stagger animation
  const tileVariants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30, scale: 0.92, rotateX: 8 },
    visible: reducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: index * 0.07,
          },
        },
  };

  return (
    <motion.div
      variants={tileVariants}
      style={reducedMotion || isTouchDevice ? {} : { perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
        style={
          reducedMotion || isTouchDevice
            ? {}
            : { rotateX, rotateY, transformStyle: 'preserve-3d' }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer
                   shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                   hover:border-cyan-500/50 hover:shadow-[0_16px_48px_rgba(6,182,212,0.2)]
                   transition-[border-color,box-shadow] duration-300 glass-card"
      >
        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/30 to-transparent" />

          {/* Category badge */}
          <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                           bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[11px] font-semibold text-cyan-300">
            <Tag className="w-3 h-3" />
            {item.category}
          </span>

          {/* Zoom icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Card info */}
        <div className="p-4 relative z-10">
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {item.caption}
          </p>
        </div>

        {/* Glare overlay — GPU composited, only on non-touch non-reduced-motion */}
        {!reducedMotion && !isTouchDevice && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: glareGradient }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryLightbox: React.FC<LightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const item = items[activeIndex];

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Modal window — same spring as ProjectModal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl rounded-3xl glass-panel-glow border border-cyan-500/30
                   shadow-[0_0_60px_rgba(6,182,212,0.2)] z-10 overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md
                     border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close gallery lightbox"
          id="gallery-lightbox-close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
          {activeIndex + 1} / {items.length}
        </div>

        {/* Image — cross-fade on change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full max-h-[55vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Info */}
        <div className="p-6 sm:p-8 pb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                           bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300 mb-3">
            <Tag className="w-3 h-3" />
            {item.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{item.caption}</p>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center gap-3 px-6 sm:px-8 pb-6 pt-2">
          <button
            onClick={onPrev}
            disabled={activeIndex === 0}
            id="gallery-lightbox-prev"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-panel border border-white/10
                       text-sm font-semibold text-white hover:bg-white/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous gallery item"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={activeIndex === items.length - 1}
            id="gallery-lightbox-next"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white
                       shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                       disabled:opacity-30 disabled:cursor-not-allowed
                       hover:scale-[1.02] transition-all"
            aria-label="Next gallery item"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Gallery Section ──────────────────────────────────────────────────────────

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Detect touch-only devices (no hover) — skip 3D tilt, show tap-to-open grid
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none)').matches;

  const galleryItems = portfolioData.gallery;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () =>
    setLightboxIndex((i) =>
      i !== null && i < galleryItems.length - 1 ? i + 1 : i
    );

  // Grid stagger container — children pick up the stagger via variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  return (
    <section id="gallery" className="py-24 relative px-4 sm:px-8 z-10 overflow-hidden">
      {/* Decorative ambient glow centered behind grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header — exact same pattern as ProjectsSection */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                       bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold
                       text-cyan-300 uppercase tracking-widest mb-4"
          >
            <Images className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Design <span className="text-gradient-purple">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base mt-3"
          >
            A curated showcase of UI designs, dashboards, and engineering interfaces
            {!isTouchDevice && ' — hover to explore in 3D'}.
          </motion.p>
        </div>

        {/* 3D Tilt Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={index}
              onClick={() => openLightbox(index)}
              reducedMotion={prefersReducedMotion}
              isTouchDevice={isTouchDevice}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={galleryItems}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
