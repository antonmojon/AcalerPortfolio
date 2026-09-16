import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isColor = theme === 'color';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isColor ? 'Blanco y Negro' : 'Color'}`}
      title="Cambiar tema (B&N / Color)"
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        lineHeight: '1.5',
        userSelect: 'none',
        color: 'var(--text-secondary)',
      }}
    >
      <span
        style={{
          color: !isColor ? 'var(--text-primary)' : 'var(--text-muted)',
          textDecorationLine: !isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.25s ease',
        }}
      >
        B&amp;N
      </span>
      <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>/</span>
      <span
        style={{
          color: isColor ? 'var(--accent-color)' : 'var(--text-muted)',
          textDecorationLine: isColor ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          transition: 'color 0.25s ease',
        }}
      >
        Color
      </span>
    </button>
  );
}
