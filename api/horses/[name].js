import allProfiles from '../_data/horseProfiles.json' with { type: 'json' };

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { name } = req.query;
  const decoded = decodeURIComponent(name);
  const profile = allProfiles[decoded];

  if (!profile) {
    return res.status(404).json({ error: 'Horse not found' });
  }

  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json(profile);
}
