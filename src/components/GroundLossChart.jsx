import { motion } from 'framer-motion';
import { HorseGalloping } from './HorseIcon';
import { groundLossData, featuredRace } from '../data/raceData';

export default function GroundLossChart() {
  const maxLoss = Math.max(...groundLossData.map((d) => d.groundLoss));
  const getColor = (name) => featuredRace.horses.find((h) => h.name === name)?.color || '#C2653A';

  return (
    <div className="glass-card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', bottom: 5, right: 10, opacity: 0.03, pointerEvents: 'none' }}>
        <HorseGalloping className="w-40 h-24" color="#E07A5F" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>Ground Loss Analysis</h3>
          <p style={{ fontSize: 11, color: '#4A5D54', marginTop: 2 }}>Extra distance vs. rail path (meters)</p>
        </div>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6, background: 'rgba(232,184,109,0.1)', color: '#E8B86D', border: '1px solid rgba(232,184,109,0.15)' }}>GPS EXCLUSIVE</span>
      </div>

      <p style={{ fontSize: 12, color: '#8A9B92', marginBottom: 20, lineHeight: 1.6 }}>
        Horses running wider cover more ground. A horse finishing 2nd with high ground loss may actually be the strongest runner.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {groundLossData.sort((a, b) => b.groundLoss - a.groundLoss).map((horse, idx) => {
          const color = getColor(horse.name);
          const widthPct = (horse.groundLoss / maxLoss) * 100;
          const isHighValue = horse.groundLoss > 15;
          return (
            <motion.div key={horse.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{horse.name}</span>
                  {isHighValue && (
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: 4, background: 'rgba(232,184,109,0.1)', color: '#E8B86D', border: '1px solid rgba(232,184,109,0.15)' }}>HIDDEN VALUE</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: '#4A5D54' }}>{horse.totalDistance}m</span>
                  <span style={{ color: '#E07A5F', fontWeight: 700 }}>+{horse.groundLoss}m</span>
                </div>
              </div>
              <div style={{ height: 24, borderRadius: 8, background: 'rgba(255,255,255,0.02)', overflow: 'hidden', position: 'relative' }}>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${widthPct}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.08 }}
                  style={{ height: '100%', borderRadius: 8, background: `linear-gradient(90deg, ${color}15, ${color}30)`, borderRight: `3px solid ${color}` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Insight */}
      <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(232,184,109,0.04)', border: '1px solid rgba(232,184,109,0.12)' }}>
        <p style={{ fontSize: 12, color: '#8A9B92', lineHeight: 1.6 }}>
          <strong style={{ color: '#E8B86D' }}>Key Insight:</strong>{' '}
          <strong style={{ color: '#F0EDE8' }}>Lady Chatterley</strong> ran 19m more than the rail path yet finished 2nd.
          Her effort-adjusted speed was fastest in the field — a classic GPS-revealed hidden value.
        </p>
      </div>
    </div>
  );
}
