export default function StepsList({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px 14px',
            borderRadius: '10px',
            background: '#F7FAF8',
            border: '1.5px solid #E0EEE8',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6BBF9F';
            e.currentTarget.style.background = '#EEF7F3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E0EEE8';
            e.currentTarget.style.background = '#F7FAF8';
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#2F7F6D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              flexShrink: 0,
              marginTop: '1px',
            }}
          >
            {i + 1}
          </div>
          <p
            style={{
              color: '#3E4E4A',
              fontSize: '13px',
              fontFamily: "'Inter', sans-serif",
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
