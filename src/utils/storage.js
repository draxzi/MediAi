const REPORTS_KEY = 'mediAI_reports';
const SESSION_KEY = 'mediAI_lastSession';

export function getReports() {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReport(report) {
  const reports = getReports();
  const newReport = { ...report, id: Date.now() };
  reports.unshift(newReport);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return newReport;
}

export function deleteReport(id) {
  const updated = getReports().filter((r) => r.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  return updated;
}

export function getLastSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLastSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
