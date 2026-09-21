import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const TRANSLATIONS = {
  es: {
    status: 'En Desarrollo · 2026',
    title: 'PRÓXIMAMENTE',
    desc: 'Caso de estudio en fase final de diseño y documentación editorial.',
    back: 'Volver al portfolio',
    brandBack: '← Antonio Calero',
  },
  en: {
    status: 'Work in Progress · 2026',
    title: 'COMING SOON',
    desc: 'Case study in final design and editorial documentation stage.',
    back: 'Back to portfolio',
    brandBack: '← Antonio Calero',
  },
  fr: {
    status: 'En Développement · 2026',
    title: 'BIENTÔT DISPONIBLE',
    desc: 'Étude de cas en phase finale de conception et documentation éditoriale.',
    back: 'Retour au portfolio',
    brandBack: '← Antonio Calero',
  },
};

export default function ComingSoonPage() {
  const [pct, setPct] = useState(0);
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const projectParam = searchParams.get('project');

  const currentLang = (language === 'fr' || language === 'en') ? language : 'es';
  const t = TRANSLATIONS[currentLang];

  // Smooth numeric counter that intentionally freezes at 75%
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const DURATION = 1200;
    const TARGET = 75;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * TARGET);
      setPct(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(TARGET);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 80px',
        boxSizing: 'border-box',
        transition: 'background-color 0.4s ease',
        userSelect: 'none',
      }}
      className="section-pad"
    >
      {/* Top Bar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: '"Special Gothic Expanded One", sans-serif',
            fontSize: '15px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          {t.brandBack}
        </Link>
        <LanguageSelector />
      </nav>

      {/* Dead-Center Coming Soon Block */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '8px',
          margin: 'auto 0',
          padding: '40px 0',
        }}
      >
        {/* Status Indicator with pulse dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
              display: 'inline-block',
              animation: 'pulse 1.4s infinite ease-in-out',
            }}
          />
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-color)',
              fontWeight: 700,
            }}
          >
            {t.status}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '14px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            fontWeight: 700,
            margin: '0',
          }}
        >
          {projectParam ? `${t.title} · ${projectParam}` : t.title}
        </h1>

        {/* Counter frozen at 75% */}
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
            fontVariantNumeric: 'tabular-nums',
            marginTop: '2px',
          }}
        >
          {String(pct).padStart(3, ' ')}%
        </span>

        {/* Hairline Progress Bar */}
        <div
          style={{
            width: '160px',
            height: '2px',
            backgroundColor: 'var(--border-color)',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              backgroundColor: 'var(--accent-color)',
              transition: 'width 0.08s ease-out',
            }}
          />
        </div>

        {/* Explanatory note */}
        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            maxWidth: '360px',
            lineHeight: '1.7',
            margin: '0',
          }}
        >
          {t.desc}
        </p>

        {/* Return link */}
        <Link
          to="/"
          style={{
            marginTop: '32px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            padding: '10px 22px',
            border: '1px solid var(--border-color)',
            transition: 'border-color 0.25s ease, color 0.25s ease, transform 0.2s ease',
          }}
          className="coming-soon-btn"
        >
          ← {t.back}
        </Link>
      </main>

      {/* Bottom Footer mark */}
      <footer style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Capa Zero · Madrid, España
        </span>
      </footer>
    </div>
  );
}
