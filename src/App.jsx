import { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import ChatArea from './components/ChatArea.jsx';
import InputArea from './components/InputArea.jsx';
import ReportsDrawer from './components/ReportsDrawer.jsx';
import { queryGroq } from './utils/groq.js';
import {
  getReports, saveReport, deleteReport,
  getLastSession, saveLastSession,
} from './utils/storage.js';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [reports, setReports] = useState(() => getReports());
  const [lastSession, setLastSession] = useState(() => getLastSession());

  const inputFocusRef = useRef(null);
  const conversationHistoryRef = useRef([]);
  const isProcessingRef = useRef(false);
  const symptomRef = useRef('');
  const answersRef = useRef('');

  useEffect(() => {
    conversationHistoryRef.current = conversationHistory;
  }, [conversationHistory]);

  useEffect(() => {
    isProcessingRef.current = isProcessing;
  }, [isProcessing]);

  function handleNewIssue() {
    setMessages([]);
    setConversationHistory([]);
    conversationHistoryRef.current = [];
    setInput('');
    symptomRef.current = '';
    answersRef.current = '';
  }

  function handleSaveInsight({ symptom, answers, result }) {
    saveReport({ symptom: symptom || 'Unknown symptom', answers: answers || '', result, date: new Date().toISOString() });
    saveLastSession({ symptom: symptom || '', answers: answers || '' });
    setReports(getReports());
    setLastSession(getLastSession());
  }

  function handleDeleteReport(id) {
    deleteReport(id);
    setReports(getReports());
  }

  function handleResumeSession(sym) {
    setInput(sym);
    setTimeout(() => inputFocusRef.current?.focus(), 0);
  }

  async function sendMessage(text) {
    const userText = text.trim();
    if (!userText || isProcessingRef.current) return;

    symptomRef.current = userText;
    answersRef.current = '';

    setInput('');
    setIsProcessing(true);
    isProcessingRef.current = true;

    setMessages((prev) => [...prev, { role: 'user', content: userText }]);

    const newHistory = [
      ...conversationHistoryRef.current,
      { role: 'user', content: userText },
    ];

    try {
      const data = await queryGroq(newHistory);

      if (data.type === 'followup') {
        const questionLines = (data.questions || [])
          .map((q, i) => {
            const qText = typeof q === 'object' ? q.text : q;
            return `${i + 1}. ${qText}`;
          })
          .join('\n');
        const assistantHistoryContent = `${data.message}\n${questionLines}`;

        const updated = [...newHistory, { role: 'assistant', content: assistantHistoryContent }];
        setConversationHistory(updated);
        conversationHistoryRef.current = updated;

        setMessages((prev) => [...prev, { role: 'assistant', content: '', data, isFollowUp: true }]);
      } else {
        const summaryParts = [
          data.summary && `Summary: ${data.summary}`,
          data.steps?.length && `Steps: ${data.steps.join('; ')}`,
          data.warning && `Warning: ${data.warning}`,
        ].filter(Boolean);

        const updated = [...newHistory, { role: 'assistant', content: summaryParts.join(' | ') }];
        setConversationHistory(updated);
        conversationHistoryRef.current = updated;

        saveLastSession({ symptom: userText, answers: '' });
        setLastSession(getLastSession());

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '', data, userQuery: userText, symptom: symptomRef.current, answers: answersRef.current },
        ]);
      }
    } catch (err) {
      console.error('[MediAI] sendMessage error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Currently unable to fetch AI response. Based on your symptoms, please rest and consult a doctor if it persists.', isError: true },
      ]);
    } finally {
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }

  const handleFollowUpComplete = useCallback(async (answersText) => {
    if (isProcessingRef.current) return;
    setIsProcessing(true);
    isProcessingRef.current = true;

    answersRef.current = answersText;

    const combinedUserMessage =
      `Here are my answers to your questions:\n${answersText}\n\n` +
      `Please now provide the complete health assessment in the final JSON format.`;

    const newHistory = [
      ...conversationHistoryRef.current,
      { role: 'user', content: combinedUserMessage },
    ];

    try {
      const data = await queryGroq(newHistory);
      let finalData = data;

      if (!data || data.type === 'followup' || !data.summary) {
        finalData = {
          type: 'final',
          summary: data?.message || 'Based on the symptoms and answers you provided, here is a general health overview.',
          medicines: data?.medicines || [],
          remedies: data?.remedies || [],
          steps: data?.steps?.length
            ? data.steps
            : ['Rest and stay hydrated.', 'Monitor your symptoms over the next 24 hours.', 'Consult a healthcare provider if symptoms worsen or persist.'],
          warning: data?.warning || 'This is general information only. Always consult a qualified healthcare provider for medical advice tailored to your situation.',
          imageQuery: data?.imageQuery || 'medical health',
        };
      }

      const summaryParts = [
        finalData.summary && `Summary: ${finalData.summary}`,
        finalData.steps?.length && `Steps: ${finalData.steps.join('; ')}`,
        finalData.warning && `Warning: ${finalData.warning}`,
      ].filter(Boolean);

      const updated = [...newHistory, { role: 'assistant', content: summaryParts.join(' | ') }];
      setConversationHistory(updated);
      conversationHistoryRef.current = updated;

      saveLastSession({ symptom: symptomRef.current, answers: answersText });
      setLastSession(getLastSession());

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', data: finalData, userQuery: '', symptom: symptomRef.current, answers: answersRef.current },
      ]);
    } catch (err) {
      console.error('[MediAI] handleFollowUpComplete error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Unable to generate response. Please try again.', isError: true },
      ]);
    } finally {
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }, []);

  function handleSend() { sendMessage(input); }

  function handleChipFill(label) {
    setInput(label);
    setTimeout(() => inputFocusRef.current?.focus(), 0);
  }

  return (
    <div className="app-layout">
      <Header
        onNewIssue={handleNewIssue}
        onReportsClick={() => setShowReports(true)}
        reportCount={reports.length}
        hasMessages={messages.length > 0}
      />
      <ChatArea
        messages={messages}
        isProcessing={isProcessing}
        onChipFill={handleChipFill}
        onFollowUpComplete={handleFollowUpComplete}
        onSaveInsight={handleSaveInsight}
        lastSession={lastSession}
        onResumeSession={handleResumeSession}
      />
      <InputArea
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isProcessing={isProcessing}
        focusRef={inputFocusRef}
      />
      <ReportsDrawer
        open={showReports}
        onClose={() => setShowReports(false)}
        reports={reports}
        onDelete={handleDeleteReport}
      />
    </div>
  );
}
