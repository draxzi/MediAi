import { useRef, useEffect } from 'react';

export default function InputArea({ value, onChange, onSend, isProcessing }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollH, 120) + 'px';
    }
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isProcessing && value.trim()) {
        onSend();
      }
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(11,15,26,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          padding: '6px 16px',
          background: 'rgba(239,68,68,0.08)',
          borderBottom: '1px solid rgba(239,68,68,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '13px' }}>⚕️</span>
        <p style={{ color: '#fca5a5', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", margin: 0, fontWeight: 500 }}>
          For informational purposes only — Always consult a licensed doctor
        </p>
      </div>

      <div style={{ padding: '12px 20px 16px', maxWidth: '900px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px',
            padding: '10px 10px 10px 18px',
            borderRadius: '999px',
            background: 'rgba(18,24,40,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={() => {}}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms... (e.g. I have fever and headache)"
            disabled={isProcessing}
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: '#e2e8f0',
              fontSize: '14px',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              maxHeight: '120px',
              overflowY: 'auto',
              padding: 0,
            }}
            onFocus={(e) => {
              e.target.closest('div').style.borderColor = 'rgba(56,189,248,0.4)';
              e.target.closest('div').style.boxShadow = '0 0 0 3px rgba(56,189,248,0.08)';
            }}
            onBlur={(e) => {
              e.target.closest('div').style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.closest('div').style.boxShadow = 'none';
            }}
          />
          <button
            onClick={onSend}
            disabled={isProcessing || !value.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isProcessing || !value.trim()
                ? 'rgba(255,255,255,0.06)'
                : 'linear-gradient(135deg, #38bdf8, #7c3aed)',
              border: 'none',
              cursor: isProcessing || !value.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              opacity: isProcessing || !value.trim() ? 0.4 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && value.trim()) {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(56,189,248,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isProcessing ? '⏳' : '↑'}
          </button>
        </div>
        <p style={{ color: '#334155', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', marginTop: '8px' }}>
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
