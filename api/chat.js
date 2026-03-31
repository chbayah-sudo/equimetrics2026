import { buildSystemPrompt, findRelevantHorses, findRelevantRaces } from './_data/buildContext.js';

const rateLimit = {};
const RATE_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 15;

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.endsWith('.vercel.app')) return true;
  return false;
}

function isRateLimited(ip) {
  const now = Date.now();
  if (!rateLimit[ip] || now - rateLimit[ip].start > RATE_WINDOW_MS) {
    rateLimit[ip] = { start: now, count: 1 };
    return false;
  }
  rateLimit[ip].count++;
  return rateLimit[ip].count > MAX_REQUESTS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Origin check
  const origin = req.headers.origin || req.headers.referer || '';
  if (process.env.NODE_ENV === 'production' && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (messages.length > 20) {
    return res.status(400).json({ error: 'Too many messages' });
  }
  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    if (msg.content.length > 5000) {
      return res.status(400).json({ error: 'Message too long' });
    }
  }

  try {
    const latestUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    const horseCtx = findRelevantHorses(latestUserMsg);
    const raceCtx = findRelevantRaces(latestUserMsg);
    let ragContext = '';
    if (horseCtx.length > 0) ragContext += '\n\nRELEVANT HORSE DATA:\n' + horseCtx.join('\n\n');
    if (raceCtx.length > 0) ragContext += '\n\nRELEVANT RACE DATA:\n' + raceCtx.join('\n');

    const systemPrompt = buildSystemPrompt() + ragContext;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages.slice(-10)],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream request failed' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
