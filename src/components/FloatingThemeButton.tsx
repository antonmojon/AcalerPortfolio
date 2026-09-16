import { useTheme } from '../context/ThemeContext';

export default function FloatingThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isColor = theme === 'color';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="floating-theme-btn"
      aria-label={isColor ? 'Cambiar a modo Blanco y Negro' : 'Cambiar a modo Color'}
      title={isColor ? 'Modo actual: Color (Clic para B&N)' : 'Modo actual: B&N (Clic para Color)'}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: isColor ? '#FD1843' : '#111111',
        border: '2px solid var(--bg-primary)',
        boxShadow: '0 0 0 1px var(--border-color), 0 2px 8px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        padding: 0,
        margin: 0,
        zIndex: 7500,
        display: 'block',
        outline: 'none',
        transition: 'background-color 0.35s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.18)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    />
  );
}
