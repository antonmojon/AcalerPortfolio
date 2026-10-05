import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function AlibetopiasPage() {
  const { language } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  const t = (es: string, en: string, fr: string) => {
    if (language === 'fr') return fr;
    if (language === 'en') return en;
    return es;
  };

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

  const roles = [
    t('Dirección de Arte de Evento', 'Event Art Direction', 'Direction Artistique d’Événement'),
    t('Retícula Modular Geométrica', 'Modular Geometric Grid', 'Grille Modulaire Géométrique'),
    t('Gran Formato, Photocalls & Vinilos', 'Large-Format, Photocalls & Vinyls', 'Grand Format, Photocalls & Vinyles'),
    t('Agencia: Newlink España', 'Agency: Newlink Spain', 'Agence : Newlink Espagne'),
  ];

  const colors = [
    { hex: '#E85D3B', name: t('Terracotta · Primario', 'Terracotta · Primary', 'Terre Cuite · Primaire') },
    { hex: '#1D4A38', name: t('Forest Green · Botánico', 'Forest Green · Botanical', 'Vert Forêt · Botanique') },
    { hex: '#F3EDE2', name: t('Warm Sand · Superficie', 'Warm Sand · Surface', 'Sable Chaud · Surface') },
    { hex: '#1A1A1A', name: t('Slate · Tipografía', 'Slate · Typography', 'Ardoise · Typographie') },
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
                <span className="scroll-in">03 / ARCHIVE</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">ALIBETOPIAS 2023</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2023 · Newlink España · Event Branding ]</span>
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
                          {t(
                            'Alibetopías es el encuentro en el que se reúnen los principales agentes alimentarios, tanto públicos como privados, para dar a conocer las últimas innovaciones del\u00A0sector.',
                            'Alibetopías is the summit bringing together key agri-food stakeholders, both public and private, to reveal the sector’s latest\u00A0innovations.',
                            'Alibetopías est le sommet réunissant les principaux acteurs agroalimentaires, publics comme privés, pour présenter les dernières innovations du\u00A0secteur.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'Desarrollado en Newlink España, el reto consistió en diseñar una dirección de arte reconocible pero con un aire elevado y propio, huyendo de los códigos habituales del sector\u00A0agrícola.',
                            'Developed at Newlink Spain, the challenge was to design an instantly recognizable art direction with an elevated presence, moving away from predictable agricultural\u00A0tropes.',
                            'Développé chez Newlink Espagne, le défi consistait à concevoir une direction artistique singulière et raffinée, rompant avec les codes conventionnels du secteur\u00A0agricole.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'La identidad se articuló mediante una cuadrícula modular geométrica capaz de componer con solidez todas las aplicaciones del evento: photocalls, vinilos de gran formato, invitaciones y save the\u00A0date.',
                            'The identity was structured on a geometric modular grid system, effortlessly scaling across all event touchpoints: photocalls, large-format vinyls, invitations, and save-the-date\u00A0collateral.',
                            'L’identité visuelle repose sur une grille modulaire géométrique, déclinée sur l’ensemble des supports : photocalls monumentaux, vinyles grand format, invitations et save the\u00A0date.'
                          )}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/185019901/ALIBETOPIAS-2023"
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginTop: '1vw' }}
                      >
                        <div className="scroll-in">
                          <div className="cta-text">
                            <span className="link-line">
                              {t('Ver proyecto en Behance', 'View on Behance', 'Voir sur Behance')}
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
                to="/red-bull-inside"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {t('Siguiente: Red Bull Fearless City', 'Next: Red Bull Fearless City', 'Suivant : Red Bull Fearless City')}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Authentic Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Cover Graphic */}
              <img
                className="project-image"
                src="/images/alibetopias/alibetopias-cover.jpg"
                alt="ALIBETOPIAS 2023 — Identidad Visual y Retícula Modular"
                loading="eager"
              />

              {/* Section 01: Concepto & Retícula Modular */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Cuadrícula modular geométrica',
                      'Geometric modular grid system',
                      'Grille modulaire géométrique'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Para responder a las necesidades de un evento con múltiples soportes arquitectónicos y editoriales, la identidad se estructura en módulos proporcionales. Esta retícula permite combinar imágenes fotográficas, campos de color plano y datos tipográficos con equilibrio y rigor, manteniendo la coherencia tanto en un tótem exterior de cuatro metros como en una credencial de mano.',
                      'To address the requirements of an event with diverse architectural and editorial formats, the identity is organized around proportional modules. This grid balances photographic imagery, solid color planes, and typographic metadata with precision, ensuring visual cohesion from a 4-meter outdoor totem down to a handheld badge.',
                      'Pour répondre aux exigences d’un événement aux formats multiples, tant architecturaux qu’éditoriaux, l’identité est structurée autour de modules proportionnels. Cette grille associe visuels photographiques, aplats colorés et typographie technique avec rigueur, garantissant une cohérence parfaite de l’immense totem au badge individuel.'
                    )}
                  </p>
                </div>

                {/* Swiss Spec Table (Authentic Givelet Style, NO boxed cards) */}
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Evento', 'Event', 'Événement')} ]</span>
                    <span className="project-spec-value">
                      Alibetopías 2023 · Jornada de Innovación en Alimentación y Bebidas
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Agencia', 'Agency', 'Agence')} ]</span>
                    <span className="project-spec-value">
                      Newlink España · {t('Dirección de arte e identidad visual', 'Art direction & visual identity', 'Direction artistique et identité visuelle')}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Sistema', 'System', 'Système')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Retícula modular geométrica basada en módulos cuadrados y subdivisiones diagonales.',
                        'Geometric modular grid based on square units and diagonal subdivisions.',
                        'Grille modulaire géométrique basée sur des unités carrées et des découpes diagonales.'
                      )}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Aplicaciones', 'Touchpoints', 'Supports')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Photocall principal, traseras de escenario, vinilado de salas, señalética, invitaciones y credenciales.',
                        'Main photocall, stage backdrops, space vinyls, directional wayfinding, invitations, and badges.',
                        'Photocall principal, fonds de scène, habillage vinyle, signalétique, invitations et badges.'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 02: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 02 / SISTEMA CROMÁTICO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Paleta de tonos tierra y botánicos',
                      'Earth pigments & botanical palette',
                      'Palette de tons terre et botaniques'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'La paleta cromática se apoya en pigmentos orgánicos que evocan el origen natural de la alimentación sin recurrir a verdes sintéticos o convencionales. El terracota cálido y el verde bosque maduro conviven sobre un fondo arena neutro que actúa como soporte editorial reposado.',
                      'The chromatic palette draws on organic pigments evoking natural food origins without relying on synthetic greens. Warm terracotta and mature forest green coexist against a neutral sand background that provides calm editorial grounding.',
                      'La palette chromatique puise dans des pigments organiques évoquant l’origine naturelle de l’alimentation, sans tomber dans les verts synthétiques. La terre cuite chaleureuse et le vert forêt profond s’accordent sur un fond sable neutre au repos éditorial maîtrisé.'
                    )}
                  </p>
                </div>

                {/* Color Squares Grid (Authentic CSS Component) */}
                <div className="color-squares-grid">
                  {colors.map((c) => (
                    <div key={c.hex} className="color-square-item text-box">
                      <div className="color-square-box scroll-in" style={{ backgroundColor: c.hex }}></div>
                      <div className="color-square-meta scroll-in">
                        <span className="color-square-hex">{c.hex}</span>
                        <span className="color-square-name">{c.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 03: Video de Presentación */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 03 / MOVIMIENTO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t('La retícula en movimiento', 'Grid in motion', 'La grille en mouvement')}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'En las pantallas del escenario y piezas de cabecera, la retícula cobra vida de forma sobria: las celdas modulares se abren y desplazan para presentar bloques temáticos, ponentes y entregas de premios.',
                      'Across stage screens and header reels, the grid comes alive with restraint: modular cells slide and unfold to introduce key themes, speakers, and award segments.',
                      'Sur les écrans de scène et les animations de transition, la grille prend vie avec retenue : les modules se déploient avec fluidité pour introduire thématiques, intervenants et remises de prix.'
                    )}
                  </p>
                </div>

                <div style={{ marginTop: '2vw' }}>
                  <div
                    style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      overflow: 'hidden',
                      backgroundColor: '#191919',
                    }}
                  >
                    <iframe
                      title="ALIBETOPIAS 2023 — Reel de Identidad"
                      src="https://www-ccv.adobe.io/v1/player/ccv/Tcy9-vdzjtI/embed?api_key=behance1&bgcolor=%23191919"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Section 04: Producción & Gran Formato */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 04 / GRAN FORMATO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t('Puesta en escena y arquitectura efímera', 'Staging & spatial execution', 'Mise en scène et espace')}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Documentación fotográfica de la jornada: despliegue del sistema gráfico en el photocall monumental de prensa, la trasera de conferencias y la señalética perimetral del auditorio.',
                      'On-site event photography: deployment of the graphic system across the press photocall, keynote stage backdrops, and environmental auditorium signage.',
                      'Reportage photographique de l’événement : déploiement de l’identité sur le photocall de presse, les fonds de conférence et la signalétique de l’auditorium.'
                    )}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3vw', marginTop: '2vw' }}>
                  <img
                    className="project-image"
                    src="/images/alibetopias/alibetopias-event-01.jpg"
                    alt="Photocall Modular ALIBETOPIAS 2023"
                    loading="lazy"
                  />

                  <img
                    className="project-image"
                    src="/images/alibetopias/alibetopias-event-02.jpg"
                    alt="Escenario Principal ALIBETOPIAS 2023"
                    loading="lazy"
                  />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2vw',
                    }}
                  >
                    <img
                      className="project-image"
                      src="/images/alibetopias/alibetopias-event-03.jpg"
                      alt="Señalética y Vinilos de Acceso"
                      loading="lazy"
                    />

                    <img
                      className="project-image"
                      src="/images/alibetopias/alibetopias-event-04.jpg"
                      alt="Acreditaciones y Ponencias"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ {t('SIGUIENTE PROYECTO', 'NEXT PROJECT', 'PROJET SUIVANT')} ]</span>
                  <Link to="/red-bull-inside" className="cta text-box">
                    <div className="scroll-in">
                      <div className="cta-text">
                        <span className="link-line">Red Bull Inside 2023 · Fearless City</span>
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
