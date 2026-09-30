import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function LavanderiaPage() {
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
        'Identidad de Marca & Branding',
        'Estrategia Digital & UI/UX',
        'Desarrollo Frontend',
        'Optimización Operativa',
      ]
    : [
        'Brand Identity & Art Direction',
        'Digital Strategy & UI/UX',
        'Frontend Web Engineering',
        'Operational Funnel Design',
      ];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Lavandería Bizkaia Industrial Identity',
    },
    {
      src: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Lavandería Bizkaia Logistics and Booking Flow',
    },
    {
      src: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1600&h=1000&fit=crop&auto=format',
      alt: 'Lavandería Bizkaia Design System & Print Material',
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
                <span className="scroll-in">02</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">LAVANDERÍA BIZKAIA</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2023 — 2024 ]</span>
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
                            ? 'Transformación digital integral y dirección de arte para referente del sector de lavandería industrial y de hostelería.'
                            : 'Complete digital transformation and brand repositioning for a premier commercial laundry provider in northern Spain.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in">
                          {isEs
                            ? 'Armoniza la fuerza del sector manufacturero con una experiencia digital editorial cálida y transparente.'
                            : 'Balancing utilitarian industrial machinery with warm, human-centered hospitality aesthetics and transparent pricing.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in">
                          {isEs
                            ? 'Generó un aumento del 44% en solicitudes comerciales y redujo a la mitad el tiempo de onboarding de clientes B2B.'
                            : 'Drove a 44% lift in qualified commercial inquiries and reduced onboarding time for enterprise accounts by 50%.'}
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
                to="/night-shift"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Night Shift' : 'Next: Night Shift'}
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
                to="/night-shift"
                className="cta text-box scroll-in-group mobile-el next-project-mobile"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Night Shift' : 'Next: Night Shift'}
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
