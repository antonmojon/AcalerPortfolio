import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

/* ─── Project Preview Media for the Hero Title Window ───────────── */
const HERO_PREVIEWS = [
  {
    title: 'Agora',
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Lavandería Bizkaia',
    src: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'NightShift',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop&auto=format',
  },
];

/* ─── Navigation (Matthieu Givelet Style) ─────────────────────────── */
function MgNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`mg-navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="mg-navbar">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="mg-nav-brand"
        >
          <span>©AntonioCalero</span>
        </Link>

        {/* Center Links with Counts */}
        <div className="mg-nav-center desktop-only">
          <ul className="mg-nav-list">
            <li>
              <a href="#work" className="mg-nav-link link-line">
                <span>{t('nav.projects')}</span>
                <span className="mg-link-count">(3)</span>
              </a>
            </li>
            <li>
              <a href="#archive" className="mg-nav-link link-line">
                <span>Archive</span>
                <span className="mg-link-count">(2)</span>
              </a>
            </li>
            <li>
              <Link to="/about" className="mg-nav-link link-line">
                <span>{t('nav.about')}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Right CTA & Language */}
        <div className="mg-nav-right">
          <Link to="/contact" className="mg-nav-cta link-line desktop-only">
            <span>{t('nav.contact')}</span>
            <span style={{ marginLeft: '4px' }}>→</span>
          </Link>
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}

/* ─── Hero Section with Embedded Visual Box ──────────────────────── */
function MgHero() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [activePreview, setActivePreview] = useState(0);

  // Subtle image cross-fade cycle in the title window
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePreview(prev => (prev + 1) % HERO_PREVIEWS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mg-hero home-hero masthead-pad">
      {/* Signature Name with embedded project image box */}
      <div className="mg-title-wrapper" aria-label="Antonio Calero">
        <h1 className="mg-title-part mg-title-1">ANTONIO</h1>
        <div className="mg-title-image-box" aria-hidden="true">
          {HERO_PREVIEWS.map((preview, i) => (
            <img
              key={preview.title}
              src={preview.src}
              alt=""
              className={`mg-title-image ${i === activePreview ? 'is-active' : ''}`}
              loading="eager"
            />
          ))}
        </div>
        <h1 className="mg-title-part mg-title-2">CALERO</h1>
      </div>

      {/* Subtitle Lines */}
      <div className="mg-subtitle-wrapper">
        <h2 className="mg-subtitle-line">
          {isEs ? 'Diseñador de producto y' : 'Product designer and'}
        </h2>
        <h2 className="mg-subtitle-line">
          {isEs ? 'arquitecto de interfaces — en España' : 'interface architect — based in Spain'}
        </h2>
        <h3 className="mg-subtitle-location">
          [ Madrid ]
        </h3>
      </div>

      {/* Approach / Philosophy Bar */}
      <div className="mg-infos-box">
        <div className="mg-border" />
        <div className="mg-infos-left">
          <p className="mg-label">[ {isEs ? 'Enfoque' : 'Approach'} ]</p>
        </div>
        <div className="mg-infos-right">
          <p className="mg-infos-text">
            <span className="mg-text-numb">
              {isEs
                ? 'Busco siempre soluciones limpias y meditadas que respondan a la realidad del producto y sean un placer de usar.'
                : 'Always looking for simple, thoughtful solutions that fit the project and feel good to use.'}
            </span>
          </p>
          <Link to="/about" className="mg-cta-link link-line">
            <span>{isEs ? 'Más sobre mí' : 'More about me'}</span>
            <span className="mg-cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Selected Works Section (Pure Vertical Editorial Grid) ──────── */
function MgSelectedWork() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const projects = [
    {
      num: '01',
      title: 'Agora',
      role: isEs ? 'Diseño de Producto & Sistema Atómico' : 'Product Design & Atomic System',
      year: '2026',
      href: '/agora',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=750&fit=crop&auto=format',
    },
    {
      num: '02',
      title: 'Lavandería Bizkaia',
      role: isEs ? 'Identidad de Marca & SaaS Logístico' : 'Brand Identity & Logistics SaaS',
      year: '2025',
      href: '/lavanderia-bizkaia',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=750&fit=crop&auto=format',
    },
    {
      num: '03',
      title: 'NightShift',
      role: isEs ? 'Accesibilidad & Motor de Tokens' : 'Accessibility & Token Engine',
      year: '2025',
      href: '/night-shift',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=750&fit=crop&auto=format',
    },
  ];

  return (
    <section id="work" className="mg-work-section">
      {/* Section Header */}
      <div className="mg-work-header">
        <h2 className="mg-section-title">
          {isEs ? 'Proyectos seleccionados' : 'Selected works'}
        </h2>
        <span className="mg-section-count desktop-only">
          ({projects.length})
        </span>
      </div>

      {/* Grid of Work */}
      <div className="mg-work-grid">
        {projects.map((p) => (
          <Link
            key={p.num}
            to={p.href}
            className="mg-project-card group"
            aria-label={`${p.num} ${p.title} - ${p.role}`}
          >
            <div className="mg-project-image-box">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="mg-project-image"
              />
            </div>
            <div className="mg-project-meta">
              <div className="mg-project-title-group">
                <span className="mg-project-num">{p.num}</span>
                <span className="mg-project-title link-line">{p.title}</span>
              </div>
              <div className="mg-project-role">
                <span>{p.role}</span>
                <span className="mg-project-year">[{p.year}]</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Archive Section with Hover Floating Preview ────────────────── */
function MgArchive() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);

  const archiveItems = [
    {
      num: '004',
      name: 'Módulo App',
      detail: isEs ? 'Producto Móvil & UI/UX Modular' : 'Mobile Product & Modular UI/UX',
      date: '2024–2026',
      img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=600&h=440&fit=crop&auto=format',
    },
    {
      num: '005',
      name: 'Palomar Studio / Tipo Libre',
      detail: isEs ? 'Identidad Editorial & Tipografía' : 'Editorial Identity & Typography',
      date: '2023–2024',
      img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&h=440&fit=crop&auto=format',
    },
  ];

  return (
    <section id="archive" className="mg-archive-section">
      <div className="mg-border" />

      {/* Header */}
      <div className="mg-archive-header">
        <h2 className="mg-section-title">Archive</h2>
        <span className="mg-section-count">({archiveItems.length})</span>
      </div>

      {/* Table Header */}
      <div className="mg-archive-cols desktop-only">
        <span className="mg-label">[ {isEs ? 'Proyecto' : 'Name'} ]</span>
        <span className="mg-label">[ {isEs ? 'Detalle' : 'Detail'} ]</span>
        <span className="mg-label text-right">[ {isEs ? 'Fecha' : 'Date'} ]</span>
      </div>

      {/* Rows */}
      <div className="mg-archive-list">
        {archiveItems.map((item) => (
          <div
            key={item.num}
            className="mg-archive-row"
            onMouseEnter={() => setHoveredImg(item.img)}
            onMouseLeave={() => setHoveredImg(null)}
          >
            <div className="mg-archive-col-name">
              <span className="mg-archive-num">{item.num}</span>
              <span className="mg-archive-name">{item.name}</span>
            </div>
            <div className="mg-archive-col-detail">
              <span>{item.detail}</span>
            </div>
            <div className="mg-archive-col-date text-right">
              <span>{item.date}</span>
            </div>

            {/* Hover floating thumbnail preview */}
            {hoveredImg === item.img && (
              <div className="mg-archive-preview desktop-only" aria-hidden="true">
                <img src={item.img} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer (Matthieu Givelet Style) ────────────────────────────── */
function MgFooter() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <footer className="mg-footer">
      <div className="mg-border" />

      <div className="mg-footer-left">
        <p className="mg-footer-copy">©2026 Antonio Calero</p>
      </div>

      <div className="mg-footer-right">
        {/* Open block */}
        <div className="mg-footer-block">
          <p className="mg-label">[ {isEs ? 'Disponibilidad' : 'Open'} ]</p>
          <p className="mg-footer-text">
            {isEs
              ? 'Siempre abierto a colaborar en proyectos ambiciosos, diseñar productos digitales con criterio y explorar nuevas ideas.'
              : 'Always looking to meet new people, collaborate on new projects, and explore new ideas.'}{' '}
            <Link to="/contact" className="mg-text-inline-link link-line">
              {isEs ? 'Escríbeme' : 'Say hello'}
            </Link>
            .
          </p>
        </div>

        {/* Contact block */}
        <div className="mg-footer-block">
          <p className="mg-label">[ {isEs ? 'Contacto' : 'Contact'} ]</p>
          <div className="mg-footer-links-col">
            <Link to="/contact" className="mg-footer-contact-link link-line">
              <span>{isEs ? 'Iniciar conversación' : 'Get in touch'} →</span>
            </Link>
            <span className="mg-footer-muted">
              Madrid · CET (UTC+1)
            </span>
            <div className="mg-footer-social">
              <a
                href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                target="_blank"
                rel="noreferrer"
                className="link-line"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.behance.net/antoniocalero"
                target="_blank"
                rel="noreferrer"
                className="link-line"
              >
                Behance ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Portfolio Home Root ────────────────────────────────────────── */
export default function PortfolioHome() {
  return (
    <div className="mg-page-wrapper">
      <MgNav />
      <main>
        <MgHero />
        <MgSelectedWork />
        <MgArchive />
      </main>
      <MgFooter />
    </div>
  );
}
