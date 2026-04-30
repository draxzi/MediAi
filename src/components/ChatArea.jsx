import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import TypingIndicator from './TypingIndicator.jsx';

export default function ChatArea({
  messages, isProcessing, onChipFill, onFollowUpComplete,
  onSaveInsight, lastSession, onResumeSession,
}) {
  const bottomRef = useRef(null);
  const [welcomeLeaving, setWelcomeLeaving] = useState(false);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages && !welcomeLeaving) setWelcomeLeaving(true);
  }, [hasMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        /* CSS variables defined in index.css, overridden per breakpoint/orientation */
        paddingTop: 'calc(var(--hh) + 12px)',
        paddingBottom: 'calc(var(--ih) + 10px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F5F2',
        /* smooth momentum scrolling on iOS */
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        className="content-container"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {!hasMessages && (
          <WelcomeScreen
            onChipFill={onChipFill}
            isLeaving={welcomeLeaving}
            lastSession={lastSession}
            onResume={onResumeSession}
          />
        )}

        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            onFollowUpComplete={
              msg.isFollowUp && i === messages.length - 1
                ? onFollowUpComplete
                : undefined
            }
            onSaveInsight={onSaveInsight}
          />
        ))}

        {isProcessing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
