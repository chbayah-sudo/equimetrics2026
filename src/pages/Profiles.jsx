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
import JourneyMap from '../components/JourneyMap';

const SC = { 'Front Runner': '#52B788', Stalker: '#E8B86D', Closer: '#9B72CF' };
const profileList = Object.values(allProfiles).sort((a, b) => (b.gpsScore || 0) - (a.gpsScore || 0));

const CustomTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#141A10', border: '1px solid rgba(197,151,87,0.15)', borderRadius: 3, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#C59757', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: '#D6D1CC' }}>{p.name}: <strong>{p.value}</strong></div>)}
    </div>
  );
};

function PositionFlow({ positions, color, height = 48 }) {
  if (!positions?.length) return null;
  const data = positions.map((v, i) => ({ gate: i === 0 ? 'S' : i === positions.length - 1 ? 'F' : `${i}`, pos: v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <YAxis reversed domain={[1, Math.max(...positions, 6)]} tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} />
        <Line type="monotone" dataKey="pos" stroke={color} strokeWidth={2} dot={{ r: 2, fill: color, stroke: '#0D110A', strokeWidth: 1.5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function RaceRow({ race, color, isExpanded, onToggle }) {
  const posColor = race.position ? (race.position <= 3 ? '#C59757' : '#8A847E') : '#5A5550';
  return (
    <div style={{ borderBottom: '1px solid rgba(197,151,87,0.04)' }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'grid', gridTemplateColumns: '1fr 60px 90px 90px 36px',
        alignItems: 'center', padding: '14px 24px', background: 'transparent', border: 'none',
        cursor: 'pointer', textAlign: 'left', transition: 'background 200ms',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.02)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{race.track} R{race.raceNum}</span>
            <span style={{ fontSize: 12, color: '#5A5550' }}>{race.distance} {race.surface}</span>
            {race.hasGPS ? (
              <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 2, color: '#52B788', background: 'rgba(82,183,136,0.1)' }}>GPS</span>
            ) : (
              <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 2, color: '#8A847E', background: 'rgba(138,132,126,0.08)' }}>Trad</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>{race.date} · {race.raceType}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: posColor }}>
          {race.position || '—'}<span style={{ fontSize: 11, color: '#5A5550' }}>/{race.fieldSize || '?'}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#C59757' }}>
          ${race.earnings?.toLocaleString() || '0'}
        </div>
        <div>
          {race.positions?.length > 0 ? (
            <div style={{ width: 70, height: 28 }}><PositionFlow positions={race.positions} color={color} height={28} /></div>
          ) : <span style={{ fontSize: 11, color: '#5A5550' }}>—</span>}
        </div>
        <div style={{ color: '#5A5550', display: 'flex', justifyContent: 'center' }}>
          {isExpanded ? <ChevronUp style={{ width: 14, height: 14 }} /> : <ChevronDown style={{ width: 14, height: 14 }} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 24px 20px' }}>
              {race.hasGPS && race.speeds?.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(197,151,87,0.04)' }}>
                  <div>
                    <div className="label" style={{ fontSize: 10, marginBottom: 8 }}>Position Flow</div>
                    <div style={{ height: 90 }}><PositionFlow positions={race.positions} color={color} height={90} /></div>
                  </div>
                  <div>
                    <div className="label" style={{ fontSize: 10, marginBottom: 8 }}>Speed (mph)</div>
                    <div style={{ height: 90 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={race.speeds.map((v, i) => ({ i, v }))} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                          <defs><linearGradient id="expSp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.1} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
                          <YAxis tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 1']} />
                          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill="url(#expSp)" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <div className="label" style={{ fontSize: 10, marginBottom: 8 }}>Stride (m)</div>
                    <div style={{ height: 90 }}>
                      {race.strideLengths?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={race.strideLengths.map((v, i) => ({ i, v }))} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <YAxis tick={{ fontSize: 9, fill: '#5A5550' }} axisLine={false} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.3']} />
                            <Bar dataKey="v" radius={[2, 2, 0, 0]}>{race.strideLengths.map((_, i) => <Cell key={i} fill={`${color}${i >= race.strideLengths.length - 2 ? '80' : '30'}`} />)}</Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : <span style={{ fontSize: 12, color: '#5A5550' }}>—</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(197,151,87,0.04)', fontSize: 13, color: '#5A5550' }}>
                  Traditional data only — no GPS telemetry available for this race.
                </div>
              )}
              {race.hasGPS && (
                <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(197,151,87,0.04)' }}>
                  {[['Peak', race.peakMPH ? `${race.peakMPH} mph` : '—'], ['Closing', race.closingMPH ? `${race.closingMPH} mph` : '—'], ['Ground Loss', race.groundLoss != null ? `+${race.groundLoss}m` : '—'], ['Purse', `$${race.purse?.toLocaleString()}`]].map(([l, v]) => (
                    <div key={l}><div style={{ fontSize: 11, color: '#5A5550' }}>{l}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D6D1CC', marginTop: 2 }}>{v}</div></div>
                  ))}
                </div>
              )}
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
  const [activeTab, setActiveTab] = useState('races');

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return profileList.filter(p => p.name.toLowerCase().includes(q)).slice(0, 15);
  }, [query]);

  const h = selected ? allProfiles[selected] : null;
  const color = h?.style ? (SC[h.style] || '#C59757') : '#8A847E';
  const selectHorse = (name) => { setSelected(name); setQuery(''); setShowDrop(false); setExpandedRace(0); setActiveTab('races'); };

  const radarData = h && h.hasGPS ? [
    { t: 'Speed', v: h.bestPeak ? Math.min(100, (h.bestPeak / 42) * 100) : 0 },
    { t: 'Closing', v: h.avgClosing ? Math.min(100, (h.avgClosing / 40) * 100) : 0 },
    { t: 'Stamina', v: h.strideFade != null ? Math.max(0, Math.min(100, 50 - h.strideFade * 5)) : 50 },
    { t: 'Efficiency', v: h.avgGroundLoss != null ? Math.max(0, 100 - h.avgGroundLoss * 3) : 50 },
    { t: 'Form', v: h.wins > 0 ? 90 : h.places > 0 ? 65 : 40 },
  ] : [];

  const earningsData = h?.races ? h.races.slice().reverse().map(r => ({
    label: `${r.track} ${r.date.slice(5)}`,
    earned: r.earnings || 0,
  })) : [];

  const topHorses = useMemo(() => profileList.filter(p => p.numRaces >= 2).slice(0, 16), []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="label" style={{ color: '#C59757', marginBottom: 14, fontSize: 12 }}>Profiling</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 48px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 12 }}>Horse Profiles</h1>
        <p style={{ fontSize: 16, color: '#8A847E', maxWidth: 520, lineHeight: 1.7, marginBottom: 12 }}>
          Search {profileList.length.toLocaleString()} horses — GPS and traditional — to see race history, earnings, and performance data.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ marginBottom: 40, position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderRadius: 3, background: '#141A10', border: '1px solid rgba(197,151,87,0.1)' }}>
          <Search style={{ width: 20, height: 20, color: '#5A5550', flexShrink: 0 }} />
          <input type="text" placeholder="Search by horse name..." value={query}
            onChange={e => { setQuery(e.target.value); setShowDrop(true); }}
            onFocus={() => { if (query.length >= 2) setShowDrop(true); }}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 17, color: '#D6D1CC', fontFamily: 'var(--font-sans)' }} />
          {query && <button onClick={() => { setQuery(''); setShowDrop(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5550', padding: 4 }}><X style={{ width: 16, height: 16 }} /></button>}
        </div>
        {showDrop && results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#141A10', border: '1px solid rgba(197,151,87,0.12)', borderRadius: 3, maxHeight: 400, overflowY: 'auto', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
            {results.map(p => (
              <button key={p.name} onClick={() => selectHorse(p.name)}
                style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(197,151,87,0.04)', cursor: 'pointer', textAlign: 'left', transition: 'background 200ms' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(197,151,87,0.1)', flexShrink: 0 }}>
                    <img src={getPortrait(p.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>
                      {p.record} · {p.numRaces} races · ${p.totalEarnings?.toLocaleString()}
                      {p.hasGPS && <span style={{ color: '#52B788', marginLeft: 6 }}>GPS</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.style && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, color: SC[p.style] || '#8A847E', background: `${(SC[p.style] || '#8A847E')}12` }}>{p.style === 'Front Runner' ? 'Speed' : p.style}</span>}
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
            {/* Portrait banner */}
            <div className="card-flat" style={{ overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={getPortrait(h.name)} alt={h.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.45) saturate(0.6)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,17,10,0.2) 0%, rgba(13,17,10,0.95) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 36, right: 36, display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 72, height: 72, borderRadius: 6, overflow: 'hidden', border: '2px solid rgba(197,151,87,0.3)', flexShrink: 0 }}>
                      <img src={getPortrait(h.name)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 500, color: '#D6D1CC' }}>{h.name}</h2>
                      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                        {h.style && <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color: SC[h.style] || '#8A847E', background: `${(SC[h.style] || '#8A847E')}18`, backdropFilter: 'blur(4px)' }}>{h.style === 'Front Runner' ? 'Speed' : h.style}</span>}
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color: '#8A847E', background: 'rgba(28,36,24,0.8)' }}>{h.record}</span>
                        {h.hasGPS ? (
                          <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color: '#52B788', background: 'rgba(82,183,136,0.1)' }}>GPS · {h.numGPSRaces} races</span>
                        ) : (
                          <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color: '#8A847E', background: 'rgba(138,132,126,0.08)' }}>Traditional</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {h.gpsScore != null && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 600, color: '#C59757' }}>{h.gpsScore}</div>
                      <div style={{ fontSize: 11, color: '#5A5550' }}>GPS Score</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ padding: '28px 36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20 }}>
                {[
                  ['Total Earnings', `$${h.totalEarnings?.toLocaleString() || '0'}`, '#C59757'],
                  ['Avg Finish', h.avgFinish || '—', '#D6D1CC'],
                  ['Avg Purse', `$${h.avgPurse?.toLocaleString() || '0'}`, '#D6D1CC'],
                  ['Avg Field', h.avgFieldSize || '—', '#D6D1CC'],
                  ['Best Speed', h.bestPeak ? `${h.bestPeak} mph` : '—', h.hasGPS ? '#D6D1CC' : '#5A5550'],
                  ['Ground Loss', h.avgGroundLoss != null ? `${h.avgGroundLoss}m` : '—', h.hasGPS ? '#D6D1CC' : '#5A5550'],
                  ['Stride Fade', h.strideFade != null ? `${h.strideFade}%` : '—', h.hasGPS ? '#D6D1CC' : '#5A5550'],
                  ['Total Starts', `${h.numRaces}`, '#D6D1CC'],
                ].map(([l, v, c]) => (
                  <div key={l}>
                    <div style={{ fontSize: 11, color: '#5A5550', marginBottom: 4 }}>{l}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar for GPS horses */}
            {h.hasGPS && radarData.length > 0 && (
              <div className="card-flat" style={{ padding: 28, marginBottom: 24 }}>
                <div className="label" style={{ fontSize: 11, marginBottom: 12 }}>GPS Performance Radar</div>
                <div style={{ height: 220, maxWidth: 320, margin: '0 auto' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                      <PolarGrid stroke="rgba(197,151,87,0.06)" />
                      <PolarAngleAxis dataKey="t" tick={{ fontSize: 12, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} />
                      <Radar dataKey="v" stroke={color} fill={color} fillOpacity={0.08} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Journey Map */}
            {h.races?.length > 0 && (
              <JourneyMap races={h.races} horseName={h.name} />
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
              {[['races', `All Races (${h.numRaces})`], ['earnings', 'Earnings']].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: '10px 20px', borderRadius: 3, cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 250ms',
                  background: activeTab === key ? '#141A10' : 'transparent',
                  border: activeTab === key ? '1px solid rgba(197,151,87,0.15)' : '1px solid rgba(197,151,87,0.04)',
                  color: activeTab === key ? '#C59757' : '#5A5550',
                }}>{label}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'races' ? (
                <motion.div key="races" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card-flat" style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 90px 90px 36px', padding: '10px 24px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                      {['Race', 'Fin', 'Earned', 'Flow', ''].map(hd => <div key={hd} className="label" style={{ fontSize: 10 }}>{hd}</div>)}
                    </div>
                    {h.races?.map((r, i) => (
                      <RaceRow key={`${r.date}-${r.raceNum}`} race={r} color={color} isExpanded={expandedRace === i} onToggle={() => setExpandedRace(expandedRace === i ? -1 : i)} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="earnings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card-flat" style={{ padding: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                      <div>
                        <div className="label" style={{ fontSize: 11, marginBottom: 8 }}>Career Earnings</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, color: '#C59757' }}>${h.totalEarnings?.toLocaleString() || '0'}</div>
                        <div style={{ fontSize: 14, color: '#5A5550', marginTop: 4 }}>from {h.numRaces} starts</div>
                      </div>
                      <div style={{ display: 'flex', gap: 20 }}>
                        {[['Wins', h.wins, '#52B788'], ['Places', h.places, '#E8B86D'], ['Starts', h.numRaces, '#8A847E']].map(([l, v, c]) => (
                          <div key={l} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: c }}>{v}</div>
                            <div style={{ fontSize: 11, color: '#5A5550' }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {earningsData.length > 1 && (
                      <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={earningsData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid stroke="rgba(197,151,87,0.04)" strokeDasharray="3 3" />
                            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#5A5550' }} axisLine={{ stroke: 'rgba(197,151,87,0.06)' }} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#5A5550' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTip />} />
                            <Bar dataKey="earned" name="Earned" radius={[3, 3, 0, 0]}>
                              {earningsData.map((d, i) => <Cell key={i} fill={d.earned > 0 ? '#C59757' : '#1C2418'} fillOpacity={d.earned > 0 ? 1 : 0.3} />)}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Browse */
          <motion.div key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="label" style={{ marginBottom: 16, fontSize: 12 }}>Top-rated horses</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {topHorses.map(p => {
                const sc = SC[p.style] || '#8A847E';
                return (
                  <button key={p.name} onClick={() => selectHorse(p.name)} className="card"
                    style={{ padding: 0, textAlign: 'left', cursor: 'pointer', background: '#141A10', overflow: 'hidden' }}>
                    {/* Square portrait */}
                    <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden' }}>
                      <img src={getPortrait(p.name)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'brightness(0.45) saturate(0.55)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(20,26,16,0.97) 100%)' }} />
                      {p.gpsScore != null && (
                        <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: p.gpsScore >= 85 ? '#C59757' : '#8A847E', background: 'rgba(13,17,10,0.7)', padding: '5px 12px', borderRadius: 3, backdropFilter: 'blur(4px)' }}>
                          {p.gpsScore}
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 14px' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: '#D6D1CC', marginBottom: 8, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{p.name}</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                          {p.style && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 2, color: sc, background: `${sc}15`, backdropFilter: 'blur(4px)' }}>{p.style === 'Front Runner' ? 'Speed' : p.style}</span>}
                          <span style={{ fontSize: 11, color: '#8A847E' }}>{p.record}</span>
                          <span style={{ fontSize: 11, color: '#C59757' }}>${p.totalEarnings?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#5A5550' }}>
                          <span>{p.numRaces} races</span>
                          {p.hasGPS && <span style={{ color: '#52B788' }}>{p.numGPSRaces} GPS</span>}
                          <span>Avg fin: {p.avgFinish || '—'}</span>
                        </div>
                      </div>
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
