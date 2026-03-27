import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { HorseRunning } from './HorseIcon';
import { featuredRace, speedData, strideData } from '../data/raceData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(15,26,21,0.95)', border: '1px solid rgba(194,101,58,0.2)', borderRadius: 12, padding: 12, backdropFilter: 'blur(12px)', minWidth: 160 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#E07A5F', marginBottom: 8 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 11, padding: '2px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
            <span style={{ color: '#8A9B92', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.name}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#F0EDE8' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function SpeedChart({ type = 'speed' }) {
  const [activeHorses, setActiveHorses] = useState(featuredRace.horses.map((h) => h.name));
  const data = type === 'speed' ? speedData : strideData;
  const yLabel = type === 'speed' ? 'MPH' : 'Feet';

  const toggleHorse = (name) => {
    setActiveHorses((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  return (
    <div className="glass-card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <HorseRunning className="w-5 h-5" color={type === 'speed' ? '#52B788' : '#E07A5F'} />
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>
              {type === 'speed' ? 'Speed Traces' : 'Stride Analysis'}
            </h3>
            <p style={{ fontSize: 11, color: '#4A5D54', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              {type === 'speed' ? 'Velocity per gate (mph)' : 'Stride length per section (ft)'}
            </p>
          </div>
        </div>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 8, background: type === 'speed' ? 'rgba(82,183,136,0.1)' : 'rgba(194,101,58,0.1)', color: type === 'speed' ? '#52B788' : '#E07A5F', border: `1px solid ${type === 'speed' ? 'rgba(82,183,136,0.15)' : 'rgba(194,101,58,0.15)'}` }}>
          {yLabel}
        </span>
      </div>

      {/* Horse toggles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {featuredRace.horses.map((horse) => {
          const isActive = activeHorses.includes(horse.name);
          return (
            <button
              key={horse.name}
              onClick={() => toggleHorse(horse.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8,
                fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                background: isActive ? `${horse.color}12` : 'rgba(255,255,255,0.02)',
                color: isActive ? horse.color : '#4A5D54',
                border: isActive ? `1px solid ${horse.color}30` : '1px solid transparent',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? horse.color : '#4A5D54' }} />
              {horse.name.length > 14 ? horse.name.substring(0, 14) + '...' : horse.name}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <defs>
            {featuredRace.horses.map((horse) => (
              <linearGradient key={horse.name} id={`grad-${type}-${horse.name.replace(/[^a-zA-Z]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={horse.color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={horse.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="rgba(82,183,136,0.04)" strokeDasharray="3 3" />
          <XAxis dataKey="gate" tick={{ fontSize: 10, fill: '#4A5D54', fontFamily: 'var(--font-mono)' }} axisLine={{ stroke: 'rgba(82,183,136,0.08)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#4A5D54', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} domain={type === 'speed' ? [30, 40] : [21, 25]} />
          <Tooltip content={<CustomTooltip />} />
          {featuredRace.horses.map((horse) =>
            activeHorses.includes(horse.name) ? (
              <Area key={horse.name} type="monotone" dataKey={horse.name} stroke={horse.color} strokeWidth={2}
                fill={`url(#grad-${type}-${horse.name.replace(/[^a-zA-Z]/g, '')})`}
                dot={false} activeDot={{ r: 4, fill: horse.color, stroke: '#0A0F0D', strokeWidth: 2 }} />
            ) : null
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
