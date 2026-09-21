import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import { META } from '../styles/tokens';

const BACK_LABELS = {
  es: '← Volver al portfolio',
  en: '← Back to portfolio',
  fr: '← Retour au portfolio',
};

export default function ComingSoonPage() {
  const [pct, setPct] = useState(0);
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const projectParam = searchParams.get('project');

  // Smooth numeric counter that intentionally freezes at 75%
  useEffect(() => {
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
  }, []);

  const currentLang = (language === 'fr' || language === 'en') ? language : 'es';
  const label = projectParam
    ? `${projectParam} — ${t('home.coming_soon')}`
    : t('home.coming_soon');

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Top Nav — identical to standard subpages (About, Contact, Agora) */}
      <nav
        className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          paddingLeft: '80px',
          paddingRight: '80px',
          paddingTop: '24px',
          paddingBottom: '24px',
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'background-color 0.4s ease, border-color 0.3s ease',
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
          ← Antonio Calero
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <Link
            to="/#work"
            className="nav-link"
            style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            {t('nav.projects')}
          </Link>
          <Link
            to="/about"
            className="nav-link"
            style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            {t('nav.contact')}
          </Link>
          <LanguageSelector />
        </div>
      </nav>

      {/* Center Loader — identical in spirit and typography to ProjectLoadingScreen & IntroScreen */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 24px',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            textAlign: 'center',
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

        <Link
          to="/"
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            marginTop: '28px',
            paddingBottom: '2px',
            borderBottom: '1px solid transparent',
            transition: 'color 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderBottomColor = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderBottomColor = 'transparent';
          }}
        >
          {BACK_LABELS[currentLang]}
        </Link>
      </main>
    </div>
  );
}
