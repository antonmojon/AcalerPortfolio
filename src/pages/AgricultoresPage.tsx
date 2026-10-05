import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function AgricultoresPage() {
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
        'Dirección de Arte & Cartelería',
        'Identidad de Campaña Reivindicativa',
        'Tipografía Editorial & Retícula Suiza',
        'Aplicación en Entorno Urbano',
      ]
    : [
        'Art Direction & Poster Design',
        'Activist Campaign Identity',
        'Editorial Typography & Swiss Grid',
        'Urban Environment Application',
      ];

  const colors = [
    { name: 'Marine Navy', hex: '#1D3B8B', usage: isEs ? 'Pesca & Sector Marítimo' : 'Fisheries & Marine Sector' },
    { name: 'Harvest Green', hex: '#1F8B2C', usage: isEs ? 'Agricultura & Campo' : 'Crops & Agricultural Fields' },
    { name: 'Livestock Magenta', hex: '#E6007E', usage: isEs ? 'Ganadería & Pastos' : 'Livestock & Ranching' },
    { name: 'Raw Paper', hex: '#F4F4F4', usage: isEs ? 'Soporte y Contrastes' : 'Base Substrate & Contrast' },
    { name: 'Industrial Black', hex: '#1A1A1A', usage: isEs ? 'Tipografía & FED. CAD.' : 'Typography & Expiration Stamps' },
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
                <span className="scroll-in">05 / ARCHIVE</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">AGRICULTORES, GANADEROS Y PESCADORES</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2021 · Campaña "Fecha de Caducidad" ]</span>
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
                            ? 'Campaña gráfica de apoyo y concienciación social que denuncia la precariedad del sector primario. A los productores se les abona aproximadamente una séptima parte del precio final al que se comercializa el producto en las grandes superficies, concentrando el margen en intermediarios mientras agricultores, ganaderos y pescadores subsisten a duras\u00A0penas.'
                            : 'A social awareness graphic campaign challenging the systemic precarity of primary producers. Farmers, ranchers, and fishers receive roughly one-seventh of the retail shelf price, while intermediaries absorb massive margins, leaving primary workers on the verge of financial\u00A0unsustainability.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'De esa profunda injusticia nace la campaña: subvertir el código visual industrial de la "Fecha de Caducidad" (FED. CAD.) impresa en los envases de alimentos como un grito reivindicativo que impone un límite inapelable a estos abusos\u00A0sistemáticos.'
                            : 'Born from this imbalance, the project appropriates the ubiquitous industrial stamp "FED. CAD." (Expiration Date) found on food packaging, transforming it into a sharp activist declaration to put a deadline on commercial\u00A0exploitation.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'A través de un lenguaje tipográfico de estricta retícula suiza, contrastes cromáticos rotundos y fotografía de archivo duotono, la serie traslada la protesta del campo directamente al mobiliario urbano y las calles de la\u00A0ciudad.'
                            : 'Constructed around a rigorous Swiss typographic grid, striking chromatic contrast, and duotone archival imagery, the series translates the agrarian outcry directly onto public advertising columns and urban street\u00A0furniture.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/114929277/Agricultores-Ganaderos-y-Pescadores"
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
                to="/weeku"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Weeku' : 'Next: Weeku'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Swiss Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Hero Panoramic Image */}
              <img
                className="project-image"
                src="/images/agricultores/agri-cover.jpg"
                alt="Agricultores, Ganaderos y Pescadores — Campaña Gráfica Fecha de Caducidad"
                loading="eager"
              />

              {/* Section 01: Concepto & Manifiesto */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Ponerle fecha de caducidad al abuso' : 'Putting an expiration date on abuse'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La industria agroalimentaria contemporánea oculta una brecha insostenible: el consumidor asume precios crecientes mientras el productor de origen percibe una fracción mínima que apenas amortiza los costes operativos. El concepto creativo toma el elemento más mundano e ignorado del embalaje alimentario —el sello térmico de caducidad— y lo reconvierte en una advertencia social ineludible.'
                      : 'The contemporary food supply chain conceals a stark disparity: consumers pay escalating grocery prices while primary producers receive a minimal fraction that barely covers production overhead. The creative rationale co-opts the most utilitarian, disregarded artifact of food packaging—the ink stamp of expiration—transforming it into an unyielding civic manifesto.'}
                  </p>

                  {/* Fact Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1.5vw',
                      marginTop: '2.5vw',
                      marginBottom: '1vw',
                    }}
                  >
                    <div
                      style={{
                        padding: '1.8vw 1.5vw',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 01 / REMUNERACIÓN ]
                      </span>
                      <p style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 600, margin: '1vw 0 0.5vw 0', letterSpacing: '-0.03em' }}>
                        1 / 7
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, margin: 0 }}>
                        {isEs
                          ? 'del precio final llega a manos del productor primario'
                          : 'of final shelf price reaches the primary producer'}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '1.8vw 1.5vw',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 02 / INTERMEDIARIOS ]
                      </span>
                      <p style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 600, margin: '1vw 0 0.5vw 0', letterSpacing: '-0.03em' }}>
                        +600%
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, margin: 0 }}>
                        {isEs
                          ? 'de margen acumulado entre origen y distribución final'
                          : 'cumulative markup between source and retail chains'}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '1.8vw 1.5vw',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        [ 03 / SECTORES ]
                      </span>
                      <p style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 600, margin: '1vw 0 0.5vw 0', letterSpacing: '-0.03em' }}>
                        3 EJES
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, margin: 0 }}>
                        {isEs
                          ? 'Agricultura, ganadería y pesca tradicional coordinados'
                          : 'Agriculture, livestock, and artisanal fisheries coordinated'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 02: Tipografía & Retícula */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 02 / TIPOGRAFÍA & RETÍCULA ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Rigidez industrial y código de embalaje' : 'Industrial rigidity & packaging codes'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La identidad tipográfica recurre a la sobriedad sin concesiones de los tipos grotescos pesados combinados con el fechador numérico propio de la maquinaria de envasado. Los encabezados se estructuran en mayúsculas rotundas que evocan tanto los carteles de protesta obrera como los sellos de sanidad alimentaria.'
                      : 'The typographic system draws from the unyielding weight of heavy grotesque letterforms paired with industrial date-marking stamps used on packing lines. Headlines are set in uncompromising all-caps, simultaneously evoking historical workers’ protest placards and regulatory sanitary seals.'}
                  </p>

                  {/* Typographic Specimen */}
                  <div
                    style={{
                      border: '1px solid var(--border-color)',
                      padding: '2.5vw 2vw',
                      marginTop: '2vw',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5vw' }}>
                      <span style={{ fontSize: 'var(--font-size-xxs)', letterSpacing: '0.1em', opacity: 0.5 }}>
                        TIPO PRINCIPAL · GROTESQUE BOLD CAPS
                      </span>
                      <span style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5 }}>
                        RETÍCULA 12 COLUMNAS
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 'clamp(22px, 3.5vw, 44px)',
                        letterSpacing: '0.12em',
                        margin: '0 0 1vw 0',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: 'var(--text-color)',
                      }}
                    >
                      FED. CAD. 31.12.2022
                    </p>

                    <p
                      style={{
                        fontSize: 'clamp(14px, 1.4vw, 20px)',
                        lineHeight: 1.5,
                        margin: 0,
                        opacity: 0.85,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {isEs
                        ? 'Campaña en defensa de agricultores, ganaderos y pescadores frente al monopolio de intermediarios.'
                        : 'Campaign defending farmers, ranchers, and fishers against distributor monopolies.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 03: Sistema de Color */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 03 / SISTEMA CROMÁTICO ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Tres tonalidades para tres realidades productivas' : 'Three hues representing three production realities'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La paleta cromática asigna un tono rotundo a cada sector primario: azul marino profundo para la pesca y faena marítima; verde cosecha para la huerta y cereal; y magenta cárnico para la ganadería y dehesa. El fondo crudo aporta la honestidad material del papel de embalaje sin blanquear.'
                      : 'The chromatic scheme designates a decisive hue for each pillar of primary labor: deep marine blue for fisheries and ocean trades; harvest green for vegetable crops and grain fields; and vibrant magenta for livestock and pastures. An unbleached off-white base reflects the utilitarian honesty of raw packaging stock.'}
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

              {/* Section 04: Aplicación en Espacio Urbano */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 04 / APLICACIÓN URBANA ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'La protesta toma la vía pública' : 'Activism claims the public sphere'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'La cartelería fue concebida para irrumpir en el entorno urbano cotidiano: columnas Morris parisinas, marquesinas de transporte metropolitano y paredes ciegas en zonas de paso. La escala monumental y el contraste directo con el asfalto obligan al transeúnte a reflexionar sobre la procedencia de los alimentos que adquiere.'
                      : 'The poster series was designed to pierce the everyday city commute: Morris advertising columns, transit shelters, and perimeter building walls. Its monumental scale and stark chromatic dissonance force passersby to confront the origins of the sustenance they buy.'}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2vw', marginTop: '2vw' }}>
                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-poster-01.jpg"
                        alt="Cartelería en Columna Morris Urbana"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                        [ FIG. 01 — Columna Morris publicitaria en entorno urbano ]
                      </p>
                    </div>

                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-poster-02.jpg"
                        alt="Cartel Fecha de Caducidad en escaparate de calle"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                        [ FIG. 02 — Cartel exterior en soporte de vía pública ]
                      </p>
                    </div>

                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-poster-03.jpg"
                        alt="Aplicación de cartelería en fachada urbana"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.5, marginTop: '0.6vw', textAlign: 'right' }}>
                        [ FIG. 03 — Intervención en fachada a pie de calle ]
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 05: Piezas Editoriales Finales */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <div className="project-section-header">
                  <span className="project-section-meta">[ 05 / PIEZAS FINALES ]</span>
                  <h2 className="project-section-title">
                    {isEs ? 'Tríptico de cartelería de alta resolución' : 'High-resolution poster triptych'}
                  </h2>
                </div>

                <div className="project-section-content">
                  <p className="project-editorial-p alinea-2">
                    {isEs
                      ? 'Las tres piezas editoriales definitivas resueltas a gran formato (70x100 cm). El tratamiento fotográfico duotono acentúa la dureza y dignidad del trabajo manual en el barco de pesca, el tractor de arado y la cabaña ganadera.'
                      : 'The three definitive large-format exhibition prints (70x100 cm). Intense duotone treatments accentuate the dignity and physical grit of artisanal labor across fishing trawlers, plowing tractors, and pastoral herds.'}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5vw',
                      marginTop: '2vw',
                    }}
                  >
                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-print-01.jpg"
                        alt="Cartel Pesca — Fecha de Caducidad"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.6, marginTop: '0.6vw' }}>
                        [ CARTEL I · PESCADORES ]
                      </p>
                    </div>

                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-print-02.jpg"
                        alt="Cartel Ganadería — Fecha de Caducidad"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.6, marginTop: '0.6vw' }}>
                        [ CARTEL II · GANADEROS ]
                      </p>
                    </div>

                    <div>
                      <img
                        className="project-image"
                        src="/images/agricultores/agri-print-03.jpg"
                        alt="Cartel Agricultura — Fecha de Caducidad"
                        loading="lazy"
                      />
                      <p style={{ fontSize: 'var(--font-size-xxs)', opacity: 0.6, marginTop: '0.6vw' }}>
                        [ CARTEL III · AGRICULTORES ]
                      </p>
                    </div>
                  </div>
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
