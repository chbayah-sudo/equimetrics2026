import { motion } from 'framer-motion';
import { Check, Zap, Eye } from 'lucide-react';
import { HorseRunning } from './HorseIcon';

const rows = [
  { metric: 'Position Tracking', traditional: '5 checkpoints', gps: '13+ gates (per 1/16 mile)', gpsWin: true },
  { metric: 'Speed Data', traditional: 'Leader only (beam timing)', gps: 'Every horse, every section', gpsWin: true },
  { metric: 'Distance Traveled', traditional: 'Not measured', gps: 'Actual meters per horse', gpsWin: true },
  { metric: 'Stride Analysis', traditional: 'Not available', gps: 'Count + length per section', gpsWin: true },
  { metric: 'Ground Loss', traditional: 'Not measurable', gps: 'Rail vs actual path difference', gpsWin: true },
  { metric: 'Timing Precision', traditional: 'Binoculars + notepad', gps: '10Hz RTK GPS (10x/sec)', gpsWin: true },
  { metric: 'Track Coverage', traditional: 'All 117 tracks', gps: '32 tracks (expanding)', gpsWin: false },
];

export default function ComparisonTable() {
  return (
    <div className="glass-card" style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Decorative horse watermark */}
      <div style={{ position: 'absolute', bottom: 10, right: 20, opacity: 0.03, pointerEvents: 'none' }}>
        <HorseRunning className="w-28 h-28" color="#52B788" />
      </div>

      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Zap style={{ width: 18, height: 18, color: '#E07A5F' }} />
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8' }}>Why GPS Changes Everything</h3>
          <p style={{ fontSize: 12, color: '#4A5D54', marginTop: 2 }}>Traditional chart-caller data vs. GPS tracking</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
              <th style={{ textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#4A5D54', textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 24px', width: '33%' }}>Metric</th>
              <th style={{ textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#4A5D54', textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 24px', width: '33%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Eye style={{ width: 12, height: 12 }} /> Traditional</span>
              </th>
              <th style={{ textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#E07A5F', textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 24px', width: '33%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Zap style={{ width: 12, height: 12 }} /> GPS Enhanced</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <motion.tr
                key={row.metric}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                style={{ borderBottom: idx < rows.length - 1 ? '1px solid rgba(82,183,136,0.05)' : 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(82,183,136,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{row.metric}</td>
                <td style={{ padding: '14px 24px', fontSize: 13, color: '#8A9B92' }}>{row.traditional}</td>
                <td style={{ padding: '14px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {row.gpsWin ? (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check style={{ width: 10, height: 10, color: '#52B788' }} />
                      </div>
                    ) : (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(232,184,109,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 9, color: '#E8B86D' }}>~</span>
                      </div>
                    )}
                    <span style={{ fontSize: 13, fontWeight: 500, color: row.gpsWin ? '#52B788' : '#E8B86D' }}>{row.gps}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
