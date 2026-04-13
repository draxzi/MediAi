import MedicineCard from './MedicineCard.jsx';
import StepsList from './StepsList.jsx';
import RemedyCard from './RemedyCard.jsx';
import ImageGrid from './ImageGrid.jsx';

function SectionBadge({ icon, label, color }) {
  const colorMap = {
    cyan: { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)', text: '#38bdf8' },
    green: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', text: '#10b981' },
    purple: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', text: '#a855f7' },
    amber: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
    teal: { bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.25)', text: '#14b8a6' },
    red: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: '#ef4444' },
  };

  const c = colorMap[color] || colorMap.cyan;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '999px',
          background: c.bg,
          border: `1px solid ${c.border}`,
          color: c.text,
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {icon} {label}
      </span>
    </div>
  );
}

function Section({ children, style }) {
  return (
    <div className="animate-fade-in" style={{ marginBottom: '20px', ...style }}>
      {children}
    </div>
  );
}

export default function AIResponse({ data, query }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {data.summary && (
        <Section>
          <SectionBadge icon="🔍" label="Assessment" color="cyan" />
          <p style={{ color: '#cbd5e1', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, margin: 0 }}>
            {data.summary}
          </p>
        </Section>
      )}

      {data.medicines && data.medicines.length > 0 && (
        <Section>
          <SectionBadge icon="💊" label="Suggested Medicines" color="green" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '10px',
            }}
          >
            {data.medicines.map((med, i) => (
              <MedicineCard key={i} medicine={med} />
            ))}
          </div>
        </Section>
      )}

      {data.steps && data.steps.length > 0 && (
        <Section>
          <SectionBadge icon="📋" label="Steps to Follow" color="purple" />
          <StepsList steps={data.steps} />
        </Section>
      )}

      {data.remedies && data.remedies.length > 0 && (
        <Section>
          <SectionBadge icon="🌿" label="Home Remedies" color="amber" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '10px',
            }}
          >
            {data.remedies.map((rem, i) => (
              <RemedyCard key={i} remedy={rem} />
            ))}
          </div>
        </Section>
      )}

      {query && (
        <Section>
          <SectionBadge icon="🖼" label="Related Visuals" color="teal" />
          <ImageGrid query={query} />
        </Section>
      )}

      {data.warning && (
        <Section style={{ marginBottom: 0 }}>
          <SectionBadge icon="⚠" label="Important" color="red" />
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
            }}
          >
            <p style={{ color: '#fca5a5', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: 0 }}>
              {data.warning}
            </p>
          </div>
        </Section>
      )}
    </div>
  );
}
