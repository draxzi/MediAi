export default function RemedyCard({ remedy }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '16px 12px',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,158,11,0.1)';
        e.currentTarget.style.background = 'rgba(245,158,11,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '8px', lineHeight: 1 }}>
        {remedy.emoji}
      </div>
      <p style={{ color: '#f0f6ff', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", margin: '0 0 6px 0' }}>
        {remedy.name}
      </p>
      <p style={{ color: '#94a3b8', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
        {remedy.use}
      </p>
    </div>
  );
}
