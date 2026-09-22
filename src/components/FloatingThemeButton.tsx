import { useTheme } from '../context/ThemeContext';

export default function FloatingThemeButton() {
  const { theme, setTheme } = useTheme();
  const isColor = theme === 'color';

  return (
    <div
      className="floating-theme-pill"
      role="group"
      aria-label="Selector de modo de color"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100001,
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        padding: '6px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        transition: 'background-color 0.4s ease, border-color 0.3s ease, transform 0.25s ease',
      }}
    >
      {/* Live Color Indicator Dot */}
      <span
        aria-hidden="true"
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: isColor ? '#FD1843' : '#111111',
          display: 'inline-block',
          boxShadow: isColor ? '0 0 6px rgba(253, 24, 67, 0.6)' : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
      />

      {/* B&N option */}
      <button
        type="button"
        onClick={() => setTheme('bw')}
        aria-pressed={!isColor}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          color: !isColor ? 'var(--text-primary)' : 'var(--text-muted)',
          textDecorationLine: !isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.25s ease',
          outline: 'none',
        }}
      >
        B&amp;N
      </button>

      <span style={{ color: 'var(--text-muted)', opacity: 0.4, fontSize: '10px' }}>/</span>

      {/* Color option */}
      <button
        type="button"
        onClick={() => setTheme('color')}
        aria-pressed={isColor}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          color: isColor ? 'var(--accent-color)' : 'var(--text-muted)',
          textDecorationLine: isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.25s ease',
          outline: 'none',
        }}
      >
        Color
      </button>
    </div>
  );
}
