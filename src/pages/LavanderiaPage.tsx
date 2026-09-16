import { useState, useEffect, type RefObject } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import ParallaxImage from '../components/ParallaxImage';
import { useReveal } from '../hooks/useReveal';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const META = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  lineHeight: '1.6',
};

const HERO_IMG = 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1600&h=760&fit=crop&auto=format';

function LavanderiaNav() {
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
          fontSize: '15px', letterSpacing: '0.04em',
          textTransform: 'uppercase', color: 'var(--text-primary)', textDecoration: 'none',
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
            style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}
          >{label}</Link>
        ))}
        <LanguageSelector />
      </div>
    </nav>
  );
}

export default function LavanderiaPage() {
  const { t, getLavanderiaData } = useLanguage();
  const quoteRef = useReveal();
  const editRef = useReveal();
  const data = getLavanderiaData();

  return (
    <>
      <LavanderiaNav />
      <main>
        {/* Hero */}
        <section
          className="section-pad w-full"
          style={{ paddingTop: '128px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div className="meta-reveal flex items-center" style={{ gap: '120px' }}>
            <span style={META}>{t('case.lavanderia.tag')}</span>
            <span style={META}>2025</span>
          </div>
          <div>
            <div className="scramble-line">
              <ScrambleText text="LAVANDERÍA" delay={0.1} duration={900} className="scramble-inner" style={{
                fontFamily: '"Special Gothic", sans-serif', fontWeight: 700,
                fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '-0.03em',
                lineHeight: '0.95', color: 'var(--hero-title-color)',
                transition: 'color 0.4s ease',
              }} />
            </div>
            <div className="scramble-line">
              <ScrambleText text="BIZKAIA" delay={0.38} duration={900} className="scramble-inner" style={{
                fontFamily: '"Special Gothic", sans-serif', fontWeight: 700,
                fontSize: 'clamp(48px, 7vw, 100px)', letterSpacing: '-0.03em',
                lineHeight: '0.95', color: 'var(--hero-title-color)',
                transition: 'color 0.4s ease',
              }} />
            </div>
          </div>
          <ParallaxImage
            src={HERO_IMG}
            alt="Lavandería Bizkaia — identity"
            height={760}
            speed={0.2}
            style={{ filter: 'contrast(1.04)' }}
          />
        </section>

        {/* Editorial */}
        <section
          ref={editRef as RefObject<HTMLElement>}
          className="reveal section-pad w-full"
          style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '120px', paddingBottom: '120px' }}
        >
          <div className="editorial-grid grid w-full" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 4' }} />
            <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '56px' }}>
              <p style={{ fontFamily: '"Inter"', fontWeight: 400, fontSize: '28px', lineHeight: '1.3', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
                {data.intro}
              </p>
              {data.blocks.map((b) => (
                <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ ...META, color: 'var(--text-secondary)' }}>{b.label}</p>
                  <p style={{ fontFamily: '"Inter"', fontWeight: 400, fontSize: '18px', lineHeight: '1.5', color: 'var(--text-primary)' }}>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section
          className="section-pad"
          style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', paddingBottom: '160px', paddingLeft: '80px', paddingRight: '80px' }}
        >
          <div ref={quoteRef as RefObject<HTMLDivElement>} className="reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontFamily: '"Inter"', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: '1.2', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '48px' }}>
              {data.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ ...META, color: 'var(--text-primary)', marginBottom: '2px' }}>Antonio Calero</p>
                <p style={META}>{t('case.lavanderia.role')}</p>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', color: 'var(--accent-contrast)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Space Mono"', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                AC
              </div>
            </div>
          </div>
        </section>

        {/* Next project → back to portfolio */}
        <section className="w-full" style={{ borderTop: '1px solid var(--border-color)' }}>
          <Link
            to="/"
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
            }}>{t('case.back_to_portfolio')}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
              <p className="np-title" style={{
                fontFamily: '"Special Gothic Expanded One", sans-serif',
                fontWeight: 400, fontSize: 'clamp(44px, 6.5vw, 96px)',
                letterSpacing: '-0.01em', lineHeight: '0.92', color: 'var(--hero-title-color)',
              }}>ANTONIO CALERO</p>
              <span className="np-arrow" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'var(--hero-title-color)', paddingBottom: '8px', flexShrink: 0 }}>→</span>
            </div>
          </Link>
        </section>

        {/* Footer */}
        <footer className="section-pad w-full" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={META}>Bilbao, España 2026</span>
          <span style={META}>{t('home.footer_title')}</span>
        </footer>
      </main>
    </>
  );
}
