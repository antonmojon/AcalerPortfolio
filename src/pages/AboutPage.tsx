import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';
import portraitImg from '../assets/antonio-calero.jpg';

export default function AboutPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const photoRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Exact aboutPhotoScale() from Matthieu Givelet:
  // As user scrolls down, portrait photo zooms out smoothly from 1.3 to 1.0
  useEffect(() => {
    const updateScale = () => {
      const photo = photoRef.current;
      if (!photo) return;

      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      const scale = 1.3 - progress * 0.3;

      photo.style.transform = `scale(${scale})`;
    };

    window.addEventListener('scroll', updateScale, { passive: true });
    updateScale();
    return () => window.removeEventListener('scroll', updateScale);
  }, []);

  // Exact scrollIn() IntersectionObserver
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const delay = 0.08;
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
      { threshold: 0.1 }
    );

    groups.forEach((g) => observer.observe(g));
    borders.forEach((b) => observer.observe(b));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="transition-wrapper">
      <MgNav />

      <main>
        <section className="page-about">
          <section className="about">
            {/* Sticky Left Column: Portrait with Scroll Zoom-Out */}
            <div className="about-photo-box">
              <div className="about-photo-wrapper el-in">
                <img
                  ref={photoRef}
                  className="about-photo"
                  src={portraitImg}
                  alt="Antonio Calero"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Column: Editorial Bio, Services & Details */}
            <div className="about-right">
              {/* Lead Paragraphs with deep indents */}
              <div className="about-first scroll-in-group">
                <p className="about-first-text">
                  <span className="text-box">
                    <span className="scroll-in alinea-1" style={{ display: 'block' }}>
                      {isEs
                        ? 'Soy diseñador de producto y arquitecto de interfaces. Me interesa combinar el rigor tipográfico suizo con sistemas de diseño atómicos vivos y plataformas preparadas para escalar.'
                        : "I'm a product designer and interface architect. I combine Swiss typographic discipline with living atomic design systems and software platforms engineered to scale."}
                    </span>
                  </span>
                </p>

                <p className="about-first-text">
                  <span className="text-box">
                    <span className="scroll-in alinea-1" style={{ display: 'block' }}>
                      {isEs
                        ? 'Trabajo en la intersección entre diseño y desarrollo de software, cuidando cada micro-interacción para que herramientas complejas se sientan simples, intuitivas y sólidas.'
                        : 'Working at the intersection of design and software engineering, focusing on the details that make complex products feel simple, intuitive, and enduring.'}
                    </span>
                  </span>
                </p>
              </div>

              {/* Services & Core Competencies */}
              <div className="about-second">
                <div className="about-service">
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {isEs ? 'Diseño de Producto' : 'Product Design'}
                      </span>
                    </h2>
                    <p className="about-service-text">
                      <span className="text-box about-numb">
                        <span className="scroll-in">01</span>
                      </span>
                      <span className="text-box alinea-2">
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Definición de arquitecturas de información, diseño de flujos complejos de alta densidad y plataformas B2B preparadas para crecer.'
                            : 'Information architecture, complex workflow design, high-density telemetry, and B2B platforms engineered for growth.'}
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {isEs ? 'Sistemas & Tokens' : 'Systems & Tokens'}
                      </span>
                    </h2>
                    <p className="about-service-text">
                      <span className="text-box about-numb">
                        <span className="scroll-in">02</span>
                      </span>
                      <span className="text-box alinea-2 numb-2">
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Arquitectura de tokens de diseño, estándares de accesibilidad WCAG AAA y puente directo con equipos de ingeniería.'
                            : 'Design token architecture, living code integration, WCAG AAA accessibility, and zero-redundancy engineering handoff.'}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                {/* Details & Contact Links */}
                <div className="about-credit">
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {isEs ? 'Ubicación' : 'Based in'}
                      </span>
                    </h2>
                    <p className="about-text o-40">
                      <span className="text-box">
                        <span className="scroll-in">Bilbao, Bizkaia · España</span>
                      </span>
                      <span className="text-box">
                        <span className="scroll-in">[ CET · UTC+1 ]</span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {isEs ? 'Idiomas' : 'Languages'}
                      </span>
                    </h2>
                    <p className="about-text o-40">
                      <span className="text-box">
                        <span className="scroll-in">
                          {isEs
                            ? 'Español (Nativo) · Inglés (Profesional)'
                            : 'Spanish (Native) · English (Professional)'}
                        </span>
                      </span>
                      <span className="text-box">
                        <span className="scroll-in">
                          {isEs ? 'Francés (Profesional)' : 'French (Professional)'}
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">Social</span>
                    </h2>
                    <p className="about-text o-40">
                      <span className="text-box">
                        <a
                          href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                          target="_blank"
                          rel="noreferrer"
                          className="scroll-in link-line"
                        >
                          LinkedIn ↗
                        </a>
                      </span>
                      <span className="text-box" style={{ marginTop: '0.4vw' }}>
                        <a
                          href="https://www.behance.net/antoniocalero"
                          target="_blank"
                          rel="noreferrer"
                          className="scroll-in link-line"
                        >
                          Behance ↗
                        </a>
                      </span>
                    </p>
                  </div>

                  <Link className="cta text-box scroll-in-group" to="/contact">
                    <div className="scroll-in">
                      <div className="cta-text">
                        <span className="link-line cta-text-about">
                          {isEs ? 'Iniciar conversación' : 'Get in touch'}
                        </span>
                        <span className="cta-icon-about">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>

      <MgFooter />
    </div>
  );
}
