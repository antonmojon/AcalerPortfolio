interface Props {
  items: string[];
  reverse?: boolean;
  speed?: number;
}

export default function Marquee({ items, reverse = false, speed = 28 }: Props) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid #E0E0E0',
        borderBottom: '1px solid #E0E0E0',
        paddingTop: '18px',
        paddingBottom: '18px',
        backgroundColor: '#FAFAFA',
      }}
    >
      <div
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#666666',
              paddingRight: '64px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '64px',
            }}
          >
            {item}
            <span style={{ fontSize: '6px', color: '#CCCCCC', verticalAlign: 'middle' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
