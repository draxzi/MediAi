export default function Header({ onNewIssue, onReportsClick, reportCount, hasMessages }) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E8E3DC',
        height: 'var(--hh)',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
        /* respect notch on left/right in landscape */
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <div
        className="content-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          gap: '8px',
        }}
      >
        {/* ── Logo ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0 }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(107,191,159,0.4)',
              flexShrink: 0,
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: 700,
              color: '#2E2E2E',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Medi<span style={{ color: '#2F7F6D' }}>AI</span>
          </h1>
        </div>

        {/* ── Right actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* New Issue — only when conversation started */}
          {hasMessages && (
            <button
              data-testid="btn-new-issue"
              onClick={onNewIssue}
              title="Start a new symptom check"
              className="hdr-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px 11px',
                borderRadius: '8px',
                border: '1.5px solid #E8E3DC',
                background: '#FFFFFF',
                color: '#5A6B64',
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                minHeight: '36px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6BBF9F';
                e.currentTarget.style.color = '#2F7F6D';
                e.currentTarget.style.background = '#F0FAF6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E3DC';
                e.currentTarget.style.color = '#5A6B64';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              <span className="hdr-btn-label">New</span>
            </button>
          )}

          {/* My Reports */}
          <button
            data-testid="btn-my-reports"
            onClick={onReportsClick}
            title="View saved reports"
            className="hdr-action-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              padding: '6px 11px',
              borderRadius: '8px',
              border: '1.5px solid #E8E3DC',
              background: '#FFFFFF',
              color: '#5A6B64',
              fontSize: '12px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              position: 'relative',
              whiteSpace: 'nowrap',
              minHeight: '36px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6BBF9F';
              e.currentTarget.style.color = '#2F7F6D';
              e.currentTarget.style.background = '#F0FAF6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E8E3DC';
              e.currentTarget.style.color = '#5A6B64';
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hdr-btn-label">Reports</span>
            {reportCount > 0 && (
              <span
                data-testid="badge-report-count"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '17px',
                  height: '17px',
                  padding: '0 4px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {reportCount > 99 ? '99+' : reportCount}
              </span>
            )}
          </button>

          {/* AI Active indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              paddingLeft: '6px',
              borderLeft: '1px solid #E8E3DC',
              marginLeft: '2px',
              flexShrink: 0,
            }}
          >
            <span
              className="animate-blink"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#6BBF9F',
                boxShadow: '0 0 6px rgba(107,191,159,0.7)',
                flexShrink: 0,
              }}
            />
            <span
              className="hdr-ai-label"
              style={{
                color: '#2F7F6D',
                fontSize: 'clamp(11px, 2vw, 13px)',
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              AI Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
