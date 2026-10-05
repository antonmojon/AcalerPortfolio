import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function AlibetopiasPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const rootRef = useRef<HTMLDivElement>(null);

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
        'Dirección de Arte de Evento',
        'Retícula Modular Geométrica',
        'Gran Formato, Photocalls & Vinilos',
        'Agencia: Newlink España',
      ]
    : [
        'Event Art Direction',
        'Modular Geometric Grid System',
        'Large-Format Environmental & Vinyls',
        'Agency: Newlink Spain',
      ];

  const colors = [
    { name: 'Warm Terracotta', hex: '#E85D3B', usage: isEs ? 'Innovación & pulso alimentario' : 'Agri-food innovation & vitality' },
    { name: 'Botanical Forest', hex: '#1D4A38', usage: isEs ? 'Sostenibilidad & origen biológico' : 'Sustainability & ecological roots' },
    { name: 'Warm Sand', hex: '#F3EDE2', usage: isEs ? 'Lienzo orgánico y fondo de piezas' : 'Organic canvas & stationery base' },
    { name: 'Pure White', hex: '#FFFFFF', usage: isEs ? 'Líneas de retícula y contraste' : 'Grid architecture & contrast' },
    { name: 'Slate Dark', hex: '#1A1A1A', usage: isEs ? 'Tipografía y datos técnicos' : 'Technical typography & microcopy' },
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
                          {isEs
                            ? 'Alibetopías es el encuentro cumbre del sector agroalimentario en España: una jornada donde convergen los agentes clave de la industria, centros de investigación y organismos públicos para debatir y presentar las tecnologías más transformadoras de la cadena de valor alimentaria.'
                            : 'Alibetopías stands as Spain’s premier agri-food innovation summit: an annual milestone gathering key industry leaders, foodtech researchers, and public institutions to present frontier technologies transforming the sustainable food value\u00A0chain.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Desarrollado en Newlink España, el reto consistió en crear una dirección de arte reconocible pero con un tono elevado, contemporáneo y propio, huyendo de los clichés agrícolas convencionales.'
                            : 'Developed at Newlink Spain, the creative challenge centered on crafting an instantly identifiable visual identity with an elevated, contemporary sophistication, departing from conventional agrarian\u00A0clichés.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'La solución conceptual se articuló sobre una cuadrícula modular geométrica de proporciones estrictas, permitiendo desplegar de manera coherente y armónica tanto aplicaciones de gran formato (photocalls monumentales, vinilos escénicos y tótems) como piezas de comunicación editorial (invitaciones, acreditaciones y save-the-date).'
                            : 'The solution was anchored by a strict geometric modular grid, harmoniously unifying large-scale environmental architectural installations (panoramic photocalls, scenic vinyls, directional totems) with refined editorial touchpoints (invitations, badges, and digital announcements).'}
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
                              {isEs ? 'Ver proyecto en Behance' : 'View on Behance'}
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
                      {isEs ? 'Siguiente: Red Bull Fearless City' : 'Next: Red Bull Fearless City'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Swiss Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Cover Graphic */}
              <img
                className="project-image"
                src="/images/alibetopias/alibetopias-cover.jpg"
                alt="ALIBETOPIAS 2023 — Identidad Visual y Retícula Modular Geométrica"
                loading="eager"
              />

              {/* Section 01: Concepto & Retícula Modular */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Cuadrícula modular como sistema vertebrador' : 'A modular geometric grid as backbone'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'Para reflejar la intersección entre tecnología e industria primaria, el lenguaje gráfico parte de módulos geométricos cuadrados y cortes diagonales. Este sistema modular actúa como un alfabeto visual combinatorio: cada celda puede albergar fotografía macro de producto, campos de color plano, datos estadísticos o tipografía técnica, adaptándose con naturalidad a cualquier proporción sin perder consistencia de marca.'
                      : 'To mirror the convergence of technology and raw agrarian science, the graphic syntax originates from square geometric modules and diagonal facets. This modular matrix behaves as a combinatory visual vocabulary: each cell accommodates macro product photography, solid pigment blocks, metrics, or technical typography, scaling seamlessly across any architectural ratio.'}
                  </p>

                  {/* Modular Specimen Callout */}
                  <div
                    style={{
                      border: '1px solid var(--border-color)',
                      padding: '2vw',
                      marginTop: '2vw',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1.5vw',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 01 · RETÍCULA ORDENADA ]
                      </span>
                      <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, marginTop: '0.5vw', opacity: 0.85 }}>
                        {isEs
                          ? 'Estructura matemática de proporciones 1:1 y 1:2 que organiza los bloques de información y genera dinamismo rítmico.'
                          : 'Mathematical 1:1 and 1:2 matrix organizing content blocks while injecting rhythmic kinetic cadence.'}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 02 · ESCALABILIDAD TOTAL ]
                      </span>
                      <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, marginTop: '0.5vw', opacity: 0.85 }}>
                        {isEs
                          ? 'Desde una acreditación de 8x12 cm hasta un photocall monumental de más de 8 metros lineales en el escenario principal.'
                          : 'Effortlessly spanning from an 8x12 cm lanyard credential to an 8-meter panoramic stage backdrop.'}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 03 · IDENTIDAD ELEVADA ]
                      </span>
                      <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, marginTop: '0.5vw', opacity: 0.85 }}>
                        {isEs
                          ? 'Tratamiento cromático sofisticado que posiciona a la cita en la vanguardia de los foros de innovación europeos.'
                          : 'Sophisticated palette positioning the summit at the forefront of European innovation symposiums.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 02: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 02 / SISTEMA CROMÁTICO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Tonos tierra cálidos y verde botánico' : 'Warm earth pigments & botanical green'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La identidad cromática huye de los tonos sintéticos fríos para apoyarse en la calidez de la arcilla y el follaje maduro: terracota cálido como señal de energía e innovación, verde bosque botánico como símbolo de sostenibilidad y fondo arena que otorga reposo editorial a cada composición.'
                      : 'The chromatic scheme sidesteps sterile tech synthetics, anchoring in raw clay warmth and mature flora: warm terracotta embodying human-scale innovation, botanical forest green evoking biodiversity, and raw sand providing restful editorial breath.'}
                  </p>

                  {/* Swatches Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '1.2vw',
                      marginTop: '2vw',
                    }}
                  >
                    {colors.map((c) => (
                      <div
                        key={c.name}
                        style={{
                          border: '1px solid var(--border-color)',
                          padding: '1vw',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.8vw',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            backgroundColor: c.hex,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        <div>
                          <p style={{ margin: '0 0 0.2vw 0', fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
                            {c.name}
                          </p>
                          <p style={{ margin: '0 0 0.3vw 0', fontFamily: 'monospace', fontSize: 'var(--font-size-xxs)', opacity: 0.5 }}>
                            {c.hex}
                          </p>
                          <p style={{ margin: 0, fontSize: 'var(--font-size-xxs)', opacity: 0.6, lineHeight: 1.3 }}>
                            {c.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 03: Video de Presentación */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 03 / MOTION & DINÁMICA ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'La identidad en movimiento' : 'Identity in motion'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La retícula modular cobra vida en las pantallas de cabecera y reels del evento: las cuadrículas se deslizan y despliegan suavemente introduciendo a los ponentes, categorías de premios y casos de estudio.'
                      : 'The modular grid awakens dynamically across stage LED ribbons and promotional reels: grid facets slide and expand to introduce keynote speakers, award laureates, and scientific case studies.'}
                  </p>

                  <div style={{ marginTop: '2.5vw' }}>
                    <div
                      style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        backgroundColor: '#191919',
                      }}
                    >
                      <iframe
                        title="ALIBETOPIAS 2023 — Reel de Identidad de Evento"
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
                    <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                      [ VÍDEO OFICIAL · Reel de Marca & Movimiento de Retícula ]
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 04: Producción & Gran Formato */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 04 / PRODUCCIÓN & GRAN FORMATO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Puesta en escena y arquitectura efímera' : 'Spatial execution & environmental staging'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'Fotografía in-situ de la jornada: aplicación de la retícula en photocalls principales, traseras de escenario, vinilado de mamparas de cristal y acreditaciones para los más de 400 asistentes del sector.'
                      : 'On-site documentary photography: deployment of the grid across main media photocalls, stage backdrop architecture, architectural glass vinyl treatments, and personalized lanyards for 400+ industry delegates.'}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2vw', marginTop: '2vw' }}>
                    <div>
                      <img
                        className="project-image"
                        src="/images/alibetopias/alibetopias-event-01.jpg"
                        alt="Photocall Modular ALIBETOPIAS 2023"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                        [ FIG. 01 — Photocall monumental con composición de módulos y marcas colaboradoras ]
                      </p>
                    </div>

                    <div>
                      <img
                        className="project-image"
                        src="/images/alibetopias/alibetopias-event-02.jpg"
                        alt="Escenario Principal y Mesa Redonda ALIBETOPIAS 2023"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                        [ FIG. 02 — Escenario principal de conferencias y mesas de debate ]
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr)))',
                        gap: '1.5vw',
                      }}
                    >
                      <div>
                        <img
                          className="project-image"
                          src="/images/alibetopias/alibetopias-event-03.jpg"
                          alt="Señalética y Vinilos de Acceso"
                          loading="lazy"
                        />
                        <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw' }}>
                          [ FIG. 03 — Túnel y vinilos de bienvenida ]
                        </p>
                      </div>

                      <div>
                        <img
                          className="project-image"
                          src="/images/alibetopias/alibetopias-event-04.jpg"
                          alt="Detalle de Acreditaciones y Piezas de Mano"
                          loading="lazy"
                        />
                        <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw' }}>
                          [ FIG. 04 — Ponencias y entrega de premios ]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ SIGUIENTE CASO DE ESTUDIO ]</span>
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
