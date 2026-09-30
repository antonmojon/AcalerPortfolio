import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

/* ─── Projects Data ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'agora',
    num: '01',
    title: 'Agora',
    category: 'Product Design & System',
    year: '2026',
    href: '/agora',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 'lavanderia',
    num: '02',
    title: 'Lavandería Bizkaia',
    category: 'Brand Identity & SaaS',
    year: '2025',
    href: '/lavanderia-bizkaia',
    img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: 'nightshift',
    num: '03',
    title: 'NightShift',
    category: 'Accessibility & Tokens',
    year: '2025',
    href: '/night-shift',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop&auto=format',
  },
];

const ARCHIVE = [
  {
    num: '01',
    name: 'Módulo App',
    detail: 'Product design, UI/UX architecture',
    date: '2024 - 2026',
    img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=800&h=600&fit=crop&auto=format',
  },
  {
    num: '02',
    name: 'Palomar Studio',
    detail: 'Visual identity, packaging & typography',
    date: '2023 - 2024',
    img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=800&h=600&fit=crop&auto=format',
  },
  {
    num: '03',
    name: 'Tipo Libre',
    detail: 'Specimen publication, variable fonts',
    date: '2022 - 2023',
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&auto=format',
  },
];

/* ─── Header / Navbar (Direct Clone of Matthieu Givelet) ─────────── */
function MgHeader() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="nav-logo anchor">
          <p className="text-box">
            <span className="nav-in" style={{ '--stagger-delay': '0s' } as React.CSSProperties}>
              ©AntonioCalero
            </span>
          </p>
        </Link>

        <div className="nav-links-wrapper desktop-el">
          <ul className="nav-links">
            <a className="nav-link nav-link-work nav-in anchor" href="#work" style={{ '--stagger-delay': '0.05s' } as React.CSSProperties}>
              <li className="link-line">{t('nav.projects')}</li>
              <span className="nav-link-count">({PROJECTS.length})</span>
            </a>
            <a className="nav-link nav-link-archive nav-in anchor" href="#archive" style={{ '--stagger-delay': '0.1s' } as React.CSSProperties}>
              <li className="link-line">Archive</li>
              <span className="nav-link-count">({ARCHIVE.length})</span>
            </a>
            <Link className="nav-link nav-in anchor" to="/about" style={{ '--stagger-delay': '0.15s' } as React.CSSProperties}>
              <li className="link-line">{t('nav.about')}</li>
            </Link>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
          <Link className="nav-button text-box desktop-el" to="/contact">
            <span className="nav-in link-line" style={{ '--stagger-delay': '0.2s' } as React.CSSProperties}>
              {t('nav.contact')}
            </span>
          </Link>
          <LanguageSelector />
          <button
            className={`burger-button mobile-el is-animated ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <div className="burger-button-text">
              <p className="burger-button-text-el">{mobileOpen ? 'Close' : 'Menu'}</p>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`burger-mobile mobile-el ${mobileOpen ? 'is-open' : ''}`}>
        <div className="burger-wrapper">
          <div className="burger-links">
            <div className="burger-title">
              <p className="text-box">
                <span className="burger-title-el">[ Navigation ]</span>
              </p>
              <div className="burger-border"></div>
            </div>
            <a className="burger-link anchor" href="#work" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">{t('nav.projects')}</span>
                <span className="burger-link-count">({PROJECTS.length})</span>
              </div>
            </a>
            <a className="burger-link anchor" href="#archive" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">Archive</span>
                <span className="burger-link-count">({ARCHIVE.length})</span>
              </div>
            </a>
            <Link className="burger-link anchor" to="/about" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">{t('nav.about')}</span>
              </div>
            </Link>
          </div>
          <Link className="cta text-box" to="/contact" onClick={() => setMobileOpen(false)}>
            <div className="cta-burger">
              <span className="cta-text-burger">{t('nav.contact')} →</span>
            </div>
          </Link>
        </div>
        <div className="burger-mobile-overlay" onClick={() => setMobileOpen(false)}></div>
      </div>
    </header>
  );
}

/* ─── Hero Section with Letter Wave & 3D Flip ────────────────────── */
function MgHero() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [boxesAnimated, setBoxesAnimated] = useState(false);
  const [imageBoxAnimated, setImageBoxAnimated] = useState(false);

  // Exact choreography from Matthieu Givelet:
  // 1. Letters glide up immediately
  // 2. At 700ms, box1 and box2 slide apart
  // 3. At 1100ms, the image box flips open in 3D
  useEffect(() => {
    const t1 = setTimeout(() => {
      setBoxesAnimated(true);
    }, 700);

    const t2 = setTimeout(() => {
      setImageBoxAnimated(true);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const firstLetters = ['A', 'N', 'T', 'O', 'N', 'I', 'O'];
  const lastLetters = ['C', 'A', 'L', 'E', 'R', 'O'];

  return (
    <section className="home-hero masthead-pad page-home">
      {/* Signature Name with embedded animated 3D image frame */}
      <div className="home-title-wrapper" aria-label="Antonio Calero">
        <div className={`home-title-box-1 ${boxesAnimated ? 'is-animated' : ''}`}>
          {firstLetters.map((char, index) => (
            <span key={index} className="text-box" style={{ display: 'inline-flex' }}>
              <span
                className="home-title-letter home-title-text"
                style={{ '--stagger-delay': `${0.1 + index * 0.05}s` } as React.CSSProperties}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        <div className={`home-title-image-box ${imageBoxAnimated ? 'is-animated' : ''}`}>
          <img
            className="home-title-image-1 is-animated"
            src={PROJECTS[0].img}
            alt="Agora project"
          />
          <img
            className="home-title-image-2 is-animated"
            src={PROJECTS[1].img}
            alt="Lavandería Bizkaia"
          />
          <img
            className="home-title-image-3 is-animated"
            src={PROJECTS[2].img}
            alt="NightShift"
          />
        </div>

        <div className={`home-title-box-2 ${boxesAnimated ? 'is-animated' : ''}`}>
          {lastLetters.map((char, index) => (
            <span key={index} className="text-box" style={{ display: 'inline-flex' }}>
              <span
                className="home-title-letter home-title-text"
                style={{ '--stagger-delay': `${0.45 + index * 0.05}s` } as React.CSSProperties}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Subtitles with text-in glide reveal */}
      <div className="home-hero-subtitle-wrapper">
        <h1 className="home-hero-subtitle">
          <span className="home-hero-subtitle-el text-in" style={{ '--stagger-delay': '0.7s' } as React.CSSProperties}>
            {isEs ? 'Diseñador de producto' : 'Product designer'}
          </span>
        </h1>
        <h2 className="home-hero-subtitle">
          <span className="home-hero-subtitle-el text-in" style={{ '--stagger-delay': '0.78s' } as React.CSSProperties}>
            {isEs ? '& arquitecto de sistemas' : '& systems architect'}
          </span>
        </h2>
        <h2 className="home-hero-subtitle">
          <span className="home-hero-subtitle-el text-in" style={{ '--stagger-delay': '0.86s' } as React.CSSProperties}>
            {isEs ? '[ Bilbao, España ]' : '[ Bilbao, Spain ]'}
          </span>
        </h2>
      </div>

      {/* Approach Box with scale-in border */}
      <div className="infos-box scroll-in-group">
        <div className="border"></div>
        <div className="infos-box-left">
          <p className="text-box">
            <span className="scroll-in">[ {isEs ? 'Enfoque' : 'Approach'} ]</span>
          </p>
        </div>
        <div className="infos-box-right">
          <p className="infos-box-text">
            <span className="text-box">
              <span className="scroll-in text-indent text-numb">
                {isEs ? 'Busco siempre soluciones' : 'Always looking for'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'limpias, meditadas y sólidas' : 'simple, thoughtful solutions'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'que encajen con el producto' : 'that fit the project and feel'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'y se sientan vivas al usarlas.' : 'good to use.'}
              </span>
            </span>
          </p>
          <Link className="cta text-box anchor" to="/about">
            <div className="scroll-in">
              <div className="cta-text">
                <span className="link-line">{isEs ? 'Más sobre mí' : 'More about me'}</span>
                <span className="cta-arrow-icon">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Selected Works Section (Direct Clone) ──────────────────────── */
function MgSelectedWork() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <section id="work" className="home-work">
      <div className="home-work-header scroll-in-group">
        <h3 className="home-work-header-title text-box">
          <span className="scroll-in">{isEs ? 'Proyectos' : 'Selected'} </span>
          <span className="scroll-in">{isEs ? 'seleccionados' : 'works'}</span>
        </h3>
        <a className="cta text-box anchor desktop-el" href="#work">
          <div className="scroll-in">
            <div className="cta-text">
              <span className="link-line">({PROJECTS.length})</span>
            </div>
          </div>
        </a>
      </div>

      <div className="home-work-grid">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            to={project.href}
            className="project-card"
            aria-label={`${project.title} - ${project.category}`}
          >
            <div className="project-card-box">
              <img
                src={project.img}
                alt={project.title}
                className="project-card-image"
                loading="lazy"
              />
            </div>
            <div className="project-card-title-box">
              <span className="project-card-title-number">{project.num}</span>
              <p className="project-card-title text-box">
                <span className="link-line">{project.title}</span>
              </p>
              <span className="project-card-arrow">→</span>
              <span className="project-card-cat" style={{ marginLeft: 'auto', opacity: 0.5, fontSize: 'var(--font-size-xs)' }}>
                {project.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Archive Section (Direct Clone with Floating Hover Image) ───── */
function MgArchive() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="archive" className="archive-section-wrap">
      <div className="archive">
        <div className="infos-box scroll-in-group" style={{ marginBottom: '4vw' }}>
          <div className="border"></div>
          <div className="infos-box-left">
            <p className="text-box">
              <span className="scroll-in">[ Archive ]</span>
            </p>
          </div>
          <div className="infos-box-right">
            <p className="infos-box-text">
              <span className="text-box">
                <span className="scroll-in text-indent text-numb">
                  {isEs ? 'Una selección de proyectos' : 'A collection of work and'}
                </span>
              </span>
              <span className="text-box">
                <span className="scroll-in">
                  {isEs ? 'adicionales y exploraciones' : 'explorations, testing ideas'}
                </span>
              </span>
              <span className="text-box">
                <span className="scroll-in">
                  {isEs ? 'de interfaces e identidad.' : 'and visual directions.'}
                </span>
              </span>
            </p>
            <p className="text-box">
              <span className="scroll-in">2022 - 2026</span>
            </p>
          </div>
        </div>

        <div className="archive-list-header scroll-in-group desktop-el">
          <p className="scroll-in">[ {isEs ? 'Nombre' : 'Name'} ]</p>
          <p className="scroll-in">[ {isEs ? 'Detalle' : 'Detail'} ]</p>
          <p className="scroll-in list-last-el">[ {isEs ? 'Fecha' : 'Date'} ]</p>
        </div>

        <div className="archive-list scroll-in-group">
          {ARCHIVE.map((item, idx) => (
            <div
              key={item.name}
              className={`archive-list-el ${hoverIndex === idx ? 'is-hover' : ''}`}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="archive-list-text">
                <p className="archive-name">
                  <span className="archive-list-num" style={{ marginRight: '1vw', opacity: 0.4, fontSize: 'var(--font-size-xxs)' }}>
                    {item.num}
                  </span>
                  <span>{item.name}</span>
                </p>
                <p className="archive-detail">{item.detail}</p>
                <p className="archive-date list-last-el">{item.date}</p>
              </div>

              {/* Floating image box with smooth height expand on hover */}
              <div className="archive-list-image-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="archive-list-image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer (Direct Clone) ──────────────────────────────────────── */
function MgFooter() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <footer className="footer">
      <div className="border"></div>
      <div className="text-box scroll-in-group">
        <p className="scroll-in">©2026 Antonio Calero</p>
      </div>
      <div className="footer-right">
        <div className="footer-box scroll-in-group">
          <p className="text-box">
            <span className="scroll-in">[ {isEs ? 'Disponibilidad' : 'Open'} ]</span>
          </p>
          <p className="footer-text">
            <span className="text-box">
              <span className="scroll-in text-indent">
                {isEs ? 'Siempre dispuesto a conocer' : "I'm always looking to"}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'nuevas personas, colaborar en' : 'meet new people, collaborate'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'retos ambiciosos de producto y' : 'on new projects, and explore'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'diseñar interfaces limpias. ' : 'new ideas. Feel free to '}
                <Link className="text-link" to="/contact">
                  {isEs ? 'hablemos.' : 'say hello.'}
                </Link>
              </span>
            </span>
          </p>
        </div>

        <div className="footer-box scroll-in-group">
          <p className="text-box">
            <span className="scroll-in">[ {isEs ? 'Contacto' : 'Contact'} ]</span>
          </p>
          <p className="footer-text">
            <span className="text-box">
              <span className="scroll-in">
                Contacto :{' '}
                <Link className="link-line" to="/contact">
                  {isEs ? 'Formulario directo →' : 'Direct contact form →'}
                </Link>
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                Ubicación : Madrid · CET (UTC+1)
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                Social :{' '}
                <a
                  className="link-line"
                  href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>{' '}
                ·{' '}
                <a
                  className="link-line"
                  href="https://www.behance.net/antoniocalero"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance ↗
                </a>
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Portfolio Home with Scroll-In Observer ────────────────── */
export default function PortfolioHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact IntersectionObserver logic from Matthieu Givelet's scrollIn()
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const delay = 0.08;
    const groups = root.querySelectorAll('.scroll-in-group');
    const borders = root.querySelectorAll('.border');
    const fadeElements = root.querySelectorAll('.project-card, .project-image');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.classList.contains('scroll-in-group')) {
            entry.target.querySelectorAll('.scroll-in').forEach((el, index) => {
              (el as HTMLElement).style.setProperty('--stagger-delay', `${index * delay}s`);
              el.classList.add('is-visible');
            });
          } else {
            entry.target.classList.add('is-visible');
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    groups.forEach((g) => observer.observe(g));
    borders.forEach((b) => observer.observe(b));
    fadeElements.forEach((f) => observer.observe(f));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="transition-wrapper">
      <MgHeader />
      <main>
        <MgHero />
        <MgSelectedWork />
        <MgArchive />
      </main>
      <MgFooter />
    </div>
  );
}
