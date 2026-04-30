import { useState, useEffect, useRef } from 'react';
import AIResponse from './AIResponse.jsx';

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    }) + ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
}

function truncate(str, n) {
  if (!str) return '';
  return str.length <= n ? str : str.slice(0, n).trimEnd() + '…';
}

function DotsMenu({ onView, onDelete }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function outside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setConfirmDelete(false);
      }
    }
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        data-testid="btn-report-menu"
        onClick={(e) => { e.stopPropagation(); setOpen((p) => !p); setConfirmDelete(false); }}
        style={{
          width: '30px', height: '30px', border: 'none', background: 'transparent',
          cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#8FA89E', fontSize: '16px', flexShrink: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#F0EBE3'; e.currentTarget.style.color = '#2F7F6D'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8FA89E'; }}
      >
        ⋮
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: '34px', right: 0, zIndex: 200,
            background: '#fff', border: '1.5px solid #E8E3DC',
            borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            minWidth: '140px', overflow: 'hidden',
          }}
        >
          {!confirmDelete ? (
            <>
              <button
                data-testid="btn-report-view"
                onClick={(e) => { e.stopPropagation(); setOpen(false); onView(); }}
                style={menuItemStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F0FAF6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span>👁</span> View
              </button>
              <div style={{ height: '1px', background: '#F0EBE3', margin: '0 8px' }} />
              <button
                data-testid="btn-report-delete"
                onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
                style={{ ...menuItemStyle, color: '#B91C1C' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span>🗑</span> Delete
              </button>
            </>
          ) : (
            <div style={{ padding: '12px 14px' }}>
              <p style={{ fontSize: '12px', color: '#3E4E4A', marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
                Remove this report?
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setOpen(false); setConfirmDelete(false); onDelete(); }}
                  style={{
                    flex: 1, padding: '5px', borderRadius: '6px', border: 'none',
                    background: '#B91C1C', color: '#fff', fontSize: '11px', cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif", fontWeight: 600,
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }}
                  style={{
                    flex: 1, padding: '5px', borderRadius: '6px',
                    border: '1.5px solid #E8E3DC', background: '#fff', color: '#5A6B64',
                    fontSize: '11px', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  width: '100%', padding: '9px 14px', border: 'none', background: 'transparent',
  cursor: 'pointer', textAlign: 'left', fontSize: '13px', fontFamily: "'Inter', sans-serif",
  color: '#3E4E4A', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.12s',
};

function ReportCard({ report, onView, onDelete }) {
  return (
    <div
      data-testid={`card-report-${report.id}`}
      onClick={onView}
      style={{
        background: '#fff', border: '1.5px solid #E8E3DC', borderRadius: '14px',
        padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6BBF9F';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(107,191,159,0.12)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E8E3DC';
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div
          style={{
            width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0, marginTop: '1px',
            background: 'linear-gradient(135deg, #EEF7F3, #C8DED5)',
            border: '1.5px solid #C8DED5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px',
          }}
        >
          🩺
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            data-testid={`text-symptom-${report.id}`}
            style={{
              fontSize: '13px', fontWeight: 600, color: '#2E2E2E',
              fontFamily: "'Inter', sans-serif", margin: '0 0 4px 0',
              wordBreak: 'break-word',
            }}
          >
            {truncate(report.symptom, 72)}
          </p>
          <p
            style={{
              fontSize: '11px', color: '#A8B5AE', fontFamily: "'Inter', sans-serif",
              margin: '0 0 7px 0',
            }}
            data-testid={`text-date-${report.id}`}
          >
            {formatDate(report.date)}
          </p>
          <p
            style={{
              fontSize: '12px', color: '#6B7F79', fontFamily: "'Inter', sans-serif",
              margin: 0, lineHeight: 1.5, wordBreak: 'break-word',
            }}
          >
            {truncate(report.result?.summary, 90)}
          </p>
        </div>
        <DotsMenu onView={onView} onDelete={onDelete} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', flex: 1, padding: '48px 24px', textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #EEF7F3, #C8DED5)',
          border: '1.5px solid #C8DED5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', marginBottom: '16px',
        }}
      >
        🗂
      </div>
      <p style={{ fontSize: '14px', fontWeight: 600, color: '#3E4E4A', fontFamily: "'Poppins', sans-serif", marginBottom: '6px' }}>
        No saved reports
      </p>
      <p style={{ fontSize: '12px', color: '#A8B5AE', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
        After getting a health analysis, tap "Save Insight" to keep a record here.
      </p>
    </div>
  );
}

export default function ReportsDrawer({ open, onClose, reports, onDelete }) {
  const [detailReport, setDetailReport] = useState(null);

  useEffect(() => {
    if (!open) setDetailReport(null);
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        data-testid="overlay-reports"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(30,45,38,0.38)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      <div
        data-testid="panel-reports"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 100,
          width: 'min(440px, 100vw)',
          background: '#F7F5F2',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32,0,0.15,1)',
          /* respect home indicator + notch */
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        <div
          style={{
            height: 'var(--hh)', flexShrink: 0, borderBottom: '1px solid #E8E3DC',
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', padding: '0 18px', gap: '10px',
          }}
        >
          {detailReport ? (
            <button
              data-testid="btn-reports-back"
              onClick={() => setDetailReport(null)}
              style={{
                width: '32px', height: '32px', border: 'none', background: 'transparent',
                cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', color: '#2F7F6D', flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF7F3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              ←
            </button>
          ) : (
            <div
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #6BBF9F, #2F7F6D)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 6px rgba(107,191,159,0.35)',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '15px',
                fontWeight: 700, color: '#1A2E26', margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {detailReport ? truncate(detailReport.symptom, 40) : 'My Reports'}
            </h2>
            {!detailReport && reports.length > 0 && (
              <p style={{ fontSize: '11px', color: '#A8B5AE', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                {reports.length} saved {reports.length === 1 ? 'report' : 'reports'}
              </p>
            )}
            {detailReport && (
              <p style={{ fontSize: '11px', color: '#A8B5AE', fontFamily: "'Inter', sans-serif", margin: 0 }}>
                {formatDate(detailReport.date)}
              </p>
            )}
          </div>

          <button
            data-testid="btn-reports-close"
            onClick={onClose}
            style={{
              width: '32px', height: '32px', border: 'none', background: 'transparent',
              cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#8FA89E', fontSize: '18px', flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F0EBE3'; e.currentTarget.style.color = '#2E2E2E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8FA89E'; }}
          >
            ✕
          </button>
        </div>

        {!detailReport ? (
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            {reports.length === 0 ? (
              <EmptyState />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {reports.map((r) => (
                  <ReportCard
                    key={r.id}
                    report={r}
                    onView={() => setDetailReport(r)}
                    onDelete={() => onDelete(r.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px 0' }}>
            <div
              style={{
                margin: '16px', padding: '14px 16px', borderRadius: '12px',
                background: '#EEF7F3', border: '1.5px solid #C8DED5',
              }}
            >
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#2F7F6D', fontFamily: "'Inter', sans-serif", margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Symptom Reported
              </p>
              <p style={{ fontSize: '14px', color: '#1A2E26', fontFamily: "'Inter', sans-serif", margin: 0, lineHeight: 1.55 }}>
                {detailReport.symptom}
              </p>
            </div>

            {detailReport.answers && (
              <div style={{ margin: '0 16px 16px', padding: '14px 16px', borderRadius: '12px', background: '#EEF4FB', border: '1.5px solid #BDD3EE' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: '#2563A8', fontFamily: "'Inter', sans-serif", margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Your Answers
                </p>
                <p style={{ fontSize: '13px', color: '#1E3A5F', fontFamily: "'Inter', sans-serif", margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {detailReport.answers}
                </p>
              </div>
            )}

            <div
              style={{
                background: '#FFFFFF', border: '1.5px solid #E8E3DC',
                borderRadius: '18px', margin: '0 16px', overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  padding: '14px 20px', borderBottom: '1px solid #F0EBE3',
                  display: 'flex', alignItems: 'center', gap: '9px', background: '#FAFAF8',
                }}
              >
                <span style={{ fontSize: '16px' }}>🩺</span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600, color: '#2F7F6D' }}>
                  Health Insight
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontFamily: "'Inter', sans-serif", color: '#B0BDB8' }}>
                  Saved Report
                </span>
              </div>
              <div style={{ padding: 'clamp(16px, 3vw, 22px)' }}>
                <AIResponse data={detailReport.result} query={detailReport.symptom} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
