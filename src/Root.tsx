import { Outlet, useLocation } from 'react-router';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import FloatingThemeButton from './components/FloatingThemeButton';
import ProjectLoadingScreen from './components/ProjectLoadingScreen';
import ComingSoonOverlay from './components/ComingSoonOverlay';

/**
 * 🔒 MODO PRÓXIMAMENTE (COMING SOON)
 * - Cambia esta variable a `false` (o elimina la línea) para publicar la web completa.
 * - Puedes previsualizar la web completa en cualquier momento con: ?preview=true
 */
const COMING_SOON_MODE = false;

let _introShown = false;

/* ─── Custom cursor ─────────────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate cursor listener on desktop devices with fine pointer (mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}

/* ─── Intro Screen with Smooth Editorial Dissolve ─────────── */
function IntroScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<'count' | 'name'>('count');
  const [fading, setFading] = useState(false);

  // 1. Strictly lock body scroll during intro
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Counter animation 0% -> 100%, then clean dissolve
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const DURATION = 850;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        setTimeout(() => {
          setPhase('name');
          setTimeout(() => {
            setFading(true);
            setTimeout(() => {
              _introShown = true;
              onDone();
            }, 650);
          }, 600);
        }, 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div
      onClick={() => {
        setFading(true);
        setTimeout(() => {
          _introShown = true;
          onDone();
        }, 300);
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 9000,
        touchAction: 'none',
        overscrollBehavior: 'none',
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        pointerEvents: fading ? 'none' : 'auto',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
      }}
    >
      {/* Counter */}
      {phase === 'count' && (
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(pct).padStart(3, ' ')}%
        </span>
      )}

      {/* Name: Editorial centered flash before dissolve */}
      {phase === 'name' && (
        <div style={{ textAlign: 'center', padding: '0 24px', animation: 'fadeIn 0.3s ease both' }}>
          <span
            style={{
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(36px, 6vw, 84px)',
              letterSpacing: '-0.01em',
              lineHeight: '0.90',
              color: 'var(--hero-title-color)',
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            ANTONIO CALERO
          </span>
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginTop: '16px',
            }}
          >
            Portfolio 2026
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Root ──────────────────────────────────────────────── */
export default function Root() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(() => !_introShown && pathname === '/');

  useEffect(() => {
    const t = setTimeout(() => window.scrollTo(0, 0), 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {COMING_SOON_MODE && <ComingSoonOverlay />}
        {loading && (
          <IntroScreen onDone={() => {
            _introShown = true;
            setLoading(false);
          }} />
        )}
        <CustomCursor />
        <FloatingThemeButton />
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', transition: 'background-color 0.4s ease' }}>
          <Suspense fallback={<ProjectLoadingScreen />}>
            <Outlet />
          </Suspense>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
