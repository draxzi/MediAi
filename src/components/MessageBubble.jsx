import { useState } from 'react';
import AIResponse from './AIResponse.jsx';
import FollowUpBubble from './FollowUpBubble.jsx';

function SaveInsightButton({ onSave }) {
  const [state, setState] = useState('idle');

  function handleClick() {
    if (state !== 'idle') return;
    onSave();
    setState('saved');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
      <button
        data-testid="btn-save-insight"
        onClick={handleClick}
        disabled={state === 'saved'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '6px 13px',
          borderRadius: '8px',
          border: state === 'saved' ? '1.5px solid #C8DED5' : '1.5px solid #E8E3DC',
          background: state === 'saved' ? '#EEF7F3' : '#FFFFFF',
          color: state === 'saved' ? '#2F7F6D' : '#8FA89E',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          cursor: state === 'saved' ? 'default' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: state === 'saved' ? 0.85 : 1,
        }}
        onMouseEnter={(e) => {
          if (state === 'saved') return;
          e.currentTarget.style.borderColor = '#6BBF9F';
          e.currentTarget.style.color = '#2F7F6D';
          e.currentTarget.style.background = '#F0FAF6';
        }}
        onMouseLeave={(e) => {
          if (state === 'saved') return;
          e.currentTarget.style.borderColor = '#E8E3DC';
          e.currentTarget.style.color = '#8FA89E';
          e.currentTarget.style.background = '#FFFFFF';
        }}
      >
        {state === 'saved' ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Saved
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save Insight
          </>
        )}
      </button>
    </div>
  );
}

export default function MessageBubble({ message, onFollowUpComplete, onSaveInsight }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="animate-msg-in user-bubble-wrap">
        <div
          style={{
            maxWidth: 'min(75%, 520px)',
            padding: '13px 18px',
            borderRadius: '18px 18px 4px 18px',
            background: 'linear-gradient(135deg, #2F7F6D, #3D9E89)',
            color: '#fff',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.65,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            boxShadow: '0 2px 12px rgba(47,127,109,0.22)',
          }}
          data-testid="bubble-user"
        >
          {message.content}
        </div>
      </div>
    );
  }

  if (message.isError) {
    return (
      <div
        className="animate-msg-in"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          alignSelf: 'flex-start',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
            boxShadow: '0 2px 8px rgba(107,191,159,0.30)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '16px 20px',
            borderRadius: '18px 18px 18px 4px',
            background: '#FFFBF0',
            border: '1.5px solid #FFE0A3',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
          data-testid="bubble-error"
        >
          <p
            style={{
              color: '#7A5A10',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  if (message.isFollowUp) {
    return <FollowUpBubble data={message.data} onComplete={onFollowUpComplete} />;
  }

  return (
    <div
      className="animate-msg-in"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '4px',
          boxShadow: '0 2px 8px rgba(107,191,159,0.30)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E8E3DC',
            borderRadius: '18px 18px 18px 4px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
          data-testid="bubble-assistant"
        >
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #F0EBE3',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              background: '#FAFAF8',
            }}
          >
            <span style={{ fontSize: '16px' }}>🩺</span>
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#2F7F6D',
                letterSpacing: '0.01em',
              }}
            >
              Health Insight
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                color: '#B0BDB8',
                fontWeight: 400,
                whiteSpace: 'nowrap',
              }}
            >
              Powered by Groq
            </span>
          </div>

          <div style={{ padding: 'clamp(16px, 3vw, 22px)' }}>
            <AIResponse data={message.data} query={message.userQuery} />
          </div>
        </div>

        {onSaveInsight && message.data && (
          <SaveInsightButton
            onSave={() =>
              onSaveInsight({
                symptom: message.symptom,
                answers: message.answers,
                result: message.data,
              })
            }
          />
        )}
      </div>
    </div>
  );
}
