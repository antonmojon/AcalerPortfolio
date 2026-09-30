import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage, type ProjectItemData } from '../context/LanguageContext';

/* ─── Typography & Aesthetic Tokens ────────────────────────────── */
const META: React.CSSProperties = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  lineHeight: '1.5',
};

const DISPLAY_NUM: React.CSSProperties = {
  fontFamily: '"Special Gothic Expanded One", sans-serif',
  fontWeight: 400,
  lineHeight: '0.85',
  letterSpacing: '-0.02em',
  color: 'var(--text-primary)',
};

/* ─── Fixed Header Nav ─────────────────────────────────────────── */
function RunwayNav({ activeIndex, totalSlides }: { activeIndex: number; totalSlides: number }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="runway-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="nav-brand-link"
          style={{
            fontFamily: '"Special Gothic Expanded One", sans-serif',
            fontSize: '15px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--hero-title-color)',
            textDecoration: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          Antonio Calero
        </Link>
        <span
          className="runway-status-badge hide-mobile"
          style={{
            ...META,
            fontSize: '10px',
            padding: '2px 8px',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }} />
          RUNWAY [{String(activeIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}]
        </span>
      </div>

      <div className="nav-links-wrap" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link to="/about" className="nav-link" style={{ ...META, textDecoration: 'none' }}>
          {t('nav.about')}
        </Link>
        <Link to="/contact" className="nav-link" style={{ ...META, textDecoration: 'none' }}>
          {t('nav.contact')}
        </Link>
        <LanguageSelector />
      </div>
    </header>
  );
}

/* ─── Bottom HUD / Telemetry Bar ───────────────────────────────── */
interface RunwayHUDProps {
  progress: number;
  activeIndex: number;
  slideLabels: string[];
  onJump: (index: number) => void;
}

function RunwayHUD({ progress, activeIndex, slideLabels, onJump }: {
  progress: number;
  activeIndex: number;
  slideLabels: string[];
  onJump: (index: number) => void;
}) {
  const { t } = useLanguage();
  const pct = Math.round(progress * 100);

  return (
    <footer
      className="runway-hud"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '46px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Current Slide Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '220px' }}>
        <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>
          {String(activeIndex + 1).padStart(2, '0')} //
        </span>
        <span style={{ ...META, color: 'var(--text-primary)', fontWeight: 700 }} className="truncate">
          {slideLabels[activeIndex] || 'INTRO'}
        </span>
      </div>

      {/* Progress Bar & percentage */}
      <div
        className="runway-progress-wrap hide-mobile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flex: '1',
          maxWidth: '380px',
          margin: '0 24px',
        }}
      >
        <div
          style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${pct}%`,
              backgroundColor: 'var(--accent-color)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <span style={{ ...META, fontSize: '10px', minWidth: '34px', textAlign: 'right' }}>
          {pct}%
        </span>
      </div>

      {/* Quick Jump Buttons & Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="runway-jump-dots" style={{ display: 'flex', gap: '4px' }}>
          {slideLabels.map((label, idx) => (
            <button
              key={label + idx}
              type="button"
              onClick={() => onJump(idx)}
              aria-label={`Saltar a diapositiva ${idx + 1}: ${label}`}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '10px',
                padding: '4px 6px',
                border: idx === activeIndex ? '1px solid var(--accent-color)' : '1px solid transparent',
                backgroundColor: idx === activeIndex ? 'var(--accent-color)' : 'transparent',
                color: idx === activeIndex ? 'var(--bg-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <span className="hide-mobile" style={{ ...META, fontSize: '10px', color: 'var(--text-muted)' }}>
          MADRID · 40.4° N
        </span>
      </div>
    </footer>
  );
}

/* ─── Slide 0: Monumental Hero & Runway Gateway ────────────────── */
function SlideHero({ onExplore }: { onExplore: () => void }) {
  const { t } = useLanguage();

  return (
    <section
      className="runway-slide runway-slide-hero masthead-pad"
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '100px 60px 70px',
        borderRight: '1px solid var(--border-color)',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Meta Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          width: '100%',
        }}
      >
        <span style={META}>{t('home.est')} // {t('home.location')}</span>
        <span style={META} className="hide-mobile">{t('home.discipline')}</span>
        <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>
          PORTFOLIO 2026
        </span>
      </div>

      {/* Center Monumental Typography with Scale Contrast */}
      <div style={{ width: '100%', margin: 'auto 0' }}>
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              ...META,
              fontSize: '12px',
              color: 'var(--accent-color)',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            [ DIRECTION // PRODUCT & INTERFACE ARCHITECTURE ]
          </span>
        </div>

        {/* Monumental Name */}
        <h1
          className="runway-hero-title"
          style={{
            ...DISPLAY_NUM,
            fontSize: 'clamp(52px, 11vw, 160px)',
            margin: '0 0 20px 0',
            whiteSpace: 'nowrap',
            lineHeight: '0.86',
            color: 'var(--hero-title-color)',
          }}
        >
          ANTONIO CALERO
        </h1>

        {/* Editorial Subtitle with Heavy Contrast */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '40px',
            alignItems: 'start',
            maxWidth: '1200px',
          }}
          className="runway-hero-grid"
        >
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(17px, 1.8vw, 24px)',
              lineHeight: '1.4',
              color: 'var(--text-primary)',
              margin: 0,
              fontWeight: 400,
            }}
          >
            Diseño arquitecturas de interacción, sistemas de diseño atómicos y herramientas digitales de alta densidad para retos complejos de producto.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ ...META, fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
              ESTRUCTURAS RESISTENTES AL CAMBIO · CERO DECORACIÓN INÚTIL · RIGOR SUIZO
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={onExplore}
                style={{
                  ...META,
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  padding: '12px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <span>RECORRER CASOS DE ESTUDIO</span>
                <span>→</span>
              </button>
              <span style={{ ...META, fontSize: '10px' }} className="hide-mobile">
                (O usa la rueda del ratón)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '14px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={META}>01. AGORA</span>
          <span style={META}>02. LAVANDERÍA</span>
          <span style={META}>03. NIGHTSHIFT</span>
          <span style={META}>04. ARCHIVO</span>
        </div>
        <span style={{ ...META, color: 'var(--text-muted)' }}>
          SCROLL HORIZONTAL KINETIC // 60 FPS
        </span>
      </div>
    </section>
  );
}

/* ─── Slide: Detailed Case Study Plate ─────────────────────────── */
interface CaseSlideProps {
  num: string;
  title: string;
  category: string;
  year: string;
  description: string;
  chips: string[];
  image: string;
  linkHref: string | null;
  linkText?: string;
  width?: string;
}

function SlideCaseStudy({
  num,
  title,
  category,
  year,
  description,
  chips,
  image,
  linkHref,
  linkText,
}: CaseSlideProps) {
  const { t } = useLanguage();
  const isAvailable = Boolean(linkHref);

  return (
    <article
      className="runway-slide runway-slide-case"
      style={{
        width: 'min(92vw, 1180px)',
        height: '100%',
        flexShrink: 0,
        padding: '100px 48px 70px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Background oversized numeral watermark */}
      <div
        style={{
          position: 'absolute',
          right: '24px',
          top: '60px',
          ...DISPLAY_NUM,
          fontSize: 'clamp(140px, 22vw, 320px)',
          color: 'var(--text-primary)',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: '0.8',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {num}
      </div>

      {/* Top Plate Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>
            CASE {num}
          </span>
          <span style={META}>// {category}</span>
        </div>
        <span style={META}>{year}</span>
      </div>

      {/* Core Content: Asymmetric Hero Image & Specifications */}
      <div
        className="runway-case-body"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: '40px',
          alignItems: 'center',
          width: '100%',
          margin: 'auto 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Project Image Frame */}
        <div
          className="runway-case-media"
          style={{
            position: 'relative',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            aspectRatio: '16 / 10',
          }}
        >
          {linkHref ? (
            <Link to={linkHref} style={{ display: 'block', width: '100%', height: '100%' }}>
              <img
                src={image}
                alt={title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.05)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="runway-img-zoom"
              />
            </Link>
          ) : (
            <img
              src={image}
              alt={title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'contrast(1.05) grayscale(20%)',
              }}
            />
          )}

          {/* Overlay Corner Technical Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 12px',
              backgroundColor: 'rgba(10, 10, 10, 0.85)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ ...META, color: '#FFFFFF', fontSize: '9.5px' }}>
              SPECS: PRODUCTION READY
            </span>
            <span style={{ ...META, color: '#FFFFFF', fontSize: '9.5px' }}>
              STATUS: {isAvailable ? 'DOCUMENTED' : 'IN DEVELOPMENT'}
            </span>
          </div>
        </div>

        {/* Project Technical Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2
              style={{
                ...DISPLAY_NUM,
                fontSize: 'clamp(36px, 4.5vw, 68px)',
                margin: '0 0 12px 0',
                color: 'var(--hero-title-color)',
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Chips & Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {chips.map(chip => (
              <span
                key={chip}
                style={{
                  ...META,
                  fontSize: '9.5px',
                  padding: '4px 8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div style={{ paddingTop: '8px' }}>
            {isAvailable && linkHref ? (
              <Link
                to={linkHref}
                className="runway-case-btn"
                style={{
                  ...META,
                  textDecoration: 'none',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  padding: '12px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 700,
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                }}
              >
                <span>{linkText || 'EXPLORAR CASO COMPLETO'}</span>
                <span>→</span>
              </Link>
            ) : (
              <span
                style={{
                  ...META,
                  display: 'inline-block',
                  padding: '10px 18px',
                  border: '1px dashed var(--border-color)',
                  color: 'var(--text-muted)',
                }}
              >
                [{t('home.coming_soon')}]
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Plate Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ ...META, fontSize: '10px', color: 'var(--text-muted)' }}>
          INDEX REF // 0{num}
        </span>
        <span style={{ ...META, fontSize: '10px', color: 'var(--text-muted)' }}>
          ACALERO PORTFOLIO · RUNWAY VIEW
        </span>
      </div>
    </article>
  );
}

/* ─── Slide 3: Typographic Manifesto / Interlude ───────────────── */
function SlideManifesto() {
  return (
    <section
      className="runway-slide runway-slide-manifesto"
      style={{
        width: 'min(80vw, 980px)',
        height: '100%',
        flexShrink: 0,
        padding: '100px 48px 70px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          width: '100%',
        }}
      >
        <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>
          [ MANIFIESTO ]
        </span>
        <span style={META}>FILOSOFÍA DE TRABAJO</span>
      </div>

      {/* Monumental Three-Pillar Statement */}
      <div style={{ margin: 'auto 0' }}>
        <p style={{ ...META, fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          CRITERIO OPERATIVO & PRINCIPIOS
        </p>

        <h3
          style={{
            ...DISPLAY_NUM,
            fontSize: 'clamp(32px, 5.2vw, 76px)',
            lineHeight: '0.94',
            margin: '0 0 8px 0',
            color: 'var(--hero-title-color)',
          }}
        >
          RIGOR ESTRUCTURAL.
        </h3>
        <h3
          style={{
            ...DISPLAY_NUM,
            fontSize: 'clamp(32px, 5.2vw, 76px)',
            lineHeight: '0.94',
            margin: '0 0 8px 0',
            color: 'var(--text-secondary)',
          }}
        >
          SISTEMAS VIVOS.
        </h3>
        <h3
          style={{
            ...DISPLAY_NUM,
            fontSize: 'clamp(32px, 5.2vw, 76px)',
            lineHeight: '0.94',
            margin: '0 0 28px 0',
            color: 'var(--accent-color)',
          }}
        >
          CERO RUIDO INÚTIL.
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '680px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '20px',
          }}
          className="runway-manifesto-grid"
        >
          <div>
            <span style={{ ...META, color: 'var(--text-primary)', fontWeight: 700 }}>
              01 // ARQUITECTURA ATÓMICA
            </span>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '6px' }}>
              Cada componente se modela para resistir escalabilidad real en código y diseño sin fricción.
            </p>
          </div>
          <div>
            <span style={{ ...META, color: 'var(--text-primary)', fontWeight: 700 }}>
              02 // PRODUCTO RESILIENTE
            </span>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '6px' }}>
              La belleza de una interfaz radica en la claridad con la que resuelve un flujo complejo para el usuario.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
          width: '100%',
        }}
      >
        <span style={META}>MADRID · CET</span>
        <span style={META}>SWISS INFLUENCE · ATOMIC ENGINEERING</span>
      </div>
    </section>
  );
}

/* ─── Slide 5: Archive & Upcoming Lab ──────────────────────────── */
function SlideArchive() {
  const { t } = useLanguage();

  const archiveItems = [
    {
      num: '004',
      title: 'Módulo App',
      tag: 'UI/UX · Mobile Product',
      year: '2024–2026',
      desc: 'Plataforma para gestión de flujos modulares y sincronización multi-dispositivo.',
      img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=600&h=440&fit=crop&auto=format',
    },
    {
      num: '005',
      title: 'Palomar Studio / Tipo Libre',
      tag: 'Editorial · Typography',
      year: '2023–2024',
      desc: 'Exploraciones tipográficas y packaging de edición limitada bajo principios modernistas.',
      img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&h=440&fit=crop&auto=format',
    },
  ];

  return (
    <section
      className="runway-slide runway-slide-archive"
      style={{
        width: 'min(90vw, 1100px)',
        height: '100%',
        flexShrink: 0,
        padding: '100px 48px 70px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          width: '100%',
        }}
      >
        <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>
          [ ARCHIVO DE TRABAJO ]
        </span>
        <span style={META}>INVESTIGACIÓN & PROYECTOS EN CURSO</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px',
          margin: 'auto 0',
          width: '100%',
        }}
        className="runway-archive-grid"
      >
        {archiveItems.map((item) => (
          <div
            key={item.num}
            style={{
              border: '1px solid var(--border-color)',
              padding: '24px',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ ...META, color: 'var(--accent-color)', fontWeight: 700 }}>{item.num}</span>
                <span style={{ ...META, fontSize: '9.5px' }}>{item.year}</span>
              </div>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(30%) contrast(1.05)',
                  }}
                />
              </div>
              <h4 style={{ ...DISPLAY_NUM, fontSize: '24px', margin: '0 0 6px 0', color: 'var(--hero-title-color)' }}>
                {item.title}
              </h4>
              <p style={{ ...META, fontSize: '10px', color: 'var(--accent-color)', marginBottom: '8px' }}>
                {item.tag}
              </p>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                {item.desc}
              </p>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ ...META, fontSize: '10px', color: 'var(--text-muted)' }}>
                [{t('home.coming_soon')}]
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '12px',
          width: '100%',
        }}
      >
        <span style={META}>LABORATORIO & PROTOTIPOS</span>
        <span style={META}>EN PROCESO · 2026</span>
      </div>
    </section>
  );
}

/* ─── Slide 6: Outro Runway Terminal & Direct CTA ──────────────── */
function SlideOutro() {
  const { t } = useLanguage();

  return (
    <section
      className="runway-slide runway-slide-outro"
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        padding: '100px 60px 70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: 'var(--cta-bg)',
        color: 'var(--cta-text)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          paddingBottom: '16px',
          width: '100%',
        }}
      >
        <span style={{ ...META, color: 'var(--cta-text)' }}>
          {t('home.cta_tag')} // MADRID (CET)
        </span>
        <span style={{ ...META, color: 'var(--cta-text)', opacity: 0.8 }} className="hide-mobile">
          DISPONIBLE PARA PROYECTOS SELECCIONADOS
        </span>
      </div>

      {/* Monumental CTA Center Link */}
      <div style={{ margin: 'auto 0' }}>
        <Link
          to="/contact"
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          className="runway-outro-link"
        >
          <div style={{ marginBottom: '14px' }}>
            <span style={{ ...META, color: 'var(--cta-text)', opacity: 0.8 }}>
              [ INICIAR CONVERSACIÓN DIRECTA ]
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div className="scramble-line">
              <ScrambleText
                text={t('home.cta_title')}
                delay={0.1}
                duration={700}
                className="scramble-inner"
                style={{
                  ...DISPLAY_NUM,
                  fontSize: 'clamp(44px, 8.5vw, 130px)',
                  color: 'var(--cta-text)',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  lineHeight: '0.88',
                }}
              />
            </div>
            <span
              className="runway-outro-arrow"
              style={{
                fontSize: 'clamp(44px, 7vw, 100px)',
                lineHeight: '1',
                paddingBottom: '10px',
                color: 'var(--cta-text)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              →
            </span>
          </div>
        </Link>

        {/* Verification and safe channels row */}
        <div
          style={{
            marginTop: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/contact"
            style={{
              ...META,
              color: 'var(--cta-bg)',
              backgroundColor: 'var(--cta-text)',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            IR AL FORMULARIO DE CONTACTO ↗
          </Link>

          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/' },
              { label: 'Behance', href: 'https://www.behance.net/antoniocalero' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{ ...META, color: 'var(--cta-text)', textDecoration: 'none' }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Rights Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          paddingTop: '16px',
          width: '100%',
        }}
      >
        <span style={{ ...META, color: 'var(--cta-text)', opacity: 0.7 }}>
          © 2026 Antonio Calero
        </span>
        <span style={{ ...META, color: 'var(--cta-text)', opacity: 0.7 }}>
          {t('footer.rights')}
        </span>
      </div>
    </section>
  );
}

/* ─── Main Runway Component ────────────────────────────────────── */
export default function PortfolioHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slideLabels = [
    'INICIO // ANTONIO CALERO',
    'CASE 001 // AGORA',
    'CASE 002 // LAVANDERÍA',
    'MANIFIESTO // SUIZO',
    'CASE 003 // NIGHTSHIFT',
    'ARCHIVO // LAB',
    'CONTACTO // FINAL',
  ];

  // Screen size check for mobile swipe vs desktop kinetic runway
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Vertical Scroll -> Horizontal Translation Engine
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        // Current vertical scroll within container bounds
        const currentY = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, currentY / totalScrollable));
        setProgress(rawProgress);

        // Maximum horizontal travel distance
        const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
        const translateX = rawProgress * maxTranslate;
        track.style.transform = `translate3d(-${translateX}px, 0, 0)`;

        // Calculate active slide index based on slide positions
        const slides = track.children;
        let bestIndex = 0;
        let minDiff = Infinity;

        for (let i = 0; i < slides.length; i++) {
          const slide = slides[i] as HTMLElement;
          const slideLeft = slide.offsetLeft;
          const diff = Math.abs(slideLeft - translateX);
          if (diff < minDiff) {
            minDiff = diff;
            bestIndex = i;
          }
        }
        setActiveIndex(bestIndex);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Mobile Native Horizontal Scroll Listener
  const onMobileScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) {
      setProgress(scrollLeft / maxScroll);
    }

    const slideWidth = track.clientWidth * 0.9;
    const index = Math.round(scrollLeft / slideWidth);
    setActiveIndex(Math.max(0, Math.min(index, slideLabels.length - 1)));
  }, [slideLabels.length]);

  // Jump to specific slide
  const jumpToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    if (isMobile) {
      const slides = track.children;
      if (slides[index]) {
        (slides[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const slides = track.children;
    const targetSlide = slides[index] as HTMLElement;
    if (!targetSlide) return;

    const maxTranslate = track.scrollWidth - window.innerWidth;
    if (maxTranslate <= 0) return;

    const slideProgress = Math.min(1, Math.max(0, targetSlide.offsetLeft / maxTranslate));
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetY = containerTop + slideProgress * totalScrollable;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <>
      <RunwayNav activeIndex={activeIndex} totalSlides={slideLabels.length} />

      {/* Main Runway Container */}
      <main
        ref={containerRef}
        className="runway-wrapper"
        style={{
          height: isMobile ? 'auto' : '520vh',
          position: 'relative',
        }}
      >
        <div
          className="runway-sticky"
          style={{
            position: isMobile ? 'relative' : 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: isMobile ? 'auto' : '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Kinetic Horizontal Track */}
          <div
            ref={trackRef}
            className="runway-track"
            onScroll={isMobile ? onMobileScroll : undefined}
            style={{
              display: 'flex',
              height: isMobile ? 'calc(100vh - 46px)' : '100%',
              width: 'max-content',
              willChange: isMobile ? 'auto' : 'transform',
              overflowX: isMobile ? 'auto' : 'visible',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Slide 0: Hero Gateway */}
            <SlideHero onExplore={() => jumpToSlide(1)} />

            {/* Slide 1: Agora */}
            <SlideCaseStudy
              num="01"
              title="AGORA"
              category="PRODUCT DESIGN & ATOMIC SYSTEM"
              year="2026"
              description="Sistema de diseño atómico y plataforma colaborativa de alta densidad concebida para operaciones de producto complejas. Arquitectura escalable y cero redundancia de tokens."
              chips={['Atomic Architecture', 'Design System', 'WCAG AAA', 'Enterprise Tooling']}
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop&auto=format"
              linkHref="/agora"
              linkText="EXPLORAR CASO AGORA"
            />

            {/* Slide 2: Lavandería Bizkaia */}
            <SlideCaseStudy
              num="02"
              title="LAVANDERÍA BIZKAIA"
              category="B2B PLATFORM & IDENTITY"
              year="2025"
              description="Digitalización integral y rediseño identitario para el referente industrial de lavanderías en Bizkaia. Desde señalética física hasta plataformas de gestión logística en tiempo real."
              chips={['Brand Identity', 'Logistics SaaS', 'Signage Architecture', 'B2B Workflow']}
              image="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=800&fit=crop&auto=format"
              linkHref="/lavanderia-bizkaia"
              linkText="VER CASO LAVANDERÍA"
            />

            {/* Slide 3: Typographic Manifesto */}
            <SlideManifesto />

            {/* Slide 4: NightShift */}
            <SlideCaseStudy
              num="03"
              title="NIGHT SHIFT"
              category="ACCESSIBILITY & TOKENS"
              year="2025"
              description="Investigación de sistemas de interfaz adaptativos de alto contraste para reducir fatiga visual en turnos nocturnos y entornos de baja luminosidad crítica."
              chips={['Dynamic Contrast', 'Token Engine', 'Accessibility Research', 'Dark Mode UI']}
              image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop&auto=format"
              linkHref="/night-shift"
              linkText="INVESTIGACIÓN NIGHTSHIFT"
            />

            {/* Slide 5: Upcoming & Archive */}
            <SlideArchive />

            {/* Slide 6: Outro Terminal */}
            <SlideOutro />
          </div>

          {/* Sticky HUD Bottom Bar */}
          <RunwayHUD
            progress={progress}
            activeIndex={activeIndex}
            slideLabels={slideLabels}
            onJump={jumpToSlide}
          />
        </div>
      </main>
    </>
  );
}
