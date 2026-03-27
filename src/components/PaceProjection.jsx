import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { HorseRunning } from './HorseIcon';
import { paceProjection, upcomingRaces, runningStyles } from '../data/raceData';

const HORSE_COLORS = { 'Floge': '#52B788', 'Luna Moth': '#E8B86D', 'Foxy Cara': '#9B72CF', 'Hauntress': '#5B8DEF', 'Troubled Luck': '#EF5B5B' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a, b) => a.value - b.value);
  return (
    <div style={{ background: 'rgba(15,26,21,0.95)', border: '1px solid rgba(194,101,58,0.2)', borderRadius: 12, padding: 12, backdropFilter: 'blur(12px)', minWidth: 140 }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#E07A5F', marginBottom: 8 }}>{label}</div>
      {sorted.map((entry) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 11, padding: '2px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
            <span style={{ color: '#8A9B92' }}>{entry.name}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#F0EDE8' }}>P{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PaceProjection() {
  const race = upcomingRaces[0];
  return (
    <div className="glass-card-terra glow-terra" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(194,101,58,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <HorseRunning className="w-5 h-5" color="#E07A5F" />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6, background: 'rgba(194,101,58,0.15)', color: '#F09070', border: '1px solid rgba(194,101,58,0.25)' }}>AI PROJECTION</span>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>Pace Scenario — {race.trackName} R{race.raceNumber}</h3>
          </div>
          <p style={{ fontSize: 11, color: '#4A5D54', fontFamily: 'var(--font-mono)' }}>
            {race.date} &middot; {race.distance} {race.surface} &middot; {race.type} &middot; {race.purse}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: '12px 24px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {race.horses.map((horse) => {
          const styleInfo = runningStyles[horse.style];
          return (
            <div key={horse.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, background: `${HORSE_COLORS[horse.name]}08`, border: `1px solid ${HORSE_COLORS[horse.name]}20` }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: HORSE_COLORS[horse.name] }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: '#F0EDE8' }}>{horse.name}</span>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 5px', borderRadius: 4, background: `${styleInfo.color}12`, color: styleInfo.color, border: `1px solid ${styleInfo.color}20` }}>{horse.style}</span>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div style={{ padding: '12px 16px 8px' }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={paceProjection} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="rgba(82,183,136,0.04)" strokeDasharray="3 3" />
            <XAxis dataKey="section" tick={{ fontSize: 10, fill: '#4A5D54', fontFamily: 'var(--font-mono)' }} axisLine={{ stroke: 'rgba(82,183,136,0.08)' }} tickLine={false} />
            <YAxis reversed domain={[1, 5]} tick={{ fontSize: 10, fill: '#4A5D54', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `P${v}`} />
            <Tooltip content={<CustomTooltip />} />
            {race.horses.map((horse) => (
              <Line key={horse.name} type="monotone" dataKey={horse.name} stroke={HORSE_COLORS[horse.name]} strokeWidth={2.5}
                dot={{ r: 4, fill: HORSE_COLORS[horse.name], stroke: '#0A0F0D', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Narrative */}
      <div style={{ padding: '0 24px 20px' }}>
        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(10,15,13,0.5)', border: '1px solid rgba(82,183,136,0.08)' }}>
          <p style={{ fontSize: 12, color: '#8A9B92', lineHeight: 1.7 }}>
            <strong style={{ color: '#E07A5F' }}>Projected:</strong> Floge breaks sharply and sets the pace.
            Luna Moth stalks in 2nd and strikes in the stretch. Foxy Cara fires a powerful late run.{' '}
            <strong style={{ color: '#E8B86D' }}>Value pick: Foxy Cara (4/1)</strong> — pace strongly favors closers.
          </p>
        </div>
      </div>
    </div>
  );
}
