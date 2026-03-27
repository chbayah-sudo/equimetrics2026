import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Trophy } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import allProfiles from '../data/horseProfiles.json';
import { getPortrait } from '../data/portraits';

const COLORS = ['#C59757','#52B788','#5B8DEF','#E8B86D','#9B72CF','#C2653A','#4ECDC4','#EF5B5B','#D4A574','#74C69D','#8B4226','#5BEF8D'];

const TRACK_NAMES = {
  AQU: 'Aqueduct', GP: 'Gulfstream Park', HOU: 'Sam Houston', LRL: 'Laurel Park',
  OP: 'Oaklawn Park', SA: 'Santa Anita', TAM: 'Tampa Bay', TP: 'Turfway Park',
  FG: 'Fair Grounds', CNL: 'Colonial Downs', CT: 'Charles Town', PEN: 'Penn National',
  PRX: 'Parx', MVR: 'Mahoning Valley',
};

const RACE_PHOTOS = [
  '/portraits/horse-24.jpg', '/portraits/horse-25.jpg', '/portraits/horse-26.jpg',
  '/portraits/horse-27.jpg', '/portraits/horse-28.jpg', '/portraits/horse-29.jpg',
];

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const CustomTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#141A10', border: '1px solid rgba(197,151,87,0.15)', borderRadius: 3, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#C59757', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 11, padding: '2px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
            <span style={{ color: '#8A847E', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#D6D1CC' }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// Build all GPS races from profiles
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

export default function RaceXRay() {
  const [query, setQuery] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeHorses, setActiveHorses] = useState([]);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return allGPSRaces.filter(r => {
      const trackName = (TRACK_NAMES[r.track] || r.track).toLowerCase();
      const label = `${trackName} r${r.raceNum} ${r.date}`;
      const horseNames = r.horses.map(h => h.name.toLowerCase()).join(' ');
      return label.includes(q) || horseNames.includes(q);
    }).slice(0, 12);
  }, [query]);

  const race = selected;
  const horses = useMemo(() => {
    if (!race) return [];
    return [...race.horses]
      .sort((a, b) => (a.position || 99) - (b.position || 99))
      .map((h, i) => ({ ...h, color: COLORS[i % COLORS.length] }));
  }, [race]);

  const winner = horses[0];

  const selectRace = (r) => {
    setSelected(r);
    setQuery('');
    setShowDrop(false);
    setActiveHorses(r.horses.slice(0, 6).map(h => h.name));
  };

  const toggleHorse = (name) => {
    setActiveHorses(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  // Build chart data
  const speedData = useMemo(() => {
    if (!race) return [];
    const maxGates = Math.max(...horses.map(h => h.speeds?.length || 0));
    const data = [];
    for (let i = 0; i < maxGates; i++) {
      const point = { gate: i === 0 ? 'Start' : i === maxGates - 1 ? 'Finish' : `${i}` };
      horses.forEach(h => { if (h.speeds?.[i] != null) point[h.name] = h.speeds[i]; });
      data.push(point);
    }
    return data;
  }, [race, horses]);

  const strideData = useMemo(() => {
    if (!race) return [];
    const maxGates = Math.max(...horses.map(h => h.strideLengths?.length || 0));
    const data = [];
    for (let i = 0; i < maxGates; i++) {
      const point = { gate: i === 0 ? 'Start' : i === maxGates - 1 ? 'Finish' : `${i}` };
      horses.forEach(h => { if (h.strideLengths?.[i] != null) point[h.name] = h.strideLengths[i]; });
      data.push(point);
    }
    return data;
  }, [race, horses]);

  // Compute effort-adjusted ranking
  const effortRanking = useMemo(() => {
    if (!race) return [];
    return horses
      .map(h => {
        const avgSpeed = h.speeds?.length ? h.speeds.reduce((a, b) => a + b, 0) / h.speeds.length : 0;
        const effortScore = avgSpeed > 0 ? avgSpeed + (h.groundLoss || 0) * 0.08 : 0;
        return { ...h, effortScore };
      })
      .sort((a, b) => b.effortScore - a.effortScore)
      .map((h, i) => ({ ...h, adjustedRank: i + 1 }));
  }, [race, horses]);

  // Key metrics from selected race
  const metrics = useMemo(() => {
    if (!horses.length) return [];
    const fastest = [...horses].sort((a, b) => (b.peakMPH || 0) - (a.peakMPH || 0))[0];
    const bestCloser = [...horses].sort((a, b) => (b.closingMPH || 0) - (a.closingMPH || 0))[0];
    const mostLoss = [...horses].sort((a, b) => (b.groundLoss || 0) - (a.groundLoss || 0))[0];
    const worstFade = [...horses].sort((a, b) => {
      const fadeA = a.strideLengths?.length >= 2 ? ((a.strideLengths[a.strideLengths.length - 1] - a.strideLengths[Math.floor(a.strideLengths.length / 2)]) / a.strideLengths[Math.floor(a.strideLengths.length / 2)] * 100) : 0;
      const fadeB = b.strideLengths?.length >= 2 ? ((b.strideLengths[b.strideLengths.length - 1] - b.strideLengths[Math.floor(b.strideLengths.length / 2)]) / b.strideLengths[Math.floor(b.strideLengths.length / 2)] * 100) : 0;
      return fadeA - fadeB;
    })[0];
    const fadePct = worstFade?.strideLengths?.length >= 2
      ? ((worstFade.strideLengths[worstFade.strideLengths.length - 1] - worstFade.strideLengths[Math.floor(worstFade.strideLengths.length / 2)]) / worstFade.strideLengths[Math.floor(worstFade.strideLengths.length / 2)] * 100).toFixed(1)
      : '—';
    return [
      { value: fastest?.peakMPH?.toFixed(1) || '—', unit: 'mph', label: 'Peak Speed', sub: fastest?.name },
      { value: bestCloser?.closingMPH?.toFixed(1) || '—', unit: 'mph', label: 'Closing Velocity', sub: bestCloser?.name },
      { value: mostLoss?.groundLoss != null ? `+${mostLoss.groundLoss}` : '—', unit: 'm', label: 'Max Ground Loss', sub: mostLoss?.name },
      { value: fadePct, unit: '%', label: 'Stride Fade', sub: worstFade?.name },
    ];
  }, [horses]);

  // Top races for browse
  const topRaces = useMemo(() => allGPSRaces.filter(r => r.horses.length >= 5).slice(0, 12), []);

  const trackName = race ? (TRACK_NAMES[race.track] || race.track) : '';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Analysis</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 8 }}>Deep Dive</h1>
        <p style={{ fontSize: 15, color: '#5A5550', marginBottom: 12 }}>
          Search {allGPSRaces.length} GPS races — pick one to see speed, stride, ground loss, and effort-adjusted rankings.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }} style={{ marginBottom: 40, position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderRadius: 3, background: '#141A10', border: '1px solid rgba(197,151,87,0.1)' }}>
          <Search style={{ width: 20, height: 20, color: '#5A5550', flexShrink: 0 }} />
          <input type="text" placeholder="Search by track, race number, or horse name..."
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDrop(true); }}
            onFocus={() => { if (query.length >= 2) setShowDrop(true); }}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 17, color: '#D6D1CC', fontFamily: 'var(--font-sans)' }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setShowDrop(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5550', padding: 4 }}>
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
        {showDrop && results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#141A10', border: '1px solid rgba(197,151,87,0.12)', borderRadius: 3, maxHeight: 400, overflowY: 'auto', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
            {results.map(r => {
              const winnerH = [...r.horses].sort((a, b) => (a.position || 99) - (b.position || 99))[0];
              return (
                <button key={r.id} onClick={() => selectRace(r)}
                  style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(197,151,87,0.04)', cursor: 'pointer', textAlign: 'left', transition: 'background 200ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>
                      {TRACK_NAMES[r.track] || r.track} Race {r.raceNum}
                    </div>
                    <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>
                      {r.date} · {r.distance} {r.surface} · {r.type} · {r.horses.length} horses GPS
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {winnerH && (
                      <span style={{ fontSize: 12, color: '#C59757' }}>
                        <Trophy style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                        {winnerH.name}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {race ? (
          <motion.div key={race.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>

            {/* Race header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500, color: '#D6D1CC' }}>
                {trackName} Race {race.raceNum}
              </h2>
              <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>
                {race.date} · {race.distance} {race.surface} · {race.type} · ${race.purse?.toLocaleString()}
              </span>
            </div>

            {/* Winner highlight */}
            {winner && (
              <div className="card-flat" style={{ padding: '20px 28px', marginBottom: 28, borderColor: 'rgba(197,151,87,0.15)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: 6, overflow: 'hidden', border: '2px solid rgba(197,151,87,0.3)', flexShrink: 0 }}>
                  <img src={getPortrait(winner.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <Trophy style={{ width: 16, height: 16, color: '#C59757' }} />
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#C59757' }}>{winner.name}</span>
                    <span style={{ fontSize: 13, color: '#5A5550' }}>Winner</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
                    {winner.peakMPH && <span style={{ color: '#8A847E' }}>Peak: <span style={{ fontFamily: 'var(--font-mono)', color: '#D6D1CC' }}>{winner.peakMPH} mph</span></span>}
                    {winner.closingMPH && <span style={{ color: '#8A847E' }}>Closing: <span style={{ fontFamily: 'var(--font-mono)', color: '#D6D1CC' }}>{winner.closingMPH} mph</span></span>}
                    {winner.groundLoss != null && <span style={{ color: '#8A847E' }}>Ground Loss: <span style={{ fontFamily: 'var(--font-mono)', color: '#D6D1CC' }}>+{winner.groundLoss}m</span></span>}
                    {winner.earnings != null && <span style={{ color: '#8A847E' }}>Earned: <span style={{ fontFamily: 'var(--font-mono)', color: '#C59757' }}>${winner.earnings.toLocaleString()}</span></span>}
                  </div>
                </div>
              </div>
            )}

            {/* Key metrics */}
            <div className="card-flat" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '32px 0', marginBottom: 32 }}>
              {metrics.map((s, i) => (
                <div key={s.label} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid rgba(197,151,87,0.06)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#C59757' }}>
                    {s.value}<span style={{ fontSize: 16, color: '#5A5550', marginLeft: 2 }}>{s.unit}</span>
                  </div>
                  <div className="label" style={{ marginTop: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: '#5A5550', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Horse toggles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {horses.map(h => {
                const on = activeHorses.includes(h.name);
                return (
                  <button key={h.name} onClick={() => toggleHorse(h.name)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 3, fontSize: 12, cursor: 'pointer', background: 'transparent', color: on ? '#D6D1CC' : '#5A5550', border: 'none', transition: 'opacity 300ms', opacity: on ? 1 : 0.4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: on ? h.color : '#5A5550' }} />
                    {h.name}
                    {h.position === 1 && <Trophy style={{ width: 10, height: 10, color: '#C59757' }} />}
                  </button>
                );
              })}
            </div>

            {/* Speed chart */}
            {speedData.length > 0 && (
              <div className="card-flat" style={{ padding: 28, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div className="label" style={{ marginBottom: 8 }}>Velocity</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Speed Traces</h3>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>MPH</span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={speedData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <defs>
                      {horses.map(h => (
                        <linearGradient key={h.name} id={`gs-${h.name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={h.color} stopOpacity={0.06} />
                          <stop offset="100%" stopColor={h.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid stroke="rgba(197,151,87,0.03)" strokeDasharray="3 3" />
                    <XAxis dataKey="gate" tick={{ fontSize: 10, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} axisLine={{ stroke: 'rgba(197,151,87,0.06)' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 1']} />
                    <Tooltip content={<CustomTip />} />
                    {horses.map(h => activeHorses.includes(h.name) ? (
                      <Area key={h.name} type="monotone" dataKey={h.name} stroke={h.color} strokeWidth={h.position === 1 ? 2.5 : 1.5}
                        fill={`url(#gs-${h.name.replace(/[^a-zA-Z0-9]/g, '')})`}
                        dot={false} activeDot={{ r: 3, fill: h.color, stroke: '#0D110A', strokeWidth: 2 }} />
                    ) : null)}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 24 }}>
              {/* Ground Loss */}
              <div className="card-flat" style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div className="label" style={{ marginBottom: 8 }}>GPS Exclusive</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Ground Loss</h3>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>Meters</span>
                </div>
                <p style={{ fontSize: 14, color: '#8A847E', marginBottom: 20, lineHeight: 1.7 }}>
                  Extra distance traveled vs. rail path.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[...horses].sort((a, b) => (b.groundLoss || 0) - (a.groundLoss || 0)).map((h, i) => {
                    const maxLoss = Math.max(...horses.map(x => x.groundLoss || 0), 1);
                    return (
                      <div key={h.name}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: h.color }} />
                            <span style={{ fontSize: 14, color: h.position === 1 ? '#C59757' : '#D6D1CC' }}>{h.name}</span>
                            {h.position === 1 && <Trophy style={{ width: 10, height: 10, color: '#C59757' }} />}
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: h.groundLoss > 15 ? '#C59757' : '#5A5550' }}>+{h.groundLoss || 0}m</span>
                        </div>
                        <div style={{ height: 3, borderRadius: 1, background: '#1C2418', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${((h.groundLoss || 0) / maxLoss) * 100}%`, borderRadius: 1, background: h.color, transition: 'width 600ms ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stride chart */}
              {strideData.length > 0 && (
                <div className="card-flat" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <div className="label" style={{ marginBottom: 8 }}>Biomechanics</div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Stride Analysis</h3>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>Meters</span>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={strideData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                      <defs>
                        {horses.map(h => (
                          <linearGradient key={h.name} id={`gst-${h.name.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={h.color} stopOpacity={0.06} />
                            <stop offset="100%" stopColor={h.color} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid stroke="rgba(197,151,87,0.03)" strokeDasharray="3 3" />
                      <XAxis dataKey="gate" tick={{ fontSize: 10, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} axisLine={{ stroke: 'rgba(197,151,87,0.06)' }} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.3']} />
                      <Tooltip content={<CustomTip />} />
                      {horses.map(h => activeHorses.includes(h.name) ? (
                        <Area key={h.name} type="monotone" dataKey={h.name} stroke={h.color} strokeWidth={h.position === 1 ? 2.5 : 1.5}
                          fill={`url(#gst-${h.name.replace(/[^a-zA-Z0-9]/g, '')})`}
                          dot={false} activeDot={{ r: 3, fill: h.color, stroke: '#0D110A', strokeWidth: 2 }} />
                      ) : null)}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Effort-adjusted rankings */}
            <div className="card-flat" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                <div className="label" style={{ color: '#C59757', marginBottom: 8 }}>GPS Exclusive</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Effort-Adjusted Rankings</h3>
                <p style={{ fontSize: 14, color: '#5A5550', marginTop: 4 }}>Rankings recalculated for ground loss and average speed</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                    {['Adj.', 'Horse', 'Official', 'Ground Loss', 'Closing', 'Verdict'].map(h => (
                      <th key={h} className="label" style={{ textAlign: 'left', padding: '14px 28px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {effortRanking.map((h, i) => {
                    const improved = h.adjustedRank < (h.position || 99);
                    const isWinner = h.position === 1;
                    return (
                      <tr key={h.name} style={{
                        borderBottom: i < effortRanking.length - 1 ? '1px solid rgba(197,151,87,0.04)' : 'none',
                        background: isWinner ? 'rgba(197,151,87,0.03)' : 'transparent',
                      }}>
                        <td style={{ padding: '12px 28px', fontFamily: 'var(--font-serif)', fontSize: 16, color: '#C59757' }}>#{h.adjustedRank}</td>
                        <td style={{ padding: '12px 28px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 4, overflow: 'hidden', border: `1px solid ${h.color}40`, flexShrink: 0 }}>
                              <img src={getPortrait(h.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontSize: 15, color: isWinner ? '#C59757' : '#D6D1CC', fontWeight: isWinner ? 600 : 400 }}>{h.name}</span>
                            {isWinner && <Trophy style={{ width: 12, height: 12, color: '#C59757' }} />}
                          </div>
                        </td>
                        <td style={{ padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 15, color: '#5A5550' }}>{h.position || '—'}</td>
                        <td style={{ padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 13, color: (h.groundLoss || 0) > 15 ? '#C59757' : '#5A5550' }}>+{h.groundLoss || 0}m</td>
                        <td style={{ padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8A847E' }}>{h.closingMPH || '—'} mph</td>
                        <td style={{ padding: '12px 28px', fontSize: 12, color: improved ? '#C59757' : '#5A5550' }}>{improved ? 'Undervalued' : 'Fair'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          /* Browse top races */
          <motion.div key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="label" style={{ marginBottom: 16, fontSize: 12 }}>Recent GPS Races</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {topRaces.map((r, idx) => {
                const w = [...r.horses].sort((a, b) => (a.position || 99) - (b.position || 99))[0];
                return (
                  <button key={r.id} onClick={() => selectRace(r)} className="card"
                    style={{ padding: 0, textAlign: 'left', cursor: 'pointer', background: '#141A10', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                      <img src={RACE_PHOTOS[idx % RACE_PHOTOS.length]} alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.4) saturate(0.5)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(20,26,16,0.95) 100%)' }} />
                      <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                        <div style={{ fontSize: 17, fontWeight: 600, color: '#D6D1CC', marginBottom: 4 }}>
                          {TRACK_NAMES[r.track] || r.track} R{r.raceNum}
                        </div>
                        <div style={{ fontSize: 12, color: '#5A5550' }}>
                          {r.date} · {r.distance} {r.surface} · {r.horses.length} horses
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {w && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Trophy style={{ width: 12, height: 12, color: '#C59757' }} />
                          <span style={{ fontSize: 13, color: '#C59757' }}>{w.name}</span>
                        </div>
                      )}
                      <span style={{ fontSize: 12, color: '#5A5550' }}>
                        {r.type} · ${r.purse?.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
