import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function WeekuPage() {
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
        'Diseño de Producto & Mobile UI',
        'Investigación UX & Benchmark',
        'Arquitectura de la Información',
        'Prototipado Interactivo Figma',
      ]
    : [
        'Product Design & Mobile UI',
        'UX Research & Benchmark',
        'Information Architecture',
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
                <span className="scroll-in">04 / ARCHIVE</span>
              </p>

              <div className="project-infos-box">
                <h1 className="project-title text-box">
                  <span className="scroll-in">WEEKU</span>
                </h1>

                <div className="project-desc-box">
                  <p className="project-date text-box">
                    <span className="scroll-in">[ 2025 · Bootcamp NEOLAND ]</span>
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
                            ? 'Weeku es una aplicación móvil de nutrición y planificación inteligente de menús basada en Inteligencia Artificial, concebida para transformar los hábitos alimenticios y combatir el sobrepeso mediante menús personalizados y recetas\u00A0sencillas.'
                            : 'Weeku is an AI-powered nutrition and meal-planning mobile application engineered to transform daily eating habits and counter sedentary lifestyles through personalized weekly menus and streamlined\u00A0recipes.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'A través del framework Design Thinking en el bootcamp de NEOLAND, la investigación abordó la sobrecarga mental cotidiana: un 78% de usuarios reporta agotamiento al decidir qué cocinar a diario, y solo un 21% logra mantener variedad en su\u00A0alimentación.'
                            : 'Applying the Design Thinking framework during an intensive sprint at NEOLAND, user research tackled daily decision fatigue: 78% of users report burnout planning daily meals, with only 21% sustaining genuine dietary\u00A0variety.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'El sistema combate el desperdicio doméstico integrando ingredientes de la despensa, sincronizando macros y automatizando la lista de la compra mediante un prototipo interactivo de alta fidelidad en\u00A0Figma.'
                            : 'The solution curbs domestic food waste by incorporating existing pantry staples, synchronizing macros, and automating grocery checklists through a high-fidelity interactive prototype in\u00A0Figma.'}
                        </span>
                      </p>

                      <a
                        className="cta text-box"
                        href="https://www.behance.net/gallery/219554447/UIUX-Weeku-Menu-App"
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
                to="/agora"
                className="cta text-box scroll-in-group desktop-el next-project-link"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Agora' : 'Next: Agora'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Swiss Editorial Content, Structured Data & Media */}
            <div className="project-editorial-right el-in">
              {/* Cover Mockup */}
              <img
                className="project-image"
                src="/weeku-cover.jpg"
                alt="Weeku — Mobile App 3D Mockup Overview"
                loading="eager"
              />

              {/* Section 01: Contexto & Problemática */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 01 / CONTEXTO & PROBLEMÁTICA ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Sobrecarga Cognitiva y Nutrición' : 'Cognitive Fatigue & Nutrition'}
                  </span>
                </h2>
                <p className="project-section-body text-box">
                  <span className="scroll-in" style={{ display: 'block' }}>
                    {isEs
                      ? 'En los últimos 20 años, la obesidad en España ha aumentado hasta afectar a más del 50% de la población adulta debido al sedentarismo, la ingesta de alimentos ultraprocesados y la falta de tiempo para planificar. Weeku reduce la fricción diaria combinando inteligencia artificial con educación nutricional para generar menús equilibrados, recetas fáciles y listas de compra automatizadas.'
                      : 'Over the last 20 years, adult obesity in Spain has grown to affect over 50% of the population, driven by sedentary lifestyles, ultra-processed diets, and the absence of intuitive meal planning. Weeku reduces daily friction by combining artificial intelligence with nutritional guidance to generate balanced menus, easy recipes, and automated shopping checklists.'}
                  </span>
                </p>
              </div>

              {/* Section 02: Research & Métricas */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 02 / USER RESEARCH & MÉTRICAS ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Resultados de Investigación' : 'Research Findings & Insights'}
                  </span>
                </h2>
                <div className="project-metrics-grid">
                  <div className="project-metric-item text-box">
                    <span className="project-metric-num scroll-in">78%</span>
                    <p className="project-metric-desc scroll-in">
                      {isEs
                        ? 'Afirma que se le hace muy pesado o estresante pensar qué cocinar y cenar a diario.'
                        : 'Report heavy cognitive fatigue deciding daily lunch and dinner.'}
                    </p>
                  </div>
                  <div className="project-metric-item text-box">
                    <span className="project-metric-num scroll-in">21%</span>
                    <p className="project-metric-desc scroll-in">
                      {isEs
                        ? 'Único porcentaje que mantiene una variedad nutricional real en su dieta semanal.'
                        : 'Only percentage maintaining genuine nutritional variety week over week.'}
                    </p>
                  </div>
                  <div className="project-metric-item text-box">
                    <span className="project-metric-num scroll-in">0%</span>
                    <p className="project-metric-desc scroll-in">
                      {isEs
                        ? 'Desperdicio: demanda prioritaria de reutilizar ingredientes ya existentes en la despensa.'
                        : 'Zero Waste: high user demand for cooking around leftover pantry ingredients.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 03: Benchmark Competitivo */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 03 / BENCHMARK ESTRATÉGICO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Análisis Competitivo & Oportunidades' : 'Competitive Benchmark & Gaps'}
                  </span>
                </h2>
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Competidores Directos ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Mealime & EatThisMuch: bases sólidas pero rígidas con despensas domésticas reales.'
                        : 'Mealime & EatThisMuch: solid foundations but rigid with actual domestic pantries.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Competidor Indirecto ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'KitchenStories: catálogo visual inspirador sin flujos de planificación semanal.'
                        : 'KitchenStories: inspiring visual catalog lacking structured weekly planner flows.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Oportunidad 01 ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Gestión granular de alergias, intolerancias médicas y prescripciones nutricionales.'
                        : 'Granular handling of allergies, medical intolerances, and nutritional rules.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Oportunidad 02 ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Planificación inversa a partir de los ingredientes disponibles en la despensa.'
                        : 'Reverse meal planning based on existing ingredients before buying new groceries.'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Oportunidad 03 ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Sustitución en 1-tap de platos propuestos por la IA sin romper el balance semanal.'
                        : '1-tap replacement of AI-suggested meals without breaking weekly balance.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Mockups Lineup */}
              <img
                className="project-image"
                src="/images/weeku/weeku-lineup.jpg"
                alt="Weeku — Mobile Interface Mockups Lineup"
                loading="lazy"
              />

              {/* Section 04: Arquitectura de la Información */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 04 / ARQUITECTURA DE INFORMACIÓN ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Estructura de Flujos (Card Sorting)' : 'Navigation Architecture (Card Sorting)'}
                  </span>
                </h2>
                <div className="project-spec-table">
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Nivel 0 · Navegación ]</span>
                    <span className="project-spec-value">
                      {isEs ? 'Mi Espacio · Menús · Configuración' : 'My Space · Menus · Settings'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Nivel 1 · Flujos Clave ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Mi Plato de Hoy (receta guiada) · Nuevo Menú IA · Perfil Nutricional'
                        : 'Today’s Dish (step-by-step recipe) · New AI Menu · Nutrition Profile'}
                    </span>
                  </div>
                  <div className="border"></div>
                  <div className="project-spec-row">
                    <span className="project-spec-label">[ Nivel 2 · Herramientas ]</span>
                    <span className="project-spec-value">
                      {isEs
                        ? 'Mi Menú Semanal · Editor de Platos · Lista de la Compra Automatizada'
                        : 'Weekly Calendar · Dish Swap Editor · Automated Grocery Checklist'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 05: Sistema de Diseño, Paleta y Tipografía */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 05 / SISTEMA DE DISEÑO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Paleta Cromática' : 'Color Palette'}
                  </span>
                </h2>

                {/* Color Squares Grid */}
                <div className="color-squares-grid">
                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#E25B45' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#E25B45</span>
                      <span className="color-square-name">{isEs ? 'Terracotta · Primario' : 'Terracotta · Primary'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#A82E2E' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#A82E2E</span>
                      <span className="color-square-name">{isEs ? 'Brick Red · Contraste' : 'Brick Red · Contrast'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#F8C8BE' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#F8C8BE</span>
                      <span className="color-square-name">{isEs ? 'Soft Peach · Soporte' : 'Soft Peach · Support'}</span>
                    </div>
                  </div>

                  <div className="color-square-item text-box">
                    <div className="color-square-box scroll-in" style={{ backgroundColor: '#FFF8F6', border: '1px solid var(--border-color)' }}></div>
                    <div className="color-square-meta scroll-in">
                      <span className="color-square-hex">#FFF8F6</span>
                      <span className="color-square-name">{isEs ? 'Cream Light · Fondo' : 'Cream Light · Surface'}</span>
                    </div>
                  </div>
                </div>

                {/* Typography Specimen */}
                <div className="type-specimen-block" style={{ marginTop: '3vw' }}>
                  <div className="border"></div>
                  <span className="project-section-meta">[ 05.1 / TIPOGRAFÍA EDITORIAL ]</span>

                  {/* Brand Display Hero */}
                  <div className="type-display-hero text-box">
                    <div className="type-display-word scroll-in" style={{ fontFamily: 'var(--font-heading)' }}>
                      Weeku
                    </div>
                    <div className="type-display-glyph scroll-in" style={{ fontFamily: 'var(--font-heading)' }}>
                      W
                    </div>
                  </div>

                  {/* Montserrat UI Weights Specimen */}
                  <div className="type-weights-list">
                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">Montserrat Regular · 400</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 400 }}>
                        {isEs
                          ? 'Planificación inteligente, recetas paso a paso y lista de la compra automatizada.'
                          : 'Intelligent meal planning, step-by-step recipes, and automated shopping checklists.'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">Montserrat Medium · 500</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 500 }}>
                        {isEs
                          ? '350 kcal · 28g Proteínas · 42g Carbohidratos · 12g Grasas saludables'
                          : '350 kcal · 28g Protein · 42g Carbohydrates · 12g Healthy Fats'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">Montserrat SemiBold · 600</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 600 }}>
                        {isEs
                          ? 'Lunes · Arroz con Pollo en Salsa cremosa y base de verduras'
                          : 'Monday · Rice with Chicken in Creamy Sauce and vegetable base'}
                      </p>
                    </div>

                    <div className="type-weight-row text-box">
                      <span className="type-weight-meta scroll-in">Montserrat Bold · 700</span>
                      <p className="type-weight-sample scroll-in" style={{ fontWeight: 700 }}>
                        {isEs ? '¿Qué comemos hoy? · Generar nuevo menú semanal' : 'What are we eating today? · Generate new weekly menu'}
                      </p>
                    </div>

                    <div className="text-box" style={{ marginTop: '0.8vw' }}>
                      <p className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xxs)', opacity: 0.5, letterSpacing: '0.08em' }}>
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 06: Prototipo Interactivo Figma */}
              <div className="project-section-block scroll-in-group">
                <div className="border"></div>
                <span className="project-section-meta">[ 06 / PROTOTIPO INTERACTIVO ]</span>
                <h2 className="project-section-title text-box">
                  <span className="scroll-in">
                    {isEs ? 'Prototipo Figma Navegable' : 'Interactive Figma Prototype'}
                  </span>
                </h2>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    background: 'var(--color-grey)',
                    marginTop: '1vw',
                  }}
                >
                  <iframe
                    title="Weeku Interactive Prototype"
                    style={{ border: 'none', width: '100%', height: '680px', display: 'block' }}
                    src="https://embed.figma.com/proto/cGs9o3w2N1rcD60b10o2Ux/FT-Antonio.Calero-PFB?page-id=1%3A6&node-id=67-89&p=f&viewport=599%2C349%2C0.07&scaling=scale-down&content-scaling=fixed&starting-point-node-id=227%3A1208&show-proto-sidebar=0&embed-host=share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Mobile Next Project */}
              <Link
                to="/agora"
                className="cta text-box scroll-in-group mobile-el next-project-mobile"
              >
                <div className="scroll-in">
                  <div className="cta-text">
                    <span className="cta-icon-about">→</span>
                    <span className="link-line">
                      {isEs ? 'Siguiente: Agora' : 'Next: Agora'}
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
