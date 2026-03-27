import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Search, X } from 'lucide-react';
import allProfiles from '../data/horseProfiles.json';

const styleColors = { 'Front Runner': '#52B788', 'Stalker': '#E8B86D', 'Closer': '#9B72CF' };
const profileList = Object.values(allProfiles).sort((a, b) => (b.gpsScore || 0) - (a.gpsScore || 0));

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Profiles() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return profileList.filter(p => p.name.toLowerCase().includes(q)).slice(0, 15);
  }, [query]);

  const h = selected ? allProfiles[selected] : null;

  const selectHorse = (name) => {
    setSelected(name);
    setQuery('');
    setShowDropdown(false);
  };

  // Top horses for "browse" section
  const topHorses = useMemo(() => profileList.slice(0, 24), []);

  // Radar data
  const radarData = h ? [
    { t: 'Speed', v: h.bestPeak ? Math.min(100, (h.bestPeak / 42) * 100) : 0 },
    { t: 'Closing', v: h.avgClosing ? Math.min(100, (h.avgClosing / 40) * 100) : 0 },
    { t: 'Stamina', v: h.strideFade != null ? Math.max(0, Math.min(100, 50 - h.strideFade * 5)) : 50 },
    { t: 'Efficiency', v: h.avgGroundLoss != null ? Math.max(0, 100 - h.avgGroundLoss * 3) : 50 },
    { t: 'Consistency', v: h.numRaces >= 3 ? 80 : h.numRaces >= 2 ? 60 : 40 },
  ] : [];

  const color = h ? (styleColors[h.style] || '#C59757') : '#C59757';

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>

      {/* Header */}
      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 14, fontSize: 12 }}>Profiling</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 48px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 12 }}>
          Horse Profiles
        </h1>
        <p style={{ fontSize: 16, color: '#8A847E', maxWidth: 520, lineHeight: 1.7, marginBottom: 12 }}>
          Search any of {profileList.length.toLocaleString()} horses with GPS history to see their running style, speed profile, and performance attributes.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }} style={{ marginBottom: 40, position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px', borderRadius: 3,
          background: '#141A10', border: '1px solid rgba(197,151,87,0.1)',
          transition: 'border-color 300ms',
        }}>
          <Search style={{ width: 18, height: 18, color: '#5A5550', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by horse name..."
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 16, color: '#D6D1CC', fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setShowDropdown(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5550', padding: 4 }}>
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {showDropdown && results.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 30, marginTop: 4,
            background: '#141A10', border: '1px solid rgba(197,151,87,0.12)', borderRadius: 3,
            maxHeight: 360, overflowY: 'auto',
          }}>
            {results.map(p => (
              <button key={p.name} onClick={() => selectHorse(p.name)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '12px 20px', background: 'transparent', border: 'none',
                  borderBottom: '1px solid rgba(197,151,87,0.04)', cursor: 'pointer',
                  textAlign: 'left', transition: 'background 200ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#5A5550', marginTop: 2 }}>
                    {p.numRaces} GPS race{p.numRaces !== 1 ? 's' : ''} · {p.style}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontSize: 10, padding: '2px 6px', borderRadius: 2,
                    color: styleColors[p.style], background: `${styleColors[p.style]}12`,
                  }}>
                    {p.style === 'Front Runner' ? 'Speed' : p.style}
                  </span>
                  {p.gpsScore != null && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: p.gpsScore >= 85 ? '#C59757' : '#8A847E' }}>
                      {p.gpsScore}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Selected horse profile */}
      <AnimatePresence mode="wait">
        {h ? (
          <motion.div key={h.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

            {/* Profile header */}
            <div className="card-flat" style={{ padding: 36, marginBottom: 28 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
                <div style={{ flex: '1 1 420px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 500, color: '#C59757' }}>{h.name}</h2>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color, background: `${color}12`, border: `1px solid ${color}20` }}>
                      {h.style === 'Front Runner' ? 'Speed' : h.style}
                    </span>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 3, color: '#8A847E', background: '#1C2418' }}>
                      {h.numRaces} GPS race{h.numRaces !== 1 ? 's' : ''}
                    </span>
                    {h.gpsScore != null && (
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 3, color: '#C59757', background: 'rgba(197,151,87,0.08)', border: '1px solid rgba(197,151,87,0.15)' }}>
                        GPS Score: {h.gpsScore}
                      </span>
                    )}
                  </div>

                  {/* Stats grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {[
                      ['Best Speed', h.bestPeak ? `${h.bestPeak} mph` : '—'],
                      ['Avg Closing', h.avgClosing ? `${h.avgClosing} mph` : '—'],
                      ['Avg Ground Loss', h.avgGroundLoss != null ? `${h.avgGroundLoss}m` : '—'],
                      ['Stride Fade', h.strideFade != null ? `${h.strideFade}%` : '—'],
                      ['Avg Peak', h.avgPeak ? `${h.avgPeak} mph` : '—'],
                      ['Races w/ GPS', `${h.numRaces}`],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div style={{ fontSize: 12, color: '#5A5550', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: '#D6D1CC' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar */}
                <div style={{ width: 240, height: 200, flexShrink: 0 }}>
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

            {/* Speed curve */}
            {h.latestSpeeds?.length > 0 && (
              <div className="card-flat" style={{ padding: 28, marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div className="label" style={{ marginBottom: 8, fontSize: 11 }}>Latest Race</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#D6D1CC' }}>Speed Profile</h3>
                  </div>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>mph</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={h.latestSpeeds.map((v, i) => ({ i, v }))} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                    <defs>
                      <linearGradient id="profSpeedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.1} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill="url(#profSpeedGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Past performances */}
            {h.races?.length > 0 && (
              <div className="card-flat" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#D6D1CC' }}>
                    Recent GPS Performances
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 80px 80px 80px 80px', padding: '8px 24px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                  {['Race', 'Finish', 'Peak', 'Close', 'G. Loss', 'Speed'].map(h => (
                    <div key={h} className="label" style={{ fontSize: 10 }}>{h}</div>
                  ))}
                </div>
                {h.races.map((r, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 70px 80px 80px 80px 80px',
                    alignItems: 'center', padding: '12px 24px',
                    borderBottom: i < h.races.length - 1 ? '1px solid rgba(197,151,87,0.03)' : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, color: '#D6D1CC' }}>{r.track} R{r.raceNum}</div>
                      <div style={{ fontSize: 12, color: '#5A5550' }}>{r.date} · {r.distance} {r.surface}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: r.position === 1 ? '#C59757' : '#8A847E' }}>
                      {r.position || '—'}<span style={{ fontSize: 11, color: '#5A5550' }}>/{r.fieldSize || '?'}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8A847E' }}>{r.peakMPH || '—'}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8A847E' }}>{r.closingMPH || '—'}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: r.groundLoss > 10 ? '#C59757' : '#8A847E' }}>{r.groundLoss != null ? `+${r.groundLoss}m` : '—'}</div>
                    <div>
                      {r.speeds?.length > 0 && (
                        <div style={{ width: 72, height: 24 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={r.speeds.map((v, j) => ({ j, v }))} margin={{ top: 1, right: 0, left: 0, bottom: 1 }}>
                              <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1} fill="transparent" dot={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Browse top horses */
          <motion.div key="browse" {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="label" style={{ marginBottom: 16, fontSize: 12 }}>
              Or browse top-rated horses
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {topHorses.map(p => {
                const sc = styleColors[p.style] || '#5A5550';
                return (
                  <button key={p.name} onClick={() => selectHorse(p.name)}
                    className="card" style={{ padding: 20, textAlign: 'left', cursor: 'pointer', background: '#141A10' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC' }}>{p.name}</div>
                      {p.gpsScore != null && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: p.gpsScore >= 85 ? '#C59757' : '#8A847E' }}>
                          {p.gpsScore}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, color: sc, background: `${sc}12` }}>
                        {p.style === 'Front Runner' ? 'Speed' : p.style}
                      </span>
                      <span style={{ fontSize: 12, color: '#5A5550' }}>{p.numRaces} race{p.numRaces !== 1 ? 's' : ''}</span>
                    </div>
                    {p.latestSpeeds?.length > 0 && (
                      <div style={{ marginTop: 10, width: '100%', height: 28 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={p.latestSpeeds.map((v, i) => ({ i, v }))} margin={{ top: 1, right: 0, left: 0, bottom: 1 }}>
                            <defs>
                              <linearGradient id={`browse-${p.name.replace(/\W/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={sc} stopOpacity={0.1} />
                                <stop offset="100%" stopColor={sc} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke={sc} strokeWidth={1} fill={`url(#browse-${p.name.replace(/\W/g, '')})`} dot={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
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
