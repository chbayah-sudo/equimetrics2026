import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, MapPin, Clock, Zap, Star } from 'lucide-react';
import { HorseRunning, HorseHead, HorseGalloping } from '../components/HorseIcon';
import PaceProjection from '../components/PaceProjection';
import { upcomingRaces, runningStyles } from '../data/raceData';

const HORSE_COLORS_MAP = {
  'Luna Moth': '#E8B86D', 'Floge': '#52B788', 'Foxy Cara': '#9B72CF',
  'Hauntress': '#5B8DEF', 'Troubled Luck': '#EF5B5B',
  'Storm Chaser': '#52B788', 'Night Protocol': '#E8B86D', 'Copper Ridge': '#74C69D',
  'Echo Valley': '#9B72CF', 'Bold Summit': '#EF5B5B',
};

export default function Preview() {
  const [selectedRace, setSelectedRace] = useState(0);
  const race = upcomingRaces[selectedRace];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 64px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glow-terra" style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(194,101,58,0.15), rgba(27,67,50,0.2))', border: '1px solid rgba(194,101,58,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp style={{ width: 22, height: 22, color: '#E07A5F' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE8' }}>Race Preview</h1>
            <p style={{ fontSize: 13, color: '#4A5D54' }}>AI-powered predictions for upcoming races</p>
          </div>
        </div>
      </motion.div>

      {/* Race selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
        {upcomingRaces.map((r, i) => (
          <button key={i} onClick={() => setSelectedRace(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 14,
              fontSize: 13, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.3s',
              background: selectedRace === i ? 'linear-gradient(135deg, rgba(194,101,58,0.08), rgba(15,26,21,0.9))' : 'rgba(15,26,21,0.6)',
              border: selectedRace === i ? '1px solid rgba(194,101,58,0.2)' : '1px solid rgba(82,183,136,0.08)',
              color: selectedRace === i ? '#E07A5F' : '#8A9B92',
            }}
          >
            <HorseRunning className="w-4 h-4" color={selectedRace === i ? '#E07A5F' : '#4A5D54'} />
            <span style={{ fontWeight: 500 }}>{r.trackName} R{r.raceNumber}</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#4A5D54' }}>{r.distance} {r.surface}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={selectedRace} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>

          {/* Race info */}
          <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(194,101,58,0.08)', border: '1px solid rgba(194,101,58,0.15)' }}>
                <MapPin style={{ width: 14, height: 14, color: '#E07A5F' }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: '#E07A5F' }}>{race.trackName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8A9B92' }}>
                <Clock style={{ width: 14, height: 14 }} /><span style={{ fontFamily: 'var(--font-mono)' }}>{race.date}</span>
              </div>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: '#4A5D54' }}>{race.distance} {race.surface}</span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#E07A5F' }}>{race.purse}</span>
            </div>
          </div>

          {/* Pace projection for first race */}
          {selectedRace === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 24 }}>
              <PaceProjection />
            </motion.div>
          )}

          {/* Horse cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
            {race.horses.map((horse, i) => {
              const color = HORSE_COLORS_MAP[horse.name] || '#C2653A';
              const styleInfo = runningStyles[horse.style];
              const isValue = horse.valueScore > 85;

              return (
                <motion.div key={horse.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                  className="glass-card" style={{ padding: 20, position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ''; }}
                >
                  {/* Watermark */}
                  <div style={{ position: 'absolute', bottom: -5, right: -5, opacity: 0.03, pointerEvents: 'none' }}>
                    <HorseGalloping className="w-24 h-16" color={color} />
                  </div>

                  {isValue && (
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(232,184,109,0.1)', border: '1px solid rgba(232,184,109,0.15)' }}>
                      <Star style={{ width: 10, height: 10, color: '#E8B86D' }} />
                      <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#E8B86D' }}>VALUE</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}12`, border: `1px solid ${color}20` }}>
                      <HorseHead className="w-5 h-5" color={color} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>{horse.name}</h3>
                      <p style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#4A5D54' }}>Post {horse.post} · {horse.odds} ML</p>
                    </div>
                  </div>

                  {/* Style badge */}
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: 6, background: `${styleInfo.color}10`, color: styleInfo.color, border: `1px solid ${styleInfo.color}20`, display: 'inline-block', marginBottom: 12 }}>{horse.style}</span>

                  {/* Win prob */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#4A5D54' }}>Win Probability</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#F0EDE8' }}>{horse.winProb}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: 'rgba(82,183,136,0.06)', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${horse.winProb}%` }} transition={{ duration: 0.8, delay: 0.1 * i }}
                        style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${color}50, ${color})` }} />
                    </div>
                  </div>

                  {/* Jockey/Trainer */}
                  <div style={{ fontSize: 10, color: '#4A5D54', lineHeight: 1.6 }}>
                    <div>J: <span style={{ color: '#8A9B92' }}>{horse.jockey}</span></div>
                    <div>T: <span style={{ color: '#8A9B92' }}>{horse.trainer}</span></div>
                  </div>

                  {/* Value score */}
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(82,183,136,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: '#4A5D54' }}>GPS Value Score</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: horse.valueScore > 85 ? '#E8B86D' : horse.valueScore > 70 ? '#52B788' : '#8A9B92' }}>{horse.valueScore}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: 'rgba(82,183,136,0.06)', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${horse.valueScore}%` }} transition={{ duration: 0.8, delay: 0.1 * i }}
                        style={{ height: '100%', borderRadius: 2, background: horse.valueScore > 85 ? 'linear-gradient(90deg, #E8B86D50, #E8B86D)' : horse.valueScore > 70 ? 'linear-gradient(90deg, #52B78850, #52B788)' : 'linear-gradient(90deg, #4A5D5450, #8A9B92)' }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AI analysis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card-terra glow-terra" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(194,101,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Zap style={{ width: 18, height: 18, color: '#F09070' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#E07A5F', marginBottom: 8 }}>AI Race Analysis</h3>
                <p style={{ fontSize: 13, color: '#8A9B92', lineHeight: 1.7 }}>
                  {selectedRace === 0 ? (<>
                    <strong style={{ color: '#F0EDE8' }}>Pace scenario favors closers.</strong> Floge is the lone speed
                    and should get a comfortable lead. However, GPS stride data shows consistent 8% stride degradation in her
                    final furlong — she's vulnerable late. <strong style={{ color: '#E8B86D' }}>Foxy Cara (4/1)</strong> profiles
                    as the best value: her closing velocity ranks top 10% at this distance, and the moderate pace sets up perfectly.
                  </>) : (<>
                    <strong style={{ color: '#F0EDE8' }}>Competitive pace expected.</strong> With two front-runners, the pace
                    should be honest, benefiting closers. <strong style={{ color: '#E8B86D' }}>Echo Valley (6/1)</strong> stands
                    out — GPS shows ground-loss adjusted speed ranking 2nd in the field despite finishing 4th last out after
                    running 22m extra on the outside.
                  </>)}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
