import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function AgricultoresPage() {
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
    t('Dirección de Arte & Cartelería', 'Art Direction & Poster Design', 'Direction Artistique & Affiches'),
    t('Identidad de Campaña Reivindicativa', 'Activist Campaign Identity', 'Identité de Campagne Militante'),
    t('Tipografía Editorial & Retícula', 'Editorial Typography & Grid', 'Typographie Éditoriale & Grille'),
    t('Aplicación en Espacio Urbano', 'Urban Space Application', 'Application en Espace Urbain'),
  ];

  const colors = [
    { hex: '#1D3B8B', name: t('Marine Blue · Pesca', 'Marine Blue · Fisheries', 'Bleu Marine · Pêche') },
    { hex: '#1F8B2C', name: t('Crop Green · Agricultura', 'Crop Green · Agriculture', 'Vert Récolte · Agriculture') },
    { hex: '#E6007E', name: t('Livestock Magenta · Ganadería', 'Livestock Magenta · Ranching', 'Magenta · Élevage') },
    { hex: '#1A1A1A', name: t('Carbon · Fechador', 'Carbon · Date Stamp', 'Carbone · Datation') },
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
                          {t(
                            'A los agricultores se les paga aproximadamente una séptima parte del precio final al que se vende el producto, dejando un gran beneficio en intermediarios y vendedores finales, y una pequeña remuneración en los agricultores, ganaderos y pescadores con la que subsisten a duras\u00A0penas.',
                            'Primary food producers receive roughly one-seventh of the retail shelf price, leaving oversized margins for intermediaries while farmers, ranchers, and fishers struggle to\u00A0survive.',
                            'Les agriculteurs perçoivent environ un septième du prix de vente final, laissant d’importants bénéfices aux intermédiaires tandis que les producteurs subsistent avec\u00A0difficulté.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'De esa injusticia nace esta campaña gráfica: usar la referencia de la fecha de caducidad de los alimentos como elemento reivindicativo para ponerle fecha de caducidad a estos\u00A0abusos.',
                            'From that injustice arises this campaign: reclaiming the food expiration date stamp as an activist device to set a firm deadline on systemic\u00A0exploitation.',
                            'De cette injustice naît cette campagne : détourner la date de péremption des aliments comme symbole militant pour mettre une date limite à ces\u00A0abus.'
                          )}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {t(
                            'Una serie de carteles de estricto rigor tipográfico suizo y fotografía en duotono, diseñada para trasladar la protesta del campo directamente al mobiliario urbano de la\u00A0ciudad.',
                            'A poster series built on Swiss typographic discipline and duotone imagery, translating agrarian grievances directly onto the city’s advertising\u00A0columns.',
                            'Une série d’affiches à la rigueur typographique suisse et photographie bichromie, pensée pour porter la voix des campagnes au cœur du mobilier urbain des\u00A0villes.'
                          )}
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
                to="/weeku"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {t('Siguiente: Weeku', 'Next: Weeku', 'Suivant : Weeku')}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Authentic Editorial Layout */}
            <div className="project-editorial-right el-in">
              {/* Cover Image */}
              <img
                className="project-image"
                src="/images/agricultores/agri-cover.jpg"
                alt="Agricultores, Ganaderos y Pescadores — Campaña Fecha de Caducidad"
                loading="eager"
              />

              {/* Section 01: Concepto & Manifiesto */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 01 / CONCEPTO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Ponerle fecha de caducidad a los abusos',
                      'Putting an expiration date on abuse',
                      'Mettre une date de péremption aux abus'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'El concepto creativo transforma el sello industrial de envasado —el elemento más cotidiano de cualquier envase de comida— en una denuncia social directa. Al descontextualizar el código de caducidad y ampliarlo a escala urbana, el mensaje interpela al consumidor en su recorrido habitual de compra.',
                      'The creative concept turns the industrial packaging stamp—the most mundane mark on any grocery item—into a direct social challenge. By enlarging the expiration code to an urban scale, it confronts passersby directly along their daily commute.',
                      'Le concept créatif détourne le marquage industriel d’emballage pour en faire une revendication sociale directe. En transposant ce code de péremption à l’échelle urbaine, il interpelle directement le citoyen au quotidien.'
                    )}
                  </p>
                </div>

                {/* Swiss Spec Table (Authentic Givelet Style) */}
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Campaña', 'Campaign', 'Campagne')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Campaña de apoyo a los agricultores, ganaderos y pescadores',
                        'Public awareness campaign supporting farmers, ranchers, and fishers',
                        'Campagne de soutien aux agriculteurs, éleveurs et pêcheurs'
                      )}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Referente', 'Device', 'Symbole')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'El fechador industrial "FED. CAD." impreso en alimentos perecederos',
                        'The industrial expiration date stamp "FED. CAD." printed on perishable foods',
                        'Le timbre de date de péremption "FED. CAD." imprimé sur les denrées'
                      )}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Tipografía', 'Typography', 'Typographie')} ]</span>
                    <span className="project-spec-value">
                      Grotesque Bold Caps & Fechador Monospaciado Industrial
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ {t('Soportes', 'Media', 'Supports')} ]</span>
                    <span className="project-spec-value">
                      {t(
                        'Columnas Morris parisinas, carteles en marquesinas y tríptico editorial 70×100 cm',
                        'Morris columns, transit shelter posters, and 70×100 cm print triptych',
                        'Colonnes Morris, affichage abribus et triptyque éditorial 70×100 cm'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 02: Tipografía Industrial */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 02 / TIPOGRAFÍA ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Código tipográfico industrial',
                      'Industrial typographic code',
                      'Code typographique industriel'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'La composición prescinde de artificios ornamentales: mayúsculas grotescas compactas sobre retícula estricta combinadas con la tipografía monospaciada de fechador térmico.',
                      'The composition avoids decorative styling: compact grotesque uppercase on a strict grid paired with monospaced thermal stamp lettering.',
                      'La composition élimine tout artifice : capitales grotesques compactes sur grille rigoureuse combinées à la typographie monospace des dateurs thermiques.'
                    )}
                  </p>
                </div>

                {/* Typography Specimen Hero */}
                <div className="type-specimen-block">
                  <div className="type-display-hero text-box">
                    <div
                      className="type-display-word scroll-in"
                      style={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.06em' }}
                    >
                      FED. CAD. 31.12.2022
                    </div>
                    <div className="type-display-glyph scroll-in" style={{ fontFamily: 'var(--font-mono)' }}>
                      [ 70×100 ]
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 03: Sistema Cromático */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 03 / SISTEMA CROMÁTICO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Tres colores para tres sectores',
                      'Three hues for three sectors',
                      'Trois teintes pour trois secteurs'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Un color rotundo identifica a cada una de las actividades del sector primario: azul marino para la pesca, verde para los cultivos de huerta y magenta para la ganadería, combinados con negro carbón sobre papel crudo.',
                      'A distinct primary hue identifies each sector: navy blue for fisheries, green for agriculture, and bold magenta for livestock, anchored with carbon black on raw unbleached stock.',
                      'Une teinte affirmée identifie chaque branche : bleu marine pour la pêche, vert pour les cultures agricoles et magenta pour l’élevage, sur fond de papier brut.'
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

              {/* Section 04: Aplicación en Espacio Urbano */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 04 / ESPACIO URBANO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t(
                      'Intervención en la vía pública',
                      'Urban public interventions',
                      'Interventions dans l’espace public'
                    )}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Los afiches fueron diseñados para integrarse en la arquitectura de la ciudad: columnas Morris de inspiración clásica, mupis de transporte y fachadas de piedra, contrastando con el entorno urbano.',
                      'The posters were crafted to integrate into urban architecture: classic Morris advertising columns, transit shelters, and street facades, creating sharp contrast with the surrounding cityscape.',
                      'Les affiches ont été conçues pour dialoguer avec l’architecture de la ville : colonnes Morris, abribus et façades de rue, créant un contraste net avec l’environnement urbain.'
                    )}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3vw', marginTop: '2vw' }}>
                  <img
                    className="project-image"
                    src="/images/agricultores/agri-poster-01.jpg"
                    alt="Cartelería en Columna Morris"
                    loading="lazy"
                  />

                  <img
                    className="project-image"
                    src="/images/agricultores/agri-poster-02.jpg"
                    alt="Cartel Fecha de Caducidad en escaparate exterior"
                    loading="lazy"
                  />

                  <img
                    className="project-image"
                    src="/images/agricultores/agri-poster-03.jpg"
                    alt="Cartelería aplicada en fachada"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section 05: Tríptico de Afiches Finales */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 05 / PIEZAS FINALES ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {t('Tríptico de cartelería final', 'Final poster triptych', 'Triptyque d’affiches final')}
                  </span>
                </h2>
                <div className="text-box">
                  <p className="project-section-lead scroll-in alinea-2">
                    {t(
                      'Las tres piezas definitivas resueltas en gran formato (70×100 cm). El tratamiento en duotono resalta la dignidad del trabajo en el mar, el campo y la dehesa.',
                      'The three definitive large-format exhibition prints (70×100 cm). Duotone imagery honors the dignity of labor across sea, land, and pastures.',
                      'Les trois affiches définitives en grand format (70×100 cm). Le traitement en bichromie met en valeur la dignité du travail de la mer, de la terre et de l’élevage.'
                    )}
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2vw',
                    marginTop: '2vw',
                  }}
                >
                  <img
                    className="project-image"
                    src="/images/agricultores/agri-print-01.jpg"
                    alt="Cartel Pescadores — Fecha de Caducidad"
                    loading="lazy"
                  />

                  <img
                    className="project-image"
                    src="/images/agricultores/agri-print-02.jpg"
                    alt="Cartel Ganaderos — Fecha de Caducidad"
                    loading="lazy"
                  />

                  <img
                    className="project-image"
                    src="/images/agricultores/agri-print-03.jpg"
                    alt="Cartel Agricultores — Fecha de Caducidad"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Next Project Footer Block */}
              <div className="project-section-block scroll-in-group" style={{ marginTop: '6vw' }}>
                <div className="border"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '2vw' }}>
                  <span className="project-section-meta">[ {t('SIGUIENTE PROYECTO', 'NEXT PROJECT', 'PROJET SUIVANT')} ]</span>
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
