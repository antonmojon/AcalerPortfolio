import { useLanguage, type Language } from '../context/LanguageContext';

const LANGUAGE_OPTIONS: readonly { code: Language; label: string; title: string }[] = [
  { code: 'es', label: 'ES', title: 'Castellano / Español' },
  { code: 'en', label: 'EN', title: 'English' },
  { code: 'fr', label: 'FR', title: 'Français' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Selector de idioma / Language selector"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.06em',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {LANGUAGE_OPTIONS.map((opt, idx) => {
        const isActive = language === opt.code;
        return (
          <span key={opt.code} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setLanguage(opt.code)}
              aria-pressed={isActive}
              title={opt.title}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px 0',
                margin: 0,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                textDecorationLine: isActive ? 'underline' : 'none',
                textUnderlineOffset: '3px',
                textDecorationThickness: '1px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {opt.label}
            </button>
            {idx < LANGUAGE_OPTIONS.length - 1 && (
              <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>/</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
