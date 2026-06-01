export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { language, tier, count } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  if (!language || !tier || typeof count !== 'number') {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  try {
    const response = await fetch('https://api.gemini.example/v1/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ language, tier, count }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status || 502).json({ error: 'Gemini API error', details: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Gemini request failed', details: String(error) });
  }
}
