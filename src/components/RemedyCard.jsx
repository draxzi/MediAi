export default function RemedyCard({ remedy }) {
  return (
    <div
      style={{
        background: '#FAFAF8',
        border: '1.5px solid #E8E3DC',
        borderRadius: '12px',
        padding: '16px 12px',
        textAlign: 'center',
        transition: 'all 0.18s ease',
        cursor: 'default',
        boxSizing: 'border-box',
        width: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#D4A017';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(212,160,23,0.12)';
        e.currentTarget.style.background = '#FDFBF2';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E8E3DC';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = '#FAFAF8';
      }}
    >
      <div style={{ fontSize: '28px', marginBottom: '8px', lineHeight: 1 }}>
        {remedy.emoji}
      </div>
      <p
        style={{
          color: '#2E2E2E',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          margin: '0 0 5px 0',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {remedy.name}
      </p>
      <p
        style={{
          color: '#7A8B84',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          lineHeight: 1.5,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {remedy.use}
      </p>
    </div>
  );
}
