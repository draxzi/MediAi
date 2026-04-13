import AIResponse from './AIResponse.jsx';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div
        className="animate-msg-in"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 0 0 48px',
        }}
      >
        <div
          style={{
            maxWidth: 'min(72%, 600px)',
            padding: '12px 18px',
            borderRadius: '18px 18px 4px 18px',
            background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(124,58,237,0.15))',
            border: '1px solid rgba(56,189,248,0.2)',
            color: '#e2e8f0',
            fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
            wordBreak: 'break-word',
          }}
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
          alignItems: 'flex-end',
          gap: '12px',
          padding: '0 48px 0 0',
          alignSelf: 'flex-start',
          maxWidth: 'min(88%, 700px)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
          }}
        >
          ⚠
        </div>
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '18px 18px 18px 4px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          <p style={{ color: '#fca5a5', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.6 }}>
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="animate-msg-in"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '0 48px 0 0',
        maxWidth: 'min(88%, 800px)',
        alignSelf: 'flex-start',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(56,189,248,0.15)',
          border: '1px solid rgba(56,189,248,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        🩺
      </div>
      <div
        style={{
          flex: 1,
          padding: '18px 20px',
          borderRadius: '18px 18px 18px 4px',
          background: 'rgba(18, 24, 40, 0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          minWidth: 0,
        }}
      >
        <AIResponse data={message.data} query={message.userQuery} />
      </div>
    </div>
  );
}
