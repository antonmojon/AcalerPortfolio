import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

const METADATA: Record<string, {
  es: { eyebrow: string; title: string; subtitle: string };
  en: { eyebrow: string; title: string; subtitle: string };
  fr: { eyebrow: string; title: string; subtitle: string };
}> = {
  '/agora': {
    es: { eyebrow: '01 · Caso de Estudio', title: 'AGORA', subtitle: 'EVOLVE · Plataforma Educativa MVP' },
    en: { eyebrow: '01 · Case Study', title: 'AGORA', subtitle: 'EVOLVE · Educational MVP Platform' },
    fr: { eyebrow: '01 · Étude de Cas', title: 'AGORA', subtitle: 'EVOLVE · Plateforme Éducative MVP' },
  },
  '/night-shift': {
    es: { eyebrow: '02 · Caso de Estudio', title: 'NIGHT SHIFT', subtitle: 'Identidad & Experiencia Sensorial' },
    en: { eyebrow: '02 · Case Study', title: 'NIGHT SHIFT', subtitle: 'Brand Identity & Sensory Experience' },
    fr: { eyebrow: '02 · Étude de Cas', title: 'NIGHT SHIFT', subtitle: 'Identité de Marque & Expérience' },
  },
  '/lavanderia-bizkaia': {
    es: { eyebrow: '03 · Caso de Estudio', title: 'LAVANDERÍA BIZKAIA', subtitle: 'Identidad de Marca & Packaging' },
    en: { eyebrow: '03 · Case Study', title: 'LAVANDERÍA BIZKAIA', subtitle: 'Brand Identity & Packaging' },
    fr: { eyebrow: '03 · Étude de Cas', title: 'LAVANDERÍA BIZKAIA', subtitle: 'Identité & Packaging' },
  },
  '/about': {
    es: { eyebrow: 'Perfil Profesional', title: 'SOBRE MÍ', subtitle: 'Dirección de Diseño & Sistemas UI/UX' },
    en: { eyebrow: 'Professional Profile', title: 'ABOUT ME', subtitle: 'Design Direction & UI/UX Systems' },
    fr: { eyebrow: 'Profil Professionnel', title: 'À PROPOS', subtitle: 'Direction du Design & Systèmes UI/UX' },
  },
  '/contact': {
    es: { eyebrow: 'Comunicación Directa', title: 'CONTACTO', subtitle: 'Madrid · Disponible para Proyectos' },
    en: { eyebrow: 'Direct Contact', title: 'CONTACT', subtitle: 'Madrid · Available for Select Projects' },
    fr: { eyebrow: 'Communication Directe', title: 'CONTACT', subtitle: 'Madrid · Disponible pour Projets' },
  },
};

const DEFAULT_META = {
  es: { eyebrow: 'Cargando', title: 'ANTONIO CALERO', subtitle: 'Preparando interfaz & experiencia · 2026' },
  en: { eyebrow: 'Loading', title: 'ANTONIO CALERO', subtitle: 'Preparing interface & experience · 2026' },
  fr: { eyebrow: 'Chargement', title: 'ANTONIO CALERO', subtitle: 'Préparation de l’interface & expérience · 2026' },
};

/**
 * Editorial Swiss Project Loading Screen
 * Includes debounce so it only renders if loading takes > 180ms,
 * preventing any flicker on instantaneous page loads.
 */
export default function ProjectLoadingScreen() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('preview-loader')) {
      setVisible(true);
      return;
    }

    // 180ms debounce: Fast loads (<180ms) will never trigger this loader
    const timer = setTimeout(() => {
      setVisible(true);
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const currentLang = (language === 'fr' || language === 'en') ? language : 'es';
  const path = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const meta = (METADATA[path] && METADATA[path][currentLang]) || DEFAULT_META[currentLang];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Top Nano Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        <div className="swiss-loader-line" />
      </div>

      {/* Centered Editorial Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '12px',
          maxWidth: '540px',
          animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Eyebrow with active pulse indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
              display: 'inline-block',
              animation: 'pulse 1.4s infinite ease-in-out',
            }}
          />
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-color)',
              fontWeight: 700,
            }}
          >
            {meta.eyebrow}
          </span>
        </div>

        {/* Project Title */}
        <h2
          style={{
            fontFamily: '"Special Gothic", sans-serif',
            fontSize: 'clamp(32px, 5.5vw, 60px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            margin: '4px 0 8px 0',
          }}
        >
          {meta.title}
        </h2>

        {/* Swiss Hairline Progress Bar */}
        <div
          style={{
            width: '180px',
            height: '2px',
            backgroundColor: 'var(--border-color)',
            overflow: 'hidden',
            position: 'relative',
            margin: '6px 0',
          }}
        >
          <div className="swiss-loader-progress" />
        </div>

        {/* Subtitle / Status */}
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          {meta.subtitle}
        </span>
      </div>
    </div>
  );
}
