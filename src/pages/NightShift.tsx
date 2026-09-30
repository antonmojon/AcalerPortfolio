import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function NightShift() {
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
        'Estrategia de Producto Móvil',
        'UI Circadiana & Contraste OLED',
        'Microinteracciones Hápticas',
        'Ergonomía de Turnos Rotativos',
      ]
    : [
        'Mobile Product Strategy',
        'Circadian OLED Dark Mode UI',
        'Haptic Micro-interactions',
        'Shift-Worker Ergonomics',
      ];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Night Shift Interface Hero',
    },
    {
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Night Shift Mobile Screens and Typography',
    },
    {
      src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Night Shift Circadian UI Tokens',
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
                <span className="scroll-in">03</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">NIGHT SHIFT</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2024 ]</span>
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
                        <span className="scroll-in">
                          {isEs
                            ? 'Aplicación móvil de apoyo y seguimiento biométrico creada específicamente para trabajadores con horarios nocturnos o rotativos.'
                            : 'Dedicated mobile companion app and telemetry tracker engineered specifically for night-shift, emergency, and 24/7 rotational workers.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in">
                          {isEs
                            ? 'Arquitectura cromática de negros OLED puros y luz ámbar que elimina la fatiga ocular y preserva los ciclos de melatonina.'
                            : 'Pure OLED black ergonomics and warm amber spectrum lighting eliminate retinal fatigue and preserve fragile melatonin cycles.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in">
                          {isEs
                            ? 'Interacciones de un solo gesto diseñadas para operar con destreza motora reducida por cansancio acumulado.'
                            : 'One-thumb gestures and high-contrast telemetry designed for quick operation under heavy cognitive and physical fatigue.'}
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
                              {isEs ? 'Ver caso en Behance' : 'View on Behance'}
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
