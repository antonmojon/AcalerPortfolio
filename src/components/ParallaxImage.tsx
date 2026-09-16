import { useEffect, useRef, type CSSProperties } from 'react';

interface Props {
  src: string;
  alt: string;
  height?: number;
  speed?: number;
  style?: CSSProperties;
}

export default function ParallaxImage({ src, alt, height = 760, speed = 0.25, style }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!wrap || !img) return;
        const rect = wrap.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translateY(${center * speed}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      className="parallax-wrap w-full"
      style={{ height, ...style }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="parallax-img"
        style={{ marginTop: '-7.5%' }}
      />
    </div>
  );
}
