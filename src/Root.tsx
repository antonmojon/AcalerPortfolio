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

/* ─── Intro Screen with Seamless Title Transition ─────────── */
type IntroPhase = 'count' | 'name' | 'animating';

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>('count');
  const [targetY, setTargetY] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fs, setFs] = useState<number | null>(null);

  const phaseRef = useRef<IntroPhase>('count');
  phaseRef.current = phase;
  const animatingRef = useRef(false);
  animatingRef.current = animating;
  const startGlideRef = useRef<() => void>(() => {});

  // 1. Calculate font size to match Home page exactly
  useEffect(() => {
    let mounted = true;
    const fit = () => {
      if (!mounted) return;
      // First check if home page title already rendered its font size
      const homeSpan = document.querySelector('.masthead-pad .scramble-line span') as HTMLElement | null;
      if (homeSpan) {
        const computedFs = parseFloat(window.getComputedStyle(homeSpan).fontSize);
        if (computedFs > 0) {
          setFs(computedFs);
          return;
        }
      }
      const isMobile = window.innerWidth <= 768;
      const padding = isMobile ? 48 : 160;
      const available = window.innerWidth - padding;
      if (probeRef.current && available > 0) {
        probeRef.current.style.fontSize = '100px';
        const ratio = available / probeRef.current.scrollWidth;
        const calculated = Math.floor(100 * ratio);
        setFs(Math.min(calculated, 118));
      }
    };
    fit();
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (mounted) fit();
      });
    }
    window.addEventListener('resize', fit);
    return () => {
      mounted = false;
      window.removeEventListener('resize', fit);
    };
  }, []);

  // 2. Strict scroll lock & global wheel blocker to prevent background scroll
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const onWheel = (e: WheelEvent) => {
      // 100% prevent any scroll from leaking to the background home page
      e.preventDefault();
      if (phaseRef.current === 'name' && !animatingRef.current) {
        if (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2) {
          startGlideRef.current();
        }
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (phaseRef.current === 'name' && !animatingRef.current) {
        if (Math.abs(e.touches[0].clientY - touchStartY) > 6) {
          startGlideRef.current();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'Enter', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        if (phaseRef.current === 'name' && !animatingRef.current) {
          startGlideRef.current();
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // 3. Counter animation 0% -> 100%
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const DURATION = 950;

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
        }, 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  // 4. Glide trigger implementation
  const startGlide = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setPhase('animating');

    // Measure target position from actual home masthead title
    let targetTop = 127;
    const homeMasthead =
      document.querySelector('.masthead-pad .scramble-line') ||
      document.querySelector('.masthead-pad h1') ||
      document.querySelector('.masthead-pad');
    if (homeMasthead) {
      const rect = homeMasthead.getBoundingClientRect();
      if (rect.top > 0) {
        targetTop = rect.top;
      }
    }
    setTargetY(targetTop);

    // Fade overlay background smoothly to reveal the rock-solid Home behind it
    setTimeout(() => {
      setOverlayOpacity(0);
    }, 550);

    // Complete transition and unlock scroll
    setTimeout(() => {
      _introShown = true;
      onDone();
    }, 1250);
  }, [onDone]);

  startGlideRef.current = startGlide;

  const titleStyle = {
    fontFamily: '"Special Gothic Expanded One", sans-serif',
    fontWeight: 400,
    fontSize: fs ? `${fs}px` : '100px',
    letterSpacing: '-0.01em',
    lineHeight: '0.88',
    color: 'var(--hero-title-color)',
    display: 'block',
    whiteSpace: 'nowrap' as const,
    transition: 'color 0.4s ease',
  };

  return (
    <div
      onClick={() => {
        if (phase === 'name' && !animating) {
          startGlide();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 9000,
        touchAction: 'none',
        overscrollBehavior: 'none',
        opacity: overlayOpacity,
        transition: animating ? 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        pointerEvents: animating ? 'none' : 'auto',
        userSelect: 'none',
        cursor: phase === 'name' && !animating ? 'pointer' : 'default',
      }}
    >
      {/* Hidden probe for font measurement */}
      <span
        ref={probeRef}
        aria-hidden
        style={{ ...titleStyle, fontSize: '100px', position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      >
        ANTONIO CALERO
      </span>

      {/* Counter */}
      {phase === 'count' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        </div>
      )}

      {/* Name: 100% centered horizontally & vertically, then glides to masthead */}
      {(phase === 'name' || phase === 'animating') && (
        <div
          className="masthead-pad"
          style={{
            position: 'absolute',
            top: animating && targetY !== null ? `${targetY}px` : '50%',
            left: 0,
            right: 0,
            transform: animating ? 'translateY(0%)' : 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 0,
            paddingLeft: '80px',
            paddingRight: '80px',
            boxSizing: 'border-box',
            transition: animating
              ? 'top 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none',
            willChange: 'top, transform',
          }}
        >
          <span style={{ ...titleStyle, width: '100%', textAlign: 'center' }}>
            ANTONIO CALERO
          </span>
        </div>
      )}

      {/* Scroll indicator */}
      {phase === 'name' && !animating && (
        <div
          style={{
            position: 'absolute',
            bottom: '8vh',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.5s ease 0.3s both',
          }}
        >
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#AAAAAA',
            }}
          >
            scroll
          </span>
          <span className="bounce-arrow" style={{ color: '#AAAAAA', fontSize: '14px' }}>
            ↓
          </span>
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
