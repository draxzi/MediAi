import { useState } from 'react';
import { getImagesForQuery, buildImageUrl } from '../utils/imageMap.js';

const LABELS = ['Medicine', 'Treatment', 'Remedy', 'Healthcare'];

export default function ImageGrid({ query, onAllFailed }) {
  const photoIds = getImagesForQuery(query);
  const [loaded, setLoaded] = useState({});
  const [errors, setErrors] = useState({});

  function handleLoad(i) {
    setLoaded((prev) => ({ ...prev, [i]: true }));
  }

  function handleError(i) {
    setErrors((prev) => {
      const next = { ...prev, [i]: true };
      if (Object.keys(next).length === photoIds.length) {
        onAllFailed && onAllFailed();
      }
      return next;
    });
  }

  const visiblePhotos = photoIds.filter((_, i) => !errors[i]);
  if (visiblePhotos.length === 0) return null;

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
              borderRadius: '10px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: '#F0EBE3',
              border: '1.5px solid #E8E3DC',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(107,191,159,0.18)';
              e.currentTarget.style.borderColor = '#6BBF9F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E8E3DC';
            }}
          >
            {!loaded[i] && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #F0EBE3 25%, #E8E3DC 50%, #F0EBE3 75%)',
                  backgroundSize: '400px 100%',
                  animation: 'shimmerLight 1.5s infinite linear',
                }}
              />
            )}
            <img
              src={buildImageUrl(id)}
              alt={LABELS[i] || 'Health visual'}
              onLoad={() => handleLoad(i)}
              onError={() => handleError(i)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: loaded[i] ? 1 : 0,
                transition: 'opacity 0.4s ease',
                display: 'block',
              }}
            />
            {loaded[i] && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px 10px 8px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
                }}
              >
                <p
                  style={{
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    margin: 0,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {LABELS[i] || 'Health'}
                </p>
              </div>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes shimmerLight {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>
    </div>
  );
}
