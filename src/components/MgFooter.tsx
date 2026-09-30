import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export default function MgFooter() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <footer className="footer">
      <div className="border is-visible"></div>
      <div className="text-box scroll-in-group">
        <p className="scroll-in">©2026 Antonio Calero</p>
      </div>
      <div className="footer-right">
        <div className="footer-box scroll-in-group">
          <p className="text-box">
            <span className="scroll-in">[ {isEs ? 'Disponibilidad' : 'Open'} ]</span>
          </p>
          <p className="footer-text">
            <span className="text-box">
              <span className="scroll-in text-indent">
                {isEs ? 'Siempre dispuesto a conocer' : "I'm always looking to"}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'nuevas personas, colaborar en' : 'meet new people, collaborate'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'retos ambiciosos de producto y' : 'on new projects, and explore'}
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                {isEs ? 'diseñar interfaces\u00A0limpias. ' : 'new\u00A0ideas. Feel free to '}
                <Link className="text-link" to="/contact">
                  {isEs ? 'hablemos.' : 'say\u00A0hello.'}
                </Link>
              </span>
            </span>
          </p>
        </div>

        <div className="footer-box scroll-in-group">
          <p className="text-box">
            <span className="scroll-in">[ {isEs ? 'Contacto' : 'Contact'} ]</span>
          </p>
          <p className="footer-text">
            <span className="text-box">
              <span className="scroll-in">
                Contacto :{' '}
                <Link className="link-line" to="/contact">
                  {isEs ? 'Formulario directo\u00A0→' : 'Direct contact form\u00A0→'}
                </Link>
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                Ubicación : Bilbao, Bizkaia ·\u00A0España (UTC+1)
              </span>
            </span>
            <span className="text-box">
              <span className="scroll-in">
                Social :{' '}
                <a
                  className="link-line"
                  href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>{' '}
                ·{' '}
                <a
                  className="link-line"
                  href="https://www.behance.net/antoniocalero"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance ↗
                </a>
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
