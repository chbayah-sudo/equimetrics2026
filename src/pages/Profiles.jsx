import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const profiles = [
  {
    name: 'Interstatelovesong', color: '#52B788', style: 'Front Runner',
    record: '1-0-0', bestSpeed: '38.8 mph', avgStride: '24.1 ft',
    stamina: 92, acceleration: 95, topSpeed: 88, consistency: 85, efficiency: 96, closing: 72,
    speed: [34.2, 36.8, 37.5, 38.1, 38.5, 38.8, 38.5, 38.0, 37.5, 37.0, 36.5, 36.0],
    stride: [23.5, 24.0, 24.2, 24.5, 24.3, 24.0, 23.8, 23.5, 23.2, 23.0],
    bio: 'Dominant front-runner with explosive early speed. Led gate-to-wire in debut. GPS shows minimal ground loss (4m), running closest to the rail.'
  },
  {
    name: 'Lady Chatterley', color: '#E8B86D', style: 'Closer',
    record: '0-1-0', bestSpeed: '38.8 mph', avgStride: '24.3 ft',
    stamina: 96, acceleration: 78, topSpeed: 90, consistency: 82, efficiency: 68, closing: 97,
    speed: [33.5, 36.5, 37.2, 37.8, 38.2, 38.5, 38.8, 38.5, 38.0, 37.8, 37.5, 37.2],
    stride: [23.3, 23.8, 24.0, 24.3, 24.5, 24.5, 24.3, 24.2, 24.0, 23.8],
    bio: 'Powerful closer with the highest closing velocity in the field. Ran 19m extra due to wide trips. GPS-adjusted analysis reveals she was the fastest horse in the race.'
  },
  {
    name: 'Some Ride', color: '#9B72CF', style: 'Stalker',
    record: '0-0-1', bestSpeed: '37.5 mph', avgStride: '23.6 ft',
    stamina: 84, acceleration: 82, topSpeed: 80, consistency: 88, efficiency: 85, closing: 78,
    speed: [33.0, 36.0, 36.5, 37.0, 37.2, 37.5, 37.0, 36.5, 36.0, 35.8, 35.5, 35.2],
    stride: [22.9, 23.2, 23.5, 23.8, 23.5, 23.2, 23.0, 22.8, 22.5, 22.5],
    bio: 'Tactical stalker who sat in position throughout. Moderate ground loss (12m). Stride shows slight fatigue in the final furlong — may benefit from shorter distances.'
  },
];

export default function Profiles() {
  const [sel, setSel] = useState(0);
  const h = profiles[sel];
  const radar = [
    { t: 'Speed', v: h.topSpeed }, { t: 'Accel', v: h.acceleration },
    { t: 'Stamina', v: h.stamina }, { t: 'Closing', v: h.closing },
    { t: 'Efficiency', v: h.efficiency }, { t: 'Consist.', v: h.consistency },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Horse DNA</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 40 }}>Horse DNA</h1>
      </motion.div>

      {/* Selector */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 48 }}>
        {profiles.map((p, i) => (
          <button key={p.name} onClick={() => setSel(i)}
            style={{ padding: '12px 24px', borderRadius: 3, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 300ms',
              background: sel === i ? '#141A10' : 'transparent',
              border: sel === i ? '1px solid rgba(197,151,87,0.15)' : '1px solid rgba(197,151,87,0.04)',
              color: sel === i ? '#C59757' : '#5A5550' }}>
            {p.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
          {/* Profile header */}
          <div className="card-flat" style={{ padding: 36, marginBottom: 32 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
              <div style={{ flex: '1 1 420px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color }} />
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500, color: '#C59757' }}>{h.name}</h2>
                </div>
                <div className="label" style={{ marginBottom: 20 }}>{h.style}</div>
                <p style={{ fontSize: 16, color: '#8A847E', lineHeight: 1.8, marginBottom: 24 }}>{h.bio}</p>
                <div style={{ display: 'flex', gap: 32, fontSize: 13 }}>
                  {[['Record', h.record], ['Top Speed', h.bestSpeed], ['Avg Stride', h.avgStride]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ color: '#5A5550', marginBottom: 4 }}>{l}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', color: '#D6D1CC', fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 240, height: 200, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radar} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="rgba(197,151,87,0.06)" />
                    <PolarAngleAxis dataKey="t" tick={{ fontSize: 10, fill: '#5A5550', fontFamily: 'var(--font-mono)' }} />
                    <Radar dataKey="v" stroke={h.color} fill={h.color} fillOpacity={0.08} strokeWidth={1.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Curves */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            {[['Speed Profile', 'mph', h.speed, 'speed'], ['Stride Pattern', 'ft', h.stride, 'stride']].map(([title, unit, data, key]) => (
              <div key={key} className="card-flat" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#D6D1CC' }}>{title}</h3>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>{unit}</span>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={data.map((v, i) => ({ i, v }))}>
                    <defs>
                      <linearGradient id={`pg-${key}-${sel}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={h.color} stopOpacity={0.08} />
                        <stop offset="100%" stopColor={h.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={h.color} strokeWidth={1.5} fill={`url(#pg-${key}-${sel})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Attributes */}
          <div className="card-flat" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#D6D1CC', marginBottom: 24 }}>Attributes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
              {[['Top Speed', h.topSpeed], ['Acceleration', h.acceleration], ['Stamina', h.stamina], ['Closing Power', h.closing], ['Efficiency', h.efficiency], ['Consistency', h.consistency]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 15, color: '#8A847E' }}>{label}</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#C59757' }}>{val}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 1, background: '#1C2418', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: 1, background: `linear-gradient(90deg, ${h.color}60, ${h.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
