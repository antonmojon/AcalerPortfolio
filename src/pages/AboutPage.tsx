import { useState, useEffect, type RefObject } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import { useReveal, useRevealAll } from '../hooks/useReveal';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import portraitImg from '../assets/antonio-calero.jpg';

const META = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  lineHeight: '1.6',
};

const BODY = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '1.5',
  color: 'var(--text-primary)',
};

const PORTRAIT: string | null = portraitImg;


/* ─── Nav ─────────────────────────────────────────────────── */
function AboutNav() {
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
        paddingLeft: '80px', paddingRight: '80px',
        paddingTop: '24px', paddingBottom: '24px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.3s ease',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: '"Special Gothic Expanded One", sans-serif',
          fontSize: '15px', letterSpacing: '0.04em',
          textTransform: 'uppercase', color: 'var(--text-primary)', textDecoration: 'none',
          transition: 'color 0.4s ease',
        }}
      >
        ← Antonio Calero
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link to="/#work" className="nav-link" style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}>{t('nav.projects')}</Link>
        <Link to="/about" className="nav-link" style={{ ...META, color: 'var(--hero-title-color)', fontWeight: 700, textDecoration: 'none' }}>{t('nav.about')}</Link>
        <Link to="/contact" className="nav-link" style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}>{t('nav.contact')}</Link>
        <LanguageSelector />
      </div>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function AboutHero() {
  const { t } = useLanguage();
  return (
    <section
      style={{
        paddingTop: '128px',
        paddingLeft: '80px',
        paddingRight: '80px',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '80px',
        }}
      >
        <p style={{ ...META, color: 'var(--text-primary)' }}>{t('about.top_tag')}</p>
      </div>

      {/* Name */}
      <div style={{ paddingBottom: '80px' }}>
        <p
          className="meta-reveal"
          style={{ ...META, color: 'var(--text-secondary)', marginBottom: '24px' }}
        >
          {t('about.hero_role')}
        </p>
        <div className="scramble-line">
          <ScrambleText
            text={t('about.name')}
            delay={0.1}
            duration={900}
            className="scramble-inner"
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(52px, 6.5vw, 108px)',
              letterSpacing: '-0.03em',
              lineHeight: '0.92',
              color: 'var(--hero-title-color)',
              transition: 'color 0.4s ease',
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Portrait + Bio ────────────────────────────────────────── */
function AboutBio() {
  const { t } = useLanguage();
  const ref = useRevealAll();
  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="editorial-grid grid w-full"
      style={{ gridTemplateColumns: 'repeat(12, 1fr)', borderBottom: '1px solid var(--border-color)' }}
    >
      {/* Portrait / Foto — 5 cols */}
      <div
        className="about-portrait-wrapper"
        style={{
          gridColumn: 'span 5',
          borderRight: '1px solid var(--border-color)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface)',
          position: 'relative',
          width: '100%',
          minHeight: '580px',
        }}
      >
        <img
          src={PORTRAIT || '/antonio-calero.jpg'}
          alt="Antonio Calero"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            filter: 'grayscale(100%) contrast(105%)',
            display: 'block',
          }}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/antonio-calero.jpg')) {
              target.src = '/antonio-calero.jpg';
            }
          }}
        />
      </div>

      {/* Bio — 7 cols */}
      <div
        className="reveal"
        style={{
          gridColumn: 'span 7',
          padding: '72px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '56px',
        }}
      >
        <div>
          <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '24px' }}>{t('about.bio_label')}</p>
          <p style={{ ...BODY, fontSize: '22px', lineHeight: '1.5', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
            {t('about.bio_p1')}
          </p>
          <p style={{ ...BODY, fontSize: '17px', color: 'var(--text-primary)', marginTop: '20px', lineHeight: '1.6' }}>
            {t('about.bio_p2')}
          </p>
        </div>

        {/* Rol */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
          <p style={{ ...META, marginBottom: '8px', color: 'var(--text-primary)' }}>{t('about.bio_role_label')}</p>
          <p style={{ ...BODY, fontSize: '16px', color: 'var(--text-primary)' }}>
            {t('about.bio_role_value')}
          </p>
          <p style={{ ...META, marginTop: '6px', color: 'var(--text-primary)' }}>{t('about.bio_status')}</p>
        </div>

        {/* Idiomas */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
          <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '20px' }}>{t('about.languages_label')}</p>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { lang: 'ES', label: t('about.lang_es_title'), level: t('about.lang_es_level') },
              { lang: 'EN', label: t('about.lang_en_title'), level: t('about.lang_en_level') },
              { lang: 'FR', label: t('about.lang_fr_title'), level: t('about.lang_fr_level') },
            ].map(({ lang, label, level }) => (
              <div key={lang}>
                <p style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontWeight: 700, fontSize: '32px',
                  letterSpacing: '-0.02em', color: 'var(--hero-title-color)', lineHeight: '1',
                  transition: 'color 0.4s ease',
                }}>{lang}</p>
                <p style={{ ...META, fontSize: '10px', marginTop: '6px', color: 'var(--text-primary)' }}>{label}<br />{level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TOOL_ICONS: Record<string, React.ReactNode> = {
  Figma: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
    </svg>
  ),
  Stitch: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16M12 4v16M7 7l10 10M17 7L7 17" />
    </svg>
  ),
  'Framer / Webflow': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  Spline: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Photoshop: (
    <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '11px', letterSpacing: '-0.05em' }}>Ps</span>
  ),
  Illustrator: (
    <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '11px', letterSpacing: '-0.05em' }}>Ai</span>
  ),
  'After Effects': (
    <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '11px', letterSpacing: '-0.05em' }}>Ae</span>
  ),
  'Premiere Pro': (
    <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '11px', letterSpacing: '-0.05em' }}>Pr</span>
  ),
  InDesign: (
    <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: '11px', letterSpacing: '-0.05em' }}>Id</span>
  ),
  'Claude Code': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  'Claude 3.7 Sonnet': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M13.5 2.5v7.2l5.1-5.1 1.4 1.4-5.1 5.1h7.2v2h-7.2l5.1 5.1-1.4 1.4-5.1-5.1v7.2h-2v-7.2l-5.1 5.1-1.4-1.4 5.1-5.1H2.5v-2h7.2L4.6 6l1.4-1.4 5.1 5.1V2.5h2.4z" />
    </svg>
  ),
  'Cursor & v0': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 3 10 21 13 13 21 10 3 3" />
    </svg>
  ),
  'Google Gemini & Nano': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" />
    </svg>
  ),
  'ChatGPT & OpenAI': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M22.28 10.37c-.15-.75-.46-1.46-.91-2.07a5.52 5.52 0 0 0-3.32-2.12 5.56 5.56 0 0 0-4.46.73 5.49 5.49 0 0 0-2.31-1.34 5.56 5.56 0 0 0-4.39.56 5.5 5.5 0 0 0-2.48 3.73 5.54 5.54 0 0 0-.6 3.19c.1.75.36 1.48.77 2.11a5.5 5.5 0 0 0-.61 3.2 5.55 5.55 0 0 0 2.47 3.73 5.57 5.57 0 0 0 4.4.56 5.53 5.53 0 0 0 2.31 1.34 5.56 5.56 0 0 0 4.46-.73 5.5 5.5 0 0 0 3.32-2.12c.45-.61.76-1.32.91-2.07a5.5 5.5 0 0 0 .6-3.19 5.53 5.53 0 0 0-.77-2.11 5.5 5.5 0 0 0 .61-3.2zM12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  'Nano Banana': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18c3-1 8-3 12-8 3-4 4-7 4-7s-3 1-7 4c-5 4-7 9-8 12 0 1-1 2-1 2s1-2 2-3z" />
      <path d="M18 4l2-1" />
    </svg>
  ),
  Midjourney: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16M7 19l2-9 3 5 3-5 2 9" />
    </svg>
  ),
  'Magnific AI': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  SeaDance: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c3-4 6-4 9 0s6 4 9 0" />
      <path d="M2 7c3-4 6-4 9 0s6 4 9 0" />
      <path d="M2 17c3-4 6-4 9 0s6 4 9 0" />
    </svg>
  ),
  'Runway & Kling': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M7 4v4M17 4v4M2 8h20M2 12h20M7 12v8M17 12v8" />
    </svg>
  ),
  'Krea AI': (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3z" />
    </svg>
  ),
};

/* ─── Trayectoria & Redes ─────────────────────────────────── */
function AboutExperience() {
  const { t, getExperiences, getEducation } = useLanguage();
  const ref = useRevealAll();
  const experiences = getExperiences();
  const educations = getEducation();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="editorial-grid grid w-full"
      style={{ gridTemplateColumns: 'repeat(12, 1fr)', borderBottom: '1px solid var(--border-color)' }}
    >
      {/* Columna Izquierda: Experiencia Laboral — 5 cols */}
      <div
        className="reveal-left"
        style={{
          gridColumn: 'span 5',
          borderRight: '1px solid var(--border-color)',
          padding: '64px 64px 64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Sin borde superior encima del título */}
          <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '24px' }}>
            {t('about.exp_title')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experiences.map(({ company, role, period }) => (
              <div
                key={company}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <p style={{ ...BODY, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {company}
                  </p>
                  <p style={{ ...META, fontSize: '11px', color: 'var(--text-primary)' }}>{role}</p>
                </div>
                <p style={{ ...META, fontSize: '10px', flexShrink: 0, marginLeft: '12px', textAlign: 'right', color: 'var(--text-primary)' }}>
                  {period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Formación Académica & Redes — 7 cols */}
      <div
        className="reveal"
        style={{
          gridColumn: 'span 7',
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {/* Formación Académica — Sin borde superior encima */}
        <div>
          <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '24px' }}>
            {t('about.edu_title')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {educations.map(({ school, degree, year }) => (
              <div
                key={school}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '16px',
                }}
              >
                <div>
                  <p style={{ ...BODY, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {school}
                  </p>
                  <p style={{ ...META, fontSize: '11px', color: 'var(--text-primary)' }}>{degree}</p>
                </div>
                <p style={{ ...META, fontSize: '10px', flexShrink: 0, marginLeft: '12px', color: 'var(--text-primary)' }}>
                  {year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Redes profesionales — Sin borde superior encima */}
        <div>
          <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '16px' }}>
            {t('about.channels_title')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', width: '100%' }}>
            {[
              { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/' },
              { label: 'Behance ↗', href: 'https://www.behance.net/antoniocalero' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 20px',
                  width: '100%',
                  border: '1px solid var(--border-color)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-color)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent-contrast)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stack & Toolkit: 3 Pilares Visuales y Minimalistas ──────── */
interface ToolItem {
  name: string;
  tag: string;
  focus: string;
}

interface PillarData {
  num: string;
  title: string;
  role: string;
  tools: ToolItem[];
}

const PILLARS_DATA: PillarData[] = [
  {
    num: '01',
    title: 'Craft & Sistemas',
    role: 'Arquitectura Atómica & UI',
    tools: [
      { name: 'Figma', tag: 'Tokens & Vars', focus: 'Tokens, librerías y componentes' },
      { name: 'Photoshop', tag: 'Adobe CC', focus: 'Retoque digital y key visuals' },
      { name: 'Illustrator', tag: 'Adobe CC', focus: 'Construcción vectorial e iconografía' },
      { name: 'Stitch', tag: 'Rapid UI', focus: 'Exploración conceptual acelerada' },
    ],
  },
  {
    num: '02',
    title: 'Lógica & Código IA',
    role: 'Agentes & Prototipos Vivos',
    tools: [
      { name: 'Claude Code', tag: 'CLI Agent', focus: 'Agente autónomo en terminal' },
      { name: 'Claude 3.7 Sonnet', tag: 'Reasoning', focus: 'Heurísticas UX y arquitectura' },
      { name: 'Google Gemini & Nano', tag: 'Multimodal', focus: 'Inferencia contextual on-device' },
    ],
  },
  {
    num: '03',
    title: 'Síntesis & Motion',
    role: 'Dirección de Arte Sintética',
    tools: [
      { name: 'Magnific AI', tag: 'Hiper-res', focus: 'Upscaling e hiper-detalle' },
      { name: 'SeaDance', tag: 'Motion AI', focus: 'Vídeo cinematográfico por prompt' },
    ],
  },
];

function AboutStack() {
  const { t, getPillars } = useLanguage();
  const ref = useRevealAll();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const pillars = getPillars();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="editorial-grid grid w-full"
      style={{
        gridTemplateColumns: 'repeat(12, 1fr)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Columna Izquierda: Manifiesto / Ancla de Sección — 5 cols */}
      <div
        className="reveal-left about-stack-anchor"
        style={{
          gridColumn: 'span 5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              borderTop: '2px solid var(--accent-color)',
              paddingTop: '12px',
              marginBottom: '20px',
              transition: 'border-color 0.4s ease',
            }}
          >
            <p style={{ ...META, color: 'var(--text-primary)', margin: 0 }}>
              {t('about.stack_eyebrow')}
            </p>
          </div>

          <h2
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.4vw, 52px)',
              letterSpacing: '-0.02em',
              lineHeight: '0.98',
              color: 'var(--hero-title-color)',
              margin: '0 0 28px 0',
              transition: 'color 0.4s ease',
            }}
          >
            {t('about.stack_title')}
          </h2>

          <p style={{ ...BODY, fontSize: '18px', lineHeight: '1.5', letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '18px' }}>
            {t('about.stack_manifesto_p1')}
          </p>
          <p style={{ ...BODY, fontSize: '15px', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0 }}>
            {t('about.stack_manifesto_p2')}
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '48px' }}>
          <p style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', margin: 0, lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {t('about.stack_meta')}
          </p>
        </div>
      </div>

      {/* Columna Derecha: Los 3 Pilares y Herramientas — 7 cols */}
      <div
        className="reveal about-stack-content"
        style={{
          gridColumn: 'span 7',
          display: 'flex',
          flexDirection: 'column',
          gap: '44px',
        }}
      >
        {pillars.map((pillar, pIdx) => (
          <div
            key={pillar.num}
            style={{
              borderTop: pIdx > 0 ? '1px solid var(--border-color)' : 'none',
              paddingTop: pIdx > 0 ? '36px' : '0',
            }}
          >
            {/* Cabecera del Pilar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                <span
                  style={{
                    ...META,
                    color: 'var(--accent-color)',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  {pillar.num} /
                </span>
                <h3
                  style={{
                    fontFamily: '"Special Gothic", sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(20px, 1.8vw, 24px)',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                    color: 'var(--hero-title-color)',
                    margin: 0,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {pillar.title}
                </h3>
              </div>
              <p style={{ ...META, fontSize: '11px', color: 'var(--text-primary)', margin: 0 }}>
                {pillar.role}
              </p>
            </div>

            {/* Herramientas del Pilar */}
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-color)' }}>
              {pillar.tools.map((tool) => {
                const isSelected = selectedTool === tool.name;

                return (
                  <div
                    key={tool.name}
                    onClick={() => setSelectedTool(prev => prev === tool.name ? null : tool.name)}
                    className="editorial-stack-row"
                    role="button"
                    tabIndex={0}
                    aria-label={`Herramienta ${tool.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTool(prev => prev === tool.name ? null : tool.name);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                      <span
                        className="editorial-stack-icon"
                        style={{
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)',
                          flexShrink: 0,
                          marginTop: '2px',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {TOOL_ICONS[tool.name]}
                      </span>
                      <div style={{ flex: 1 }}>
                        <span
                          className="editorial-stack-name"
                          style={{
                            fontFamily: '"Special Gothic", sans-serif',
                            fontWeight: 700,
                            fontSize: '17px',
                            letterSpacing: '-0.01em',
                            color: 'var(--text-primary)',
                            borderBottom: isSelected ? '2px solid var(--accent-color)' : '2px solid transparent',
                            paddingBottom: '1px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'border-color 0.2s ease',
                          }}
                        >
                          {tool.name}
                          <span
                            className="editorial-stack-arrow"
                            style={{
                              fontSize: '0.75em',
                              opacity: isSelected ? 1 : 0,
                              transform: isSelected ? 'translateX(0)' : 'translateX(-4px)',
                              display: 'inline-block',
                              color: 'var(--accent-color)',
                              transition: 'opacity 0.2s ease, transform 0.2s ease',
                            }}
                          >
                            →
                          </span>
                        </span>
                        {isSelected && (
                          <p style={{ ...BODY, fontSize: '13px', color: 'var(--text-primary)', margin: '6px 0 2px 0', lineHeight: '1.5' }}>
                            {tool.focus}
                          </p>
                        )}
                      </div>
                    </div>

                    <span style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', flexShrink: 0, marginLeft: '12px', alignSelf: 'flex-start', marginTop: '4px' }}>
                      {tool.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Call To Action hacia Contacto ───────────────────────── */
function AboutCTA() {
  const { t } = useLanguage();
  return (
    <section style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--cta-bg)', color: 'var(--cta-text)', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
      <div style={{ padding: '96px 80px' }}>
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
            <span
              style={{
                fontFamily: '"Special Gothic Expanded One", sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(36px, 5.5vw, 88px)',
                letterSpacing: '-0.01em',
                lineHeight: '0.92',
                color: 'var(--cta-text)',
                display: 'block',
              }}
            >
              {t('about.cta_title')}
            </span>
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
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function AboutFooter() {
  const { t } = useLanguage();
  const ref = useReveal(0.05);
  return (
    <footer
      ref={ref as RefObject<HTMLElement>}
      className="reveal section-pad"
      style={{
        paddingLeft: '80px', paddingRight: '80px',
        paddingTop: '40px', paddingBottom: '40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <span style={META}>© 2026 Antonio Calero</span>
      <span style={META}>{t('footer.rights')}</span>
      <div style={{ display: 'flex', gap: '32px' }}>
        <Link to="/contact" className="nav-link" style={{ ...META, textDecoration: 'none' }}>{t('nav.contact')}</Link>
        <a href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/" target="_blank" rel="noreferrer" className="nav-link" style={META}>LinkedIn</a>
        <a href="https://www.behance.net/antoniocalero" target="_blank" rel="noreferrer" className="nav-link" style={META}>Behance</a>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <AboutNav />
      <main>
        <AboutHero />
        <AboutBio />
        <AboutExperience />
        <AboutStack />
        <AboutCTA />
        <AboutFooter />
      </main>
    </>
  );
}

