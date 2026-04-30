import { useRef, useEffect, useState } from 'react';

export default function InputArea({ value, onChange, onSend, isProcessing, focusRef }) {
  const textareaRef = useRef(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focusRef) focusRef.current = textareaRef.current;
  }, [focusRef]);

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
      if (!isProcessing && value.trim()) onSend();
    }
  }

  const canSend = !isProcessing && Boolean(value.trim());
  const borderColor = focused ? '#6BBF9F' : '#DDD8D0';
  const ringStyle = focused
    ? '0 0 0 3px rgba(107,191,159,0.18), 0 2px 14px rgba(0,0,0,0.06)'
    : '0 2px 10px rgba(0,0,0,0.05)';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(247,245,242,0.97)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid #E8E2DB',
        /* bump up from the home indicator (iPhone X+) */
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        /* respect side notches in landscape */
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <div className="content-container input-bar-pad" style={{ padding: '0' }}>
        <div className="input-bar-inner">
          <div
            style={{
              background: '#FFFFFF',
              border: `1.5px solid ${borderColor}`,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '10px',
              boxShadow: ringStyle,
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              padding: '10px 10px 10px 16px',
            }}
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="e.g., fever, headache, sore throat"
              disabled={isProcessing}
              rows={1}
              data-testid="textarea-symptoms"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                color: '#2E2E2E',
                fontSize: '15px',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
                maxHeight: '120px',
                overflowY: 'auto',
                padding: 0,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                minWidth: 0,
              }}
            />

            <button
              onClick={onSend}
              disabled={!canSend}
              data-testid="button-analyze"
              className="send-btn"
              style={{
                height: '42px',
                borderRadius: '10px',
                background: '#2F7F6D',
                opacity: canSend ? 1 : 0.38,
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: canSend ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                flexShrink: 0,
                transition: 'opacity 0.2s ease, background 0.2s ease, transform 0.12s ease, box-shadow 0.2s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
                boxShadow: canSend ? '0 2px 10px rgba(47,127,109,0.28)' : 'none',
                padding: '0 16px',
              }}
              onMouseEnter={(e) => {
                if (canSend) {
                  e.currentTarget.style.background = '#236157';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(47,127,109,0.40)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2F7F6D';
                e.currentTarget.style.boxShadow = canSend ? '0 2px 10px rgba(47,127,109,0.28)' : 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => { if (canSend) e.currentTarget.style.transform = 'scale(0.95)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isProcessing ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.85)',
                          animation: 'dotPulse 1.4s ease-in-out infinite',
                          animationDelay: `${i * 0.2}s`,
                          display: 'inline-block',
                        }}
                      />
                    ))}
                  </span>
                  <span className="send-btn-label">Analyzing…</span>
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span className="send-btn-label">Analyze</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          </div>

          <div className="input-footer">
            <p className="input-footer-hint">
              Press Enter to analyze · Shift+Enter for new line
            </p>
            <p className="input-footer-disclaimer">
              ⚠️ MediAI does not replace professional medical advice. Consult a doctor for serious conditions.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.35; transform: scale(0.8); }
          40%            { opacity: 1;    transform: scale(1);   }
        }

        /* Portrait (any size) */
        .input-bar-inner {
          padding: 12px 0 14px;
        }

        /* Landscape compact */
        @media (max-height: 500px) and (orientation: landscape) {
          .input-bar-inner {
            padding: 7px 0 7px;
          }
        }

        /* Mobile: shorten button text to just icon */
        @media (max-width: 480px) {
          .send-btn-label { display: none; }
          .send-btn { padding: 0 14px !important; }
        }

        /* Tablet and above: show full label */
        @media (min-width: 481px) {
          .send-btn-label { display: inline; }
        }
      `}</style>
    </div>
  );
}
