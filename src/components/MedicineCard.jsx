export default function MedicineCard({ medicine }) {
  const isOTC = medicine.type === 'OTC';

  return (
    <div
      style={{
        background: '#FAFAF8',
        border: '1.5px solid #E8E3DC',
        borderRadius: '12px',
        padding: '16px',
        transition: 'all 0.18s ease',
        cursor: 'default',
        boxSizing: 'border-box',
        width: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#6BBF9F';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(107,191,159,0.15)';
        e.currentTarget.style.background = '#F0FAF6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E8E3DC';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = '#FAFAF8';
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
          gap: '8px',
        }}
      >
        <p
          style={{
            color: '#2E2E2E',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            margin: 0,
            flex: 1,
            minWidth: 0,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {medicine.name}
        </p>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: isOTC ? '#EEF7F3' : '#FDF7EE',
            color: isOTC ? '#2F7F6D' : '#8D5A0A',
            border: `1px solid ${isOTC ? '#C8DED5' : '#F0DCAA'}`,
          }}
        >
          {medicine.type}
        </span>
      </div>
      <p
        style={{
          color: '#2F7F6D',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          margin: '0 0 6px 0',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {medicine.dosage}
      </p>
      <p
        style={{
          color: '#7A8B84',
          fontSize: '13px',
          fontFamily: "'Inter', sans-serif",
          margin: '0 0 6px 0',
          lineHeight: 1.5,
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {medicine.use}
      </p>
      {medicine.note && (
        <p
          style={{
            color: '#A8B5AE',
            fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            margin: 0,
            lineHeight: 1.5,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {medicine.note}
        </p>
      )}
    </div>
  );
}
