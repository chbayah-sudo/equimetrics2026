import allProfiles from './_data/horseProfiles.json' with { type: 'json' };

const profileList = Object.values(allProfiles).sort((a, b) => (b.gpsScore || 0) - (a.gpsScore || 0));

function summarize(p) {
  return {
    name: p.name, style: p.style, numRaces: p.numRaces, numGPSRaces: p.numGPSRaces,
    hasGPS: p.hasGPS, gpsScore: p.gpsScore, totalEarnings: p.totalEarnings,
    record: p.record, avgFinish: p.avgFinish, wins: p.wins, places: p.places,
  };
}

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { q, top } = req.query;

  if (q && q.length >= 2) {
    const query = q.toLowerCase();
    const results = profileList.filter(p => p.name.toLowerCase().includes(query)).slice(0, 15).map(summarize);
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(results);
  }

  if (top) {
    const n = Math.min(parseInt(top) || 16, 50);
    const results = profileList.filter(p => p.numRaces >= 2).slice(0, n).map(summarize);
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json(results);
  }

  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json({ total: profileList.length, gpsCount: profileList.filter(p => p.hasGPS).length });
}
