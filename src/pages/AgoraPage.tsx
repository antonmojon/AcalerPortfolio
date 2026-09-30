import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function AgoraPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const rootRef = useRef<HTMLDivElement>(null);

  // Exact scrollIn() IntersectionObserver matching Matthieu Givelet
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const delay = 0.06;
    const groups = root.querySelectorAll('.scroll-in-group');
    const borders = root.querySelectorAll('.border');

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
      { threshold: 0.08 }
    );

    groups.forEach((g) => observer.observe(g));
    borders.forEach((b) => observer.observe(b));

    return () => observer.disconnect();
  }, []);

  const roles = isEs
    ? [
        'Diseño de Producto',
        'Investigación UX & Arquitectura',
        'Sistema de Diseño UI',
        'Accesibilidad WCAG 2.1 AA',
      ]
    : [
        'Product Design',
        'UX Research & Information Architecture',
        'UI Design System & Tokens',
        'Accessibility WCAG 2.1 AA',
      ];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Agora Platform Hero Overview',
    },
    {
      src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Agora Design System & Tokens',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Agora User Flow and Interactive Prototyping',
    },
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Agora Collaborative Workspaces',
    },
  ];

  return (
    <div ref={rootRef} className="transition-wrapper">
      <MgNav />

      <main>
        <section className="page-project">
          <section className="project">
            {/* Sticky Left Column: Project Info & Meta */}
            <div className="project-infos scroll-in-group">
              <p className="project-number text-box">
                <span className="scroll-in">01</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">AGORA</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2024 — 2025 ]</span>
                  </p>

                  <div className="project-details">
                    <p className="project-cat">
                      {roles.map((role) => (
                        <span key={role} className="text-box">
                          <span className="scroll-in">{role}</span>
                        </span>
                      ))}
                    </p>

                    <div className="project-desc">
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Agora es un ecosistema de colaboración integral concebido para equipos de producto y aprendizaje\u00A0distribuido.'
                            : 'Agora is an all-in-one collaborative workspace engineered for distributed product teams and educational\u00A0organizations.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Prioriza la concentración reduciendo la carga cognitiva visual mediante jerarquías sobrias y flujos multi-panel\u00A0continuos.'
                            : 'Prioritizing focus and cognitive clarity through sober typography, keyboard-driven navigation, and fluid multi-pane\u00A0flows.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Construido sobre una biblioteca de 40+ componentes accesibles y tokens sincronizados con\u00A0código.'
                            : 'Engineered upon a rigorous library of 40+ accessible UI components and design tokens synchronized with\u00A0engineering.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/antoniocalero"
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginTop: '1vw' }}
                      >
                        <div className="scroll-in">
                          <div className="cta-text">
                            <span className="link-line">
                              {isEs ? 'Ver caso en\u00A0Behance' : 'View on\u00A0Behance'}
                            </span>
                            <span className="cta-icon-up">↗</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Project Link */}
              <Link
                to="/lavanderia-bizkaia"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Lavandería\u00A0Bizkaia' : 'Next: Lavandería\u00A0Bizkaia'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: High-Res Project Images */}
            <div className="project-image-box el-in">
              {images.map((img, i) => (
                <img
                  key={i}
                  className="project-image"
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}

              {/* Mobile Next Project */}
              <Link
                to="/lavanderia-bizkaia"
                className="cta text-box scroll-in-group mobile-el next-project-mobile"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Lavandería Bizkaia' : 'Next: Lavandería Bizkaia'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </section>
      </main>

      <MgFooter />
    </div>
  );
}
