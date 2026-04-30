import { useState } from 'react';
import MedicineCard from './MedicineCard.jsx';
import StepsList from './StepsList.jsx';
import RemedyCard from './RemedyCard.jsx';
import ImageGrid from './ImageGrid.jsx';
import { getImagesForQuery } from '../utils/imageMap.js';

function SectionHeader({ icon, label, color }) {
  const colorMap = {
    green:  { bg: '#EEF7F3', border: '#C8DED5', text: '#2F7F6D' },
    blue:   { bg: '#EEF4FB', border: '#BDD3EE', text: '#2563A8' },
    amber:  { bg: '#FDF7EE', border: '#F0DCAA', text: '#8D5A0A' },
    red:    { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
    teal:   { bg: '#F0FAFA', border: '#B2DEDE', text: '#115E59' },
    purple: { bg: '#F5F0FD', border: '#D9C4F8', text: '#6B21A8' },
  };
  const c = colorMap[color] || colorMap.green;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
      }}
    >
      <span
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '8px',
          background: c.bg,
          border: `1.5px solid ${c.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <h3
        style={{
          color: c.text,
          fontSize: '11px',
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {label}
      </h3>
    </div>
  );
}

function Section({ children, noBorder }) {
  return (
    <div
      className="animate-card-in"
      style={{
        paddingBottom: noBorder ? 0 : '20px',
        marginBottom: noBorder ? 0 : '20px',
        borderBottom: noBorder ? 'none' : '1px solid #F0EBE3',
      }}
    >
      {children}
    </div>
  );
}

function ImageSection({ query }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <Section>
      <SectionHeader icon="🖼" label="Related Visuals" color="teal" />
      <ImageGrid query={query} onAllFailed={() => setHidden(true)} />
    </Section>
  );
}

export default function AIResponse({ data, query }) {
  const sections = [];

  if (data.summary) {
    sections.push(
      <Section key="summary">
        <SectionHeader icon="🔍" label="Possible Causes" color="blue" />
        <p
          style={{
            color: '#3E4E4A',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.8,
            margin: 0,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {data.summary}
        </p>
      </Section>
    );
  }

  if (data.steps && data.steps.length > 0) {
    sections.push(
      <Section key="steps">
        <SectionHeader icon="✅" label="What You Can Do" color="green" />
        <StepsList steps={data.steps} />
      </Section>
    );
  }

  if (data.medicines && data.medicines.length > 0) {
    sections.push(
      <Section key="medicines">
        <SectionHeader icon="💊" label="Suggested Medicines" color="purple" />
        <div className="medicine-grid">
          {data.medicines.map((med, i) => <MedicineCard key={i} medicine={med} />)}
        </div>
      </Section>
    );
  }

  if (data.remedies && data.remedies.length > 0) {
    sections.push(
      <Section key="remedies">
        <SectionHeader icon="🌿" label="Home Remedies" color="amber" />
        <div className="remedy-grid">
          {data.remedies.map((rem, i) => <RemedyCard key={i} remedy={rem} />)}
        </div>
      </Section>
    );
  }

  const imageSearchQuery = data.imageQuery || query;
  if (imageSearchQuery && getImagesForQuery(imageSearchQuery).length > 0) {
    sections.push(<ImageSection key="images" query={imageSearchQuery} />);
  }

  if (data.warning) {
    sections.push(
      <Section key="warning" noBorder>
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            background: '#FEF2F2',
            border: '1.5px solid #FECACA',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                color: '#7F1D1D',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                margin: '0 0 5px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              When to See a Doctor
            </p>
            <p
              style={{
                color: '#991B1B',
                fontSize: '13px',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.65,
                margin: 0,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {data.warning}
            </p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sections}
    </div>
  );
}
