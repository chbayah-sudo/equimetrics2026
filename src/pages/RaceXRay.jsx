import { motion } from 'framer-motion';
import SpeedChart from '../components/SpeedChart';
import GroundLossChart from '../components/GroundLossChart';
import { featuredRace, groundLossData } from '../data/raceData';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function RaceXRay() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Deep Analysis</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 8 }}>Race X-Ray</h1>
        <p style={{ fontSize: 14, color: '#5A5550', marginBottom: 48 }}>See what chart callers cannot</p>
      </motion.div>

      {/* Key metrics */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
        <div className="card-flat" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '32px 0', marginBottom: 32 }}>
          {[
            { value: '38.8', unit: 'mph', label: 'Peak Speed', sub: 'Interstatelovesong' },
            { value: '37.2', unit: 'mph', label: 'Closing Velocity', sub: 'Lady Chatterley' },
            { value: '+19', unit: 'm', label: 'Max Ground Loss', sub: 'Lady Chatterley' },
            { value: '-6.2', unit: '%', label: 'Stride Fade', sub: "Dolly's Jolene" },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid rgba(197,151,87,0.06)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#C59757' }}>
                {s.value}<span style={{ fontSize: 16, color: '#5A5550', marginLeft: 2 }}>{s.unit}</span>
              </div>
              <div className="label" style={{ marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#5A5550', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 32 }}>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}><SpeedChart type="speed" /></motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}><GroundLossChart /></motion.div>
      </div>

      <motion.div {...fadeUp} transition={{ delay: 0.4 }} style={{ marginBottom: 32 }}>
        <SpeedChart type="stride" />
      </motion.div>

      {/* Effort-adjusted rankings */}
      <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
        <div className="card-flat" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
            <div className="label" style={{ color: '#C59757', marginBottom: 8 }}>GPS Exclusive</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: '#D6D1CC' }}>Effort-Adjusted Rankings</h3>
            <p style={{ fontSize: 13, color: '#5A5550', marginTop: 4 }}>Rankings recalculated for ground loss</p>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                {['Adj.', 'Horse', 'Official', 'Ground Loss', 'Verdict'].map(h => (
                  <th key={h} className="label" style={{ textAlign: 'left', padding: '14px 28px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groundLossData.sort((a, b) => a.adjustedRank - b.adjustedRank).map((horse, i) => {
                const rh = featuredRace.horses.find(h => h.name === horse.name);
                const improved = horse.adjustedRank < (rh?.finalPos || 99);
                return (
                  <tr key={horse.name} style={{ borderBottom: i < groundLossData.length - 1 ? '1px solid rgba(197,151,87,0.04)' : 'none' }}>
                    <td style={{ padding: '12px 28px', fontFamily: 'var(--font-serif)', fontSize: 16, color: '#C59757' }}>#{horse.adjustedRank}</td>
                    <td style={{ padding: '12px 28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: rh?.color }} />
                        <span style={{ fontSize: 14, color: '#D6D1CC' }}>{horse.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#5A5550' }}>{rh?.finalPos}</td>
                    <td style={{ padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 13, color: horse.groundLoss > 15 ? '#C59757' : '#5A5550' }}>+{horse.groundLoss}m</td>
                    <td style={{ padding: '12px 28px', fontSize: 12, color: improved ? '#C59757' : '#5A5550' }}>{improved ? 'Undervalued' : 'Fair'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
