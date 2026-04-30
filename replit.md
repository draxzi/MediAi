# MediAI — Smart Health Assistant

## Overview
MediAI is a frontend-only React + Vite application that uses the Groq API (Llama 3.3 70B) to provide structured medical information based on user-described symptoms. The API key is hardcoded in `src/utils/groq.js` — no backend, no setup screen required.

## Architecture
- **Framework**: React 18 + Vite (frontend only, no backend)
- **Styling**: Inline styles throughout + CSS classes in `index.css` for responsive behavior
- **AI**: Groq API (Llama 3.3 70B) via direct `fetch` calls from the browser
- **Fonts**: Inter (body), Poppins (headings) — loaded from Google Fonts

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F7F5F2` | App background (warm cream) |
| Card | `#FFFFFF` | Cards, bubbles |
| Primary | `#6BBF9F` | Soft green — icons, borders, chips |
| Accent | `#2F7F6D` | Deep green — buttons, headings |
| Text | `#2E2E2E` | Main body text |
| Subtle | `#7A8B84` | Secondary text |
| Border | `#E8E3DC` | Card borders |

## Key Files
- `src/App.jsx` — Root state: messages, input, send logic, reports state, new issue reset
- `src/utils/groq.js` — Groq API call + JSON response parser + system prompt (key hardcoded here)
- `src/utils/imageMap.js` — Maps symptom keywords → Unsplash photo IDs
- `src/utils/storage.js` — localStorage helpers: reports (CRUD) + lastSession save/load
- `src/components/Header.jsx` — Fixed top bar: logo, New Issue button (visible after first message), My Reports button with count badge, AI Active indicator
- `src/components/WelcomeScreen.jsx` — Hero + chip suggestions + "Continue last check" card if lastSession exists
- `src/components/ChatArea.jsx` — Scrollable message list; passes onSaveInsight/lastSession/onResumeSession down
- `src/components/InputArea.jsx` — Fixed bottom textarea + Analyze Symptoms button + disclaimer
- `src/components/MessageBubble.jsx` — User bubble + AI card; final AI responses get a "Save Insight" button below
- `src/components/AIResponse.jsx` — Structured AI output: Possible Causes / What You Can Do / Medicines / Remedies / When to See a Doctor
- `src/components/ReportsDrawer.jsx` — Sliding right panel for My Reports; list view with 3-dot menu (View/Delete) + detail view reusing AIResponse
- `src/components/MedicineCard.jsx` — Individual medicine card (OTC vs Prescription badge)
- `src/components/RemedyCard.jsx` — Home remedy card with emoji
- `src/components/StepsList.jsx` — Numbered steps list
- `src/components/ImageGrid.jsx` — 2×2 Unsplash image grid with shimmer skeleton; calls onAllFailed when all images error
- `src/components/TypingIndicator.jsx` — Animated dots while AI is processing

## localStorage Keys
- `mediAI_reports` — Array of saved reports `{ id, symptom, answers, result, date }`
- `mediAI_lastSession` — `{ symptom, answers }` of the most recent completed analysis

## Running the App
The **Start application** workflow runs `node start-vite.mjs` which launches the Vite dev server on port 5000 with `CI=true` to prevent stdin-exit issues in Replit's non-TTY shell.

## Workflow Notes
- `outputType: "webview"` + `waitForPort: 5000` is used for the preview pane
- `start-vite.mjs` sets `CI=true` and handles SIGTERM/SIGHUP gracefully
- If the workflow fails with "port already in use", kill with `fuser -k 5000/tcp`

## AI Response Structure (JSON from Groq)
```json
{
  "summary": "Assessment text (Possible Causes section)",
  "medicines": [{ "name", "type", "dosage", "use", "note" }],
  "remedies": [{ "emoji", "name", "use" }],
  "steps": ["Step 1...", "Step 2..."],
  "warning": "When to see a doctor text",
  "imageQuery": "keyword for image lookup"
}
```
