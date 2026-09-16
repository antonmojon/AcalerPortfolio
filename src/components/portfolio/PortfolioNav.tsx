import { useState, useEffect } from 'react';
import { META } from '../../styles/tokens';

export default function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '32px',
        paddingBottom: '32px',
        backgroundColor: '#FAFAFA',
        borderBottom: scrolled ? '1px solid #E0E0E0' : '1px solid transparent',
        transition: 'border-color 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <span style={{ ...META, color: '#111111' }}>Antonio Calero</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        {['UI/UX', 'Operations', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="nav-link"
            style={{ ...META, textDecoration: 'none' }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
