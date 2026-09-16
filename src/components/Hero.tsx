import ScrambleText from './ScrambleText';
import ParallaxImage from './ParallaxImage';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1472803828399-39d4ac53c6e5?w=1600&h=900&fit=crop&auto=format';

const DISPLAY: React.CSSProperties = {
  fontFamily: '"Special Gothic", sans-serif',
  fontWeight: 700,
  fontSize: 'clamp(72px, 9.5vw, 136px)',
  letterSpacing: '-0.01em',
  lineHeight: '0.92',
  color: 'var(--text-primary)',
};

const LABEL: React.CSSProperties = {
  fontFamily: '"Space Mono", monospace',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      className="section-pad w-full"
      style={{ paddingTop: '120px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div className="meta-reveal flex items-center gap-6">
        <span style={{ ...LABEL, color: 'var(--text-primary)' }}>{t('case.nightshift.tag')}</span>
        <span style={{ ...LABEL, color: 'var(--text-secondary)' }}>2022</span>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="scramble-line">
          <ScrambleText text="NIGHT" delay={0.1} duration={900} className="scramble-inner" style={DISPLAY} />
        </div>
        <div className="scramble-line">
          <ScrambleText text="SHIFT" delay={0.35} duration={900} className="scramble-inner" style={DISPLAY} />
        </div>
      </div>

      <ParallaxImage
        src={HERO_IMAGE}
        alt="Night Shift — architectural study in grayscale"
        height={760}
        speed={0.2}
        style={{ filter: 'grayscale(20%) contrast(1.05)' } as React.CSSProperties}
      />
    </section>
  );
}
