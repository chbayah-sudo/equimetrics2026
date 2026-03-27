import { motion } from 'framer-motion';
import ComparisonTable from '../components/ComparisonTable';
import { comparisonData } from '../data/raceData';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Insights() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>The Advantage</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 48 }}>GPS Edge</h1>
      </motion.div>

      {/* Side-by-side comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }}>
        {/* Traditional */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <div className="card-flat" style={{ padding: 36, height: '100%' }}>
            <div className="label" style={{ marginBottom: 20 }}>Traditional</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 56, fontWeight: 400, color: '#5A5550', marginBottom: 8 }}>
              {comparisonData.traditional.dataPoints}
            </div>
            <p style={{ fontSize: 16, color: '#8A847E', marginBottom: 24 }}>{comparisonData.traditional.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {comparisonData.traditional.metrics.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#5A5550' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#5A5550' }} />{m}
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderRadius: 3, background: '#1C2418' }}>
              <p style={{ fontSize: 13, color: '#5A5550', fontStyle: 'italic', lineHeight: 1.6 }}>"{comparisonData.traditional.example}"</p>
            </div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#5A5550', marginTop: 12 }}>{comparisonData.traditional.precision}</p>
          </div>
        </motion.div>

        {/* GPS */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <div className="card-flat" style={{ padding: 36, height: '100%', borderColor: 'rgba(197,151,87,0.12)' }}>
            <div className="label" style={{ color: '#C59757', marginBottom: 20 }}>GPS Enhanced</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 56, fontWeight: 400, color: '#C59757', marginBottom: 8 }}>
              {comparisonData.gps.dataPoints}+
            </div>
            <p style={{ fontSize: 16, color: '#8A847E', marginBottom: 24 }}>{comparisonData.gps.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {comparisonData.gps.metrics.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#C59757', opacity: 0.7 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C59757' }} />{m}
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderRadius: 3, background: 'rgba(197,151,87,0.06)' }}>
              <p style={{ fontSize: 14, color: '#8A847E', fontStyle: 'italic', lineHeight: 1.6 }}>"{comparisonData.gps.example}"</p>
            </div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#C59757', opacity: 0.5, marginTop: 12 }}>{comparisonData.gps.precision}</p>
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }} style={{ marginBottom: 64 }}>
        <ComparisonTable />
      </motion.div>

      {/* Capabilities */}
      <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Capabilities</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 40 }}>
          What GPS unlocks
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { title: 'Ground Loss Detection', desc: 'Measure exact extra distance traveled by horses running wide. Reveals hidden talent that traditional data completely misses.' },
            { title: 'True Sectional Speed', desc: 'Exact speed for every horse at every gate — not just the leader. Complete velocity profiles for smarter comparisons.' },
            { title: 'Stride Biomechanics', desc: 'Stride count and length at every section. Detect fatigue onset, stamina ceilings, and fitness changes across races.' },
            { title: 'Running Style DNA', desc: 'Classify horses beyond simple labels. GPS reveals acceleration curves, energy distribution, and tactical patterns.' },
            { title: 'Closing Velocity', desc: 'How fast at the finish — a direct measure of remaining energy that predicts next-race improvement.' },
            { title: 'Hidden Trouble Flags', desc: 'Detect mid-race interference through anomalous sectional times. Project what the finish would have been.' },
          ].map((c, i) => (
            <motion.div key={c.title} {...fadeUp} transition={{ delay: i * 0.06 }}>
              <div className="card" style={{ padding: 28 }}>
                <div className="gold-line" style={{ marginBottom: 16 }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC', marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: '#8A847E', lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Extensibility */}
      <motion.div {...fadeUp} style={{ marginTop: 64 }}>
        <div className="card-flat" style={{ padding: 36, borderColor: 'rgba(197,151,87,0.1)' }}>
          <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Extensibility</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: '#D6D1CC', marginBottom: 16 }}>
            Non-GPS tracks
          </h3>
          <p style={{ fontSize: 16, color: '#8A847E', lineHeight: 1.8, marginBottom: 32 }}>
            Only 32 of 117 tracks currently have GPS. Equimetrics is designed to work everywhere.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {[
              { value: '32', label: 'GPS Tracks', sub: 'Full telemetry' },
              { value: '85%', label: 'Calibration', sub: 'Prediction from traditional data' },
              { value: '117', label: 'All Tracks', sub: 'Supported with lower confidence' },
            ].map(s => (
              <div key={s.label} style={{ padding: 20, borderRadius: 3, background: '#1C2418' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#C59757', marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#D6D1CC' }}>{s.label}</div>
                <div style={{ fontSize: 13, color: '#5A5550', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#5A5550', marginTop: 24, lineHeight: 1.7 }}>
            By training on races with both GPS and traditional data, we build a translation model that generates synthetic GPS-like metrics. This quantifies the business case for GPS expansion.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
