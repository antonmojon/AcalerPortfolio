import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const LABELS = {
  es: {
    status: 'PRÓXIMAMENTE',
    sub: 'Portfolio en fase final de desarrollo',
  },
  en: {
    status: 'COMING SOON',
    sub: 'Portfolio in final development stage',
  },
  fr: {
    status: 'BIENTÔT DISPONIBLE',
    sub: 'Portfolio en phase finale de développement',
  },
};

export default function ComingSoonOverlay() {
  const [pct, setPct] = useState(0);
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

  // Allow secret preview via ?preview=true or session
  const [previewUnlocked, setPreviewUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      new URLSearchParams(window.location.search).get('preview') === 'true' ||
      sessionStorage.getItem('ac_preview_unlocked') === '1'
    );
  });

  useEffect(() => {
    if (searchParams.get('preview') === 'true') {
      sessionStorage.setItem('ac_preview_unlocked', '1');
      setPreviewUnlocked(true);
    }
  }, [searchParams]);

  // Lock body scroll while overlay is active
  useEffect(() => {
    if (!previewUnlocked) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [previewUnlocked]);

  // Smooth numeric counter that intentionally freezes at 75%
  useEffect(() => {
    if (previewUnlocked) return;

    let start: number | null = null;
    let raf: number;
    const DURATION = 900;
    const TARGET = 75;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
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
  }, [previewUnlocked]);

  if (previewUnlocked) return null;

  const currentLang = (language === 'fr' || language === 'en') ? language : 'es';
  const t = LABELS[currentLang];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vh, 32px) clamp(20px, 5vw, 80px)',
        boxSizing: 'border-box',
        userSelect: 'none',
        transition: 'background-color 0.4s ease',
      }}
      className="nav-pad section-pad"
    >
      {/* Top Bar: Brand & Language only — Zero navigation links */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: '"Special Gothic Expanded One", sans-serif',
            fontSize: 'clamp(13px, 3.5vw, 15px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          Antonio Calero
        </span>

        <LanguageSelector />
      </header>

      {/* Dead-centered Minimalist Swiss Loader */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 'clamp(11px, 2.8vw, 12px)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          {t.status}
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 'clamp(11px, 2.8vw, 12px)',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(pct).padStart(3, ' ')}%
        </span>
      </main>

      {/* Bottom Quiet Footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          flexWrap: 'wrap',
          gap: '12px',
          transition: 'border-color 0.4s ease',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          Madrid · 2026
        </span>

        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          UI/UX &amp; Product Design
        </span>
      </footer>
    </div>
  );
}
