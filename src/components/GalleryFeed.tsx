import type { RefObject } from 'react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryFeed() {
  const { t, getNightShiftData } = useLanguage();
  const ref = useScrollRevealAll();
  const { cards } = getNightShiftData();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '40px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* Section label */}
      <div
        className="reveal flex items-center gap-4 mb-20"
        style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}
      >
        <span
          style={{
            fontFamily: '"Special Gothic", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          {t('case.nightshift.gallery_title')}
        </span>
      </div>

      {/* Gallery grid */}
      <div
        className="gallery-grid grid w-full"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
      >
        {cards.map((card, i) => {
          const colSpans = [4, 4, 4];
          const colSpan = colSpans[i % 3];

          return (
            <div
              key={card.label}
              className="reveal gallery-card"
              style={{
                gridColumn: `span ${colSpan}`,
                transitionDelay: `${(i % 3) * 0.1}s`,
              }}
            >
              <div
                className="w-full bg-[#E5E5E5] overflow-hidden"
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="flex items-center justify-between"
                style={{ paddingTop: '16px' }}
              >
                <span
                  className="font-medium"
                  style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}
                >
                  {card.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Special Gothic", sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}
                >
                  {card.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
