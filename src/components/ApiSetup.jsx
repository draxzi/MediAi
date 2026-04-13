import { useState } from 'react';

export default function ApiSetup({ onSave }) {
  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!key.startsWith('AIza') || key.length < 20) {
      setError('Please enter a valid Gemini API key (starts with AIza...)');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSave(key.trim());
      setLoading(false);
    }, 600);
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(11, 15, 26, 0.92)',
        backdropFilter: 'blur(12px)',
        padding: '24px',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(18, 24, 40, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(56,189,248,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(56,189,248,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            🔑
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#f0f6ff',
              marginBottom: '8px',
            }}
          >
            Activate <span style={{ color: '#38bdf8' }}>MediAI</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            Enter your Gemini API key to unlock your personal AI health assistant
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '8px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Gemini API Key
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={visible ? 'text' : 'password'}
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setError('');
                }}
                placeholder="AIza..."
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(56,189,248,0.2)'}`,
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(56,189,248,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(56,189,248,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  fontSize: '16px',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                {visible ? '🙈' : '👁️'}
              </button>
            </div>
            {error && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', fontFamily: "'DM Sans', sans-serif" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !key}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: key && !loading
                ? 'linear-gradient(135deg, #38bdf8, #7c3aed)'
                : 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: key && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
              opacity: !key ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (key && !loading) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(56,189,248,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Activating...' : 'Activate MediAI →'}
          </button>
        </form>

        <div
          style={{
            marginTop: '20px',
            padding: '12px 16px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '14px' }}>🔒</span>
          <div>
            <p style={{ color: '#34d399', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              Stored locally in your browser only — never sent to any server.
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#475569', fontFamily: "'DM Sans', sans-serif" }}>
          Get your free key at{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#38bdf8', textDecoration: 'none' }}
          >
            aistudio.google.com
          </a>
        </p>
      </div>
    </div>
  );
}
