import type { CSSProperties } from 'react';

export const META: CSSProperties = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#666666',
  lineHeight: '1.6',
};

export const DISPLAY: CSSProperties = {
  fontFamily: '"Special Gothic", sans-serif',
  fontWeight: 700,
  fontSize: 'clamp(72px, 9vw, 130px)',
  letterSpacing: '-0.03em',
  lineHeight: '0.95',
  color: '#111111',
};

export const DISPLAY_XL: CSSProperties = {
  fontFamily: '"Special Gothic Expanded One", sans-serif',
  fontWeight: 400,
  fontSize: 'clamp(56px, 7vw, 108px)',
  letterSpacing: '0.01em',
  lineHeight: '0.95',
  color: '#111111',
};

export const BODY: CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '1.5',
  color: '#1A1A1A',
};
