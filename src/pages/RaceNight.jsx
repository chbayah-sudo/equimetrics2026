import { motion } from 'framer-motion';
import RaceReplay from '../components/RaceReplay';
import SpeedChart from '../components/SpeedChart';
import { featuredRace } from '../data/raceData';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function RaceNight() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 14, fontSize: 12 }}>Replay</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 10 }}>Live Replay</h1>
        <p style={{ fontSize: 16, color: '#5A5550', marginBottom: 10 }}>GPS-powered race replay and telemetry</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, fontFamily: 'var(--font-mono)', color: '#5A5550', marginBottom: 48 }}>
          <span>{featuredRace.trackName}</span>
          <span style={{ color: 'rgba(197,151,87,0.2)' }}>·</span>
          <span>{featuredRace.date}</span>
          <span style={{ color: 'rgba(197,151,87,0.2)' }}>·</span>
          <span>{featuredRace.distance} {featuredRace.surface}</span>
          <span style={{ color: 'rgba(197,151,87,0.2)' }}>·</span>
          <span style={{ color: '#C59757' }}>{featuredRace.type} {featuredRace.purse}</span>
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ delay: 0.1 }} style={{ marginBottom: 32 }}>
        <RaceReplay />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 32 }}>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}><SpeedChart type="speed" /></motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}><SpeedChart type="stride" /></motion.div>
      </div>

      <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
        <div className="card-flat" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>Final Results</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(197,151,87,0.06)' }}>
                {['Finish', 'Horse', 'Post', 'Odds', 'Result'].map(h => (
                  <th key={h} className="label" style={{ textAlign: 'left', padding: '14px 28px', fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...featuredRace.horses].sort((a, b) => a.finalPos - b.finalPos).map((horse, i) => (
                <tr key={horse.name} style={{ borderBottom: i < featuredRace.horses.length - 1 ? '1px solid rgba(197,151,87,0.04)' : 'none' }}>
                  <td style={{ padding: '14px 28px', fontFamily: 'var(--font-serif)', fontSize: 18, color: i === 0 ? '#C59757' : '#5A5550' }}>{horse.finalPos}</td>
                  <td style={{ padding: '14px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: horse.color }} />
                      <span style={{ fontSize: 15, color: '#D6D1CC' }}>{horse.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 28px', fontSize: 14, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>{horse.post}</td>
                  <td style={{ padding: '14px 28px', fontSize: 14, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>{horse.odds}</td>
                  <td style={{ padding: '14px 28px', fontSize: 14, color: i === 0 ? '#C59757' : '#5A5550' }}>
                    {horse.finalPos === 1 ? 'Winner' : horse.finalPos <= 3 ? `Placed ${horse.finalPos}` : `${horse.finalPos}th`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
