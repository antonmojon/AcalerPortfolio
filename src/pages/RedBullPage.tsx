import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function RedBullPage() {
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
    t('Branding Espacial & Escenografía', 'Spatial Branding & Scenography', 'Branding Spatial & Scénographie'),
    t('Identidad Visual & Key Visual', 'Visual Identity & Key Visual', 'Identité Visuelle & Key Visual'),
    t('Narrativa en Dos Plantas', 'Two-Floor Narrative Experience', 'Expérience Narrative sur Deux Niveaux'),
  ];

  const colors = [
    { hex: '#0A1128', name: t('Cyber Navy · Noche', 'Cyber Navy · Night', 'Cyber Marine · Nuit') },
    { hex: '#FF0044', name: t('Energy Crimson · Red Bull', 'Energy Crimson · Red Bull', 'Pourpre Énergie · Red Bull') },
    { hex: '#00F0FF', name: t('Electric Cyan · Neón', 'Electric Cyan · Neon', 'Cyan Électrique · Néon') },
    { hex: '#FFC700', name: t('Solar Gold · Aceleración', 'Solar Gold · Acceleration', 'Or Solaire · Vitesse') },
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
                  <span className="scroll-in">RED BULL INSIDE 2023</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2023 · Fearless City · Event Branding ]</span>
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
                            'Esto no es sólo un evento. No es sólo una activación. Es el encuentro anual de Red\u00A0Bull con todos sus partners para presentar sus próximas novedades y visionar el futuro desde la perspectiva de la\u00A0marca.',
                            'This is not merely an event, nor a conventional activation. It is Red\u00A0Bull’s annual partner summit to unveil upcoming launches and view the future through the brand’s unique\u00A0lens.',
                            'Ce n’est pas seulement un événement ni une simple activation. C’est le rendez-vous annuel de Red\u00A0Bull avec ses partenaires pour dévoiler les nouveautés et imaginer l’avenir sous l’angle de la\u00A0marque.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'A lo largo de dos plantas se recreó "Fearless City", la ciudad de Red\u00A0Bull Inside 2023, reuniendo todos los hotspots clave en los que se desarrolla la vida de la marca y sus\u00A0partners.',
                            'Across two expansive floors, "Fearless City" was brought to life: a bespoke metropolis bringing together the key hotspots where the brand and its partners\u00A0collaborate.',
                            'Déployée sur deux niveaux, "Fearless City" a donné corps à la métropole de Red\u00A0Bull Inside 2023, rassemblant tous les hotspots emblématiques de l’univers de la\u00A0marque.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'La dirección de arte combinó una ilustración panorámica de la noche madrileña con escenografía de neón, señalética volumétrica y piezas audiovisuales sincrónicas para cada\u00A0ambiente.',
                            'The art direction paired a panoramic nocturnal illustration of Madrid’s skyline with neon scenography, environmental signage, and synchronized motion pieces for each\u00A0district.',
                            'La direction artistique a marié une illustration panoramique de la nuit madrilène à une scénographie de néons, signalétique spatiale et capsules vidéo immersives pour chaque\u00A0espace.'
                          )}
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
                to="/agricultores"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {t('Siguiente: Fecha de Caducidad', 'Next: Expiration Date', 'Suivant : Date de Péremption')}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Authentic Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Cover Artwork */}
              <img
                className="project-image"
                src="/images/redbull/redbull-cover.jpg"
                alt="Red Bull Inside 2023: Fearless City — Panorama Skyline Madrid"
                loading="eager"
              />

              {/* Section 01: Concepto & Fearless City */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Fearless City: la metrópolis de Red Bull',
                      'Fearless City: Red Bull’s metropolis',
                      'Fearless City : la métropole Red Bull'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Para alejar el encuentro de la convención corporativa tradicional, el espacio se concibió como una ciudad nocturna en la que los invitados interactuaban con los diferentes territorios de la marca: deporte, cultura urbana, música y gaming.',
                      'Steering away from conventional corporate summits, the venue was envisioned as a nocturnal metropolis where partners actively navigated the brand’s defining cultural territories: sport, urban culture, sound, and gaming.',
                      'Loin des conventions d’entreprise traditionnelles, le lieu a été conçu comme une ville nocturne vivante où les partenaires découvraient les territoires phares de la marque : sport, culture urbaine, musique et gaming.'
                    )}
                  </p>
                </div>

                {/* Swiss Spec Table (Authentic Givelet Style) */}
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Evento', 'Event', 'Événement')} ]</span>
                    <span className="project-spec-value">
                      Red Bull Inside 2023 · Partner Summit & Keynote Anual
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Concepto', 'Concept', 'Concept')} ]</span>
                    <span className="project-spec-value">
                      Fearless City · {t('Metrópolis inmersiva articulada en dos plantas', 'Immersive metropolis designed across two levels', 'Métropole immersive articulée sur deux niveaux')}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Key Visual', 'Key Visual', 'Visuel Clé')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Skyline nocturno de Madrid reinterpretando las Torres KIO, Torre Picasso y Pirulí con neón y vías elevadas.',
                        'Nocturnal Madrid skyline reinterpreting KIO Towers, Torre Picasso, and Torrespaña with neon highways.',
                        'Skyline nocturne de Madrid réinterprétant les Tours KIO, la Tour Picasso et le Pirulí sous néons et voies suspendues.'
                      )}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Disciplinas', 'Disciplines', 'Disciplines')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Dirección de arte, ilustración vectorial, escenografía lumínica, señalética y piezas de motion para pantalla.',
                        'Art direction, vector illustration, neon scenography, wayfinding, and motion screens.',
                        'Direction artistique, illustration vectorielle, scénographie lumineuse, signalétique et motion design.'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 02: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 02 / CROMÁTICA & NEÓN ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Paleta nocturna de alto voltaje',
                      'High-voltage nocturnal palette',
                      'Palette nocturne à haute tension'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'La gama cromática toma los colores identificativos de Red Bull y los traslada al lenguaje lumínico de la noche: azul noche profundo como base arquitectónica, rojo crimson para puntos focales y cian eléctrico para señalética y pantallas.',
                      'The chromatic range adapts Red Bull’s signature hues into nocturnal light architecture: deep midnight navy as structural ground, energy crimson for focal points, and electric cyan for screens and wayfinding.',
                      'La palette transpose les couleurs emblématiques de Red Bull dans le langage de la nuit : bleu marine profond en socle architectural, pourpre énergique en point focal et cyan électrique pour la signalétique lumineuse.'
                    )}
                  </p>
                </div>

                {/* Color Squares Grid */}
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

              {/* Section 03: Experiencia Audiovisual */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 03 / PRODUCCIÓN AUDIOVISUAL ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Activaciones y piezas en movimiento',
                      'Activations & motion capture',
                      'Activations et motion design'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'El recorrido se acompañó de piezas audiovisuales proyectadas en pantallas panorámicas, sincronizando las presentaciones de producto y la atmósfera de cada hotspot.',
                      'The guest journey was guided by motion pieces projected on panoramic displays, harmonizing keynote reveals with the ambient soundscapes of each hotspot.',
                      'Le parcours s’accompagnait de créations audiovisuelles sur écrans panoramiques, synchronisant les annonces clés avec l’atmosphère de chaque zone thématique.'
                    )}
                  </p>
                </div>

                {/* Video Embeds without clumsy borders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3vw', marginTop: '2vw' }}>
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
                      title="Red Bull Fearless City — Presentación Principal"
                      src="https://www-ccv.adobe.io/v1/player/ccv/2Cr3wiAazDs/embed?api_key=behance1&bgcolor=%23191919"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allowFullScreen
                    />
                  </div>

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
                      title="Red Bull Fearless City — Experiencia Espacial"
                      src="https://www-ccv.adobe.io/v1/player/ccv/QVXkUdRYp-b/embed?api_key=behance1&bgcolor=%23191919"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allowFullScreen
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2vw',
                    }}
                  >
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
                        title="Red Bull Fearless City — Hotspot Digital"
                        src="https://www-ccv.adobe.io/v1/player/ccv/JHysnLdCM4W/embed?api_key=behance1&bgcolor=%23191919"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                      />
                    </div>

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
                        title="Red Bull Fearless City — Escenario & Cultura"
                        src="https://www-ccv.adobe.io/v1/player/ccv/McRFqCIHIdv/embed?api_key=behance1&bgcolor=%23191919"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 04: Distribución Espacial en Dos Plantas */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 04 / RECORRIDO ESPACIAL ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Distribución del espacio en dos plantas',
                      'Two-level spatial choreography',
                      'Chorégraphie spatiale sur deux niveaux'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'El espacio se estructuró en dos niveles conectados por la narrativa de marca, permitiendo transitar de la energía pública de las presentaciones a zonas de trabajo y reunión privada.',
                      'The venue was divided into two interconnected levels, transitioning seamlessly from high-impact collective stages to quiet partner briefing lounges.',
                      'L’espace s’est structuré sur deux niveaux interconnectés, permettant de passer de l’énergie collective des présentations à des salons de réunion plus intimistes.'
                    )}
                  </p>
                </div>

                {/* Swiss Spec Table (Authentic Givelet Style, NO bullet lists in border boxes) */}
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Planta 01 · Experiencia', 'Floor 01 · Public Experience', 'Niveau 01 · Expérience')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Avenida principal con pórtico de neón, escenario para keynotes de producto, barras de degustación y simuladores de deportes de motor.',
                        'Main avenue with neon gateway, product keynote stage, tasting labs, and motorsports simulators.',
                        'Avenue principale sous arche de néon, scène des annonces produits, bars de dégustation et simulateurs sportifs.'
                      )}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Planta 02 · Partner Hub', 'Floor 02 · Partner Hub', 'Niveau 02 · Espace Partenaires')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Mirador perimetral con vistas a la ciudad, showcase exclusivo de lanzamientos 2024 y salas privadas de negociación.',
                        'Perimeter mezzanine overlooking the city, 2024 launch showcase, and private business negotiation suites.',
                        'Mezzanine panoramique sur la ville, showcase exclusif des lancements 2024 et salons privés de négociation.'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ {t('SIGUIENTE PROYECTO', 'NEXT PROJECT', 'PROJET SUIVANT')} ]</span>
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
