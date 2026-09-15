import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Narrow viewport or coarse pointer — treat as mobile for GPU/animation budget. */
export function useIsMobile(): boolean {
  const narrow = useMediaQuery('(max-width: 767px)');
  const coarse = useMediaQuery('(pointer: coarse)');
  return narrow || coarse;
}
