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
        paddingBottom: '100px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div
        className="editorial-grid grid w-full"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
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

        {/* Right: 8 cols — content */}
        <div
          className="reveal stagger-children"
          style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '56px' }}
        >
          <p
            className="font-normal"
            style={{ fontSize: '28px', lineHeight: '1.45', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
          >
            {t('case.agora.headline')}
          </p>

          {blocks.map((block) => (
            <div key={block.label} className="reveal">
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
                {block.label}
              </p>
              <p
                className="font-normal"
                style={{ fontSize: '18px', lineHeight: '1.65', color: 'var(--text-primary)' }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>
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
  const { t, getAgoraCards } = useLanguage();
  const ref = useScrollRevealAll();
  const cards = getAgoraCards();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '40px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* Section label */}
      <div
        className="reveal flex items-center justify-between mb-20"
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
          {t('case.agora.gallery_title')}
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
          }}
        >
          {t('case.agora.gallery_count')}
        </span>
      </div>

      {/* Gallery grid */}
      <div
        className="gallery-grid grid w-full"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', rowGap: '120px' }}
      >
        {cards.map((card, i) => {
          const colStart = i % 2 === 0 ? 2 : 6;
          const colSpan = 5;

          return (
            <div
              key={card.label}
              className="reveal gallery-card"
              style={{
                gridColumn: `${colStart} / span ${colSpan}`,
                transitionDelay: `${(i % 3) * 0.1}s`,
              }}
            >
              <div
                className="w-full bg-[#E5E5E5] overflow-hidden"
                style={{ aspectRatio: '2 / 3' }}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover"
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
          );
        })}
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
