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
              <span className="scroll-in text-indent" style={{ display: 'block' }}>
                {isEs ? (
                  <>
                    Siempre dispuesto a conocer nuevas personas, colaborar en retos ambiciosos de producto y diseñar interfaces limpias.{' '}
                    <Link className="text-link" to="/contact">
                      hablemos.
                    </Link>
                  </>
                ) : (
                  <>
                    I'm always looking to meet new people, collaborate on exciting projects, and explore new ideas.{' '}
                    <Link className="text-link" to="/contact">
                      say hello.
                    </Link>
                  </>
                )}
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
