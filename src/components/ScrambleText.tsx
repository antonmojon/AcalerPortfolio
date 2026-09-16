import { useState, useEffect, type CSSProperties } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function rand() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ScrambleText({ text, delay = 0, duration = 800, className, style }: Props) {
  const [output, setOutput] = useState(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : rand())).join('')
  );

  useEffect(() => {
    let raf: number;
    let start: number | null = null;

    const timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);

        setOutput(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            const charProgress = Math.max(0, (progress - (i / text.length) * 0.5) / 0.5);
            if (charProgress >= 1) return char;
            return rand();
          }).join('')
        );

        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setOutput(text);
        }
      };

      raf = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration]);

  return (
    <span
      className={className}
      style={{ ...style, fontVariantNumeric: 'tabular-nums' }}
      aria-label={text}
    >
      {output}
    </span>
  );
}
