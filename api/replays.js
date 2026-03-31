import data from './_data/replayRaces.json' with { type: 'json' };

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json(data);
}
