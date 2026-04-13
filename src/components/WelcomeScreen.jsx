const CHIPS = [
  { emoji: '🤒', label: 'I have fever & headache' },
  { emoji: '🤧', label: 'Common cold & sore throat' },
  { emoji: '🦷', label: 'Tooth pain relief' },
  { emoji: '😴', label: 'Trouble sleeping' },
  { emoji: '🤢', label: 'Nausea & upset stomach' },
  { emoji: '💊', label: 'Blood pressure medicines' },
];

export default function WelcomeScreen({ onChipClick, isLeaving }) {
  return (
    <div
      className={isLeaving ? 'animate-welcome-out' : 'animate-fade-in'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '40px 24px',
        textAlign: 'center',
        minHeight: '400px',
      }}
    >
      <div
        className="animate-float"
        style={{
          fontSize: '64px',
          marginBottom: '24px',
          filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.4))',
          lineHeight: 1,
        }}
      >
        🩺
      </div>

      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          marginBottom: '12px',
          background: 'linear-gradient(135deg, #f0f6ff 0%, #38bdf8 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
        }}
      >
        Your Smart Health Assistant
      </h2>

      <p
        style={{
          color: '#64748b',
          fontSize: '15px',
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: '420px',
          lineHeight: 1.7,
          marginBottom: '36px',
        }}
      >
        Describe your symptoms and get personalized medicine suggestions,
        home remedies, and step-by-step guidance — powered by Gemini AI.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          maxWidth: '560px',
        }}
      >
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onChipClick(chip.label)}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            <span>{chip.emoji}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
