import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function RedBullPage() {
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
        'Branding Espacial & Arquitectura Efímera',
        'Identidad Visual & Motion Graphics',
        'Narrativa Inmersiva en Dos Plantas',
      ]
    : [
        'Event Art Direction',
        'Spatial Branding & Ephemeral Architecture',
        'Visual Identity & Motion Graphics',
        'Immersive Two-Floor Narrative',
      ];

  const colors = [
    { name: 'Cyber Navy', hex: '#0A1128', usage: isEs ? 'Lienzo nocturno metropolitano' : 'Metropolitan nocturnal canvas' },
    { name: 'Red Bull Crimson', hex: '#FF0044', usage: isEs ? 'Acento de alta energía' : 'High-voltage energy accent' },
    { name: 'Electric Cyan', hex: '#00F0FF', usage: isEs ? 'Hotspots y líneas de neón' : 'Hotspots & neon glow lines' },
    { name: 'Solar Gold', hex: '#FFC700', usage: isEs ? 'Velocidad y aceleración' : 'Velocity & kinetic highlights' },
    { name: 'Dark Metal', hex: '#141419', usage: isEs ? 'Estructura escénica y soportes' : 'Scenographic metal structures' },
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
                <span className="scroll-in">04 / ARCHIVE</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">RED BULL INSIDE 2023: FEARLESS CITY</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2023 · Event Branding & Dirección de Arte ]</span>
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
                            ? 'Esto no es sólo un evento. No es sólo una activación. Es el gran encuentro anual de Red\u00A0Bull con todos sus partners estratégicos para presentar en primicia sus próximas novedades y visionar el futuro de la marca.'
                            : 'This is not merely an event, nor a conventional brand activation. It is Red\u00A0Bull’s landmark annual summit bringing together strategic partners to unveil future brand ventures and share tomorrow’s\u00A0vision.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'El proyecto articuló "Fearless City": una metrópolis futurista y audaz recreada a lo largo de dos plantas continuas, integrando todos los hotspots emblemáticos en los que confluye el universo cultural y deportivo de Red\u00A0Bull.'
                            : 'The experience materialized "Fearless City"—a daring futuristic metropolis built across two continuous floors, hosting every iconic hotspot where Red\u00A0Bull’s cultural, athletic, and lifestyle universe\u00A0unfolds.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Desde la ilustración panorámica del skyline madrileño reinterpretado con estética cyberpunk hasta la escenografía lumínica, señalética de gran formato y cápsulas audiovisuales sincrónicas para cada\u00A0ambiente.'
                            : 'From the panoramic illustration of Madrid’s architectural skyline reimagined through a cyberpunk lens to ambient neon scenography, large-format wayfinding, and synchronous audiovisual capsules for each\u00A0district.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/163066071/Red-Bull-Inside-2023-Fearless-City"
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
                to="/agricultores"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Fecha de Caducidad' : 'Next: Expiration Date'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Swiss Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Hero Skyline Artwork */}
              <img
                className="project-image"
                src="/images/redbull/redbull-cover.jpg"
                alt="Red Bull Inside 2023: Fearless City — Panorama Skyline Madrid Cyberpunk"
                loading="eager"
              />

              {/* Section 01: Concepto & Fearless City */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'El futuro desde la perspectiva de Red Bull' : 'The future from Red Bull’s perspective'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'Recrear la energía indomable de Red Bull requería trascender la convención de los salones de convenciones corporativos. "Fearless City" nació como una ciudad viva, con distritos especializados, arquitectura lumínica y recorridos inmersivos que situaban al partner no como un mero espectador, sino como un ciudadano de una metrópolis que late a ritmo de deportes de acción, música urbana y gaming.'
                      : 'Embodying Red Bull’s relentless ethos demanded transcending traditional corporate convention halls. "Fearless City" was engineered as a living metropolis—featuring distinct districts, kinetic lighting, and experiential corridors where partners transitioned from passive observers into active citizens of an urban sprawl driven by action sports, culture, and gaming.'}
                  </p>

                  {/* Madrid Skyline Narrative Callout */}
                  <div
                    style={{
                      border: '1px solid var(--border-color)',
                      padding: '2vw',
                      marginTop: '2vw',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1vw',
                    }}
                  >
                    <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                      [ ILUSTRACIÓN CLAVE · MADRID CYBERPUNK ]
                    </span>
                    <p style={{ margin: 0, fontSize: 'clamp(15px, 1.4vw, 20px)', lineHeight: 1.6 }}>
                      {isEs
                        ? 'El key visual reinterpreta hitos icónicos del horizonte madrileño —las Torres KIO inclinadas, la Torre Picasso y la silueta del Pirulí de Torrespaña— bajo una atmósfera nocturna electrificada, donde autopistas elevadas y neones carmesí y cian tejen la arquitectura de Fearless City.'
                        : 'The master key visual reinterprets Madrid’s defining skyline landmarks—the inclined KIO Towers, Torre Picasso, and Torrespaña’s communications spire—under an electrified nocturnal sky, intertwined with elevated overpasses and blazing crimson-and-cyan neon ribbons.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 02: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 02 / IDENTIDAD CROMÁTICA ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Alto voltaje y contraste nocturno' : 'High voltage & nocturnal contrast'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La paleta de Fearless City combina la oscuridad profunda del azul marino con los tonos característicos de la lata de Red Bull llevados al extremo lumínico: rojo carmesí de máximo impacto, cian eléctrico para la señalética digital y amarillo solar para los focos direccionales.'
                      : 'The chromatic scheme anchors deep midnight navy with the signature hues of the Red Bull can elevated to high-voltage luminescent intensities: high-impact crimson, electric cyan for digital signage, and solar yellow for directional beams.'}
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

              {/* Section 03: Experiencia Audiovisual & Activaciones */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 03 / PRODUCCIÓN AUDIOVISUAL ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Activaciones de marca y piezas en movimiento' : 'Brand activations & motion capture'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La atmósfera del evento se articuló a través de contenidos audiovisuales sincrónicos en pantallas de gran formato y mapping volumétrico, sumergiendo a los asistentes en cada uno de los distritos de Fearless City.'
                      : 'The event’s pulse was driven by synchronized motion pieces across panoramic LED volumes and architectural projection mapping, immersing guests into each specialized district of Fearless City.'}
                  </p>

                  {/* Video Embed 01: Keynote & City Reveal */}
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
                        title="Red Bull Fearless City — Keynote & City Reveal"
                        src="https://www-ccv.adobe.io/v1/player/ccv/2Cr3wiAazDs/embed?api_key=behance1&bgcolor=%23191919"
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
                      [ VÍDEO 01 · Presentación Principal & Apertura de Fearless City ]
                    </p>
                  </div>

                  {/* Video Embed 02: Spatial Experience */}
                  <div style={{ marginTop: '3vw' }}>
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
                        title="Red Bull Fearless City — Espacio y Activación"
                        src="https://www-ccv.adobe.io/v1/player/ccv/QVXkUdRYp-b/embed?api_key=behance1&bgcolor=%23191919"
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
                      [ VÍDEO 02 · Activación Espacial & Ecosistema de Partners ]
                    </p>
                  </div>

                  {/* Grid of secondary videos */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '1.5vw',
                      marginTop: '3vw',
                    }}
                  >
                    <div>
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
                          title="Red Bull Fearless City — Hotspot 01"
                          src="https://www-ccv.adobe.io/v1/player/ccv/JHysnLdCM4W/embed?api_key=behance1&bgcolor=%23191919"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                        />
                      </div>
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw' }}>
                        [ VÍDEO 03 · Hotspot Gaming & Digital ]
                      </p>
                    </div>

                    <div>
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
                          title="Red Bull Fearless City — Hotspot 02"
                          src="https://www-ccv.adobe.io/v1/player/ccv/McRFqCIHIdv/embed?api_key=behance1&bgcolor=%23191919"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                        />
                      </div>
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw' }}>
                        [ VÍDEO 04 · Cultura Urbana & Escenario ]
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 04: Distribución Espacial en Dos Plantas */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 04 / ARQUITECTURA EFÍMERA ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Dos plantas conectadas por la narrativa' : 'Two floors united by brand narrative'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La distribución espacial organizó el venue en dos cotas de experiencia complementarias. En la planta baja, la avenida principal acogió el escenario de keynotes, la zona de experiencias sensoriales y las barras temáticas de producto. En la planta superior, un mirador perimetral albergó las salas de trabajo colaborativo, lounges de networking y áreas de análisis comercial para los partners.'
                      : 'The spatial choreography structured the venue across two complementary experiential levels. On the ground floor, a broad central avenue hosted the keynote stage, product tasting laboratories, and immersive soundscapes. On the mezzanine level, an elevated perimeter walkway accommodated dedicated partner lounges, collaborative B2B breakout pods, and strategic briefing suites.'}
                  </p>

                  <div
                    style={{
                      border: '1px solid var(--border-color)',
                      padding: '2vw',
                      marginTop: '2vw',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '2vw',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0 0 0.5vw 0', letterSpacing: '0.08em' }}>
                        [ PLANTA 01 · EXPERIENCIA PÚBLICA ]
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '1.2vw', fontSize: 'var(--font-size-xs)', lineHeight: 1.8, opacity: 0.85 }}>
                        <li>Avenida central y pórtico de acceso neón</li>
                        <li>Escenario principal con pantalla anamórfica</li>
                        <li>Hotspots de degustación y coctelería</li>
                        <li>Simuladores de deportes de motor & gaming</li>
                      </ul>
                    </div>

                    <div>
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, margin: '0 0 0.5vw 0', letterSpacing: '0.08em' }}>
                        [ PLANTA 02 · PARTNER HUB & B2B ]
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '1.2vw', fontSize: 'var(--font-size-xs)', lineHeight: 1.8, opacity: 0.85 }}>
                        <li>Mirador panorámico sobre la ciudad</li>
                        <li>Salas privadas de negociación de lanzamientos</li>
                        <li>Showcase de novedades y packaging 2024</li>
                        <li>Zona de hospitalidad y networking exclusivo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ SIGUIENTE CASO DE ESTUDIO ]</span>
                  <Link to="/agricultores" className="cta text-box">
                    <div className="scroll-in">
                      <div className="cta-text">
                        <span className="link-line">Agricultores & Pescadores · Fecha de Caducidad</span>
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
