import { useState, useEffect, type RefObject } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import ParallaxImage from '../components/ParallaxImage';
import { useScrollReveal, useScrollRevealAll } from '../hooks/useScrollReveal';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const DISPLAY: React.CSSProperties = {
  fontFamily: '"Special Gothic", sans-serif',
  fontWeight: 700,
  fontSize: 'clamp(72px, 9.5vw, 136px)',
  letterSpacing: '-0.01em',
  lineHeight: '0.92',
  color: 'var(--text-primary)',
  transition: 'color 0.4s ease',
};

const LABEL: React.CSSProperties = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const HERO_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&auto=format';

function AgoraNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '24px',
        paddingBottom: '24px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
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
        {t('nav.back')}
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {[
          { label: t('nav.projects'), href: '/#work' },
          { label: t('nav.about'), href: '/about' },
          { label: t('nav.contact'), href: '/contact' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="nav-link"
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
        <LanguageSelector />
      </div>
    </nav>
  );
}

function AgoraHero() {
  const { t } = useLanguage();
  return (
    <section
      className="section-pad w-full"
      style={{
        paddingTop: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div className="meta-reveal flex items-center gap-6">
        <span style={{ ...LABEL, color: 'var(--text-primary)' }}>{t('case.agora.top_tag')}</span>
        <span style={{ ...LABEL, color: 'var(--text-secondary)' }}>2026</span>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="scramble-line">
          <ScrambleText text="AGORA" delay={0.1} duration={900} className="scramble-inner" style={DISPLAY} />
        </div>
        <div className="scramble-line">
          <ScrambleText text="EDTECH" delay={0.35} duration={900} className="scramble-inner" style={DISPLAY} />
        </div>
      </div>

      <ParallaxImage
        src={HERO_IMAGE}
        alt="Agora — Plataforma Educativa Web y Móvil"
        height={760}
        speed={0.2}
        style={{ filter: 'contrast(1.03)' } as React.CSSProperties}
      />
    </section>
  );
}

function AgoraEditorial() {
  const { t, getAgoraBlocks, language } = useLanguage();
  const ref = useScrollRevealAll();
  const blocks = getAgoraBlocks();

  const disciplines = {
    es: ['Diseño de Producto', 'Investigación UX & Encuestas', 'Arquitectura de Información', 'Sistema de Diseño UI'],
    en: ['Product Design', 'UX Research & Surveys', 'Information Architecture', 'UI Design System'],
    fr: ['Design de Produit', 'Recherche UX & Enquêtes', 'Architecture de l’Information', 'Design System UI'],
  }[language] || ['Product Design', 'UX Research & Surveys', 'Information Architecture', 'UI Design System'];

  const deliverables = {
    es: ['Investigación & Benchmarking', 'Arquitectura UX', 'MVP Web Desktop', 'Sistema de Diseño UI'],
    en: ['Research & Benchmarking', 'UX Architecture', 'Web Desktop MVP', 'UI Design System'],
    fr: ['Recherche & Benchmark', 'Architecture UX', 'MVP Web Desktop', 'Design System UI'],
  }[language] || ['Research & Benchmarking', 'UX Architecture', 'Web Desktop MVP', 'UI Design System'];

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '120px',
        paddingBottom: '40px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* ─── Top Overview: Metadata + Strategic Headline ─── */}
      <div
        className="editorial-grid grid w-full mb-32"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}
      >
        {/* Left: 4 cols — metadata */}
        <div className="reveal-left" style={{ gridColumn: 'span 4' }}>
          <div style={{ paddingTop: '6px' }}>
            <p
              className="mb-8"
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
              }}
            >
              {t('case.role_discipline')}
            </p>
            <div
              style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-secondary)' }}
            >
              {disciplines.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div style={{ marginTop: '48px' }}>
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {t('case.year_platforms')}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                2026 — Web Desktop (MVP) · Roadmap v2
              </p>
            </div>
            <div style={{ marginTop: '48px' }}>
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {t('case.deliverables')}
              </p>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                {deliverables.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 8 cols — headline & executive brief */}
        <div
          className="reveal stagger-children"
          style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          <p
            className="font-normal"
            style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: '1.4', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
          >
            {t('case.agora.headline')}
          </p>
          <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '20px', paddingTop: '4px', paddingBottom: '4px' }}>
            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '12px',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {language === 'es'
                ? 'Auditoría Heurística · Encuestas a Docentes & Alumnado · Scoping MVP Web Desktop · Roadmap v2'
                : language === 'fr'
                ? 'Audit Heuristique · Enquêtes Enseignants & Étudiants · Cadrage MVP Desktop · Feuille de Route v2'
                : 'Heuristic Audit · Dual Faculty & Student Discovery · Web Desktop MVP Scoping · Roadmap v2'}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Separator ─── */}
      <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '120px' }} />

      {/* ─── 50/50 Alternating Process Walkthrough (Zig-Zag) ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {blocks.map((block, index) => {
          const isEven = index % 2 === 0;

          const textCol = (
            <div
              key="text"
              className="agora-text-col reveal"
              style={{
                gridColumn: 'span 5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '18px',
              }}
            >
              {/* Step label badge */}
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-color)',
                  fontWeight: 700,
                }}
              >
                {block.label}
              </span>

              {/* Title */}
              {block.title && (
                <h3
                  style={{
                    fontFamily: '"Special Gothic", sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(22px, 2.2vw, 30px)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {block.title}
                </h3>
              )}

              {/* Short crisp narrative text */}
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                }}
              >
                {block.text}
              </p>

              {/* Takeaway / Quote Box */}
              {block.takeaway && (
                <div
                  style={{
                    borderLeft: '2px solid var(--accent-color)',
                    paddingLeft: '16px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    margin: '4px 0',
                    backgroundColor: 'rgba(0, 0, 0, 0.015)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '12px',
                      lineHeight: '1.6',
                      color: 'var(--text-primary)',
                    }}
                  >
                    «{block.takeaway}»
                  </p>
                </div>
              )}

              {/* Tags / Pills */}
              {block.tags && block.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {block.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '10px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--bg-surface)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );

          const visualCol = (
            <div
              key="visual"
              className="agora-visual-col reveal"
              style={{ gridColumn: 'span 7' }}
            >
              <div
                className="agora-image-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  backgroundColor: '#EAEAEA',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                }}
              >
                <img
                  src={block.img}
                  alt={block.alt || block.title || block.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {block.caption || `00${index + 1}`}
                </span>
                <span
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  [UI Artifact]
                </span>
              </div>
            </div>
          );

          return (
            <div key={block.label} className="agora-step-grid">
              {isEven ? [textCol, visualCol] : [visualCol, textCol]}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AgoraVideoSection() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section
      className="section-pad w-full"
      style={{
        paddingTop: '20px',
        paddingBottom: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="reveal"
        style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
            }}
          >
            {t('case.agora.video_title')}
          </span>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'var(--text-secondary)',
            }}
          >
            {t('case.agora.video_meta')}
          </span>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '700px',
            backgroundColor: '#0F0F0F',
            overflow: 'hidden',
          }}
        >
          <video
            controls
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/agora-demo.mp4" type="video/mp4" />
            Video not supported.
          </video>
        </div>

        <p
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
            marginTop: '16px',
            textTransform: 'uppercase',
          }}
        >
          {t('case.agora.video_desc')}
        </p>
      </div>
    </section>
  );
}

function AgoraGallery() {
  const { getAgoraCards, language } = useLanguage();
  const ref = useScrollRevealAll();
  const allCards = getAgoraCards();
  const complementaryCards = allCards.slice(4);

  const galleryHeader = {
    es: { title: 'Vistas Complementarias & Espacios', count: '02 Vistas Seleccionadas' },
    en: { title: 'Complementary Views & Spaces', count: '02 Selected Views' },
    fr: { title: 'Vues Complémentaires & Espaces', count: '02 Vues Sélectionnées' },
  }[language] || { title: 'Complementary Views & Spaces', count: '02 Selected Views' };

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '20px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* Section label */}
      <div
        className="reveal flex items-center justify-between mb-16"
        style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}
      >
        <span
          style={{
            fontFamily: '"Special Gothic", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          {galleryHeader.title}
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
          }}
        >
          {galleryHeader.count}
        </span>
      </div>

      {/* 2-column complementary grid */}
      <div
        className="grid w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}
      >
        {complementaryCards.map((card) => (
          <div key={card.label} className="reveal">
            <div
              className="w-full bg-[#E5E5E5] overflow-hidden"
              style={{ aspectRatio: '16 / 10', border: '1px solid var(--border-color)' }}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            <div
              className="flex items-center justify-between"
              style={{ paddingTop: '16px' }}
            >
              <span
                className="font-medium"
                style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}
              >
                {card.label}
              </span>
              <span
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}
              >
                {card.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NextProjectBlock() {
  const { t } = useLanguage();
  return (
    <section className="w-full" style={{ borderTop: '1px solid var(--border-color)' }}>
      <Link
        to="/lavanderia-bizkaia"
        className="next-project-block block w-full"
        style={{
          paddingTop: '96px',
          paddingBottom: '96px',
          paddingLeft: '80px',
          paddingRight: '80px',
          textDecoration: 'none',
        }}
      >
        <p
          className="np-label"
          style={{
            fontFamily: '"Space Mono", monospace',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '28px',
          }}
        >
          {t('case.next_project')}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
          <p
            className="np-title"
            style={{
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(44px, 6.5vw, 96px)',
              letterSpacing: '-0.01em',
              lineHeight: '0.92',
              color: 'var(--hero-title-color)',
            }}
          >
            LAVANDERÍA BIZKAIA
          </p>
          <span
            className="np-arrow"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: 'var(--hero-title-color)',
              paddingBottom: '8px',
              flexShrink: 0,
            }}
          >
            →
          </span>
        </div>
      </Link>
    </section>
  );
}

export default function AgoraPage() {
  return (
    <>
      <AgoraNav />
      <main>
        <AgoraHero />
        <AgoraEditorial />
        <AgoraVideoSection />
        <AgoraGallery />
        <NextProjectBlock />
      </main>
      <Footer />
    </>
  );
}
