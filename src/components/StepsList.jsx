export default function StepsList({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
            e.currentTarget.style.background = 'rgba(168,85,247,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              margin: 0,
              flex: 1,
            }}
          >
            {step.replace(/^Step\s*\d+[:.]?\s*/i, '')}
          </p>
        </div>
      ))}
    </div>
  );
}
