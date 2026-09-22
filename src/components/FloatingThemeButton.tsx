import { useTheme } from '../context/ThemeContext';

/**
 * Floating Swiss Editorial Theme Toggle
 * Follows the strict visual language of Antonio Calero's portfolio:
 * - 0px border radius (sharp Swiss modernist geometry)
 * - 1px hairline border with zero diffuse shadows
 * - Space Mono 11px typography matching LanguageSelector (B&N / COLOR)
 * - Micro geometric swatch indicating current palette
 */
export default function FloatingThemeButton() {
  const { theme, setTheme } = useTheme();
  const isColor = theme === 'color';

  return (
    <div
      className="floating-theme-tag"
      role="group"
      aria-label="Selector de tema cromático (B&N / Color)"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100001,
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 0,
        padding: '6px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        boxShadow: 'none',
        fontFamily: '"Space Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'background-color 0.4s ease, border-color 0.25s ease',
      }}
    >
      {/* Geometric Swiss Swatch indicator */}
      <span
        aria-hidden="true"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: isColor ? '#FD1843' : '#111111',
          display: 'inline-block',
          borderRadius: 0,
          transition: 'background-color 0.3s ease',
        }}
      />

      {/* B&N button */}
      <button
        type="button"
        onClick={() => setTheme('bw')}
        aria-pressed={!isColor}
        title="Modo Blanco y Negro"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontWeight: !isColor ? 700 : 400,
          color: !isColor ? 'var(--text-primary)' : 'var(--text-muted)',
          textDecorationLine: !isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.2s ease',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          if (isColor) e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          if (isColor) e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        B&amp;N
      </button>

      <span style={{ color: 'var(--text-muted)', opacity: 0.35, fontSize: '10px' }}>/</span>

      {/* Color button */}
      <button
        type="button"
        onClick={() => setTheme('color')}
        aria-pressed={isColor}
        title="Modo Color Suiza (Carmesí)"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontWeight: isColor ? 700 : 400,
          color: isColor ? 'var(--accent-color)' : 'var(--text-muted)',
          textDecorationLine: isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.2s ease',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          if (!isColor) e.currentTarget.style.color = 'var(--accent-color)';
        }}
        onMouseLeave={(e) => {
          if (!isColor) e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        Color
      </button>
    </div>
  );
}
