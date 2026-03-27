import { motion } from 'framer-motion';
import { Zap, Clock, MapPin } from 'lucide-react';
import { HorseRunning, HorseGalloping } from '../components/HorseIcon';
import RaceReplay from '../components/RaceReplay';
import SpeedChart from '../components/SpeedChart';
import { featuredRace } from '../data/raceData';

export default function RaceNight() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 64, maxWidth: 1280, margin: '0 auto', padding: '96px 24px 64px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div className="glow-terra" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(194,101,58,0.15), rgba(27,67,50,0.2))', border: '1px solid rgba(194,101,58,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HorseGalloping className="w-6 h-4" color="#E07A5F" />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE8' }}>Race Night</h1>
            <p style={{ fontSize: 13, color: '#4A5D54' }}>GPS-powered race replay & telemetry</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {[
            { icon: MapPin, text: featuredRace.trackName, color: '#52B788' },
            { icon: Clock, text: featuredRace.date, color: '#52B788' },
            { icon: Zap, text: `Race ${featuredRace.raceNumber} · ${featuredRace.distance} ${featuredRace.surface}`, color: '#52B788' },
          ].map((chip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(82,183,136,0.05)', border: '1px solid rgba(82,183,136,0.1)', fontSize: 12, fontFamily: 'var(--font-mono)', color: '#8A9B92' }}>
              <chip.icon style={{ width: 12, height: 12, color: chip.color }} />{chip.text}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(194,101,58,0.08)', border: '1px solid rgba(194,101,58,0.15)', fontSize: 12, fontFamily: 'var(--font-mono)', color: '#E07A5F' }}>
            <HorseRunning className="w-3.5 h-3.5" color="#E07A5F" />
            {featuredRace.type} · {featuredRace.purse}
          </div>
        </div>
      </motion.div>

      {/* Replay */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 24 }}>
        <RaceReplay />
      </motion.div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SpeedChart type="speed" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <SpeedChart type="stride" />
        </motion.div>
      </div>

      {/* Results */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-card" style={{ marginTop: 24, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 10, right: 20, opacity: 0.03, pointerEvents: 'none' }}>
          <HorseGalloping className="w-36 h-20" color="#52B788" />
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>Final Results</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
                {['Finish', 'Horse', 'Post', 'Odds', 'Result'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#4A5D54', textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 24px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...featuredRace.horses].sort((a, b) => a.finalPos - b.finalPos).map((horse, idx) => (
                <tr key={horse.name} style={{ borderBottom: idx < featuredRace.horses.length - 1 ? '1px solid rgba(82,183,136,0.05)' : 'none' }}>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', background: idx === 0 ? `${horse.color}20` : 'rgba(255,255,255,0.03)', color: idx === 0 ? horse.color : '#4A5D54', border: idx === 0 ? `1px solid ${horse.color}40` : '1px solid transparent' }}>
                      {horse.finalPos}
                    </div>
                  </td>
                  <td style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <HorseRunning className="w-4 h-4" color={horse.color} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{horse.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'var(--font-mono)', color: '#8A9B92' }}>{horse.post}</td>
                  <td style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'var(--font-mono)', color: '#8A9B92' }}>{horse.odds}</td>
                  <td style={{ padding: '12px 24px' }}>
                    <span style={{
                      fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6,
                      background: horse.finalPos === 1 ? 'rgba(82,183,136,0.1)' : horse.finalPos <= 3 ? 'rgba(232,184,109,0.1)' : 'rgba(255,255,255,0.03)',
                      color: horse.finalPos === 1 ? '#52B788' : horse.finalPos <= 3 ? '#E8B86D' : '#4A5D54',
                      border: `1px solid ${horse.finalPos === 1 ? 'rgba(82,183,136,0.15)' : horse.finalPos <= 3 ? 'rgba(232,184,109,0.15)' : 'rgba(255,255,255,0.05)'}`,
                    }}>
                      {horse.finalPos === 1 ? 'WINNER' : horse.finalPos <= 3 ? `PLACED ${horse.finalPos}` : `${horse.finalPos}th`}
                    </span>
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
