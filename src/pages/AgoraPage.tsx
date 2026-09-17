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
      <div className="agora-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {[
          { label: t('nav.projects'), href: '/#work' },
          { label: t('nav.about'), href: '/about' },
          { label: t('nav.contact'), href: '/contact' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="nav-link agora-nav-item"
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
      className="section-pad w-full agora-hero-section"
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

function AgoraOverview() {
  const { t, language } = useLanguage();
  const ref = useScrollRevealAll();

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
        paddingBottom: '80px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div
        className="editorial-grid grid w-full agora-overview-grid"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}
      >
        {/* Left: 4 cols — metadata */}
        <div className="reveal-left agora-overview-meta" style={{ gridColumn: 'span 4' }}>
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
            <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
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
          className="reveal stagger-children agora-overview-headline"
          style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <p
            className="font-normal"
            style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: '1.4', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}
          >
            {t('case.agora.headline')}
          </p>
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
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
    </section>
  );
}

/* ─── Fase 01: El Problema + Pantalla Panorámica Completa ───── */
function AgoraProblemSection() {
  const { getAgoraBlocks } = useLanguage();
  const ref = useScrollRevealAll();
  const blocks = getAgoraBlocks();
  const block = blocks[0];

  if (!block) return null;

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '60px',
        paddingBottom: '100px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          className="editorial-grid grid w-full"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', alignItems: 'flex-start' }}
        >
          <div className="reveal" style={{ gridColumn: 'span 4' }}>
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-color)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {block.label}
            </span>
            <h3
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                lineHeight: '1.25',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              {block.title}
            </h3>
          </div>

          <div className="reveal" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontSize: '17px', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
              {block.text}
            </p>
            {block.takeaway && (
              <p
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                «{block.takeaway}»
              </p>
            )}
            {block.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                {block.tags.map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {i > 0 && <span style={{ marginRight: '8px', opacity: 0.35 }}>/</span>}
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pantalla panorámica a ancho completo */}
      <div className="reveal" style={{ marginTop: '48px' }}>
        <div
          className="agora-image-card"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#EAEAEA',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
          }}
        >
          <img
            src={block.img}
            alt={block.alt || block.title || block.label}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            {block.caption || '001 · Espacio de Trabajo Web Desktop'}
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            [Vista Panorámica del Workspace]
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Fase 02: Investigación Dual + Tarjetas de Insights + Pantalla ───── */
function AgoraResearchSection() {
  const { getAgoraBlocks, language } = useLanguage();
  const ref = useScrollRevealAll();
  const blocks = getAgoraBlocks();
  const block = blocks[1];

  const researchInsights = {
    es: {
      facultyLabel: 'Profesorado & Mentores',
      facultyTitle: 'Visibilidad de Entregas & Feedback',
      facultyText: 'Los docentes necesitaban un panel centralizado para gestionar entregas y calificar sin perder el hilo de las revisiones en hilos dispersos.',
      studentsLabel: 'Alumnado de Máster (Data, IA, Ciber)',
      studentsTitle: 'Sobrecarga Cognitiva',
      studentsText: 'Los alumnos reportaron fatiga visual con interfaces saturadas al cursar materias densas; reclamaban un entorno limpio de máxima concentración.',
    },
    en: {
      facultyLabel: 'Faculty & Mentors',
      facultyTitle: 'Centralized Submissions & Grading',
      facultyText: 'Instructors needed a dedicated workflow to track student hand-ins and deliver feedback without disjointed community threads.',
      studentsLabel: 'Master’s Students (Data, AI, Cyber)',
      studentsTitle: 'Cognitive Overload',
      studentsText: 'Students reported fatigue with cluttered UIs while learning technical subjects; they demanded a clean, focused study workspace.',
    },
    fr: {
      facultyLabel: 'Corps Professoral & Mentors',
      facultyTitle: 'Visibilité des Rendus & Corrections',
      facultyText: 'Les enseignants réclamaient un espace centralisé pour gérer les rendus et évaluer sans dispersion dans des fils de discussion.',
      studentsLabel: 'Étudiants en Mastère (Data, IA, Cyber)',
      studentsTitle: 'Surcharge Cognitive',
      studentsText: 'Les étudiants ont souligné la fatigue visuelle face à des interfaces denses ; ils demandaient un environnement épuré et centré sur l’étude.',
    },
  }[language] || {
    facultyLabel: 'Faculty & Mentors',
    facultyTitle: 'Centralized Submissions & Grading',
    facultyText: 'Instructors needed a dedicated workflow to track student hand-ins and deliver feedback without disjointed community threads.',
    studentsLabel: 'Master’s Students (Data, AI, Cyber)',
    studentsTitle: 'Cognitive Overload',
    studentsText: 'Students reported fatigue with cluttered UIs while learning technical subjects; they demanded a clean, focused study workspace.',
  };

  if (!block) return null;

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '60px',
        paddingBottom: '100px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div>
        <div
          className="editorial-grid grid w-full"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', alignItems: 'center' }}
        >
          {/* Columna Izquierda: Explicación + Tarjetas Duales */}
          <div className="reveal" style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-color)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {block.label}
              </span>
              <h3
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 2.4vw, 32px)',
                  lineHeight: '1.25',
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}
              >
                {block.title}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                {block.text}
              </p>
            </div>

            {/* Insights contrapuestos en lista editorial suiza sin líneas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: '"Special Gothic", sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                    {researchInsights.facultyTitle}
                  </span>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-color)', fontWeight: 700 }}>
                    {researchInsights.facultyLabel}
                  </span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  {researchInsights.facultyText}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: '"Special Gothic", sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                    {researchInsights.studentsTitle}
                  </span>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {researchInsights.studentsLabel}
                  </span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  {researchInsights.studentsText}
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Pantalla de Flujo de Entregas */}
          <div className="reveal" style={{ gridColumn: 'span 6' }}>
            <div
              className="agora-image-card"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3',
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {block.caption || '002 · Arquitectura UX & Flujo de Entregas'}
              </span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                [Arquitectura UX]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Fase 03: La Solución MVP + Vídeo Demostración en Contexto ───── */
function AgoraSolutionSection() {
  const { t, getAgoraBlocks } = useLanguage();
  const ref = useScrollRevealAll();
  const blocks = getAgoraBlocks();
  const block = blocks[2];

  if (!block) return null;

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '60px',
        paddingBottom: '100px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <div
          className="editorial-grid grid w-full"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', alignItems: 'flex-start' }}
        >
          <div className="reveal" style={{ gridColumn: 'span 4' }}>
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-color)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {block.label}
            </span>
            <h3
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                lineHeight: '1.25',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              {block.title}
            </h3>
          </div>

          <div className="reveal" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontSize: '17px', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
              {block.text}
            </p>
            {block.takeaway && (
              <p
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                «{block.takeaway}»
              </p>
            )}
            {block.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                {block.tags.map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {i > 0 && <span style={{ marginRight: '8px', opacity: 0.35 }}>/</span>}
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demostración en Vídeo 16:9 integrada directamente en la solución */}
      <div className="reveal" style={{ marginTop: '36px', marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
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
            border: '1px solid var(--border-color)',
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

      {/* Pantalla del Sistema de Diseño */}
      <div className="reveal" style={{ marginTop: '48px' }}>
        <div
          className="agora-image-card"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#EAEAEA',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
          }}
        >
          <img
            src={block.img}
            alt={block.alt || block.title || block.label}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            {block.caption || '003 · Tokens de Diseño & UI Kit Minimalista'}
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            [Design System Atómico]
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Galería con Movimiento Propio Continuo (Infinite Screen Reel) ─── */
function AgoraContinuousReelSection() {
  const { getAgoraCards, language } = useLanguage();
  const ref = useScrollReveal();
  const allCards = getAgoraCards();
  // Duplicar tarjetas para un bucle infinito continuo e imperceptible
  const marqueeCards = [...allCards, ...allCards];

  const reelLabels = {
    es: {
      title: 'Ecosistema en Movimiento',
      subtitle: 'Pase continuo de pantallas del MVP · Pausa al pasar el cursor',
    },
    en: {
      title: 'Living Ecosystem',
      subtitle: 'Continuous MVP screen reel · Hover to pause',
    },
    fr: {
      title: 'Écosystème en Mouvement',
      subtitle: 'Défilement continu des écrans MVP · Survolez pour figer',
    },
  }[language] || {
    title: 'Living Ecosystem',
    subtitle: 'Continuous MVP screen reel · Hover to pause',
  };

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="reveal section-pad w-full"
      style={{
        paddingTop: '60px',
        paddingBottom: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div
        style={{
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            {reelLabels.title}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
          }}
        >
          {reelLabels.subtitle}
        </span>
      </div>

      {/* Carrusel infinito con movimiento propio continuo */}
      <div className="screen-marquee-container">
        <div className="screen-marquee-track">
          {marqueeCards.map((card, idx) => (
            <div key={`${card.label}-${idx}`} className="screen-marquee-card">
              <div
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
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    color: 'var(--text-secondary)',
                  }}
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
      </div>
    </section>
  );
}

/* ─── Fase 04: Aprendizajes Reales + Doble Pantalla + Roadmap v2 ───── */
function AgoraLearningsSection() {
  const { getAgoraBlocks, getAgoraCards, language } = useLanguage();
  const ref = useScrollRevealAll();
  const blocks = getAgoraBlocks();
  const allCards = getAgoraCards();
  const block = blocks[3];

  const cardA = allCards[3] || {
    src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&fit=crop&auto=format',
    label: '004',
    caption: 'Panel de Concentración y Métricas',
    alt: 'Agora Study Analytics',
  };

  const cardB = allCards[4] || {
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&fit=crop&auto=format',
    label: '005',
    caption: 'Espacios de Consulta & Foro Docente',
    alt: 'Agora Peer Mentoring',
  };

  const roadmapLabels = {
    es: {
      title: 'Horizonte de Producto · Roadmap v2',
      items: [
        'Optimización del flujo de entregas y corrección modular de proyectos',
        'Panel de rendimiento pedagógico y métricas de progreso para docentes',
        'Futura aplicación móvil de apoyo y repaso espaciado para el alumno',
      ],
    },
    en: {
      title: 'Product Horizon · Roadmap v2',
      items: [
        'Refined project submission & modular grading workflow',
        'Faculty pedagogical tracking dashboard with progress metrics',
        'Future student mobile companion app for spaced repetition',
      ],
    },
    fr: {
      title: 'Vision Produit · Feuille de Route v2',
      items: [
        'Perfectionnement du flux de dépôt et correction modulaire des projets',
        'Tableau de bord pédagogique et métriques de progression pour les formateurs',
        'Future application mobile d’accompagnement et révision espacée',
      ],
    },
  }[language] || {
    title: 'Product Horizon · Roadmap v2',
    items: [
      'Refined project submission & modular grading workflow',
      'Faculty pedagogical tracking dashboard with progress metrics',
      'Future student mobile companion app for spaced repetition',
    ],
  };

  if (!block) return null;

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="section-pad w-full"
      style={{
        paddingTop: '60px',
        paddingBottom: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div style={{ marginBottom: '48px' }}>
        <div
          className="editorial-grid grid w-full"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', alignItems: 'flex-start' }}
        >
          <div className="reveal" style={{ gridColumn: 'span 4' }}>
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-color)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {block.label}
            </span>
            <h3
              style={{
                fontFamily: '"Special Gothic", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                lineHeight: '1.25',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              {block.title}
            </h3>
          </div>

          <div className="reveal" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '17px', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
              {block.text}
            </p>
            {block.takeaway && (
              <p
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '12px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                «{block.takeaway}»
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pantalla doble en paralelo (2-up) */}
      <div
        className="grid w-full mb-16 agora-2up-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px' }}
      >
        {[cardA, cardB].map((card) => (
          <div key={card.label} className="reveal">
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
                src={card.src}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
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

      {/* Roadmap v2 - Editorial Numbered List */}
      <div
        className="reveal"
        style={{
          marginTop: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-color)',
            fontWeight: 700,
          }}
        >
          {roadmapLabels.title}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {roadmapLabels.items.map((item, idx) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '11px',
                  color: 'var(--accent-color)',
                  letterSpacing: '0.08em',
                  width: '24px',
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                0{idx + 1}
              </span>
              <span
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontSize: '15px',
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextProjectBlock() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="reveal section-pad w-full"
      style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <Link
        to="/lavanderia-bizkaia"
        className="next-project-link block group"
        style={{ textDecoration: 'none' }}
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
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
          <p
            className="np-title"
            style={{
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 6vw, 96px)',
              letterSpacing: '-0.01em',
              lineHeight: '0.92',
              color: 'var(--hero-title-color)',
              wordBreak: 'break-word',
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
        <AgoraOverview />
        <AgoraProblemSection />
        <AgoraResearchSection />
        <AgoraSolutionSection />
        <AgoraContinuousReelSection />
        <AgoraLearningsSection />
        <NextProjectBlock />
      </main>
      <Footer />
    </>
  );
}
