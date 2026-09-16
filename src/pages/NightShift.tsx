import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Hero from '../components/Hero';
import EditorialContent from '../components/EditorialContent';
import GalleryFeed from '../components/GalleryFeed';
import QuoteBlock from '../components/QuoteBlock';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

function NightShiftNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        paddingLeft: '80px', paddingRight: '80px',
        paddingTop: '24px', paddingBottom: '24px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.3s ease',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: '"Special Gothic Expanded One", sans-serif',
          fontSize: '15px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          transition: 'color 0.4s ease',
        }}
      >
        {t('nav.back')}
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {[
          { label: t('nav.projects'), href: '/#work' },
          { label: t('nav.about'), href: '/about' },
          { label: t('nav.contact'), href: '/contact' },
        ].map(({ label, href }) => (
          <Link key={label} to={href} className="nav-link"
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >{label}</Link>
        ))}
        <LanguageSelector />
      </div>
    </nav>
  );
}

function NextProjectBlock() {
  const { t } = useLanguage();
  return (
    <section className="w-full" style={{ borderTop: '1px solid var(--border-color)' }}>
      <Link
        to="/lavanderia-bizkaia"
        className="next-project-block block w-full"
        style={{
          paddingTop: '96px',
          paddingBottom: '96px',
          paddingLeft: '80px',
          paddingRight: '80px',
          textDecoration: 'none',
        }}
      >
        <p className="np-label" style={{
          fontFamily: '"Space Mono", monospace',
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: '28px',
        }}>
          {t('case.next_project')}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
          <p className="np-title" style={{
            fontFamily: '"Special Gothic Expanded One", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            letterSpacing: '-0.01em',
            lineHeight: '0.92',
            color: 'var(--hero-title-color)',
          }}>
            LAVANDERÍA BIZKAIA
          </p>
          <span className="np-arrow" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--hero-title-color)', paddingBottom: '8px', flexShrink: 0 }}>→</span>
        </div>
      </Link>
    </section>
  );
}

export default function NightShift() {
  return (
    <>
      <NightShiftNav />
      <main>
        <Hero />
        <EditorialContent />
        <GalleryFeed />
        <QuoteBlock />
        <NextProjectBlock />
      </main>
      <Footer />
    </>
  );
}
