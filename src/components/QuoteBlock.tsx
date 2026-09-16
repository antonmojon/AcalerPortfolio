import type { RefObject } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function QuoteBlock() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section
      className="section-pad"
      style={{
        paddingTop: '40px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="reveal"
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <p
          className="font-medium"
          style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            lineHeight: '1.25',
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            color: 'var(--text-primary)',
          }}
        >
          {t('case.nightshift.quote')}
        </p>

        {/* Attribution */}
        <div className="flex items-center justify-end gap-4">
          <div style={{ textAlign: 'right' }}>
            <p
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.06em',
                marginBottom: '4px',
                color: 'var(--text-primary)',
              }}
            >
              Maren Kühl
            </p>
            <p
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}
            >
              {t('case.nightshift.quote_role')}
            </p>
          </div>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--accent-contrast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Space Mono", monospace',
              fontWeight: 700,
              fontSize: '13px',
              flexShrink: 0,
            }}
          >
            MK
          </div>
        </div>
      </div>
    </section>
  );
}
