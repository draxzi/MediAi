import { useState } from 'react';
import { getImagesForQuery, buildImageUrl } from '../utils/imageMap.js';

const LABELS = ['Medicine', 'Treatment', 'Remedy', 'Healthcare'];

export default function ImageGrid({ query }) {
  const photoIds = getImagesForQuery(query);
  const [loaded, setLoaded] = useState({});
  const [errors, setErrors] = useState({});

  function handleLoad(i) {
    setLoaded((prev) => ({ ...prev, [i]: true }));
  }

  function handleError(i) {
    setErrors((prev) => ({ ...prev, [i]: true }));
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
      }}
    >
      {photoIds.map((id, i) => {
        if (errors[i]) return null;
        return (
          <div
            key={id}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(56,189,248,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {!loaded[i] && (
              <div
                className="shimmer-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                }}
              />
            )}
            <img
              src={buildImageUrl(id)}
              alt={`Medical visual ${i + 1}`}
              onLoad={() => handleLoad(i)}
              onError={() => handleError(i)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: loaded[i] ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
            {loaded[i] && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 10px 8px',
                  background: 'linear-gradient(to top, rgba(11,15,26,0.85), transparent)',
                }}
              >
                <p style={{ color: '#e2e8f0', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, margin: 0, letterSpacing: '0.03em' }}>
                  {LABELS[i] || 'Health'}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
