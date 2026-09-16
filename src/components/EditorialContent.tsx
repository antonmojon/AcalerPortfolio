import type { RefObject } from 'react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function EditorialContent() {
  const { t, getNightShiftData } = useLanguage();
  const ref = useScrollRevealAll();
  const data = getNightShiftData();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div
        className="editorial-grid grid w-full"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
      >
        {/* Left: 4 cols — metadata */}
        <div className="reveal-left" style={{ gridColumn: 'span 4' }}>
          <div style={{ paddingTop: '6px' }}>
            <p
              className="mb-8"
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
              }}
            >
              {t('case.nightshift.team_title')}
            </p>
            <div
              style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-secondary)' }}
            >
              {data.disciplines.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div style={{ marginTop: '48px' }}>
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {t('case.nightshift.year_title')}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                2022
              </p>
            </div>
            <div style={{ marginTop: '48px' }}>
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {t('case.nightshift.services_title')}
              </p>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                {data.deliverables.map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 8 cols — content */}
        <div
          className="reveal stagger-children"
          style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '56px' }}
        >
          {/* Summary */}
          <p
            className="font-normal"
            style={{ fontSize: '28px', lineHeight: '1.45', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
          >
            {t('case.nightshift.headline')}
          </p>

          {/* Text blocks */}
          {data.blocks.map((block) => (
            <div key={block.label} className="reveal">
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {block.label}
              </p>
              <p
                className="font-normal"
                style={{ fontSize: '18px', lineHeight: '1.65', color: 'var(--text-primary)' }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
