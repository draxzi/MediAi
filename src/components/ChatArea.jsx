import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import TypingIndicator from './TypingIndicator.jsx';

export default function ChatArea({ messages, isProcessing, onChipClick }) {
  const bottomRef = useRef(null);
  const [welcomeLeaving, setWelcomeLeaving] = useState(false);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages && !welcomeLeaving) {
      setWelcomeLeaving(true);
    }
  }, [hasMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  function handleChipClick(label) {
    setWelcomeLeaving(true);
    setTimeout(() => onChipClick(label), 200);
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: '80px',
        paddingBottom: '130px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {!hasMessages && (
          <WelcomeScreen
            onChipClick={handleChipClick}
            isLeaving={welcomeLeaving}
          />
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isProcessing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
