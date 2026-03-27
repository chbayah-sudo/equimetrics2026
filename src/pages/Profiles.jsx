import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  Tooltip, CartesianGrid, Cell,
} from 'recharts';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import allProfiles from '../data/horseProfiles.json';
import { getPortrait } from '../data/portraits';

const SC = { 'Front Runner': '#52B788', Stalker: '#E8B86D', Closer: '#9B72CF' };
const profileList = Object.values(allProfiles).sort((a, b) => (b.gpsScore || 0) - (a.gpsScore || 0));
const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const CustomTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#141A10', border: '1px solid rgba(197,151,87,0.15)', borderRadius: 3, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#C59757', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: '#D6D1CC' }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
};

// Position flow mini chart (the interesting one!)
function PositionFlow({ positions, color, height = 48 }) {
  if (!positions?.length) return <div style={{ height, display: 'flex', alignItems: 'center', fontSize: 12, color: '#5A5550' }}>No data</div>;
  const data = positions.map((v, i) => ({ gate: i === 0 ? 'Start' : i === positions.length - 1 ? 'Fin' : `${i}`, pos: v }));
  const max = Math.max(...positions, 6);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <YAxis reversed domain={[1, max]} tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} />
        <XAxis dataKey="gate" tick={{ fontSize: 8, fill: '#5A5550' }} axisLine={false} tickLine={false} />
        <Line type="monotone" dataKey="pos" stroke={color} strokeWidth={2}
          dot={{ r: 2.5, fill: color, stroke: '#0D110A', strokeWidth: 1.5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function RaceCard({ race, color, isExpanded, onToggle }) {
  const posResult = race.position ? (race.position <= 3 ? '#C59757' : '#8A847E') : '#5A5550';

  return (
    <div className="card-flat" style={{ overflow: 'hidden', marginBottom: 12 }}>
      {/* Clickable header */}
      <button onClick={onToggle} style={{
        width: '100%', display: 'grid', gridTemplateColumns: '1fr 80px 110px 100px 40px',
        alignItems: 'center', padding: '16px 24px', background: 'transparent', border: 'none',
        cursor: 'pointer', textAlign: 'left', transition: 'background 200ms',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.02)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{race.track} R{race.raceNum}</div>
          <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>{race.date} · {race.distance} {race.surface} · {race.raceType}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: posResult }}>
          {race.position || '—'}<span style={{ fontSize: 12, color: '#5A5550' }}>/{race.fieldSize || '?'}</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#C59757' }}>
            ${race.earnings?.toLocaleString() || '0'}
          </div>
          <div style={{ fontSize: 11, color: '#5A5550' }}>of ${race.purse?.toLocaleString()}</div>
        </div>
        <div style={{ width: 80, height: 32 }}>
          <PositionFlow positions={race.positions} color={color} height={32} />
        </div>
        <div style={{ color: '#5A5550', display: 'flex', justifyContent: 'center' }}>
          {isExpanded ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(197,151,87,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, paddingTop: 20 }}>

                {/* Position through race */}
                <div>
                  <div className="label" style={{ fontSize: 10, marginBottom: 10 }}>Position Through Race</div>
                  <div style={{ height: 100 }}>
                    <PositionFlow positions={race.positions} color={color} height={100} />
                  </div>
                </div>

                {/* Speed curve */}
                <div>
                  <div className="label" style={{ fontSize: 10, marginBottom: 10 }}>Speed Curve (mph)</div>
                  <div style={{ height: 100 }}>
                    {race.speeds?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={race.speeds.map((v, i) => ({ i, v }))} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="expSpeed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={color} stopOpacity={0.1} />
                              <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <YAxis tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 1']} />
                          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill="url(#expSpeed)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', fontSize: 12, color: '#5A5550' }}>—</div>}
                  </div>
                </div>

                {/* Stride lengths */}
                <div>
                  <div className="label" style={{ fontSize: 10, marginBottom: 10 }}>Stride Length (m)</div>
                  <div style={{ height: 100 }}>
                    {race.strideLengths?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={race.strideLengths.map((v, i) => ({ i, v }))} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                          <YAxis tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.3']} />
                          <Bar dataKey="v" radius={[2, 2, 0, 0]}>
                            {race.strideLengths.map((_, i) => (
                              <Cell key={i} fill={i >= race.strideLengths.length - 2 ? `${color}60` : `${color}30`} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', fontSize: 12, color: '#5A5550' }}>—</div>}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(197,151,87,0.04)' }}>
                {[
                  ['Peak', race.peakMPH ? `${race.peakMPH} mph` : '—'],
                  ['Closing', race.closingMPH ? `${race.closingMPH} mph` : '—'],
                  ['Ground Loss', race.groundLoss != null ? `+${race.groundLoss}m` : '—'],
                  ['Distance', race.totalDist ? `${race.totalDist}m` : '—'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 11, color: '#5A5550' }}>{l}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#D6D1CC', marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Profiles() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showDrop, setShowDrop] = useState(false);
  const [expandedRace, setExpandedRace] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return profileList.filter(p => p.name.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  const h = selected ? allProfiles[selected] : null;
  const color = h ? (SC[h.style] || '#C59757') : '#C59757';

  const selectHorse = (name) => { setSelected(name); setQuery(''); setShowDrop(false); setExpandedRace(0); setActiveTab('overview'); };

  const radarData = h ? [
    { t: 'Speed', v: h.bestPeak ? Math.min(100, (h.bestPeak / 42) * 100) : 0 },
    { t: 'Closing', v: h.avgClosing ? Math.min(100, (h.avgClosing / 40) * 100) : 0 },
    { t: 'Stamina', v: h.strideFade != null ? Math.max(0, Math.min(100, 50 - h.strideFade * 5)) : 50 },
    { t: 'Efficiency', v: h.avgGroundLoss != null ? Math.max(0, 100 - h.avgGroundLoss * 3) : 50 },
    { t: 'Form', v: h.wins > 0 ? 90 : h.places > 0 ? 65 : 40 },
  ] : [];

  // Earnings chart data
  const earningsData = h?.races ? h.races.slice().reverse().map(r => ({
    label: `${r.track} ${r.date.slice(5)}`,
    earnings: r.earnings || 0,
    purse: r.purse || 0,
  })) : [];

  const topHorses = useMemo(() => profileList.slice(0, 20), []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>

      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 14, fontSize: 12 }}>Profiling</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 48px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 12 }}>
          Horse Profiles
        </h1>
        <p style={{ fontSize: 16, color: '#8A847E', maxWidth: 520, lineHeight: 1.7, marginBottom: 12 }}>
          Search {profileList.length.toLocaleString()} horses with GPS history.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }} style={{ marginBottom: 40, position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 3, background: '#141A10', border: '1px solid rgba(197,151,87,0.1)' }}>
          <Search style={{ width: 18, height: 18, color: '#5A5550', flexShrink: 0 }} />
          <input type="text" placeholder="Type a horse name..." value={query}
            onChange={e => { setQuery(e.target.value); setShowDrop(true); }}
            onFocus={() => setShowDrop(true)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 16, color: '#D6D1CC', fontFamily: 'var(--font-sans)' }} />
          {query && (
            <button onClick={() => { setQuery(''); setShowDrop(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5550', padding: 4 }}>
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
        {showDrop && results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#141A10', border: '1px solid rgba(197,151,87,0.12)', borderRadius: 3, maxHeight: 340, overflowY: 'auto' }}>
            {results.map(p => (
              <button key={p.name} onClick={() => selectHorse(p.name)}
                style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(197,151,87,0.04)', cursor: 'pointer', textAlign: 'left', transition: 'background 200ms' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>{p.record} · {p.numRaces} GPS races · ${p.totalEarnings?.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, color: SC[p.style], background: `${SC[p.style]}12` }}>
                    {p.style === 'Front Runner' ? 'Speed' : p.style}
                  </span>
                  {p.gpsScore != null && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: p.gpsScore >= 85 ? '#C59757' : '#8A847E' }}>{p.gpsScore}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {h ? (
          <motion.div key={h.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>

            {/* ── PROFILE HEADER ── */}
            <div className="card-flat" style={{ overflow: 'hidden', marginBottom: 24 }}>
              {/* Hero portrait banner */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img src={getPortrait(h.name)} alt={h.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.5) saturate(0.7)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,17,10,0.3) 0%, rgba(13,17,10,0.95) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 6, overflow: 'hidden', border: '2px solid rgba(197,151,87,0.3)', flexShrink: 0 }}>
                    <img src={getPortrait(h.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 500, color: '#D6D1CC', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{h.name}</h2>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color, background: `${color}20`, border: `1px solid ${color}30`, backdropFilter: 'blur(4px)' }}>
                        {h.style === 'Front Runner' ? 'Speed' : h.style}
                      </span>
                      {h.gpsScore != null && (
                        <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 3, color: '#C59757', background: 'rgba(197,151,87,0.15)', backdropFilter: 'blur(4px)' }}>
                          GPS {h.gpsScore}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 36 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 3, color: '#8A847E', background: '#1C2418' }}>
                      {h.record} record
                    </span>
                    <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 3, color: '#C59757', background: 'rgba(197,151,87,0.08)' }}>
                      ${h.totalEarnings?.toLocaleString() || '0'} earned
                    </span>
                  </div>

                  {/* Headline stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {[
                      ['Total Earnings', `$${h.totalEarnings?.toLocaleString() || '0'}`, '#C59757'],
                      ['Best Speed', h.bestPeak ? `${h.bestPeak} mph` : '—', '#D6D1CC'],
                      ['Avg Closing', h.avgClosing ? `${h.avgClosing} mph` : '—', '#D6D1CC'],
                      ['Ground Loss', h.avgGroundLoss != null ? `${h.avgGroundLoss}m avg` : '—', h.avgGroundLoss > 10 ? '#E8B86D' : '#D6D1CC'],
                      ['Stride Fade', h.strideFade != null ? `${h.strideFade}%` : '—', h.strideFade < -5 ? '#C2653A' : '#D6D1CC'],
                      ['GPS Races', `${h.numRaces}`, '#D6D1CC'],
                    ].map(([l, v, c]) => (
                      <div key={l}>
                        <div style={{ fontSize: 12, color: '#5A5550', marginBottom: 4 }}>{l}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 500, color: c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar */}
                <div style={{ width: 250, height: 210, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="68%">
                      <PolarGrid stroke="rgba(197,151,87,0.06)" />
                      <PolarAngleAxis dataKey="t" tick={{ fontSize: 11, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} />
                      <Radar dataKey="v" stroke={color} fill={color} fillOpacity={0.08} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              </div>
            </div>

            {/* ── TABS ── */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
              {[['overview', 'Race History'], ['earnings', 'Earnings']].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  style={{
                    padding: '10px 20px', borderRadius: 3, cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 250ms',
                    background: activeTab === key ? '#141A10' : 'transparent',
                    border: activeTab === key ? '1px solid rgba(197,151,87,0.15)' : '1px solid rgba(197,151,87,0.04)',
                    color: activeTab === key ? '#C59757' : '#5A5550',
                  }}>
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Position flow headline */}
                  {h.races?.[0]?.positions?.length > 0 && (
                    <div className="card-flat" style={{ padding: 28, marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                          <div className="label" style={{ fontSize: 11, marginBottom: 8 }}>Latest Race</div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Position Through Race</h3>
                          <p style={{ fontSize: 13, color: '#5A5550', marginTop: 4 }}>
                            Lower = closer to the lead. Shows how {h.name} moves through the field gate by gate.
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: h.races[0].position === 1 ? '#C59757' : '#8A847E' }}>
                            P{h.races[0].position}
                          </div>
                          <div style={{ fontSize: 12, color: '#5A5550' }}>{h.races[0].track} {h.races[0].date}</div>
                        </div>
                      </div>
                      <div style={{ height: 140 }}>
                        <PositionFlow positions={h.races[0].positions} color={color} height={140} />
                      </div>
                    </div>
                  )}

                  {/* Expandable race cards */}
                  <div className="label" style={{ fontSize: 11, marginBottom: 12 }}>Race-by-Race GPS Breakdown</div>
                  {h.races?.map((r, i) => (
                    <RaceCard key={i} race={r} color={color} isExpanded={expandedRace === i}
                      onToggle={() => setExpandedRace(expandedRace === i ? -1 : i)} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="earnings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Earnings summary */}
                  <div className="card-flat" style={{ padding: 32, marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                      <div>
                        <div className="label" style={{ fontSize: 11, marginBottom: 8 }}>Career GPS Earnings</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, color: '#C59757' }}>
                          ${h.totalEarnings?.toLocaleString() || '0'}
                        </div>
                        <div style={{ fontSize: 14, color: '#5A5550', marginTop: 4 }}>
                          from {h.numRaces} GPS-tracked race{h.numRaces !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 24 }}>
                        {[['Wins', h.wins, '#52B788'], ['Places', h.places, '#E8B86D'], ['Starts', h.numRaces, '#8A847E']].map(([l, v, c]) => (
                          <div key={l} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: c }}>{v}</div>
                            <div style={{ fontSize: 11, color: '#5A5550' }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Earnings bar chart */}
                    {earningsData.length > 0 && (
                      <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={earningsData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid stroke="rgba(197,151,87,0.04)" strokeDasharray="3 3" />
                            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#5A5550' }} axisLine={{ stroke: 'rgba(197,151,87,0.06)' }} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#5A5550' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTip />} />
                            <Bar dataKey="earnings" name="Earned" radius={[3, 3, 0, 0]}>
                              {earningsData.map((d, i) => (
                                <Cell key={i} fill={d.earnings > 0 ? '#C59757' : '#1C2418'} fillOpacity={d.earnings > d.purse * 0.15 ? 1 : 0.5} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* Race-by-race earnings table */}
                  <div className="card-flat" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#D6D1CC' }}>Earnings Breakdown</h3>
                    </div>
                    {h.races?.map((r, i) => (
                      <div key={i} style={{
                        display: 'grid', gridTemplateColumns: '1fr 80px 100px 100px',
                        alignItems: 'center', padding: '14px 24px',
                        borderBottom: i < h.races.length - 1 ? '1px solid rgba(197,151,87,0.03)' : 'none',
                      }}>
                        <div>
                          <div style={{ fontSize: 14, color: '#D6D1CC' }}>{r.track} R{r.raceNum}</div>
                          <div style={{ fontSize: 12, color: '#5A5550' }}>{r.date} · {r.distance} {r.surface}</div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: r.position === 1 ? '#C59757' : '#8A847E' }}>
                          {r.position || '—'}<span style={{ fontSize: 11, color: '#5A5550' }}>/{r.fieldSize}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#5A5550' }}>${r.purse?.toLocaleString()} purse</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: r.earnings > 0 ? '#C59757' : '#5A5550', textAlign: 'right' }}>
                          ${r.earnings?.toLocaleString() || '0'}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Browse grid */
          <motion.div key="browse" {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="label" style={{ marginBottom: 16, fontSize: 12 }}>Top-rated horses by GPS score</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {topHorses.map(p => {
                const sc = SC[p.style] || '#5A5550';
                return (
                  <button key={p.name} onClick={() => selectHorse(p.name)}
                    className="card" style={{ padding: 0, textAlign: 'left', cursor: 'pointer', background: '#141A10', overflow: 'hidden' }}>
                    {/* Portrait */}
                    <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
                      <img src={getPortrait(p.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.45) saturate(0.6)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(20,26,16,0.95) 100%)' }} />
                      {p.gpsScore != null && (
                        <div style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: p.gpsScore >= 85 ? '#C59757' : '#8A847E', background: 'rgba(13,17,10,0.7)', padding: '3px 8px', borderRadius: 3, backdropFilter: 'blur(4px)' }}>
                          {p.gpsScore}
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 8, left: 12, right: 12 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{p.name}</div>
                      </div>
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, color: sc, background: `${sc}12` }}>
                          {p.style === 'Front Runner' ? 'Speed' : p.style}
                        </span>
                        <span style={{ fontSize: 11, color: '#5A5550' }}>{p.record}</span>
                        <span style={{ fontSize: 11, color: '#C59757' }}>${p.totalEarnings?.toLocaleString()}</span>
                      </div>
                      {p.races?.[0]?.positions?.length > 0 && (
                        <div style={{ height: 30 }}>
                          <PositionFlow positions={p.races[0].positions} color={sc} height={30} />
                        </div>
                      )}
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
