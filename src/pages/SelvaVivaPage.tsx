import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function SelvaVivaPage() {
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
        'Identidad Visual & Branding',
        'Diseño Web & UI/UX',
        'Design System & Componentes',
        'Prototipado Interactivo Figma',
      ]
    : [
        'Visual Identity & Branding',
        'Web Design & UI/UX',
        'Design System & Components',
        'Interactive Figma Prototyping',
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
                <span className="scroll-in">02 / ARCHIVE</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">SELVA VIVA</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2025 · Branding & Web Design ]</span>
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
                            ? 'SelvaViva es una plataforma digital y ecosistema de marca concebido para expediciones inmersivas y ecoturismo de naturaleza en algunos de los hábitats más fascinantes del planeta (África, Vietnam y Nueva\u00A0Zelanda).'
                            : 'SelvaViva is a digital platform and brand ecosystem designed for immersive nature expeditions and sustainable ecotourism across the planet’s most pristine habitats (Africa, Vietnam, and New\u00A0Zealand).'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'La identidad visual nace del equilibrio entre naturaleza y aventura: el isotipo sintetiza la copa cenital de un árbol y una flor con los cuatro puntos cardinales, articulando una metáfora de orientación, respeto biológico y\u00A0descubrimiento.'
                            : 'The visual identity balances organic nature and adventure: the mark synthesizes an aerial tree crown and botanical blossom with the four cardinal points, embodying guided exploration and ecological\u00A0reverence.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Acompañado por la tipografía funcional IBM\u00A0Plex y una paleta de tonos tierra y verde bosque, el proyecto integra arquitectura de componentes en Figma, microcopy evocador y un prototipo interactivo completo de alta\u00A0fidelidad.'
                            : 'Paired with technical typography (IBM\u00A0Plex) and an earthy deep-green palette, the project encompasses modular component architecture in Figma, evocative microcopy, and a full high-fidelity interactive\u00A0prototype.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/235101727/SelvaViva"
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
                to="/weeku"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente:\u00A0Weeku' : 'Next:\u00A0Weeku'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Editorial Showcase */}
            <div className="project-image-box project-editorial-right">
              {/* Project Hero Cover */}
              <img
                className="project-image"
                src="/selvaviva-cover.jpg"
                alt="SelvaViva — Identidad de Marca y Plataforma de Ecoturismo"
              />

              {/* Section 01: Concepto & Manifiesto */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 01 / CONCEPTO & MANIFIESTO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs
                      ? 'Explora el Corazón de la Naturaleza'
                      : 'Explore the Heart of Nature'}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {isEs
                      ? 'SelvaViva diseña viajes con alma: auténticos, sostenibles y profundamente transformadores. El proyecto se concibe como una respuesta al turismo masivo, proponiendo expediciones íntimas guiadas por comunidades locales donde viajar se convierte en un acto de conciencia y reconexión con el\u00A0entorno.'
                      : 'SelvaViva designs journeys with soul: authentic, sustainable, and deeply transformative. The project counters generic mass tourism by crafting intimate expeditions guided by local communities, turning travel into an intentional act of environmental reverence and personal\u00A0discovery.'}
                  </p>
                </div>

                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Disciplinas ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Branding, Identidad Visual, Arquitectura de Información, Diseño Web UI/UX, Design System, Prototipado Interactivo.'
                        : 'Branding, Visual Identity, Information Architecture, Web UI/UX, Design System, Interactive Prototyping.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Herramientas ]</span>
                    <span className="project-spec-value">Figma · Adobe Illustrator · Adobe Photoshop</span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Ecosistemas ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Corazón de África (sabana y fauna ancestral) · Vietnam Profundo (arrozales y niebla) · Montañas en Nueva Zelanda (paisajes sagrados maoríes).'
                        : 'Heart of Africa (ancestral savannah and wildlife) · Deep Vietnam (misty terraced valleys) · New Zealand Mountains (sacred Maori wilderness).'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Filosofía ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Bajo impacto medioambiental, conservación de la biodiversidad y apoyo económico directo a guías y poblados autóctonos.'
                        : 'Low environmental footprint, biological preservation, and direct economic support for native guides and indigenous communities.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 02: Arquitectura del Isotipo & Versiones */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 02 / IDENTIDAD & VERSATILIDAD ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Isotipo y Sistema de Versiones' : 'Logotype & Versioning System'}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {isEs
                      ? 'El isotipo surge de la fusión entre naturaleza y aventura. Su silueta central evoca tanto una flor como la vista cenital de un árbol, símbolos de biodiversidad y crecimiento orgánico. Al mismo tiempo, la estructura geométrica incorpora sutilmente los cuatro puntos cardinales, otorgando un carácter explorador y un ancla visual al concepto de orientación y\u00A0descubrimiento.'
                      : 'The symbol merges nature with adventure. Its central silhouette evokes both a botanical bloom and the aerial zenith of a forest tree—emblems of growth and biodiversity. Simultaneously, the radial geometry subtly incorporates the four cardinal compass points, anchoring the brand to guided exploration and\u00A0discovery.'}
                  </p>
                </div>

                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Versión Vertical ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Diseñada para composiciones de ancho reducido, tarjetas de visita, cartelería editorial y formatos cuadrados de redes sociales.'
                        : 'Designed for narrow viewports, business stationery, editorial posters, and square social media lockups.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Versión Horizontal ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Optimizada para encabezados web, barras de navegación responsive, cabeceras de documentos corporativos y presentaciones.'
                        : 'Optimized for web headers, responsive navigation bars, corporate stationery, and keynote presentations.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Isotipo Aislado ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Uso minimalista en favicons, avatares, iconografía de interfaz, marcas de agua y grabado en soportes físicos de viaje.'
                        : 'Minimalist applications in browser favicons, avatars, UI iconography, watermarks, and physical gear stamping.'}
                    </span>
                  </div>
                </div>

                {/* Brand Lockups Showcase Image */}
                <div style={{ marginTop: '2vw' }}>
                  <img
                    className="project-image"
                    src="/images/selvaviva/selvaviva-brand-lockups.jpg"
                    alt="SelvaViva — Versiones de Logotipo e Isotipo"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section 03: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 03 / SISTEMA DE DISEÑO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Paleta Cromática Natural' : 'Natural Color Palette'}
                  </span>
                </h2>

                {/* Color Squares Grid */}
                <div className="color-squares-grid">
                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#2B544C' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#2B544C</span>
                      <span className="color-square-name">{isEs ? 'Deep Jungle · Primario' : 'Deep Jungle · Primary'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#F0D8AC' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#F0D8AC</span>
                      <span className="color-square-name">{isEs ? 'Warm Sand · Superficie' : 'Warm Sand · Surface'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#D4C4A2' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#D4C4A2</span>
                      <span className="color-square-name">{isEs ? 'Golden Moss · Isotipo' : 'Golden Moss · Accent'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#1B332E' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#1B332E</span>
                      <span className="color-square-name">{isEs ? 'Midnight Forest · Contraste' : 'Midnight Forest · Contrast'}</span>
                    </div>
                  </div>
                </div>

                {/* Typography Specimen */}
                <div className="type-specimen-block" style={{ marginTop: '3vw' }}>
                  <div className="border"></div>
                  <span className="project-section-meta">[ 03.1 / TIPOGRAFÍA EDITORIAL ]</span>

                  {/* Brand Display Hero */}
                  <div className="type-display-hero text-box">
                    <div className="type-display-word scroll-in" style={{ fontFamily: 'var(--font-heading)' }}>
                      SelvaViva
                    </div>
                    <div className="type-display-glyph scroll-in" style={{ fontFamily: 'var(--font-mono)' }}>
                      [ ✦ ]
                    </div>
                  </div>

                  {/* IBM Plex UI Weights Specimen */}
                  <div className="type-weights-list" style={{ fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">IBM Plex Sans Regular · 400</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 400 }}>
                        {isEs
                          ? 'Experiencias inmersivas en algunos de los ecosistemas más fascinantes del planeta.'
                          : 'Immersive expeditions across some of the most fascinating ecosystems on Earth.'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">IBM Plex Sans Medium · 500</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 500 }}>
                        {isEs
                          ? 'Explora la Esencia · Rutas auténticas, sostenibles y profundamente transformadoras.'
                          : 'Explore the Essence · Authentic, sustainable, and deeply transformative journeys.'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">IBM Plex Sans SemiBold · 600</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 600 }}>
                        {isEs
                          ? 'Descubre nuestras experiencias: Corazón de África · Vietnam Profundo · Nueva Zelanda'
                          : 'Discover our experiences: Heart of Africa · Deep Vietnam · New Zealand'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">IBM Plex Mono · Telemetría y Código</span>
                      <p className="type-weight-sample scroll-in" style={{ fontFamily: "'IBM Plex Mono', var(--font-mono)", fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                        LAT: 03°24&apos;S · LONG: 60°02&apos;W · ELEV: 1,420M · EXPEDICIÓN GUIADA · ECOTURISMO SOSTENIBLE
                      </p>
                    </div>

                    <div className="text-box" style={{ marginTop: '0.8vw' }}>
                      <p className="scroll-in" style={{ fontFamily: "'IBM Plex Mono', var(--font-mono)", fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 04: Plataforma Web UI/UX */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 04 / DISEÑO WEB & INTERFAZ ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Plataforma Web Inmersiva' : 'Immersive Web Platform'}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {isEs
                      ? 'El diseño de la página de inicio sigue una línea funcional y moderna que preserva la atmósfera de misterio y respeto por la naturaleza. La navegación superior facilita un acceso inmediato a Quienes Somos, Servicios, Experiencias y Contacto, mientras que el hero presenta una fotografía inmersiva de bosque nuboso con el lema de marca. La arquitectura desglosa las expediciones en fichas editoriales enriquecidas y culmina en un carrusel de testimonios reales de viajeros verificados que refuerzan la confianza y la\u00A0cercanía.'
                      : 'The desktop layout follows a functional, contemporary aesthetic that maintains a sense of mystery and ecological respect. The top navigation bar provides instant access to Company, Services, Expeditions, and Contact, while the hero pairs misty rainforest photography with the core brand narrative. The experience catalog presents structured editorial cards and culminates in a verified traveler testimonial carousel reinforcing social proof and authentic\u00A0connection.'}
                  </p>
                </div>

                {/* Studio Display Mockups: Transparent PNGs without borders */}
                <div className="project-image-transparent-wrap" style={{ padding: '2vw 0', display: 'flex', justifyContent: 'center' }}>
                  <img
                    className="project-image project-image--transparent"
                    src="/images/selvaviva/selvaviva-display-hero.png"
                    alt="SelvaViva — Apple Studio Display Hero Mockup"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', border: 'none', background: 'transparent' }}
                  />
                </div>

                <div className="project-image-transparent-wrap" style={{ padding: '1vw 0', display: 'flex', justifyContent: 'center' }}>
                  <img
                    className="project-image project-image--transparent"
                    src="/images/selvaviva/selvaviva-display-experiences.png"
                    alt="SelvaViva — Catálogo de Experiencias en Apple Studio Display"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', border: 'none', background: 'transparent' }}
                  />
                </div>

                <div className="project-image-transparent-wrap" style={{ padding: '1vw 0', display: 'flex', justifyContent: 'center' }}>
                  <img
                    className="project-image project-image--transparent"
                    src="/images/selvaviva/selvaviva-display-reviews.png"
                    alt="SelvaViva — Testimonios Reales en Apple Studio Display"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', border: 'none', background: 'transparent' }}
                  />
                </div>
              </div>

              {/* Section 05: Informe de Acciones, Desafíos y Soluciones */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 05 / INFORME DE ACCIONES ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs
                      ? 'Proceso de Diseño, Desafíos y Soluciones'
                      : 'Design Process, Challenges & Solutions'}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {isEs
                      ? 'Desglose metodológico documentado del proyecto, desde la recepción del brief hasta la entrega del prototipo final y los activos audiovisuales de\u00A0marca.'
                      : 'Documented methodological breakdown of the project lifecycle, from initial brief deconstruction to the final interactive prototype and brand audiovisual\u00A0assets.'}
                  </p>
                </div>

                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Acciones ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Recepción del brief y análisis de requerimientos · Planificación y elaboración de moodboards · Desarrollo de identidad visual y logotipo · Definición de flujos de usuario · Creación del Design System para la Home · Pruebas de usabilidad · Curaduría de vídeo, presets y efectos de sonido para el Reel de presentación.'
                        : 'Brief reception and requirements analysis · Moodboarding and visual research · Visual identity and logotype development · User journey mapping · Home Design System creation · Usability testing · Video, preset, and sound design curation for the promotional reel.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Desafíos ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? '1. Desarrollar un logotipo que aunase con naturalidad la esencia botánica y el espíritu de aventura sin caer en clichés turísticos.\n2. Encontrar una paleta cromática orgánica que transmitiese vegetación sin sacrificar el contraste y la legibilidad en pantallas digitales.\n3. Adaptar los componentes interactivos a una cuadrícula rigurosa manteniendo el tono editorial cálido.\n4. Ajustar el guión narrativo y la cadencia visual a las limitaciones de hardware durante el renderizado del reel.'
                        : '1. Designing an emblem unifying botanical nature and exploration without falling into tourist clichés.\n2. Establishing an organic color palette evoking flora without sacrificing digital contrast or accessibility.\n3. Structuring interactive components on a rigorous grid while preserving warm editorial nuance.\n4. Adapting narrative pacing and visual assets to hardware rendering constraints during reel production.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Soluciones ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? '1. Apoyo en inteligencia artificial para explorar analogías visuales y ampliar el abanico de referencias cruzadas.\n2. Iteración exhaustiva de tokens cromáticos y pruebas de accesibilidad WCAG sobre fondos claros y oscuros.\n3. Construcción sistemática de componentes en Figma con variantes y auto-layout reutilizable.\n4. Edición precisa de textos para maximizar el impacto y descarte selectivo de transiciones complejas en favor de un montaje sobrio y directo.'
                        : '1. Leveraging AI tools to explore cross-domain visual analogies and expand inspiration benchmarks.\n2. Rigorous token iteration and WCAG contrast testing across light and dark surfaces.\n3. Systematic component library authoring in Figma with auto-layout and reusable variants.\n4. Precise copy editing and purposeful reduction of unnecessary transitions for a refined, focused presentation.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 06: Prototipo Interactivo Figma */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 06 / PROTOTIPO INTERACTIVO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Explora el Prototipo en Figma' : 'Interactive Figma Prototype'}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {isEs
                      ? 'Navega directamente por la experiencia interactiva de SelvaViva. El prototipo simula la navegación fluida, los estados hover y los detalles de interacción diseñados en\u00A0Figma.'
                      : 'Interact directly with the live SelvaViva web prototype below. Test desktop navigation, hover states, and immersive editorial layouts engineered in\u00A0Figma.'}
                  </p>
                </div>

                {/* Figma Live Embed */}
                <div
                  className="project-figma-embed-container scroll-in-group"
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%',
                    height: 0,
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    marginTop: '2vw',
                    backgroundColor: '#1E1E1E',
                  }}
                >
                  <iframe
                    src="https://embed.figma.com/proto/Tp5MVApQ3s1QI9ASCrVTuh/Selva-Viva?page-id=0%3A1&node-id=40-184&starting-point-node-id=40%3A184&embed-host=share"
                    title="SelvaViva Figma Prototype"
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

                <div style={{ marginTop: '1.5vw', display: 'flex', justifyContent: 'flex-start' }}>
                  <a
                    className="cta text-box"
                    href="https://embed.figma.com/proto/Tp5MVApQ3s1QI9ASCrVTuh/Selva-Viva?page-id=0%3A1&node-id=40-184&starting-point-node-id=40%3A184&embed-host=share"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="scroll-in">
                      <div className="cta-text">
                        <span className="link-line">
                          {isEs ? 'Abrir prototipo en pantalla completa' : 'Open full-screen prototype'}
                        </span>
                        <span className="cta-icon-up">↗</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ SIGUIENTE CASO DE ESTUDIO ]</span>
                  <Link to="/weeku" className="cta text-box">
                    <div className="scroll-in">
                      <div className="cta-text">
                        <span className="link-line">Weeku · AI Meal Planning</span>
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
