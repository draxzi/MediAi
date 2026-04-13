export default function TypingIndicator() {
  const dots = [
    { color: '#38bdf8', delay: '0s' },
    { color: '#a855f7', delay: '0.2s' },
    { color: '#14b8a6', delay: '0.4s' },
  ];

  return (
    <div
      className="animate-msg-in"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '0 16px 0 0',
        alignSelf: 'flex-start',
        maxWidth: '120px',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(56,189,248,0.15)',
          border: '1px solid rgba(56,189,248,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0,
        }}
      >
        🩺
      </div>
      <div
        style={{
          padding: '14px 18px',
          borderRadius: '18px 18px 18px 4px',
          background: 'rgba(18, 24, 40, 0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {dots.map((dot, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: dot.color,
              animation: `typingBounce 1.2s ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
