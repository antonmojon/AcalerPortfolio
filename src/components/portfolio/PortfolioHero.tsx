import { META, DISPLAY } from '../../styles/tokens';

const HERO_IMG = 'https://images.unsplash.com/photo-1587522384446-64daf3e2689a?w=1600&h=760&fit=crop&auto=format';

const TITLE_WORDS = ['SCALE', '&', 'DESIGN'];

export default function PortfolioHero() {
  return (
    <section
      className="section-pad w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        paddingTop: '140px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* Metadata row */}
      <div
        className="meta-reveal"
        style={{ display: 'flex', alignItems: 'center', gap: '120px' }}
      >
        <span style={META}>UI/UX &amp; Operations Lead</span>
        <span style={META}>2026</span>
      </div>

      {/* Display title */}
      <div
        style={{ overflow: 'hidden' }}
        aria-label="Scale & Design"
      >
        <p
          className="flex flex-wrap"
          style={{ ...DISPLAY, gap: '0.16em' }}
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="hero-word" style={{ display: 'inline-block' }}>
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Hero image placeholder */}
      <div
        className="w-full overflow-hidden bg-[#E5E5E5]"
        style={{ height: '760px' }}
      >
        <img
          src={HERO_IMG}
          alt="Antonio Calero — workspace"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(15%) contrast(1.05)' }}
        />
      </div>
    </section>
  );
}
