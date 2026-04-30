const CHIPS = [
  { emoji: '🤒', label: 'I have fever & headache' },
  { emoji: '🤧', label: 'Common cold & sore throat' },
  { emoji: '🦷', label: 'Tooth pain relief' },
  { emoji: '😴', label: 'Trouble sleeping' },
  { emoji: '🤢', label: 'Nausea & upset stomach' },
  { emoji: '💊', label: 'Blood pressure medicines' },
];

function truncate(str, n) {
  if (!str) return '';
  return str.length <= n ? str : str.slice(0, n).trimEnd() + '…';
}

export default function WelcomeScreen({ onChipFill, isLeaving, lastSession, onResume }) {
  return (
    <div
      className={`welcome-screen ${isLeaving ? 'animate-welcome-out' : 'animate-fade-in'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 'clamp(16px, 5vw, 48px) 16px 24px',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* Icon — hidden in landscape to save space */}
      <div
        className="welcome-icon animate-float"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(107,191,159,0.30)',
          flexShrink: 0,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1
        className="welcome-heading"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(18px, 4vw, 32px)',
          fontWeight: 700,
          color: '#1A2E26',
          marginBottom: '8px',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          maxWidth: '100%',
        }}
      >
        Describe your symptoms,{' '}
        <span style={{ color: '#2F7F6D' }}>get instant guidance</span>
      </h1>

      <p
        className="welcome-sub"
        style={{
          color: '#8FA89E',
          fontSize: 'clamp(12px, 2vw, 15px)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          marginBottom: lastSession?.symptom ? '16px' : '28px',
          letterSpacing: '0.005em',
        }}
      >
        Your health, understood in seconds.
      </p>

      {/* Last session resume */}
      {lastSession?.symptom && (
        <button
          data-testid="btn-resume-session"
          onClick={() => onResume && onResume(lastSession.symptom)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1.5px solid #C8DED5',
            background: '#EEF7F3',
            color: '#2F7F6D',
            fontSize: '13px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '20px',
            maxWidth: '440px',
            width: '100%',
            textAlign: 'left',
            boxShadow: '0 2px 8px rgba(107,191,159,0.10)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6BBF9F';
            e.currentTarget.style.background = '#E0F4EC';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(107,191,159,0.20)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#C8DED5';
            e.currentTarget.style.background = '#EEF7F3';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(107,191,159,0.10)';
          }}
        >
          <span style={{ fontSize: '16px', flexShrink: 0 }}>↩</span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: '10px', display: 'block', color: '#5A9E86', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '2px' }}>
              Continue last check
            </span>
            <span style={{ fontSize: '13px', color: '#1A2E26', display: 'block', wordBreak: 'break-word' }}>
              {truncate(lastSession.symptom, 60)}
            </span>
          </span>
          <svg style={{ marginLeft: 'auto', flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <p
        style={{
          color: '#B8C4BF',
          fontSize: '11px',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Common searches — click to fill
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '560px',
        }}
      >
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onChipFill(chip.label)}
            title="Click to fill the input field"
            data-testid={`chip-${chip.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
            style={{
              padding: '8px 13px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1.5px solid #E2DBD2',
              color: '#5A6B64',
              fontSize: 'clamp(11px, 1.5vw, 13px)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              wordBreak: 'keep-all',
              minHeight: '36px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#6BBF9F';
              e.currentTarget.style.color = '#2F7F6D';
              e.currentTarget.style.background = '#F0FAF6';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(107,191,159,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#E2DBD2';
              e.currentTarget.style.color = '#5A6B64';
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          >
            <span>{chip.emoji}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Landscape-specific compacting */}
      <style>{`
        /* In landscape on small screens: hide icon, compact heading */
        @media (max-height: 500px) and (orientation: landscape) {
          .welcome-icon   { display: none !important; }
          .welcome-sub    { display: none !important; }
          .welcome-screen { padding: 8px 16px 12px !important; justify-content: flex-start !important; }
          .welcome-heading {
            font-size: 16px !important;
            margin-bottom: 6px !important;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
