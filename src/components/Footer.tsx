import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="section-pad w-full"
      style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '80px',
        paddingRight: '80px',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div
        className="footer-grid grid w-full items-center"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}
      >
        {/* Left: copyright */}
        <div style={{ gridColumn: 'span 4' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            © {year} Antonio Calero · {t('footer.rights')}
          </p>
        </div>

        {/* Center: colophon */}
        <div style={{ gridColumn: 'span 4', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            Special Gothic &amp; Inter · {t('nav.portfolio_year')}
          </p>
        </div>

        {/* Right: social links */}
        <div
          className="flex items-center justify-end gap-6"
          style={{ gridColumn: 'span 4' }}
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
