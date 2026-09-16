import { useState, useEffect, type FormEvent, type RefObject } from 'react';
import { Link } from 'react-router';
import ScrambleText from '../components/ScrambleText';
import { useReveal, useRevealAll } from '../hooks/useReveal';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const META = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-primary)',
  lineHeight: '1.6',
};

const BODY = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '1.5',
  color: 'var(--text-primary)',
};

/* ─── Nav ─────────────────────────────────────────────────── */
function ContactNav() {
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
        ← Antonio Calero
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link to="/#work" className="nav-link" style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}>{t('nav.projects')}</Link>
        <Link to="/about" className="nav-link" style={{ ...META, color: 'var(--text-primary)', textDecoration: 'none' }}>{t('nav.about')}</Link>
        <Link to="/contact" className="nav-link" style={{ ...META, color: 'var(--hero-title-color)', fontWeight: 700, textDecoration: 'none' }}>{t('nav.contact')}</Link>
        <LanguageSelector />
      </div>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function ContactHero() {
  const { t } = useLanguage();
  return (
    <section
      style={{
        paddingTop: '128px',
        paddingLeft: '80px',
        paddingRight: '80px',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '64px',
        }}
      >
        <p style={{ ...META, color: 'var(--text-primary)', margin: 0 }}>{t('contact.hero_tag')}</p>
      </div>

      {/* Main Title */}
      <div style={{ paddingBottom: '72px' }}>
        <p
          className="meta-reveal"
          style={{ ...META, color: 'var(--text-primary)', marginBottom: '20px' }}
        >
          {t('contact.conversation_prompt')}
        </p>
        <div className="scramble-line">
          <ScrambleText
            text={t('contact.hero_title')}
            delay={0.1}
            duration={900}
            className="scramble-inner"
            style={{
              fontFamily: '"Special Gothic", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(44px, 6vw, 96px)',
              letterSpacing: '-0.03em',
              lineHeight: '0.92',
              color: 'var(--hero-title-color)',
              transition: 'color 0.4s ease',
            }}
          />
        </div>
        <p
          style={{
            ...BODY,
            fontSize: '20px',
            color: 'var(--text-primary)',
            marginTop: '28px',
            maxWidth: '720px',
            lineHeight: '1.5',
          }}
        >
          {t('contact.hero_subtitle')}
        </p>
      </div>
    </section>
  );
}

/* ─── Contact Body: Direct Channels + Form (5 cols | 7 cols) ─ */
function ContactBody() {
  const { t } = useLanguage();
  const ref = useRevealAll();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="editorial-grid grid w-full"
      style={{ gridTemplateColumns: 'repeat(12, 1fr)', borderBottom: '1px solid var(--border-color)' }}
    >
      {/* Columna Izquierda: Información Profesional & Canales — 5 cols (Cero Cajas) */}
      <div
        className="reveal-left contact-col-left"
        style={{
          gridColumn: 'span 5',
          borderRight: '1px solid var(--border-color)',
          padding: '64px 64px 64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '48px',
        }}
      >
        <div>
          <div
            style={{
              borderTop: '2px solid var(--accent-color)',
              paddingTop: '12px',
              marginBottom: '32px',
              transition: 'border-color 0.4s ease',
            }}
          >
            <p style={{ ...META, color: 'var(--text-primary)', margin: 0 }}>
              {t('contact.channels_eyebrow')}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '32px', marginBottom: '32px' }}>
            <p style={{ ...BODY, fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
              {t('contact.security_note')}
            </p>
          </div>

          {/* Datos de Disponibilidad y Ubicación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <p style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {t('contact.availability_label')}
              </p>
              <p style={{ ...BODY, fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
                {t('contact.availability_value')}
              </p>
            </div>

            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <p style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {t('contact.location_label')}
              </p>
              <p style={{ ...BODY, fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
                {t('contact.location_value')}
              </p>
            </div>

          </div>
        </div>

        {/* Redes profesionales */}
        <div style={{ paddingTop: '16px' }}>
          <p style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', marginBottom: '14px' }}>
            {t('contact.channels_label')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/' },
              { label: 'Behance ↗', href: 'https://www.behance.net/antoniocalero' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 18px',
                  border: '1px solid var(--border-color)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Formulario Editorial — 7 cols (Cero Cajas) */}
      <div
        className="reveal contact-col-right"
        style={{
          gridColumn: 'span 7',
          padding: '64px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              borderTop: '2px solid var(--accent-color)',
              paddingTop: '12px',
              marginBottom: '32px',
              transition: 'border-color 0.4s ease',
            }}
          >
            <p style={{ ...META, color: 'var(--text-primary)', margin: 0 }}>
              {t('contact.form_eyebrow')}
            </p>
          </div>

          {submitted ? (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '16px' }}>
              <p style={{ ...META, color: 'var(--accent-color)', marginBottom: '12px', fontWeight: 700 }}>
                {t('contact.success_banner')}
              </p>
              <h3
                style={{
                  fontFamily: '"Special Gothic", sans-serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--hero-title-color)',
                  marginBottom: '16px',
                }}
              >
                {t('contact.thanks_title')}
              </h3>
              <p style={{ ...BODY, fontSize: '17px', color: 'var(--text-primary)', lineHeight: '1.6', maxWidth: '580px' }}>
                {t('contact.thanks_desc')}
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 24px',
                    border: '1px solid var(--border-color)',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {t('contact.success_linkedin')}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  style={{
                    ...META,
                    padding: '12px 24px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  ← {t('contact.send_another')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Campos de texto: Líneas abiertas sin cajas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '36px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                    {t('contact.name_label')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder={t('contact.name_placeholder')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="editorial-input"
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '16px',
                      outline: 'none',
                      borderRadius: 0,
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                    {t('contact.email_label')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder={t('contact.email_placeholder')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="editorial-input"
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '16px',
                      outline: 'none',
                      borderRadius: 0,
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div style={{ marginBottom: '40px' }}>
                <label htmlFor="contact-message" style={{ ...META, fontSize: '10px', color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                  {t('contact.message_label')}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder={t('contact.message_placeholder')}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="editorial-input"
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    outline: 'none',
                    borderRadius: 0,
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              {/* Envío */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <span style={{ ...META, fontSize: '10px', color: 'var(--text-primary)' }}>
                  {t('contact.form_reply_note')}
                </span>
                <button
                  type="submit"
                  className="editorial-submit-btn"
                  style={{
                    ...META,
                    padding: '16px 36px',
                    border: '1px solid var(--hero-title-color)',
                    backgroundColor: 'var(--hero-title-color)',
                    color: 'var(--bg-primary)',
                    fontWeight: 700,
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  {t('contact.form_submit_btn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function ContactFooter() {
  const { t } = useLanguage();
  const ref = useReveal(0.05);
  return (
    <footer
      ref={ref as RefObject<HTMLElement>}
      className="reveal section-pad"
      style={{
        paddingLeft: '80px', paddingRight: '80px',
        paddingTop: '40px', paddingBottom: '40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <span style={META}>© 2026 Antonio Calero</span>
      <div style={{ display: 'flex', gap: '32px' }}>
        <Link to="/about" className="nav-link" style={{ ...META, textDecoration: 'none' }}>{t('nav.about')}</Link>
        <a href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/" target="_blank" rel="noreferrer" className="nav-link" style={META}>LinkedIn</a>
        <a href="https://www.behance.net/antoniocalero" target="_blank" rel="noreferrer" className="nav-link" style={META}>Behance</a>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <ContactNav />
      <main>
        <ContactHero />
        <ContactBody />
        <ContactFooter />
      </main>
    </>
  );
}
