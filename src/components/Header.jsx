export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(11, 15, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          className="animate-pulse-ring"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(56,189,248,0.25), rgba(124,58,237,0.25))',
            border: '1px solid rgba(56,189,248,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          💊
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '22px',
            fontWeight: 700,
            color: '#f0f6ff',
            letterSpacing: '-0.01em',
          }}
        >
          Medi<span style={{ color: '#38bdf8' }}>AI</span>
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="animate-blink"
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 6px #10b981',
            }}
          />
          <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
            AI Active
          </span>
        </div>
        <div
          style={{
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(124, 58, 237, 0.2)',
            border: '1px solid rgba(124,58,237,0.4)',
            color: '#c084fc',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          ✦ Gemini 2.0 Flash
        </div>
      </div>
    </header>
  );
}
