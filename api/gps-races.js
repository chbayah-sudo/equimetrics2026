import allProfiles from './_data/horseProfiles.json' with { type: 'json' };

const TRACK_NAMES = {
  AQU: 'Aqueduct', GP: 'Gulfstream Park', HOU: 'Sam Houston', LRL: 'Laurel Park',
  OP: 'Oaklawn Park', SA: 'Santa Anita', TAM: 'Tampa Bay', TP: 'Turfway Park',
  FG: 'Fair Grounds', CNL: 'Colonial Downs', CT: 'Charles Town', PEN: 'Penn National',
  PRX: 'Parx', MVR: 'Mahoning Valley',
};

// Build GPS races once at module load
function buildGPSRaces() {
  const raceMap = {};
  Object.values(allProfiles).forEach(p => {
    (p.races || []).forEach(r => {
      if (!r.hasGPS || !r.speeds?.length) return;
      const key = `${r.date}-${r.track}-${r.raceNum}`;
      if (!raceMap[key]) {
        raceMap[key] = {
          id: key, date: r.date, track: r.track, raceNum: r.raceNum,
          distance: r.distance, surface: r.surface, type: r.raceType,
          purse: r.purse, horses: [],
        };
      }
      raceMap[key].horses.push({
        name: p.name, position: r.position, fieldSize: r.fieldSize,
        speeds: r.speeds, strideLengths: r.strideLengths,
        closingMPH: r.closingMPH, peakMPH: r.peakMPH,
        totalDist: r.totalDist, groundLoss: r.groundLoss,
        positions: r.positions, earnings: r.earnings,
      });
    });
  });
  return Object.values(raceMap)
    .filter(r => r.horses.length >= 3)
    .sort((a, b) => b.date.localeCompare(a.date) || a.track.localeCompare(b.track) || a.raceNum - b.raceNum);
}

const allGPSRaces = buildGPSRaces();

function summarizeRace(r) {
  const winner = [...r.horses].sort((a, b) => (a.position || 99) - (b.position || 99))[0];
  return {
    id: r.id, date: r.date, track: r.track, raceNum: r.raceNum,
    distance: r.distance, surface: r.surface, type: r.type, purse: r.purse,
    horseCount: r.horses.length, winnerName: winner?.name,
    trackName: TRACK_NAMES[r.track] || r.track,
  };
}

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { q, id, top } = req.query;

  if (id) {
    const race = allGPSRaces.find(r => r.id === id);
    if (!race) return res.status(404).json({ error: 'Race not found' });
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json(race);
  }

  if (q && q.length >= 2) {
    const query = q.toLowerCase();
    const results = allGPSRaces.filter(r => {
      const trackName = (TRACK_NAMES[r.track] || r.track).toLowerCase();
      const label = `${trackName} r${r.raceNum} ${r.date}`;
      const horseNames = r.horses.map(h => h.name.toLowerCase()).join(' ');
      return label.includes(query) || horseNames.includes(query);
    }).slice(0, 12).map(summarizeRace);
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(results);
  }

  const n = Math.min(parseInt(top) || 12, 30);
  const results = allGPSRaces.slice(0, n).map(summarizeRace);
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json({ total: allGPSRaces.length, races: results });
}
