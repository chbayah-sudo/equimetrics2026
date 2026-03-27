import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Timer, Ruler } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { HorseRunning, HorseHead, HorseSilhouette } from '../components/HorseIcon';

const horseProfiles = [
  {
    name: 'Interstatelovesong', color: '#52B788', style: 'Front Runner', styleColor: '#52B788',
    record: '1-0-0 from 1 start', bestSpeed: '38.8 mph', avgStride: '24.1 ft',
    stamina: 92, acceleration: 95, topSpeed: 88, consistency: 85, groundEfficiency: 96, closingPower: 72,
    speedHistory: [34.2, 36.8, 37.5, 38.1, 38.5, 38.8, 38.5, 38.0, 37.5, 37.0, 36.5, 36.0],
    strideHistory: [23.5, 24.0, 24.2, 24.5, 24.3, 24.0, 23.8, 23.5, 23.2, 23.0],
    bio: 'Dominant front-runner with explosive early speed. Led gate-to-wire in debut. GPS shows minimal ground loss (4m), running closest to the rail.'
  },
  {
    name: 'Lady Chatterley', color: '#E8B86D', style: 'Closer', styleColor: '#9B72CF',
    record: '0-1-0 from 1 start', bestSpeed: '38.8 mph', avgStride: '24.3 ft',
    stamina: 96, acceleration: 78, topSpeed: 90, consistency: 82, groundEfficiency: 68, closingPower: 97,
    speedHistory: [33.5, 36.5, 37.2, 37.8, 38.2, 38.5, 38.8, 38.5, 38.0, 37.8, 37.5, 37.2],
    strideHistory: [23.3, 23.8, 24.0, 24.3, 24.5, 24.5, 24.3, 24.2, 24.0, 23.8],
    bio: 'Powerful closer with the highest closing velocity (37.2 mph at finish). Ran 19m extra due to wide trips. GPS-adjusted analysis reveals she was the fastest horse in the race.'
  },
  {
    name: 'Some Ride', color: '#74C69D', style: 'Stalker', styleColor: '#E8B86D',
    record: '0-0-1 from 1 start', bestSpeed: '37.5 mph', avgStride: '23.6 ft',
    stamina: 84, acceleration: 82, topSpeed: 80, consistency: 88, groundEfficiency: 85, closingPower: 78,
    speedHistory: [33.0, 36.0, 36.5, 37.0, 37.2, 37.5, 37.0, 36.5, 36.0, 35.8, 35.5, 35.2],
    strideHistory: [22.9, 23.2, 23.5, 23.8, 23.5, 23.2, 23.0, 22.8, 22.5, 22.5],
    bio: 'Tactical stalker with consistent positioning. Moderate ground loss (12m). Stride data shows slight fatigue in the final furlong — may benefit from shorter distances.'
  },
];

export default function Profiles() {
  const [selected, setSelected] = useState(0);
  const horse = horseProfiles[selected];

  const radarData = [
    { trait: 'Speed', value: horse.topSpeed },
    { trait: 'Accel', value: horse.acceleration },
    { trait: 'Stamina', value: horse.stamina },
    { trait: 'Closing', value: horse.closingPower },
    { trait: 'Efficiency', value: horse.groundEfficiency },
    { trait: 'Consistency', value: horse.consistency },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 64px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glow-green" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(82,183,136,0.12), rgba(27,67,50,0.2))', border: '1px solid rgba(82,183,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HorseHead className="w-6 h-6" color="#52B788" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE8' }}>Horse Profiles</h1>
            <p style={{ fontSize: 13, color: '#4A5D54' }}>GPS-derived running style DNA & performance signatures</p>
          </div>
        </div>
      </motion.div>

      {/* Horse selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
        {horseProfiles.map((h, i) => (
          <button key={h.name} onClick={() => setSelected(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 14,
              fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s',
              background: selected === i ? `linear-gradient(135deg, ${h.color}12, rgba(15,26,21,0.8))` : 'rgba(15,26,21,0.6)',
              border: selected === i ? `1px solid ${h.color}35` : '1px solid rgba(82,183,136,0.08)',
              color: selected === i ? h.color : '#8A9B92',
              boxShadow: selected === i ? `0 0 20px ${h.color}15` : 'none',
            }}
          >
            <HorseRunning className="w-5 h-5" color={selected === i ? h.color : '#4A5D54'} />
            {h.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={selected} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
          {/* Profile card */}
          <div className="glass-card-terra glow-terra" style={{ padding: 28, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            {/* Decorative watermark */}
            <div style={{ position: 'absolute', top: '50%', right: 30, transform: 'translateY(-50%)', opacity: 0.03, pointerEvents: 'none' }}>
              <HorseSilhouette className="w-64 h-48" color={horse.color} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, position: 'relative', zIndex: 2 }}>
              {/* Left: info */}
              <div style={{ flex: '1 1 400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${horse.color}15`, border: `2px solid ${horse.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HorseHead className="w-8 h-8" color={horse.color} />
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: horse.color }}>{horse.name}</h2>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: 6, background: `${horse.styleColor}12`, color: horse.styleColor, border: `1px solid ${horse.styleColor}20` }}>{horse.style}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#8A9B92', lineHeight: 1.7, marginBottom: 20 }}>{horse.bio}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  {[
                    { icon: Activity, label: 'Record', value: horse.record },
                    { icon: Zap, label: 'Top Speed', value: horse.bestSpeed },
                    { icon: Ruler, label: 'Avg Stride', value: horse.avgStride },
                  ].map((s) => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <s.icon style={{ width: 14, height: 14, color: '#52B788' }} />
                      <span style={{ fontSize: 11, color: '#4A5D54' }}>{s.label}:</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#F0EDE8' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: radar */}
              <div style={{ width: 260, height: 220, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="rgba(82,183,136,0.08)" />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 10, fill: '#4A5D54', fontFamily: 'var(--font-mono)' }} />
                    <Radar dataKey="value" stroke={horse.color} fill={horse.color} fillOpacity={0.12} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Speed & stride curves */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { label: 'Speed Profile', sub: 'Velocity through race (mph)', data: horse.speedHistory, key: 'speed', icon: Zap },
              { label: 'Stride Pattern', sub: 'Stride length through race (ft)', data: horse.strideHistory, key: 'stride', icon: Timer },
            ].map((chart) => (
              <div key={chart.key} className="glass-card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 10, right: 10, opacity: 0.03 }}>
                  <HorseRunning className="w-16 h-16" color={horse.color} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>{chart.label}</h3>
                    <p style={{ fontSize: 10, color: '#4A5D54', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{chart.sub}</p>
                  </div>
                  <chart.icon style={{ width: 16, height: 16, color: horse.color }} />
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={chart.data.map((v, i) => ({ gate: i, val: v }))}>
                    <defs>
                      <linearGradient id={`profGrad-${chart.key}-${selected}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={horse.color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={horse.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke={horse.color} strokeWidth={2} fill={`url(#profGrad-${chart.key}-${selected})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Attribute bars */}
          <div className="glass-card" style={{ padding: 24, marginTop: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8', marginBottom: 16 }}>Performance Attributes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px 32px' }}>
              {[
                { label: 'Top Speed', value: horse.topSpeed },
                { label: 'Acceleration', value: horse.acceleration },
                { label: 'Stamina', value: horse.stamina },
                { label: 'Closing Power', value: horse.closingPower },
                { label: 'Ground Efficiency', value: horse.groundEfficiency },
                { label: 'Consistency', value: horse.consistency },
              ].map((attr) => (
                <div key={attr.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#8A9B92' }}>{attr.label}</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, color: horse.color }}>{attr.value}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(82,183,136,0.06)', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${attr.value}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${horse.color}50, ${horse.color})` }} />
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
