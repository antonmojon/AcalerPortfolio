import { useState, useEffect, useRef, type FormEvent } from 'react';
import MgNav from '../components/MgNav';
import MgFooter from '../components/MgFooter';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const rootRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safe email builder (never in static HTML)
  const handleSafeEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = 'antonio.calero.alcala';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = 'antonio.calero.alcala';
    const domain = 'gmail.com';
    navigator.clipboard.writeText(`${user}@${domain}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // ScrollIn IntersectionObserver
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const delay = 0.06;
    const groups = root.querySelectorAll('.scroll-in-group');
    const borders = root.querySelectorAll('.border');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.classList.contains('scroll-in-group')) {
            entry.target.querySelectorAll('.scroll-in').forEach((el, index) => {
              (el as HTMLElement).style.setProperty('--stagger-delay', `${index * delay}s`);
              el.classList.add('is-visible');
            });
          } else {
            entry.target.classList.add('is-visible');
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    groups.forEach((g) => observer.observe(g));
    borders.forEach((b) => observer.observe(b));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div ref={rootRef} className="transition-wrapper">
      <MgNav />

      <main>
        <section className="contact-grid">
          {/* Left Column: Editorial Info */}
          <div className="scroll-in-group">
            <p className="text-box" style={{ marginBottom: '2vw' }}>
              <span className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)' }}>
                [ {isEs ? 'Contacto' : 'Contact'} ]
              </span>
            </p>

            <h1 className="contact-left-title text-box">
              <span className="scroll-in">
                {isEs ? 'Hablemos de tu idea' : "Let's connect"}
              </span>
            </h1>

            <p className="text-box" style={{ marginBottom: '2vw' }}>
              <span className="scroll-in" style={{ display: 'block', fontSize: 'var(--font-size-s)', lineHeight: '1.5' }}>
                {isEs
                  ? 'Disponible para proyectos de diseño de producto, sistemas de diseño y consultoría estratégica en remoto o presencial.'
                  : 'Open for product design leadership, design systems, and design engineering consultancy worldwide.'}
              </span>
            </p>

            <div style={{ marginTop: '3vw', display: 'flex', flexDirection: 'column', gap: '1.2vw' }}>
              <div className="text-box">
                <span className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)', opacity: 0.6 }}>
                  [ {isEs ? 'Ubicación' : 'Location'} ]
                </span>
              </div>
              <p className="text-box">
                <span className="scroll-in" style={{ fontSize: 'var(--font-size-s)' }}>
                  Bilbao, Bizkaia — España (UTC+1)
                </span>
              </p>

              <div className="text-box" style={{ marginTop: '1vw' }}>
                <span className="scroll-in" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-xs)', opacity: 0.6 }}>
                  [ {isEs ? 'Canales directos' : 'Direct Channels'} ]
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw' }}>
                <span className="text-box">
                  <button
                    onClick={handleSafeEmail}
                    className="scroll-in link-line"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-s)',
                      color: 'var(--color-dark)',
                      textAlign: 'left',
                    }}
                  >
                    {isEs ? 'Enviar correo electrónico ↗' : 'Send an email ↗'}
                  </button>
                </span>

                <span className="text-box">
                  <button
                    onClick={handleCopyEmail}
                    className="scroll-in link-line"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-dark)',
                      opacity: 0.7,
                      textAlign: 'left',
                    }}
                  >
                    {copied
                      ? (isEs ? '✓ Correo copiado al portapapeles' : '✓ Email copied to clipboard')
                      : (isEs ? 'Copiar dirección al portapapeles' : 'Copy address to clipboard')}
                  </button>
                </span>

                <span className="text-box" style={{ marginTop: '0.4vw' }}>
                  <a
                    href="https://www.linkedin.com/in/antonio-calero-alcala-de-la-moneda-b8732a164/"
                    target="_blank"
                    rel="noreferrer"
                    className="scroll-in link-line"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-s)',
                      color: 'var(--color-dark)',
                      textDecoration: 'none',
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </span>

                <span className="text-box">
                  <a
                    href="https://www.behance.net/antoniocalero"
                    target="_blank"
                    rel="noreferrer"
                    className="scroll-in link-line"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-s)',
                      color: 'var(--color-dark)',
                      textDecoration: 'none',
                    }}
                  >
                    Behance ↗
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimalist Form */}
          <div className="scroll-in-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div className="border" style={{ marginBottom: '3vw' }}></div>

            {submitted ? (
              <div style={{ padding: '3vw 0' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4vw', marginBottom: '1vw' }}>
                  {isEs ? '¡Mensaje recibido!' : 'Message received!'}
                </h2>
                <p style={{ fontSize: 'var(--font-size-m)', opacity: 0.8, lineHeight: '1.5' }}>
                  {isEs
                    ? 'Gracias por contactar. Responderé a la mayor brevedad posible.'
                    : 'Thank you for reaching out. I will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-xs)',
                      marginBottom: '0.8vw',
                      opacity: 0.6,
                    }}
                  >
                    [ 01 {isEs ? 'Nombre' : 'Name'} ]
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={isEs ? 'Tu nombre o empresa' : 'Your name or studio'}
                    className="contact-input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-xs)',
                      marginBottom: '0.8vw',
                      opacity: 0.6,
                    }}
                  >
                    [ 02 {isEs ? 'Correo' : 'Email'} ]
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={isEs ? 'nombre@empresa.com' : 'hello@company.com'}
                    className="contact-input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-size-xs)',
                      marginBottom: '0.8vw',
                      opacity: 0.6,
                    }}
                  >
                    [ 03 {isEs ? 'Proyecto o Consulta' : 'Project details'} ]
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={
                      isEs
                        ? 'Cuéntame brevemente sobre objetivos, plazos y alcance...'
                        : 'Tell me about timeline, objectives, and scope...'
                    }
                    className="contact-input-field"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="cta text-box"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    marginTop: '1vw',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div className="scroll-in">
                    <div className="cta-text">
                      <span className="link-line" style={{ fontSize: 'var(--font-size-m)' }}>
                        {isEs ? 'Enviar mensaje' : 'Send message'}
                      </span>
                      <span className="cta-icon-about">→</span>
                    </div>
                  </div>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <MgFooter />
    </div>
  );
}
