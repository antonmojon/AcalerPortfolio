import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '24px',
        paddingBottom: '24px',
        backgroundColor: '#FAFAFA',
        borderBottom: scrolled ? '1px solid #E0E0E0' : '1px solid transparent',
        transition: 'border-color 0.3s ease',
      }}
    >
      <a
        href="#"
        className="text-[#1A1A1A]"
        style={{
          fontFamily: '"Special Gothic Expanded One", sans-serif',
          fontSize: '15px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
      >
        Studio
      </a>
      <div className="flex items-center gap-8">
        {['Work', 'About', 'Services', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="nav-link text-[#1A1A1A] text-sm font-medium"
            style={{ letterSpacing: '0.02em' }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
