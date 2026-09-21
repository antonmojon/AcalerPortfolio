import { useState, useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import { useReveal } from '../hooks/useReveal';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

/* ─── Tokens ───────────────────────────────────────────────── */
const META = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  lineHeight: '1.5',
};

/* ─── Nav ──────────────────────────────────────────────────── */
function PortfolioNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav
      className="home-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 80px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.3s ease',
      }}
    >
      <span style={{ ...META, color: 'var(--hero-title-color)', fontWeight: 700, letterSpacing: '0.08em', transition: 'color 0.4s ease' }}>Capa Zero</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <a href="#work" className="nav-link" style={META}>{t('nav.projects')}</a>
        <Link to="/about" className="nav-link" style={{ ...META, textDecoration: 'none' }}>{t('nav.about')}</Link>
        <Link to="/contact" className="nav-link" style={{ ...META, textDecoration: 'none' }}>{t('nav.contact')}</Link>
        <LanguageSelector />
      </div>
    </nav>
  );
}

/* ─── Fit-width title ───────────────────────────────────────── */
function FitTitle({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fs, setFs] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const fit = () => {
      if (!mounted) return;
      const wrap = wrapRef.current;
      const probe = probeRef.current;
      if (!wrap || !probe) return;
      const available = wrap.offsetWidth;
      probe.style.fontSize = '100px';
      const ratio = available / probe.scrollWidth;
      const calculated = Math.floor(100 * ratio);
      setFs(Math.min(calculated, 118));
    };
    fit();
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (mounted) fit();
      });
    }
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      mounted = false;
      ro.disconnect();
    };
  }, []);

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
    <div ref={wrapRef} style={{ width: '100%', overflow: 'hidden', opacity: fs ? 1 : 0, transition: 'opacity 0.2s ease' }}>
      <span ref={probeRef} aria-hidden style={{ ...titleStyle, fontSize: '100px', position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>{text}</span>
      <div className="scramble-line">
        <span style={titleStyle}>{text}</span>
      </div>
    </div>
  );
}

/* ─── Masthead ─────────────────────────────────────────────── */
function PortfolioMasthead() {
  const { t } = useLanguage();
  return (
    <header className="masthead-pad" style={{ paddingTop: '88px', paddingLeft: '80px', paddingRight: '80px' }}>
      <div style={{ borderTop: '2px solid var(--accent-color)', paddingTop: '12px', marginBottom: '8px', transition: 'border-color 0.4s ease' }}>
        <span style={{ ...META, color: 'var(--text-muted)' }}>{t('home.est')}</span>
      </div>
      <FitTitle text="ANTONIO CALERO" />
      <div className="infobar" style={{
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        alignItems: 'center',
        transition: 'border-color 0.4s ease',
      }}>
        {[t('home.discipline'), t('home.location')].map((item, i) => (
          <div key={item} style={{
            padding: '10px 0',
            borderRight: '1px solid var(--border-color)',
            paddingRight: '20px',
            paddingLeft: i > 0 ? '20px' : '0',
            transition: 'border-color 0.4s ease',
          }}>
            <span style={META}>{item}</span>
          </div>
        ))}
        <Link to="/contact" style={{
          ...META, color: 'var(--accent-color)', textDecoration: 'none',
          padding: '10px 0 10px 20px',
          display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          fontWeight: 700,
        }}>
          {t('nav.contact')} →
        </Link>
      </div>
    </header>
  );
}

import type { ProjectItemData } from '../context/LanguageContext';

function StoryCard({ project }: { project: ProjectItemData }) {
  const { t } = useLanguage();
  const [over, setOver] = useState(false);
  const imgH = project.large ? 440 : 300;
  const titleSize = project.large ? 'clamp(28px, 3vw, 48px)' : 'clamp(20px, 2vw, 30px)';

  const inner = (
    <article
      style={{
        gridColumn: `span ${project.cols}`,
        cursor: project.href ? 'none' : 'default',
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      aria-label={project.href ? `Ver proyecto ${project.title}` : `${project.title} — ${t('home.coming_soon')}`}
    >
      <div style={{ overflow: 'hidden', height: `${imgH}px`, backgroundColor: 'var(--bg-surface)', marginBottom: '16px' }}>
        <img
          src={project.img ?? ''}
          alt={project.title}
          className="work-card-img"
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: `grayscale(${over ? 0 : 12}%) contrast(1.04)`,
            transition: 'filter 0.5s ease',
          }}
        />
      </div>
      <div style={{ paddingTop: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...META, color: 'var(--text-muted)' }}>{project.num}</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          {project.tags.map(t => <span key={t} style={META}>{t}</span>)}
          <span style={{ ...META, color: 'var(--text-muted)' }}>{project.year}</span>
        </div>
      </div>
      <span style={{
        fontFamily: '"Special Gothic", sans-serif',
        fontWeight: 700,
        fontSize: titleSize,
        letterSpacing: '-0.02em',
        lineHeight: '1.05',
        color: 'var(--text-primary)',
        borderBottom: over ? '2px solid var(--accent-color)' : '2px solid transparent',
        paddingBottom: '1px',
        transition: 'border-color 0.25s ease, color 0.4s ease',
        display: 'inline',
      }}>
        {project.title}
        <span style={{
          marginLeft: '8px', fontSize: '0.7em',
          opacity: over ? 1 : 0,
          transform: over ? 'translateX(0)' : 'translateX(-4px)',
          display: 'inline-block',
          color: 'var(--accent-color)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>→</span>
      </span>
      {!project.href && (
        <p style={{ ...META, color: 'var(--text-muted)', marginTop: '8px', fontSize: '10px' }}>{t('home.coming_soon')}</p>
      )}
    </article>
  );

  if (project.href) {
    return (
      <Link to={project.href} style={{ gridColumn: `span ${project.cols}`, textDecoration: 'none', display: 'contents' }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

function PortfolioNewsGrid() {
  const { getProjects } = useLanguage();
  const ref = useReveal();
  const projects = getProjects();
  const rowA = projects.slice(0, 2);
  const rowB = projects.slice(2);

  return (
    <section
      id="work"
      ref={ref as RefObject<HTMLElement>}
      className="reveal news-grid-section"
      style={{ padding: '40px 80px 96px' }}
    >
      <div className="news-row-a" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0 32px', marginBottom: '48px' }}>
        {rowA.map(p => <StoryCard key={p.num} project={p} />)}
      </div>
      <div style={{ marginBottom: '48px' }} />
      <div className="news-row-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0 32px' }}>
        {rowB.map(p => <StoryCard key={p.num} project={p} />)}
      </div>
    </section>
  );
}

/* ─── CTA ──────────────────────────────────────────────────── */
function PortfolioCTA() {
  const { t } = useLanguage();
  return (
    <section className="w-full">
      <div className="cta-pad" style={{ backgroundColor: 'var(--cta-bg)', padding: '96px 80px', transition: 'background-color 0.4s ease' }}>
        <Link
          to="/contact"
          className="portfolio-cta-link block w-full"
          aria-label="Ir a contacto - Trabajemos juntos"
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <p style={{ ...META, color: 'var(--cta-text)', margin: 0 }}>{t('home.cta_tag')}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
            <div className="scramble-line">
              <ScrambleText
                text={t('home.cta_title')}
                delay={0.1}
                duration={800}
                className="scramble-inner"
                style={{
                  fontFamily: '"Special Gothic Expanded One", sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(36px, 5.5vw, 88px)',
                  letterSpacing: '-0.01em',
                  lineHeight: '0.92',
                  color: 'var(--cta-text)',
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>
            <span
              className="cta-arrow"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 64px)',
                color: 'var(--cta-text)',
                paddingBottom: '8px',
                flexShrink: 0,
                display: 'inline-block',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              →
            </span>
          </div>
        </Link>
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ ...META, color: 'var(--cta-text)', fontSize: '11px' }}>
            {t('home.location_full')}
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/' },
              { label: 'Behance', href: 'https://www.behance.net/antoniocalero' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="nav-link" style={{ ...META, color: 'var(--cta-text)', textDecoration: 'none' }}>{label} ↗</a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bar" style={{ padding: '20px 80px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', transition: 'border-color 0.4s ease' }}>
        <span style={META}>© 2026 Antonio Calero</span>
        <span style={META}>{t('footer.rights')}</span>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function PortfolioHome() {
  return (
    <>
      <PortfolioNav />
      <main>
        <PortfolioMasthead />
        <PortfolioNewsGrid />
        <PortfolioCTA />
      </main>
    </>
  );
}
