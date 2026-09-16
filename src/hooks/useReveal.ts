import { useRef, useEffect } from 'react';

export function useReveal(threshold = 0.08, rootMargin = '0px 0px -32px 0px') {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

export function useRevealAll(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const targets: Element[] = [];
    if (container.matches('.reveal, .reveal-left, .clip-wipe')) {
      targets.push(container);
    }
    targets.push(...Array.from(container.querySelectorAll('.reveal, .reveal-left, .clip-wipe')));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      }),
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
