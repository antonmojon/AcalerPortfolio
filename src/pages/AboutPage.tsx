import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';
import portraitImg from '../assets/antonio-calero.jpg';

export default function AboutPage() {
  const { language } = useLanguage();
  const photoRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const t = (es: string, en: string, fr: string) => {
    if (language === 'fr') return fr;
    if (language === 'en') return en;
    return es;
  };

  // Zoom-out on scroll
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

  // IntersectionObserver
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

            {/* Right Column: Editorial Bio, Services, Experience & Details */}
            <div className="about-right">
              {/* Lead Paragraphs from LinkedIn Profile */}
              <div className="about-first scroll-in-group">
                <p className="about-first-text">
                  <span className="text-box">
                    <span className="scroll-in alinea-1" style={{ display: 'block' }}>
                      {t(
                        'Diseñador UI/UX y Product Designer con origen en diseño gráfico. Actualmente en Evolve, donde trabajo en sistemas de diseño, plataformas digitales, diseño de producto de extremo a extremo y contenido creativo para marketing y\u00A0campañas.',
                        'UI/UX and Product Designer with a foundation in graphic design. Currently at Evolve, working on design systems, digital platforms, end-to-end product design, and creative campaign\u00A0assets.',
                        'Designer UI/UX et Product Designer, issu du design graphique. Actuellement chez Evolve, où je travaille sur les design systems, plateformes numériques, design produit de bout en bout et créations de\u00A0campagne.'
                      )}
                    </span>
                  </span>
                </p>

                <p className="about-first-text">
                  <span className="text-box">
                    <span className="scroll-in alinea-1" style={{ display: 'block' }}>
                      {t(
                        'Me interesa especialmente la intersección entre diseño e inteligencia artificial: integro herramientas agénticas y flujos de automatización para diseñar con mayor agilidad y consistencia, manteniendo siempre el máximo rigor en el\u00A0detalle.',
                        'Focused on the intersection of design and artificial intelligence: leveraging agentic tools and automation workflows to design faster and with deeper consistency, without sacrificing attention to\u00A0craft.',
                        'Spécialement intéressé par la convergence entre design et intelligence artificielle : intégration d’outils agentiques et d’automatisation pour concevoir avec agilité et rigueur, avec une attention constante portée aux\u00A0détails.'
                      )}
                    </span>
                  </span>
                </p>
              </div>

              {/* Disciplines & Core Competencies */}
              <div className="about-second">
                <div className="about-service">
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Diseño de\u00A0Producto', 'Product\u00A0Design', 'Design de\u00A0Produit')}
                      </span>
                    </h2>
                    <p className="about-service-text">
                      <span className="text-box about-numb">
                        <span className="scroll-in">01</span>
                      </span>
                      <span className="text-box alinea-2">
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'Sistemas de diseño atómicos en Figma, arquitecturas de información, diseño de plataformas B2B y flujos de usuario de extremo a\u00A0extremo.',
                            'Atomic design systems in Figma, information architecture, B2B digital platforms, and end-to-end user workflows engineered for\u00A0scale.',
                            'Design systems atomiques sur Figma, architecture de l’information, plateformes B2B et flux utilisateur de bout en\u00A0bout.'
                          )}
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Dirección de Arte & Gráfico', 'Art Direction & Graphic', 'Direction Artistique')}
                      </span>
                    </h2>
                    <p className="about-service-text">
                      <span className="text-box about-numb">
                        <span className="scroll-in">02</span>
                      </span>
                      <span className="text-box alinea-2 numb-2">
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'Identidad visual, diseño editorial, cartelería suiza, piezas para eventos de gran formato y creatividad publicitaria para Paid\u00A0Media.',
                            'Visual identity, editorial design, Swiss poster typography, large-format event branding, and creative advertising for Paid\u00A0Media.',
                            'Identité visuelle, design éditorial, typographie d’affiches suisses, scénographie événementielle grand format et Paid\u00A0Media.'
                          )}
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('IA & Automatización', 'AI & Automation', 'IA & Automatisation')}
                      </span>
                    </h2>
                    <p className="about-service-text">
                      <span className="text-box about-numb">
                        <span className="scroll-in">03</span>
                      </span>
                      <span className="text-box alinea-2 numb-2">
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'Integración de agentes autónomos y modelos generativos para acelerar la iteración visual, prototipado interactivo y control de\u00A0tokens.',
                            'Integration of autonomous agents and generative models to accelerate visual iteration, interactive prototyping, and design token management.',
                            'Intégration d’agents autonomes et de modèles génératifs pour accélérer le prototypage interactif et la gestion des tokens.'
                          )}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="about-service" style={{ marginTop: '3vw' }}>
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Experiencia', 'Experience', 'Expérience')}
                      </span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2vw', marginTop: '1.5vw' }}>
                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: '0 0 0.3vw 0' }}>
                          Evolve · UI/UX & Graphic Designer
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0 0 0.6vw 0' }}>
                          {t('2024 – Presente · Madrid, España', '2024 – Present · Madrid, Spain', '2024 – Présent · Madrid, Espagne')}
                        </p>
                        <p className="scroll-in alinea-2" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, opacity: 0.85, margin: 0 }}>
                          {t(
                            'Diseño de producto para plataformas web y apps B2B, diseño editorial académico, creativos para Paid Media y uso de IA para acelerar prototipado.',
                            'Product design for B2B web and app platforms, academic editorial publications, Paid Media campaign assets, and AI-accelerated prototyping.',
                            'Design produit pour plateformes web et apps B2B, design éditorial académique, créations Paid Media et flux IA pour accélérer le prototypage.'
                          )}
                        </p>
                      </div>

                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: '0 0 0.3vw 0' }}>
                          Freelance · UI/UX & Graphic Designer
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0 0 0.6vw 0' }}>
                          2025 – 2026
                        </p>
                        <p className="scroll-in alinea-2" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, opacity: 0.85, margin: 0 }}>
                          {t(
                            'Diseño de interfaces digitales, consultoría estratégica de producto e identidad de marca para clientes y proyectos independientes.',
                            'Digital interface design, strategic product consultancy, and visual brand identity for independent clients and studios.',
                            'Design d’interfaces numériques, conseil stratégique produit et identité de marque pour clients indépendants.'
                          )}
                        </p>
                      </div>

                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: '0 0 0.3vw 0' }}>
                          Newlink Spain · Graphic Designer & Art Director Trainee
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0 0 0.6vw 0' }}>
                          {t('2021 – 2025 · 3 años 7 meses · Madrid, España', '2021 – 2025 · 3 yrs 7 mos · Madrid, Spain', '2021 – 2025 · 3 ans 7 mois · Madrid, Espagne')}
                        </p>
                        <p className="scroll-in alinea-2" style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, opacity: 0.85, margin: 0 }}>
                          {t(
                            'Desarrollo de identidad visual, dirección de arte, cartelería, piezas de gran formato y campañas de comunicación para cuentas de la agencia.',
                            'Visual identity systems, art direction, poster design, large-format spatial graphics, and integrated communication campaigns for agency clients.',
                            'Identité visuelle, direction artistique, affichage, scénographie grand format et campagnes intégrées pour les clients de l’agence.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="about-service" style={{ marginTop: '3vw' }}>
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Educación', 'Education', 'Formation')}
                      </span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4vw', marginTop: '1.5vw' }}>
                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: 0 }}>
                          NEOLAND · Bootcamp UI/UX Design
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0.2vw 0 0 0' }}>
                          2024
                        </p>
                      </div>

                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: 0 }}>
                          Trazos · Máster en Dirección de Arte
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0.2vw 0 0 0' }}>
                          2020 – 2021
                        </p>
                      </div>

                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: 0 }}>
                          CEI Escuela de Diseño · Diseño Digital
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0.2vw 0 0 0' }}>
                          2019 – 2020
                        </p>
                      </div>

                      <div className="text-box">
                        <p className="scroll-in" style={{ fontWeight: 600, fontSize: 'var(--font-size-s)', margin: 0 }}>
                          CETYS Francisco de Vitoria · GS Técnicas de Ventas y Espacios Comerciales
                        </p>
                        <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0.2vw 0 0 0' }}>
                          2015 – 2017
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details & Contact Links */}
                <div className="about-credit" style={{ marginTop: '3vw' }}>
                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Ubicación', 'Based in', 'Localisation')}
                      </span>
                    </h2>
                    <p className="about-text o-40">
                      <span className="text-box">
                        <span className="scroll-in">Madrid · España</span>
                      </span>
                      <span className="text-box">
                        <span className="scroll-in">[ CET · UTC+1 ]</span>
                      </span>
                    </p>
                  </div>

                  <div className="about-infos-box scroll-in-group">
                    <h2 className="about-title text-box">
                      <span className="scroll-in">
                        {t('Idiomas', 'Languages', 'Langues')}
                      </span>
                    </h2>
                    <p className="about-text o-40">
                      <span className="text-box">
                        <span className="scroll-in">
                          {t(
                            'Español (Nativo) · Inglés (Profesional)',
                            'Spanish (Native) · English (Professional)',
                            'Espagnol (Natif) · Anglais (Professionnel)'
                          )}
                        </span>
                      </span>
                      <span className="text-box">
                        <span className="scroll-in">
                          {t('Francés (Profesional)', 'French (Professional)', 'Français (Professionnel)')}
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
                          {t('Iniciar conversación', 'Get in touch', 'Prendre contact')}
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
