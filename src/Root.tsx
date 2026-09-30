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

const META = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  lineHeight: '1.5',
};

/* ─── Intro Screen with Seamless Title Transition ─────────── */
type IntroPhase = 'drafting' | 'name' | 'animating';

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>('drafting');
  const [targetY, setTargetY] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fs, setFs] = useState<number | null>(null);

  const phaseRef = useRef<IntroPhase>('drafting');
  phaseRef.current = phase;
  const animatingRef = useRef(false);
  animatingRef.current = animating;
  const startGlideRef = useRef<() => void>(() => {});

  // 1. Calculate font size to match Home page exactly and never overflow
  useEffect(() => {
    let mounted = true;
    const fit = () => {
      if (!mounted) return;
      const isMobile = window.innerWidth <= 768;
      const horizontalPad = isMobile ? 48 : 160;
      const available = Math.max(window.innerWidth - horizontalPad, 200);

      const probe = probeRef.current;
      if (probe) {
        probe.style.fontSize = '100px';
        const probeWidth = probe.scrollWidth;
        if (probeWidth > 0) {
          const ratio = available / probeWidth;
          const calculated = Math.floor(100 * ratio);
          // Match Home page: cap at 118px on large screens, proportionally scale down on smaller screens
          setFs(Math.min(calculated, 118));
        }
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

  // 2. Blueprint Architectural Fill Animation: Wireframe -> Solid Ink Wipe
  useEffect(() => {
    let start: number | null = null;
    let rafId: number;
    const DURATION = 1350; // 1.35s organic mechanical sweep

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const p = Math.min(elapsed / DURATION, 1);
      // Smooth architectural plotter curve
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(eased * 100);

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setPhase('name');
        }, 260);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 3. Glide trigger implementation
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

  // 4. Strict scroll lock & interaction handlers (skip drafting or glide)
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const triggerAction = () => {
      if (animatingRef.current) return;
      if (phaseRef.current === 'drafting') {
        setProgress(100);
        setPhase('name');
        startGlideRef.current();
      } else if (phaseRef.current === 'name') {
        startGlideRef.current();
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!animatingRef.current && (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2)) {
        triggerAction();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!animatingRef.current && Math.abs(e.touches[0].clientY - touchStartY) > 6) {
        triggerAction();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'Enter', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        triggerAction();
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

  const titleStyle = {
    fontFamily: '"Special Gothic Expanded One", sans-serif',
    fontWeight: 400,
    fontSize: fs ? `${fs}px` : 'clamp(28px, 6.5vw, 118px)',
    letterSpacing: '-0.01em',
    lineHeight: '0.88',
    display: 'block',
    whiteSpace: 'nowrap' as const,
    transition: 'color 0.4s ease',
  };

  return (
    <div
      onClick={() => {
        if (!animating) {
          if (phase === 'drafting') {
            setProgress(100);
            setPhase('name');
            startGlide();
          } else if (phase === 'name') {
            startGlide();
          }
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
        cursor: !animating ? 'pointer' : 'default',
      }}
    >
      {/* Hidden probe for font measurement */}
      <span
        ref={probeRef}
        aria-hidden
        style={{
          fontFamily: '"Special Gothic Expanded One", sans-serif',
          fontWeight: 400,
          fontSize: '100px',
          letterSpacing: '-0.01em',
          lineHeight: '0.88',
          position: 'fixed',
          left: -9999,
          top: -9999,
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        ANTONIO CALERO
      </span>

      {/* Blueprint Construction Frame: Perfectly centered, fills from wireframe to solid ink */}
      <div
        style={{
          position: 'absolute',
          top: animating && targetY !== null ? `${targetY}px` : '50%',
          left: 0,
          right: 0,
          transform: animating ? 'translateY(0%)' : 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingLeft: animating ? (window.innerWidth <= 768 ? '24px' : '80px') : '24px',
          paddingRight: animating ? (window.innerWidth <= 768 ? '24px' : '80px') : '24px',
          paddingTop: 0,
          paddingBottom: 0,
          boxSizing: 'border-box',
          width: '100%',
          transition: animating
            ? 'top 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), padding 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
          willChange: 'top, transform',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          {/* Top technical dimension bar */}
          <div
            style={{
              position: 'absolute',
              top: '-26px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed var(--border-color)',
              paddingBottom: '4px',
              opacity: phase === 'name' || animating ? 0 : 0.75,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <span style={{ ...META, fontSize: '9px', letterSpacing: '0.08em' }}>DIM: 1920 × 1080</span>
            <span style={{ ...META, fontSize: '9px', letterSpacing: '0.08em', color: 'var(--accent-color)', fontWeight: 700 }}>
              {progress < 100 ? `PLANO TÉCNICO · ${Math.floor(progress)}%` : 'TRAZADO 100%'}
            </span>
            <span style={{ ...META, fontSize: '9px', letterSpacing: '0.08em' }}>ESCALA 1:1</span>
          </div>

          {/* Corner drafting marks */}
          <span className="blueprint-corner blueprint-corner-tl" style={{ top: '-14px', left: '-14px', opacity: phase === 'name' || animating ? 0 : 0.75, transition: 'opacity 0.4s ease' }} />
          <span className="blueprint-corner blueprint-corner-tr" style={{ top: '-14px', right: '-14px', opacity: phase === 'name' || animating ? 0 : 0.75, transition: 'opacity 0.4s ease' }} />
          <span className="blueprint-corner blueprint-corner-bl" style={{ bottom: '-14px', left: '-14px', opacity: phase === 'name' || animating ? 0 : 0.75, transition: 'opacity 0.4s ease' }} />
          <span className="blueprint-corner blueprint-corner-br" style={{ bottom: '-14px', right: '-14px', opacity: phase === 'name' || animating ? 0 : 0.75, transition: 'opacity 0.4s ease' }} />

          {/* Double Layer Title: Layer 1 Wireframe + Layer 2 Solid Ink Fill with clipPath */}
          <div style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
            {/* Layer 1: Blueprint Wireframe Stroke (always defines structure) */}
            <span
              style={{
                ...titleStyle,
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--hero-title-color)',
                opacity: 0.32,
                userSelect: 'none',
              }}
            >
              ANTONIO CALERO
            </span>

            {/* Layer 2: Solid Filled Ink (reveals with clip-path as plotter sweeps) */}
            <span
              style={{
                ...titleStyle,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                color: 'var(--hero-title-color)',
                clipPath: `inset(0 ${Math.max(0, 100 - progress)}% 0 0)`,
                userSelect: 'none',
              }}
            >
              ANTONIO CALERO
            </span>

            {/* Layer 3: Vertical Drafting Laser / Beam */}
            {progress < 100 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${progress}%`,
                  width: '2px',
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 0 8px var(--accent-color)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '9px',
                    lineHeight: 1,
                    color: 'var(--accent-color)',
                  }}
                >
                  ▼
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '9px',
                    lineHeight: 1,
                    color: 'var(--accent-color)',
                  }}
                >
                  ▲
                </span>
              </div>
            )}
          </div>

          {/* Bottom technical ruler baseline */}
          <div
            style={{
              position: 'absolute',
              bottom: '-26px',
              left: 0,
              right: 0,
              borderTop: '1px dashed var(--border-color)',
              paddingTop: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: phase === 'name' || animating ? 0 : 0.75,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <span style={{ ...META, fontSize: '9px' }}>├───────</span>
            <span style={{ ...META, fontSize: '9px', color: 'var(--text-secondary)' }}>CAPA ZERO · PLANO DE TRAZADO</span>
            <span style={{ ...META, fontSize: '9px' }}>───────┤</span>
          </div>
        </div>
      </div>

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
            animation: 'fadeIn 0.5s ease 0.2s both',
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

/* ─── Blueprint Architectural Guidelines ──────────────────── */
function BlueprintGuides() {
  return (
    <div
      className="blueprint-guides"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      <div className="blueprint-guide-left" />
      <div className="blueprint-guide-right" />
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
          className="blueprint-bg"
          style={{
            minHeight: '100vh',
            transition: 'background-color 0.4s ease',
            position: 'relative',
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
          <BlueprintGuides />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Suspense fallback={<ProjectLoadingScreen />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
