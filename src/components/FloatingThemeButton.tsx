import { useTheme } from '../context/ThemeContext';

/**
 * Option 3: Minimalist Swiss Micro-Switch
 * Ultra-compact, clean 2-state sliding toggle:
 * - 38px x 20px pill track with 1px hairline border
 * - 14px sliding thumb: #111111 in B&N mode -> #FD1843 in Color mode
 * - Zero bulky text or boxes, pure restrained Swiss industrial aesthetic
 */
export default function FloatingThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isColor = theme === 'color';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="floating-micro-switch"
      role="switch"
      aria-checked={isColor}
      aria-label={isColor ? 'Cambiar a modo Blanco y Negro' : 'Cambiar a modo Color'}
      title={isColor ? 'Modo actual: Color (Clic para B&N)' : 'Modo actual: Blanco y Negro (Clic para Color)'}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100001,
        width: '38px',
        height: '20px',
        borderRadius: '999px',
        backgroundColor: isColor ? 'rgba(253, 24, 67, 0.12)' : 'var(--bg-surface)',
        border: isColor ? '1px solid rgba(253, 24, 67, 0.45)' : '1px solid var(--border-color)',
        cursor: 'pointer',
        padding: '2px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: isColor ? '#FD1843' : '#111111',
          transform: isColor ? 'translateX(18px)' : 'translateX(0px)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.28s ease, box-shadow 0.28s ease',
          boxShadow: isColor
            ? '0 0 8px rgba(253, 24, 67, 0.5)'
            : '0 1px 3px rgba(0, 0, 0, 0.25)',
          display: 'block',
        }}
      />
    </button>
  );
}
