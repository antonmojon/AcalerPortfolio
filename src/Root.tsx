import { Outlet, useLocation } from 'react-router';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
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

/* ─── Intro Screen: Pure Minimal Counter ─────────────────── */
function IntroScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [closing, setClosing] = useState(false);

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
        setTimeout(() => {
          setClosing(true);
          setTimeout(() => {
            _introShown = true;
            onDone();
          }, 600);
        }, 120);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.18, 0.66, 0.18, 1)',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '13px',
          letterSpacing: '0.08em',
          color: 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {pct}%
      </span>
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
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            minHeight: '100vh',
            transition: 'background-color 0.4s ease',
            ...(loading ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            } : {}),
          }}
        >
          <Suspense fallback={<ProjectLoadingScreen />}>
            <Outlet />
          </Suspense>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
