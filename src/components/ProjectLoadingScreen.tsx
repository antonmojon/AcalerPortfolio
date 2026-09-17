import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LABELS = {
  es: 'CARGANDO PROYECTO',
  en: 'LOADING PROJECT',
  fr: 'CHARGEMENT DU PROJET',
};

/**
 * Editorial Swiss Project Loading Screen
 * Identical in spirit and minimalist structure to the Intro Screen:
 * Dead-centered Space Mono typography with a smooth numeric counter 0% -> 100%.
 * Includes 180ms debounce so fast loads don't flash.
 */
export default function ProjectLoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);
  const { language } = useLanguage();

  // 1. Debounce threshold (180ms)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('preview-loader')) {
      setVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  // 2. Counter animation 0% -> 100%
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const DURATION = 900;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const currentLang = (language === 'fr' || language === 'en') ? language : 'es';
  const label = LABELS[currentLang];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        userSelect: 'none',
        transition: 'background-color 0.4s ease',
      }}
    >
      <span
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          letterSpacing: '0.06em',
          color: 'var(--text-secondary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(pct).padStart(3, ' ')}%
      </span>
    </div>
  );
}
