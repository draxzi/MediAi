import { useState, useRef, useEffect } from 'react';

function QuestionCard({ index, question, isActive, isAnswered, isLocked, answer, onSelect }) {
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showCustom && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCustom]);

  useEffect(() => {
    if (!isActive) {
      setShowCustom(false);
      setCustomValue('');
    }
  }, [isActive]);

  const qText = typeof question === 'object' ? question.text : question;
  const options = typeof question === 'object' && Array.isArray(question.options) ? question.options : [];

  function handleOptionClick(option) {
    setShowCustom(false);
    onSelect(option);
  }

  function handleCustomToggle() {
    setShowCustom(true);
  }

  function handleCustomSubmit() {
    const val = customValue.trim();
    if (!val) return;
    onSelect(val);
  }

  function handleCustomKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomSubmit();
    }
  }

  const cardBg = isAnswered ? '#F4FBF8' : isActive ? '#FFFFFF' : '#FAFAF8';
  const cardBorder = isAnswered ? '#C8DED5' : isActive ? '#6BBF9F' : '#E8E3DC';
  const numberBg = isAnswered
    ? 'linear-gradient(135deg, #6BBF9F, #2F7F6D)'
    : isActive
    ? 'linear-gradient(135deg, #6BBF9F, #2F7F6D)'
    : '#E8E3DC';
  const numberColor = isLocked ? '#B0BDB8' : '#fff';

  return (
    <div
      style={{
        borderRadius: '14px',
        background: cardBg,
        border: `1.5px solid ${cardBorder}`,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        opacity: isLocked ? 0.5 : 1,
      }}
      data-testid={`followup-question-${index}`}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '13px 16px',
        }}
      >
        <span
          style={{
            width: '22px',
            height: '22px',
            minWidth: '22px',
            borderRadius: '50%',
            background: isLocked ? '#E8E3DC' : numberBg,
            color: numberColor,
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '1px',
          }}
        >
          {isAnswered ? (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            index + 1
          )}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              color: isLocked ? '#9AADA8' : '#2E4A44',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
              margin: 0,
              fontWeight: isActive ? 500 : 400,
              wordBreak: 'break-word',
            }}
          >
            {qText}
          </p>

          {isAnswered && (
            <span
              style={{
                display: 'inline-block',
                marginTop: '6px',
                padding: '3px 10px',
                borderRadius: '20px',
                background: '#2F7F6D',
                color: '#fff',
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
              data-testid={`followup-answer-${index}`}
            >
              {answer}
            </span>
          )}
        </div>
      </div>

      {isActive && (
        <div
          style={{
            padding: '0 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => handleOptionClick(opt)}
                data-testid={`followup-option-${index}-${oi}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: '1.5px solid #C8DED5',
                  background: '#F4FBF8',
                  color: '#2E4A44',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  lineHeight: 1.3,
                  textAlign: 'left',
                  wordBreak: 'break-word',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2F7F6D';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#2F7F6D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F4FBF8';
                  e.currentTarget.style.color = '#2E4A44';
                  e.currentTarget.style.borderColor = '#C8DED5';
                }}
              >
                {opt}
              </button>
            ))}

            {!showCustom && (
              <button
                onClick={handleCustomToggle}
                data-testid={`followup-custom-toggle-${index}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: '1.5px dashed #C8DED5',
                  background: 'transparent',
                  color: '#6B9E94',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2F7F6D';
                  e.currentTarget.style.color = '#2F7F6D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#C8DED5';
                  e.currentTarget.style.color = '#6B9E94';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                Type your own
              </button>
            )}
          </div>

          {showCustom && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginTop: '4px',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={handleCustomKeyDown}
                placeholder="Describe in your own words…"
                data-testid={`followup-custom-input-${index}`}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #C8DED5',
                  background: '#FFFFFF',
                  color: '#2E2E2E',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  minWidth: 0,
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#6BBF9F'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#C8DED5'; }}
              />
              <button
                onClick={handleCustomSubmit}
                disabled={!customValue.trim()}
                data-testid={`followup-custom-submit-${index}`}
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: customValue.trim() ? '#2F7F6D' : '#E8E3DC',
                  border: 'none',
                  color: customValue.trim() ? '#fff' : '#B0BDB8',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  cursor: customValue.trim() ? 'pointer' : 'not-allowed',
                  flexShrink: 0,
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FollowUpBubble({ data, onComplete }) {
  const questions = Array.isArray(data.questions) ? data.questions : [];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const hasCalledRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  function handleSelect(option) {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    const nextStep = currentStep + 1;

    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      setIsCompleted(true);

      if (hasCalledRef.current) return;
      hasCalledRef.current = true;

      const combinedText = questions
        .map((q, i) => {
          const qText = typeof q === 'object' ? q.text : q;
          return `${qText}: ${newAnswers[i]}`;
        })
        .join('\n');

      console.log('[MediAI] All follow-up answers collected:', combinedText);

      const cb = onCompleteRef.current;
      if (cb) {
        cb(combinedText);
      } else {
        console.warn('[MediAI] onComplete callback is not available');
      }
    }
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
          minWidth: '34px',
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

      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#FFFFFF',
          border: '1.5px solid #E8E3DC',
          borderRadius: '18px 18px 18px 4px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
        data-testid="bubble-followup"
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
            A Few Quick Questions
          </span>

          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {!isCompleted && (
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === currentStep ? '18px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i < currentStep
                        ? '#2F7F6D'
                        : i === currentStep
                        ? '#6BBF9F'
                        : '#DDD8D0',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
            <span
              style={{
                fontSize: '11px',
                fontFamily: "'Inter', sans-serif",
                color: '#B0BDB8',
                fontWeight: 400,
                whiteSpace: 'nowrap',
              }}
            >
              {isCompleted ? 'Analyzing…' : `${currentStep + 1} of ${questions.length}`}
            </span>
          </div>
        </div>

        <div style={{ padding: 'clamp(14px, 3vw, 20px)' }}>
          <p
            style={{
              color: '#3E4E4A',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.75,
              margin: '0 0 14px 0',
              wordBreak: 'break-word',
            }}
          >
            {data.message}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {questions.map((q, i) => (
              <QuestionCard
                key={i}
                index={i}
                question={q}
                isActive={i === currentStep && !isCompleted}
                isAnswered={i < currentStep || isCompleted}
                isLocked={i > currentStep && !isCompleted}
                answer={answers[i]}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {isCompleted ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '14px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#F4FBF8',
                border: '1.5px solid #C8DED5',
              }}
              data-testid="followup-completed"
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#2F7F6D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p
                style={{
                  color: '#2F7F6D',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                All answered — generating your personalized health insight…
              </p>
            </div>
          ) : (
            <p
              style={{
                color: '#9AADA8',
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
                margin: '14px 0 0 0',
                fontStyle: 'italic',
              }}
            >
              Click an option to answer. You can also skip by typing more details in the chat.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
