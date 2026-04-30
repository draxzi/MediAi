export default function TypingIndicator() {
  return (
    <div
      className="animate-msg-in"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        alignSelf: 'flex-start',
      }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(107,191,159,0.30)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E8E3DC',
          borderRadius: '18px 18px 18px 4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 16px 8px',
            borderBottom: '1px solid #F0EBE3',
            background: '#FAFAF8',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
        >
          <span style={{ fontSize: '13px' }}>🩺</span>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: '#2F7F6D',
            }}
          >
            Health Insight
          </span>
        </div>
        <div
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              color: '#8FA89E',
              fontFamily: "'Inter', sans-serif",
              marginRight: '6px',
            }}
          >
            Analyzing your symptoms
          </span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#6BBF9F',
                animation: 'typingBounce 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
