import { motion } from 'framer-motion';
import { Eye, Zap, Target, TrendingDown } from 'lucide-react';
import { HorseRunning, HorseGalloping } from '../components/HorseIcon';
import SpeedChart from '../components/SpeedChart';
import GroundLossChart from '../components/GroundLossChart';
import { featuredRace, groundLossData } from '../data/raceData';

export default function RaceXRay() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 64px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glow-green" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(82,183,136,0.12), rgba(27,67,50,0.2))', border: '1px solid rgba(82,183,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Eye style={{ width: 22, height: 22, color: '#52B788' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE8' }}>Race X-Ray</h1>
            <p style={{ fontSize: 13, color: '#4A5D54' }}>Deep GPS analytics — see what chart callers can't</p>
          </div>
        </div>
      </motion.div>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Peak Speed', value: '38.8 mph', sub: 'Interstatelovesong @ Gate 3', icon: Zap, color: '#52B788' },
          { label: 'Closing Velocity', value: '37.2 mph', sub: 'Lady Chatterley (fastest finish)', icon: Target, color: '#E8B86D' },
          { label: 'Max Ground Loss', value: '+19m', sub: 'Lady Chatterley (3-wide)', icon: TrendingDown, color: '#E07A5F' },
          { label: 'Stride Fade', value: '-6.2%', sub: "Dolly's Jolene (final 2F)", icon: Eye, color: '#9B72CF' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 8, right: 8, opacity: 0.04 }}>
              <HorseRunning className="w-12 h-12" color={stat.color} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4A5D54' }}>{stat.label}</span>
              <stat.icon style={{ width: 14, height: 14, color: stat.color }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: '#4A5D54', marginTop: 4 }}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SpeedChart type="speed" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GroundLossChart />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <SpeedChart type="stride" />
      </motion.div>

      {/* Effort-adjusted rankings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-card-terra glow-terra" style={{ marginTop: 24, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 10, right: 20, opacity: 0.03, pointerEvents: 'none' }}>
          <HorseGalloping className="w-40 h-24" color="#E07A5F" />
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(194,101,58,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <HorseRunning className="w-5 h-5" color="#E07A5F" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6, background: 'rgba(194,101,58,0.15)', color: '#F09070', border: '1px solid rgba(194,101,58,0.25)' }}>GPS EXCLUSIVE</span>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>Effort-Adjusted Rankings</h3>
            </div>
            <p style={{ fontSize: 11, color: '#4A5D54', marginTop: 2 }}>Recalculated rankings accounting for ground loss</p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(194,101,58,0.1)' }}>
                {['Adj. Rank', 'Horse', 'Official', 'Ground Loss', 'Distance', 'Verdict'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#4A5D54', textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 24px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groundLossData.sort((a, b) => a.adjustedRank - b.adjustedRank).map((horse, idx) => {
                const raceHorse = featuredRace.horses.find((h) => h.name === horse.name);
                const improved = horse.adjustedRank < (raceHorse?.finalPos || 99);
                return (
                  <tr key={horse.name} style={{ borderBottom: idx < groundLossData.length - 1 ? '1px solid rgba(194,101,58,0.06)' : 'none' }}>
                    <td style={{ padding: '12px 24px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#E07A5F' }}>#{horse.adjustedRank}</span>
                    </td>
                    <td style={{ padding: '12px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <HorseRunning className="w-4 h-4" color={raceHorse?.color} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{horse.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8A9B92' }}>{raceHorse?.finalPos || '-'}</td>
                    <td style={{ padding: '12px 24px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: horse.groundLoss > 15 ? '#E8B86D' : '#8A9B92' }}>+{horse.groundLoss}m</span>
                    </td>
                    <td style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8A9B92' }}>{horse.totalDistance}m</td>
                    <td style={{ padding: '12px 24px' }}>
                      <span style={{
                        fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6,
                        background: improved ? 'rgba(82,183,136,0.1)' : 'rgba(255,255,255,0.03)',
                        color: improved ? '#52B788' : '#4A5D54',
                        border: `1px solid ${improved ? 'rgba(82,183,136,0.15)' : 'rgba(255,255,255,0.05)'}`,
                      }}>
                        {improved ? 'UNDERVALUED' : 'FAIR'}
                      </span>
                    </td>
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
