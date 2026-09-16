import type { RefObject } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function NextProject() {
  const ref = useScrollReveal();

  return (
    <section ref={ref as RefObject<HTMLElement>} className="reveal w-full">
      <a
        href="#"
        className="next-project-block section-pad block w-full"
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: '80px',
          paddingRight: '80px',
          borderTop: '1px solid #E0E0E0',
          textDecoration: 'none',
        }}
        aria-label="Next project: Blackline"
      >
        <div className="flex items-end justify-between w-full">
          <div>
            <p
              className="np-label text-[#1A1A1A]"
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Next Project
            </p>
            <p
              className="np-title text-[#1A1A1A]"
              style={{
                fontFamily: '"Special Gothic Expanded One", sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(48px, 7vw, 108px)',
                letterSpacing: '0.01em',
                lineHeight: '0.92',
              }}
            >
              BLACKLINE
            </p>
          </div>
          <span
            className="np-arrow text-[#1A1A1A]"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: '1',
              paddingBottom: '8px',
            }}
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </a>
    </section>
  );
}
