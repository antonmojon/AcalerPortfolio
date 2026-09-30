import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

export default function MgNav() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="nav-logo anchor">
          <p className="text-box">
            <span className="nav-in" style={{ '--stagger-delay': '0s' } as React.CSSProperties}>
              ©AntonioCalero
            </span>
          </p>
        </Link>

        <div className="nav-links-wrapper desktop-el">
          <ul className="nav-links">
            <Link
              className={`nav-link nav-in anchor ${pathname === '/' ? 'is-active' : ''}`}
              to="/#work"
              style={{ '--stagger-delay': '0.05s' } as React.CSSProperties}
            >
              <li className={`link-line ${pathname === '/' ? 'link-line-active' : ''}`}>
                {t('nav.projects')}
              </li>
              <span className="nav-link-count">(3)</span>
            </Link>

            <Link
              className="nav-link nav-in anchor"
              to="/#archive"
              style={{ '--stagger-delay': '0.1s' } as React.CSSProperties}
            >
              <li className="link-line">Archive</li>
              <span className="nav-link-count">(3)</span>
            </Link>

            <Link
              className={`nav-link nav-in anchor ${pathname === '/about' ? 'is-active' : ''}`}
              to="/about"
              style={{ '--stagger-delay': '0.15s' } as React.CSSProperties}
            >
              <li className={`link-line ${pathname === '/about' ? 'link-line-active' : ''}`}>
                {t('nav.about')}
              </li>
            </Link>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
          <Link
            className={`nav-button text-box desktop-el ${pathname === '/contact' ? 'is-active' : ''}`}
            to="/contact"
          >
            <span
              className={`nav-in link-line ${pathname === '/contact' ? 'link-line-active' : ''}`}
              style={{ '--stagger-delay': '0.2s' } as React.CSSProperties}
            >
              {t('nav.contact')}
            </span>
          </Link>
          <LanguageSelector />
          <button
            className={`burger-button mobile-el is-animated ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <div className="burger-button-text">
              <p className="burger-button-text-el">{mobileOpen ? 'Close' : 'Menu'}</p>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`burger-mobile mobile-el ${mobileOpen ? 'is-open' : ''}`}>
        <div className="burger-wrapper">
          <div className="burger-links">
            <div className="burger-title">
              <p className="text-box">
                <span className="burger-title-el">[ Navigation ]</span>
              </p>
              <div className="burger-border"></div>
            </div>
            <Link className="burger-link anchor" to="/#work" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">{t('nav.projects')}</span>
                <span className="burger-link-count">(3)</span>
              </div>
            </Link>
            <Link className="burger-link anchor" to="/#archive" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">Archive</span>
                <span className="burger-link-count">(3)</span>
              </div>
            </Link>
            <Link className="burger-link anchor" to="/about" onClick={() => setMobileOpen(false)}>
              <div className="burger-link-el">
                <span className="burger-link-text">{t('nav.about')}</span>
              </div>
            </Link>
          </div>
          <Link className="cta text-box" to="/contact" onClick={() => setMobileOpen(false)}>
            <div className="cta-burger">
              <span className="cta-text-burger">{t('nav.contact')} →</span>
            </div>
          </Link>
        </div>
        <div className="burger-mobile-overlay" onClick={() => setMobileOpen(false)}></div>
      </div>
    </header>
  );
}
