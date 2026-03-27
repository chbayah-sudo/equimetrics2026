import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaceProjection from '../components/PaceProjection';
import { upcomingRaces } from '../data/raceData';

const COLORS = { 'Luna Moth': '#E8B86D', 'Floge': '#52B788', 'Foxy Cara': '#9B72CF', 'Hauntress': '#5B8DEF', 'Troubled Luck': '#C2653A', 'Storm Chaser': '#52B788', 'Night Protocol': '#E8B86D', 'Copper Ridge': '#9B72CF', 'Echo Valley': '#5B8DEF', 'Bold Summit': '#C2653A' };

export default function Preview() {
  const [sel, setSel] = useState(0);
  const race = upcomingRaces[sel];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Predictions</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 40 }}>Race Preview</h1>
      </motion.div>

      {/* Race selector */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 48 }}>
        {upcomingRaces.map((r, i) => (
          <button key={i} onClick={() => setSel(i)}
            style={{ padding: '12px 24px', borderRadius: 3, fontSize: 14, cursor: 'pointer', transition: 'all 300ms',
              background: sel === i ? '#161210' : 'transparent',
              border: sel === i ? '1px solid rgba(197,151,87,0.15)' : '1px solid rgba(197,151,87,0.04)',
              color: sel === i ? '#C59757' : '#5A5550' }}>
            {r.trackName} R{r.raceNumber}
            <span style={{ marginLeft: 8, fontSize: 12, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>{r.distance}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>

          {/* Race info */}
          <div style={{ display: 'flex', gap: 24, fontSize: 13, fontFamily: 'var(--font-mono)', color: '#5A5550', marginBottom: 32 }}>
            <span style={{ color: '#C59757' }}>{race.trackName}</span>
            <span>{race.date}</span>
            <span>{race.distance} {race.surface}</span>
            <span>{race.type}</span>
            <span style={{ color: '#D6D1CC' }}>{race.purse}</span>
          </div>

          {sel === 0 && <div style={{ marginBottom: 32 }}><PaceProjection /></div>}

          {/* Horse cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 32 }}>
            {race.horses.map((horse, i) => {
              const color = COLORS[horse.name] || '#C59757';
              return (
                <motion.div key={horse.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="card" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: '#D6D1CC' }}>{horse.name}</h3>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>Post {horse.post} · {horse.odds}</span>
                    </div>
                  </div>

                  <div className="label" style={{ marginBottom: 16 }}>{horse.style}</div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: '#5A5550' }}>Win probability</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#D6D1CC' }}>{horse.winProb}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 1, background: '#1E1915', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${horse.winProb}%` }} transition={{ duration: 0.8, delay: i * 0.06 }}
                        style={{ height: '100%', borderRadius: 1, background: color }} />
                    </div>
                  </div>

                  <div style={{ fontSize: 11, color: '#5A5550', lineHeight: 1.6, marginBottom: 12 }}>
                    <div>J: <span style={{ color: '#8A847E' }}>{horse.jockey}</span></div>
                    <div>T: <span style={{ color: '#8A847E' }}>{horse.trainer}</span></div>
                  </div>

                  <div style={{ paddingTop: 12, borderTop: '1px solid rgba(197,151,87,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#5A5550' }}>GPS Value Score</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: horse.valueScore > 85 ? '#C59757' : '#5A5550' }}>{horse.valueScore}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AI analysis */}
          <div className="card-flat" style={{ padding: 32 }}>
            <div style={{ borderLeft: '3px solid #C59757', paddingLeft: 20 }}>
              <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>AI Analysis</div>
              <p style={{ fontSize: 14, color: '#8A847E', lineHeight: 1.8 }}>
                {sel === 0 ? (<>
                  <span style={{ color: '#D6D1CC' }}>Pace scenario favors closers.</span> Floge is the lone speed and should get a comfortable lead. GPS stride data shows consistent 8% stride degradation in her final furlong — she's vulnerable late. <span style={{ color: '#C59757' }}>Foxy Cara (4/1)</span> profiles as the best value: her closing velocity ranks top 10% at this distance.
                </>) : (<>
                  <span style={{ color: '#D6D1CC' }}>Competitive pace expected.</span> Two front-runners mean an honest pace benefiting closers. <span style={{ color: '#C59757' }}>Echo Valley (6/1)</span> stands out — GPS shows ground-loss adjusted speed ranking 2nd in the field despite finishing 4th last out after running 22m extra.
                </>)}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
