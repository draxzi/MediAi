export default function MedicineCard({ medicine }) {
  const isOTC = medicine.type === 'OTC';

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '16px',
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(56,189,248,0.1)';
        e.currentTarget.style.background = 'rgba(56,189,248,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <p style={{ color: '#f0f6ff', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", margin: 0, flex: 1, marginRight: '8px' }}>
          {medicine.name}
        </p>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            background: isOTC ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
            color: isOTC ? '#34d399' : '#fbbf24',
            border: `1px solid ${isOTC ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
          }}
        >
          {medicine.type}
        </span>
      </div>
      <p style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", margin: '0 0 6px 0' }}>
        {medicine.dosage}
      </p>
      <p style={{ color: '#94a3b8', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", margin: '0 0 6px 0', lineHeight: 1.5 }}>
        {medicine.use}
      </p>
      {medicine.note && (
        <p style={{ color: '#64748b', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
          {medicine.note}
        </p>
      )}
    </div>
  );
}
