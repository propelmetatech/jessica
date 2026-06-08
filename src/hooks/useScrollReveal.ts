import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — mirrors the IntersectionObserver pattern in Contact.tsx.
 * Returns [ref, isVisible]. Attach `ref` to the sentinel element and use
 * `isVisible` to toggle Tailwind animation classes.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once, stay visible
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

/**
 * useHeroReveal — small timeout so the hero fades in immediately on mount,
 * identical to the Contact page hero.
 */
export function useHeroReveal(delay = 100) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return isVisible;
}
