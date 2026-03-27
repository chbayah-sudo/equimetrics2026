import { motion } from 'framer-motion';
import { Activity, Eye, Zap, BarChart3, Target, Layers } from 'lucide-react';
import { HorseRunning, HorseGalloping, HorseSilhouette, TripleHorses } from '../components/HorseIcon';
import ComparisonTable from '../components/ComparisonTable';
import { comparisonData } from '../data/raceData';

export default function Insights() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 64px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glow-green" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(82,183,136,0.12), rgba(27,67,50,0.2))', border: '1px solid rgba(82,183,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity style={{ width: 22, height: 22, color: '#52B788' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE8' }}>GPS Insights</h1>
            <p style={{ fontSize: 13, color: '#4A5D54' }}>Why GPS data changes everything about race analysis</p>
          </div>
        </div>
      </motion.div>

      {/* Side-by-side visual comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
        {/* Traditional */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="glass-card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.03 }}>
            <HorseSilhouette className="w-32 h-24" color="#8A9B92" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Eye style={{ width: 22, height: 22, color: '#4A5D54' }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#8A9B92' }}>Traditional Data</h3>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 700, color: '#4A5D54', marginBottom: 4 }}>{comparisonData.traditional.dataPoints}</div>
          <div style={{ fontSize: 14, color: '#8A9B92', marginBottom: 16 }}>{comparisonData.traditional.label}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {comparisonData.traditional.metrics.map((m) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8A9B92' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A5D54' }} />{m}
              </div>
            ))}
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(82,183,136,0.06)' }}>
            <p style={{ fontSize: 12, color: '#4A5D54', fontStyle: 'italic' }}>"{comparisonData.traditional.example}"</p>
          </div>
          <div style={{ marginTop: 10, fontSize: 10, fontFamily: 'var(--font-mono)', color: '#4A5D54' }}>
            Precision: {comparisonData.traditional.precision}
          </div>
        </motion.div>

        {/* GPS */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="glass-card-terra glow-terra" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.04 }}>
            <HorseGalloping className="w-32 h-20" color="#E07A5F" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Zap style={{ width: 22, height: 22, color: '#E07A5F' }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#E07A5F' }}>GPS Enhanced</h3>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 700, color: '#E07A5F', marginBottom: 4 }}>{comparisonData.gps.dataPoints}+</div>
          <div style={{ fontSize: 14, color: '#8A9B92', marginBottom: 16 }}>{comparisonData.gps.label}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {comparisonData.gps.metrics.map((m) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E07A5F', opacity: 0.8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E07A5F' }} />{m}
              </div>
            ))}
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: 'rgba(194,101,58,0.06)', border: '1px solid rgba(194,101,58,0.15)' }}>
            <p style={{ fontSize: 12, color: '#8A9B92', fontStyle: 'italic' }}>"{comparisonData.gps.example}"</p>
          </div>
          <div style={{ marginTop: 10, fontSize: 10, fontFamily: 'var(--font-mono)', color: '#E07A5F', opacity: 0.6 }}>
            Precision: {comparisonData.gps.precision}
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: 32 }}>
        <ComparisonTable />
      </motion.div>

      {/* Capabilities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <TripleHorses className="w-16 h-8" color="#52B788" />
          What GPS Unlocks
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: Target, title: 'Ground Loss Detection', desc: 'Measure exact extra distance traveled by horses running wide. Reveals hidden talent traditional data completely misses.', color: '#E8B86D' },
            { icon: BarChart3, title: 'True Sectional Speed', desc: 'Exact speed for every horse at every gate — not just the leader. Complete velocity profiles for smarter comparisons.', color: '#52B788' },
            { icon: Layers, title: 'Stride Biomechanics', desc: 'Stride count and length at every section. Detect fatigue onset, stamina ceilings, and fitness changes across races.', color: '#9B72CF' },
            { icon: Activity, title: 'Running Style DNA', desc: 'Classify beyond simple labels. GPS reveals acceleration curves, energy distribution, and tactical patterns with precision.', color: '#74C69D' },
            { icon: Zap, title: 'Closing Velocity', desc: 'How fast at the finish? Direct measure of remaining energy that predicts next-race improvement.', color: '#E07A5F' },
            { icon: Eye, title: 'Hidden Trouble Flags', desc: 'Detect mid-race interference through anomalous sectional times. Project what the finish would have been.', color: '#EF5B5B' },
          ].map((cap, i) => (
            <motion.div key={cap.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card" style={{ padding: 24, position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'absolute', top: 8, right: 8, opacity: 0.03 }}>
                <HorseRunning className="w-16 h-16" color={cap.color} />
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${cap.color}10`, border: `1px solid ${cap.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <cap.icon style={{ width: 22, height: 22, color: cap.color }} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8', marginBottom: 8 }}>{cap.title}</h3>
              <p style={{ fontSize: 12, color: '#8A9B92', lineHeight: 1.6 }}>{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Extensibility */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="glass-card-green glow-green" style={{ marginTop: 32, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)', opacity: 0.03 }}>
          <TripleHorses className="w-48 h-24" color="#52B788" />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#F0EDE8', marginBottom: 12 }}>
          Extensibility: What About Non-GPS Tracks?
        </h3>
        <p style={{ fontSize: 13, color: '#8A9B92', lineHeight: 1.6, marginBottom: 20 }}>
          Only 32 of 117 tracks currently have GPS. GallopIQ works everywhere:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { label: 'GPS Tracks', value: '32', sub: 'Full telemetry', color: '#52B788' },
            { label: 'Calibration Model', value: '85%', sub: 'Prediction accuracy from traditional data', color: '#E8B86D' },
            { label: 'All Tracks', value: '117', sub: 'Supported with degraded confidence', color: '#74C69D' },
          ].map((item) => (
            <div key={item.label} style={{ padding: 16, borderRadius: 12, background: 'rgba(10,15,13,0.4)', border: '1px solid rgba(82,183,136,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, marginBottom: 4, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{item.label}</div>
              <div style={{ fontSize: 10, color: '#4A5D54', marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#4A5D54', marginTop: 16, lineHeight: 1.6 }}>
          By training on races with both GPS and traditional data, we build a translation model that generates
          synthetic GPS-like metrics from traditional data. This quantifies the business case for GPS expansion.
        </p>
      </motion.div>
    </div>
  );
}
