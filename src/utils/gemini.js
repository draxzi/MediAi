const SYSTEM_PROMPT = `You are MediAI, a knowledgeable medical information assistant. When a user describes their symptoms or asks about medicines, you MUST respond with ONLY valid JSON (no markdown, no code fences, no extra text) in this exact structure:

{
  "summary": "1-2 sentence assessment of the condition",
  "medicines": [
    { "name": "Medicine Name", "type": "OTC or Prescription", "dosage": "e.g. 500mg twice daily", "use": "What it treats", "note": "Important note or side effect" }
  ],
  "remedies": [
    { "emoji": "🍯", "name": "Remedy Name", "use": "How and when to use it" }
  ],
  "steps": ["Step 1: Description", "Step 2: Description", "Step 3: Description"],
  "warning": "When to see a doctor and important disclaimer",
  "imageQuery": "simple keyword for medical image search"
}

Rules:
- Provide 2-4 medicines
- Provide 3-4 home remedies with relevant emojis
- Provide 4-6 numbered steps
- Always include a clear warning about consulting a doctor
- imageQuery should be a simple medical keyword like "fever medicine" or "sore throat remedy"
- NEVER include markdown formatting or code blocks in your response
- Return ONLY the JSON object`;

export async function queryGemini(apiKey, userMessage) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\nUser query: ${userMessage}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const msg = errData?.error?.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}
