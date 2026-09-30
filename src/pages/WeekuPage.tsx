import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function WeekuPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const rootRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver matching Matthieu Givelet's scrollIn system
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
        'Arquitectura de Información',
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
            {/* Sticky Left Column: Project Metadata & Editorial Pitch */}
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
                            ? 'Weeku es una aplicación móvil de planificación nutricional inteligente impulsada por Inteligencia Artificial, concebida para transformar los hábitos alimenticios y combatir el sobrepeso mediante menús personalizados y recetas\u00A0sencillas.'
                            : 'Weeku is an AI-powered nutrition and meal-planning mobile application engineered to transform daily eating habits and counter sedentary lifestyles through personalized weekly menus and streamlined\u00A0recipes.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'A través del framework Design Thinking, el proyecto investiga la sobrecarga mental que sufren los usuarios al decidir qué cocinar a diario, integrando un motor de IA que aprovecha ingredientes de la despensa y automatiza la lista de la\u00A0compra.'
                            : 'Using the Design Thinking methodology, the project tackles the cognitive fatigue of daily meal decisions, introducing an AI engine that adapts to existing pantry ingredients and automates grocery\u00A0checklists.'}
                        </span>
                      </p>
                      <p className="text-box" style={{ marginBottom: '1.2vw' }}>
                        <span className="scroll-in" style={{ display: 'block' }}>
                          {isEs
                            ? 'Diseñado en un sprint de 2 semanas: desde encuestas de validación y benchmark competitivo hasta arquitectura de la información y prototipo interactivo en alta fidelidad en\u00A0Figma.'
                            : 'Developed across an intensive 2-week sprint: from quantitative user surveys and competitive benchmark to information architecture and high-fidelity interactive prototyping in\u00A0Figma.'}
                        </span>
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vw', marginTop: '1vw' }}>
                        <a
                          className="cta text-box"
                          href="https://www.behance.net/gallery/219554447/UIUX-Weeku-Menu-App"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="scroll-in">
                            <div className="cta-text">
                              <span className="link-line">
                                {isEs ? 'Ver proyecto en\u00A0Behance' : 'View on\u00A0Behance'}
                              </span>
                              <span className="cta-icon-up">↗</span>
                            </div>
                          </div>
                        </a>

                        <a
                          className="cta text-box"
                          href="https://embed.figma.com/proto/cGs9o3w2N1rcD60b10o2Ux/FT-Antonio.Calero-PFB?page-id=1%3A6&node-id=67-89&p=f&viewport=599%2C349%2C0.07&scaling=scale-down&content-scaling=fixed&starting-point-node-id=227%3A1208&show-proto-sidebar=1&embed-host=share"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="scroll-in">
                            <div className="cta-text">
                              <span className="link-line">
                                {isEs ? 'Abrir prototipo Figma\u00A0completo' : 'Open full Figma\u00A0prototype'}
                              </span>
                              <span className="cta-icon-up">↗</span>
                            </div>
                          </div>
                        </a>
                      </div>
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

            {/* Right Column: Structured Case Study Modules & Interactive Media */}
            <div className="project-image-box el-in">
              {/* Module 1: Hero Cover Mockup */}
              <div className="project-image-wrapper">
                <img
                  className="project-image"
                  src="/weeku-cover.jpg"
                  alt="Weeku Menu App — iPhone 3D Mockup and Branding"
                  loading="eager"
                />
              </div>

              {/* Module 2: Project Metadata & Sprints */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Ficha Técnica' : 'Project Specs'}</h3>
                  <span className="editorial-card-tag">[ 01 / METODOLOGÍA ]</span>
                </div>
                <div className="editorial-tag-list">
                  <span className="editorial-tag">
                    {isEs ? 'Metodología: Design Thinking' : 'Methodology: Design Thinking'}
                  </span>
                  <span className="editorial-tag">
                    {isEs ? 'Tiempo: 2 Semanas' : 'Timeline: 2 Weeks Sprint'}
                  </span>
                  <span className="editorial-tag">Figma · ChatGPT · LottieFiles</span>
                  <span className="editorial-tag">Bootcamp NEOLAND</span>
                </div>
              </div>

              {/* Module 3: Problemática & Contexto de Salud */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Problemática' : 'The Challenge'}</h3>
                  <span className="editorial-card-tag">[ 02 / CONTEXTO ]</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-s)', lineHeight: '1.5', textWrap: 'pretty' }}>
                  {isEs
                    ? 'En los últimos 20 años, la obesidad en España ha aumentado considerablemente, afectando a más del 50% de la población adulta debido a un estilo de vida sedentario, mayor ingesta de ultraprocesados y deficiencias en educación nutricional. Weeku nace para combatir esta barrera reduciendo la fricción mental a la hora de planificar comidas saludables.'
                    : 'Over the last 20 years, adult obesity in Spain has grown past 50% due to sedentary routines, reliance on ultra-processed meals, and gaps in nutritional guidance. Weeku was conceived to overcome this friction by automating meal preparation, macro balancing, and grocery management.'}
                </p>
              </div>

              {/* Module 4: Research Cuantitativo & Cualitativo (Key Stats) */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Investigación & Datos' : 'Research & Insights'}</h3>
                  <span className="editorial-card-tag">[ 03 / USER DATA ]</span>
                </div>
                <div className="stat-card-grid">
                  <div className="stat-card">
                    <span className="stat-number">78%</span>
                    <span className="stat-label">
                      {isEs
                        ? 'Afirma que se le hace muy pesado pensar qué comer y cenar cada día.'
                        : 'Report heavy cognitive fatigue deciding daily lunch and dinner.'}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">21%</span>
                    <span className="stat-label">
                      {isEs
                        ? 'Solo este porcentaje mantiene una variedad nutricional real en su dieta semanal.'
                        : 'Only 21% achieve genuine nutritional variety throughout the week.'}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">Zero Waste</span>
                    <span className="stat-label">
                      {isEs
                        ? 'Demanda prioritaria de reutilizar ingredientes y alimentos ya disponibles en la despensa.'
                        : 'High user demand for pantry recycling and cooking with leftover staples.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Module 5: Benchmark & Oportunidades Competitivas */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Benchmark Competitivo' : 'Competitive Benchmark'}</h3>
                  <span className="editorial-card-tag">[ 04 / BENCHMARK ]</span>
                </div>
                <div className="two-col-grid">
                  <div className="comparison-box">
                    <span className="comparison-title">{isEs ? 'Competencia Analizada' : 'Benchmarked Apps'}</span>
                    <div className="comparison-item">
                      <strong>Mealime & EatThisMuch:</strong> {isEs ? 'Competidores directos; buena base pero poca adaptabilidad de IA a la despensa doméstica.' : 'Direct competitors; solid bases but rigid pantry integration.'}
                    </div>
                    <div className="comparison-item">
                      <strong>KitchenStories:</strong> {isEs ? 'Competidor indirecto; catálogo visual inspirador pero carece de planificación automatizada.' : 'Indirect competitor; rich editorial catalog lacking meal planner workflows.'}
                    </div>
                  </div>

                  <div className="comparison-box">
                    <span className="comparison-title">{isEs ? 'Oportunidades Clave Weeku' : 'Weeku Opportunities'}</span>
                    <div className="comparison-item">
                      {isEs ? 'Gestión profunda de alergias, intolerancias y prescripciones médicas.' : 'Granular handling of allergies, intolerances, and medical diet rules.'}
                    </div>
                    <div className="comparison-item">
                      {isEs ? 'Planificación inversa: sugerir platos según los ingredientes que ya tienes en casa.' : 'Reverse planning: suggest recipes using pantry items before generating shopping lists.'}
                    </div>
                    <div className="comparison-item">
                      {isEs ? 'Sustitución en 1-tap de platos propuestos por la IA si no te apetecen.' : '1-tap replacement of AI-suggested meals without breaking weekly balance.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 6: Arquitectura de la Información (Card Sorting) */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Arquitectura de Información' : 'Information Architecture'}</h3>
                  <span className="editorial-card-tag">[ 05 / CARD SORTING ]</span>
                </div>
                <div className="two-col-grid">
                  <div className="comparison-box">
                    <span className="comparison-title">{isEs ? 'Nivel 0 · Navegación Principal' : 'Level 0 · Primary Navigation'}</span>
                    <div className="comparison-item"><strong>Mi Espacio:</strong> {isEs ? 'Dashboard diario y plato del día' : 'Daily overview and featured dish'}</div>
                    <div className="comparison-item"><strong>Menús:</strong> {isEs ? 'Plan semanal y generador IA' : 'Weekly meal plan & AI generator'}</div>
                    <div className="comparison-item"><strong>Configuración:</strong> {isEs ? 'Perfil, alergias y preferencias' : 'Profile, dietary rules & settings'}</div>
                  </div>

                  <div className="comparison-box">
                    <span className="comparison-title">{isEs ? 'Nivel 1 & 2 · Flujos Detallados' : 'Level 1 & 2 · Core Flows'}</span>
                    <div className="comparison-item"><strong>Mi Plato de Hoy:</strong> {isEs ? 'Receta guiada paso a paso y macros' : 'Step-by-step guided recipe & macros'}</div>
                    <div className="comparison-item"><strong>Editar Menú:</strong> {isEs ? 'Swap de platos y selección de días' : 'Dish swap and day count customization'}</div>
                    <div className="comparison-item"><strong>Lista Automática:</strong> {isEs ? 'Ingredientes agrupados para compra' : 'Aggregated shopping checklist'}</div>
                  </div>
                </div>
              </div>

              {/* Module 7: Identidad Visual & Design System Tokens */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Sistema de Diseño' : 'Design System'}</h3>
                  <span className="editorial-card-tag">[ 06 / TOKENS ]</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, textWrap: 'pretty' }}>
                  {isEs
                    ? 'Paleta cromática cálida que oscila entre terracota, naranja y melocotón, transmitiendo cercanía, salud y energía. Tipografía de UI basada en Montserrat por su alta legibilidad y jerarquía funcional en dispositivos móviles.'
                    : 'A warm palette spanning terracotta, vivid coral, and soft peach tones, conveying hospitality, appetite, and vitality. UI typography is anchored by Montserrat for high readability across dense mobile viewports.'}
                </p>
                <div className="swatch-grid">
                  <div className="swatch-card">
                    <div className="swatch-color" style={{ background: '#E25B45' }}></div>
                    <div className="swatch-info">
                      <strong>Terracotta</strong>
                      <span>#E25B45</span>
                    </div>
                  </div>
                  <div className="swatch-card">
                    <div className="swatch-color" style={{ background: '#A82E2E' }}></div>
                    <div className="swatch-info">
                      <strong>Brick Red</strong>
                      <span>#A82E2E</span>
                    </div>
                  </div>
                  <div className="swatch-card">
                    <div className="swatch-color" style={{ background: '#F8C8BE' }}></div>
                    <div className="swatch-info">
                      <strong>Soft Peach</strong>
                      <span>#F8C8BE</span>
                    </div>
                  </div>
                  <div className="swatch-card">
                    <div className="swatch-color" style={{ background: '#FFF8F6', borderBottom: '1px solid var(--border-color)' }}></div>
                    <div className="swatch-info">
                      <strong>Cream White</strong>
                      <span>#FFF8F6</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 8: Interactive Figma Prototype Embed */}
              <div className="editorial-card scroll-in-group">
                <div className="editorial-card-header">
                  <h3 className="editorial-card-title">{isEs ? 'Prototipo Interactivo Figma' : 'Live Interactive Prototype'}</h3>
                  <span className="editorial-card-tag">[ 07 / FIGMA PROTOTYPE ]</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, marginBottom: '0.8vw' }}>
                  {isEs
                    ? 'Interactúa directamente con la aplicación desde el prototipo oficial de Figma (puedes navegar las pantallas, tocar botones y probar el flujo completo):'
                    : 'Interact directly with the mobile application through the live Figma prototype embed below:'}
                </p>
                <div className="figma-container">
                  <iframe
                    title="Weeku Interactive Prototype"
                    style={{ border: 'none', width: '100%', height: '640px' }}
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
