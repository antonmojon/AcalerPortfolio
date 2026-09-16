import { Outlet, useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import FloatingThemeButton from './components/FloatingThemeButton';

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

/* ─── Page transition overlay ───────────────────────────── */
function PageTransition({ pathname }: { pathname: string }) {
  const [opacity, setOpacity] = useState(0);
  const [active, setActive] = useState(false);
  const prev = useRef(pathname);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (prev.current === pathname) return;
    prev.current = pathname;
    setActive(true);
    setOpacity(1);
    const t1 = setTimeout(() => setOpacity(0), 350);
    const t2 = setTimeout(() => setActive(false), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'var(--accent-color)',
      zIndex: 8888, pointerEvents: 'none',
      opacity, transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }} />
  );
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

  // 1. Calculate font size to match Home page exactly
  useEffect(() => {
    let mounted = true;
    const fit = () => {
      if (!mounted) return;
      const isMobile = window.innerWidth <= 768;
      const padding = isMobile ? 48 : 160;
      const available = window.innerWidth - padding;
      if (probeRef.current && available > 0) {
        probeRef.current.style.fontSize = '100px';
        const ratio = available / probeRef.current.scrollWidth;
        // Cap font size to an elegant maximum (~118px) so it doesn't blow up on wide monitors
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

  // 2. Counter animation 0% -> 100%
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let start: number | null = null;
    let raf: number;
    const DURATION = 1100;

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
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      document.body.style.overflow = '';
      cancelAnimationFrame(raf);
    };
  }, []);

  // 3. Scroll triggers the smooth glide into the masthead
  useEffect(() => {
    if (phase !== 'name') return;

    const onScroll = () => {
      setPhase('animating');
      setAnimating(true);

      // Measure target position from actual home masthead title
      let targetTop = 127;
      const homeMasthead = document.querySelector('.masthead-pad h1') || document.querySelector('.masthead-pad .scramble-line') || document.querySelector('.masthead-pad');
      if (homeMasthead) {
        const rect = homeMasthead.getBoundingClientRect();
        if (rect.top > 0) {
          targetTop = rect.top;
        }
      }

      setTargetY(targetTop);

      // Fade overlay background smoothly
      setTimeout(() => {
        setOverlayOpacity(0);
      }, 550);

      // Complete transition and unlock scroll
      setTimeout(() => {
        document.body.style.overflow = '';
        _introShown = true;
        onDone();
      }, 1250);
    };

    window.addEventListener('wheel', onScroll, { once: true, passive: true });
    window.addEventListener('touchmove', onScroll, { once: true, passive: true });
    window.addEventListener('keydown', onScroll, { once: true });

    return () => {
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('keydown', onScroll);
    };
  }, [phase, onDone]);

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
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'var(--bg-primary)',
      zIndex: 9000,
      opacity: overlayOpacity,
      transition: animating ? 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      pointerEvents: animating ? 'none' : 'auto',
      userSelect: 'none',
    }}>
      {/* Hidden probe for font measurement */}
      <span ref={probeRef} aria-hidden style={{ ...titleStyle, fontSize: '100px', position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
        ANTONIO CALERO
      </span>

      {/* Counter */}
      {phase === 'count' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            letterSpacing: '0.06em', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
          }}>
            {String(pct).padStart(3, ' ')}%
          </span>
        </div>
      )}

      {/* Name: 100% dead-centered horizontally & vertically, then glides to masthead */}
      {(phase === 'name' || phase === 'animating') && (
        <div
          className="masthead-pad"
          style={{
            position: 'absolute',
            top: animating && targetY !== null ? `${targetY}px` : '50%',
            left: 0, right: 0,
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
        <div style={{
          position: 'absolute', bottom: '8vh', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'fadeIn 0.5s ease 0.3s both',
        }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAAAAA' }}>scroll</span>
          <span className="bounce-arrow" style={{ color: '#AAAAAA', fontSize: '14px' }}>↓</span>
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
        {loading && (
          <IntroScreen onDone={() => {
            _introShown = true;
            setLoading(false);
          }} />
        )}
        <CustomCursor />
        <FloatingThemeButton />
        <PageTransition pathname={pathname} />
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', transition: 'background-color 0.4s ease' }}>
          <Outlet />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
