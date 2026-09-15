import React, { Suspense, useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  /** Reserved height while the chunk is off-screen / loading — prevents layout jump. */
  minHeight: number;
}

const SectionFallback: React.FC<{ minHeight: number }> = ({ minHeight }) => (
  <div
    className="relative w-full px-4 sm:px-8 py-24 border-t border-white/[0.04]"
    style={{ minHeight }}
    aria-hidden="true"
  >
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
      <div className="h-7 w-40 rounded-full bg-white/5 animate-pulse" />
      <div className="h-10 w-[min(100%,28rem)] rounded-xl bg-white/[0.07] animate-pulse" />
      <div className="h-4 w-[min(100%,20rem)] rounded-lg bg-white/5 animate-pulse" />
    </div>
  </div>
);

/**
 * Defers mounting (and therefore React.lazy chunk fetch) until the placeholder
 * is near the viewport. Keeps a min-height skeleton so the page does not jump.
 */
export const LazySection: React.FC<LazySectionProps> = ({ children, minHeight }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '560px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: shouldLoad ? undefined : minHeight }}>
      {shouldLoad ? (
        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>{children}</Suspense>
      ) : (
        <SectionFallback minHeight={minHeight} />
      )}
    </div>
  );
};
