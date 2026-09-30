import { Link } from 'react-router';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function ComingSoonPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className="transition-wrapper">
      <MgNav />

      <main style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6vw 4vw' }}>
        <div style={{ maxWidth: '40vw', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)', marginBottom: '1.5vw', opacity: 0.6 }}>
            [ {isEs ? 'En desarrollo' : 'In progress'} ]
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: '1.5vw', textTransform: 'uppercase' }}>
            {isEs ? 'Caso de estudio en preparación' : 'Case study in progress'}
          </h1>
          <p style={{ fontSize: 'var(--font-size-m)', opacity: 0.8, lineHeight: '1.5', marginBottom: '3vw' }}>
            {isEs
              ? 'Este proyecto se encuentra actualmente en fase de redacción técnica y preparación de activos visuales.'
              : 'This project is currently undergoing documentation, benchmarks, and interactive asset preparation.'}
          </p>
          <Link to="/#work" className="cta text-box" style={{ display: 'inline-block' }}>
            <div className="cta-text">
              <span className="cta-icon-about">←</span>
              <span className="link-line">
                {isEs ? 'Volver a proyectos' : 'Back to projects'}
              </span>
            </div>
          </Link>
        </div>
      </main>

      <MgFooter />
    </div>
  );
}
