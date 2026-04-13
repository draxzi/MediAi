import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ApiSetup from './components/ApiSetup.jsx';
import ChatArea from './components/ChatArea.jsx';
import InputArea from './components/InputArea.jsx';
import { queryGemini } from './utils/gemini.js';

const STORAGE_KEY = 'mediai_api_key';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  function handleSaveKey(key) {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }

  async function sendMessage(text) {
    const userText = text.trim();
    if (!userText || isProcessing) return;

    setInput('');
    setIsProcessing(true);

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userText },
    ]);

    try {
      const data = await queryGemini(apiKey, userText);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', data, userQuery: userText },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: err.message || 'Something went wrong. Please try again.', isError: true },
      ]);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleSend() {
    sendMessage(input);
  }

  function handleChipClick(label) {
    sendMessage(label);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0f1a',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="animate-mesh-drift"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '55%',
            height: '55%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '40%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Header />

        <ChatArea
          messages={messages}
          isProcessing={isProcessing}
          onChipClick={handleChipClick}
        />

        <InputArea
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isProcessing={isProcessing}
        />
      </div>

      {!apiKey && <ApiSetup onSave={handleSaveKey} />}
    </div>
  );
}
