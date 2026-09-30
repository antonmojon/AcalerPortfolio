import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function WeekuPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const rootRef = useRef<HTMLDivElement>(null);

  // Exact IntersectionObserver logic matching Matthieu Givelet layout
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
        'Diseño de Producto & Mobile UI',
        'Investigación UX & Benchmark',
        'Arquitectura de la Información',
        'Prototipado Interactivo Figma',
      ]
    : [
        'Product Design & Mobile UI',
        'UX Research & Benchmark',
        'Information Architecture',
        'Interactive Figma Prototyping',
      ];

  const images = [
    {
      src: '/weeku-cover.jpg',
      alt: 'Weeku — AI Menu Planning Mobile App Overview',
    },
    {
      src: '/images/weeku/01-problem.jpg',
      alt: 'Weeku — Problemática y Metodología Design Thinking',
    },
    {
      src: '/images/weeku/02-research.jpg',
      alt: 'Weeku — Investigación Cuantitativa, Benchmark y Customer Journey',
    },
    {
      src: '/images/weeku/03-architecture-branding.jpg',
      alt: 'Weeku — Ideación, Card Sorting y Sistema de Diseño',
    },
    {
      src: '/images/weeku/04-ui-screens.jpg',
      alt: 'Weeku — Pantallas UI y Prototipado Final',
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
                <span className="scroll-in">04</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">WEEKU</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2025 · NEOLAND ]</span>
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
                            ? 'Weeku es una aplicación móvil de nutrición y planificación inteligente de menús basada en Inteligencia Artificial, diseñada para optimizar las dietas semanales según necesidades de salud, restricciones médicas y preferencias\u00A0reales.'
                            : 'Weeku is an AI-powered nutrition and meal-planning mobile application engineered to optimize weekly diets around medical constraints, individual preferences, and authentic nutritional\u00A0needs.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'A través del framework Design Thinking en el bootcamp de NEOLAND, la investigación reveló que el 78% de los usuarios sufre sobrecarga mental al decidir qué cocinar a diario, mientras que solo un 21% mantiene variedad en su\u00A0alimentación.'
                            : 'Applying the Design Thinking framework during an intensive sprint at NEOLAND, user research uncovered that 78% of people suffer from cognitive fatigue when deciding daily meals, while only 21% sustain dietary\u00A0variety.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'El sistema combate el desperdicio doméstico integrando ingredientes de la despensa, sincronizando macros y automatizando la lista de la compra mediante un prototipo interactivo de alta fidelidad en\u00A0Figma.'
                            : 'The solution curbs domestic food waste by incorporating existing pantry staples, synchronizing macros, and automating grocery checklists through a high-fidelity interactive prototype in\u00A0Figma.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/219554447/UIUX-Weeku-Menu-App"
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
                to="/agora"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Agora' : 'Next: Agora'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: High-Res Project Images & Interactive Figma Prototype */}
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

              {/* Live Figma Interactive Prototype */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: 'var(--color-grey)',
                }}
              >
                <iframe
                  title="Weeku Interactive Prototype"
                  style={{ border: 'none', width: '100%', height: '680px', display: 'block' }}
                  src="https://embed.figma.com/proto/cGs9o3w2N1rcD60b10o2Ux/FT-Antonio.Calero-PFB?page-id=1%3A6&node-id=67-89&p=f&viewport=599%2C349%2C0.07&scaling=scale-down&content-scaling=fixed&starting-point-node-id=227%3A1208&show-proto-sidebar=0&embed-host=share"
                  allowFullScreen
                />
              </div>

              {/* Mobile Next Project */}
              <Link
                to="/agora"
                className="cta text-box scroll-in-group mobile-el next-project-mobile"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Agora' : 'Next: Agora'}
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
