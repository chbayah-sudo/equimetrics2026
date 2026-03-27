import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { forecastRaces, styleColors, scenarioColors } from '../data/forecastData';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function MiniSparkline({ data, color, width = 80, height = 28 }) {
  if (!data || !data.length) return null;
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.2}
            fill={`url(#spark-${color.replace('#', '')})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PaceBar({ analysis }) {
  const total = analysis.frontRunners + analysis.stalkers + analysis.closers;
  const frPct = (analysis.frontRunners / total) * 100;
  const stPct = (analysis.stalkers / total) * 100;
  const clPct = (analysis.closers / total) * 100;
  const sc = scenarioColors[analysis.scenario] || '#C59757';

  return (
    <div className="card-flat" style={{ padding: 32, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div className="label" style={{ color: sc, marginBottom: 10, fontSize: 12 }}>Pace Scenario</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, color: '#D6D1CC' }}>
            {analysis.label}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          {[
            { label: 'Speed', count: analysis.frontRunners, color: styleColors['Front Runner'] },
            { label: 'Stalk', count: analysis.stalkers, color: styleColors['Stalker'] },
            { label: 'Close', count: analysis.closers, color: styleColors['Closer'] },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 11, color: '#5A5550', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ width: `${frPct}%`, background: styleColors['Front Runner'], transition: 'width 600ms ease' }} />
        <div style={{ width: `${stPct}%`, background: styleColors['Stalker'], transition: 'width 600ms ease' }} />
        <div style={{ width: `${clPct}%`, background: styleColors['Closer'], transition: 'width 600ms ease' }} />
      </div>

      <p style={{ fontSize: 15, color: '#8A847E', lineHeight: 1.8 }}>{analysis.detail}</p>
    </div>
  );
}

function GPSEdgePick({ pick, index }) {
  return (
    <motion.div {...fadeUp} transition={{ delay: 0.1 * index }}>
      <div style={{ borderLeft: '3px solid #C59757', paddingLeft: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#C59757' }}>{pick.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#5A5550' }}>{pick.odds}</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#D6D1CC', marginBottom: 10 }}>{pick.headline}</div>
        <p style={{ fontSize: 15, color: '#8A847E', lineHeight: 1.8 }}>{pick.analysis}</p>
      </div>
    </motion.div>
  );
}

function HorseRow({ horse, rank }) {
  const styleColor = horse.style ? styleColors[horse.style] : '#5A5550';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '36px 1fr 90px 70px 60px 80px',
      alignItems: 'center',
      padding: '14px 24px',
      borderBottom: '1px solid rgba(197,151,87,0.04)',
      opacity: horse.hasGPS ? 1 : 0.45,
      transition: 'background 300ms ease',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,151,87,0.02)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: rank <= 3 ? '#C59757' : '#5A5550' }}>
        {horse.post}
      </div>

      <div>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#D6D1CC', marginBottom: 2 }}>{horse.name}</div>
        <div style={{ fontSize: 12, color: '#5A5550' }}>
          J: {horse.jockey} &nbsp;·&nbsp; T: {horse.trainer}
        </div>
      </div>

      <div>
        {horse.style ? (
          <span style={{
            fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 3,
            color: styleColor, background: `${styleColor}12`, border: `1px solid ${styleColor}20`,
          }}>
            {horse.style === 'Front Runner' ? 'Speed' : horse.style}
          </span>
        ) : (
          <span style={{ fontSize: 11, color: '#5A5550', fontStyle: 'italic' }}>No GPS</span>
        )}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#8A847E' }}>{horse.odds}</div>

      <div>
        {horse.gpsScore != null ? (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: horse.gpsScore >= 85 ? '#C59757' : horse.gpsScore >= 70 ? '#D6D1CC' : '#5A5550' }}>
            {horse.gpsScore}
          </span>
        ) : (
          <span style={{ fontSize: 12, color: '#5A5550' }}>—</span>
        )}
      </div>

      <div>
        {horse.speeds.length > 0 ? (
          <MiniSparkline data={horse.speeds} color={styleColor} />
        ) : (
          <div style={{ width: 80, height: 28, borderRadius: 2, background: '#1C2418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: '#5A5550' }}>NO DATA</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Preview() {
  const [selRace, setSelRace] = useState(0);
  const race = forecastRaces[selRace];

  const sortedHorses = [...race.horses].sort((a, b) => {
    if (!a.hasGPS && !b.hasGPS) return 0;
    if (!a.hasGPS) return 1;
    if (!b.hasGPS) return -1;
    return (b.gpsScore || 0) - (a.gpsScore || 0);
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px' }}>

      <motion.div {...fadeUp}>
        <div className="label" style={{ color: '#C59757', marginBottom: 14, fontSize: 12 }}>Upcoming Races</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 48px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 16 }}>
          Forecast
        </h1>
        <p style={{ fontSize: 16, color: '#8A847E', maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
          GPS-powered predictions for upcoming races. Pick a race, see the full field, and discover which horses have hidden edges the morning line doesn't reflect.
        </p>
      </motion.div>

      {/* How to use */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
        <div className="card-flat" style={{ padding: 28, marginBottom: 48, borderColor: 'rgba(197,151,87,0.1)' }}>
          <div style={{ borderLeft: '3px solid #C59757', paddingLeft: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#D6D1CC', marginBottom: 8 }}>How to read this page</div>
            <p style={{ fontSize: 15, color: '#8A847E', lineHeight: 1.8 }}>
              This page shows you which horses have hidden advantages that only GPS data can reveal.
              The morning line odds reflect a track oddsmaker's prediction based on past finishes and
              reputation — but they don't account for <span style={{ color: '#C59757' }}>ground loss</span> (how
              much extra distance a horse runs from racing wide), <span style={{ color: '#C59757' }}>true
              sectional speed</span> (how fast each horse actually ran, not just the leader), or <span style={{ color: '#C59757' }}>stride
              efficiency</span> (whether a horse is tiring or accelerating late).
              GallopIQ analyzes all of this to find horses the odds undervalue.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Race selector */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }} style={{ marginBottom: 40 }}>
        <div className="label" style={{ marginBottom: 16, fontSize: 12 }}>Select a Race</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {forecastRaces.map((r, i) => (
            <button key={r.id} onClick={() => setSelRace(i)}
              style={{
                padding: '16px 24px', borderRadius: 3, cursor: 'pointer', textAlign: 'left',
                minWidth: 220, transition: 'all 300ms',
                background: selRace === i ? '#141A10' : '#141A10',
                border: selRace === i ? '1px solid rgba(197,151,87,0.2)' : '1px solid rgba(197,151,87,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: selRace === i ? '#C59757' : '#D6D1CC' }}>
                  {r.trackName} R{r.raceNumber}
                </span>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: 3,
                  background: r.gpsCoverage === 100 ? 'rgba(82,183,136,0.1)' : 'rgba(232,184,109,0.1)',
                  color: r.gpsCoverage === 100 ? '#52B788' : '#E8B86D',
                }}>
                  {r.gpsCoverage}% GPS
                </span>
              </div>
              <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>
                {r.date} · {r.distance} {r.surface} · {r.purse}
              </div>
              <div style={{ fontSize: 12, color: '#5A5550', marginTop: 4 }}>
                {r.fieldSize} horses · {r.type}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={selRace} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

          {/* Race header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'baseline', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 500, color: '#D6D1CC' }}>
              {race.trackName} Race {race.raceNumber}
            </h2>
            <div style={{ display: 'flex', gap: 16, fontSize: 14, fontFamily: 'var(--font-mono)', color: '#5A5550' }}>
              <span>{race.date}</span>
              <span>{race.distance} {race.surface}</span>
              <span style={{ color: '#C59757' }}>{race.purse}</span>
            </div>
          </div>

          {/* Pace scenario */}
          <div style={{ marginBottom: 32 }}>
            <PaceBar analysis={race.paceAnalysis} />
          </div>

          {/* GPS Edge Picks */}
          <div style={{ marginBottom: 40 }}>
            <div className="label" style={{ color: '#C59757', marginBottom: 16, fontSize: 12 }}>GPS Edge Picks</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: '#D6D1CC', marginBottom: 28 }}>
              Where the data disagrees with the odds
            </h3>
            {race.gpsEdgePicks.map((pick, i) => (
              <GPSEdgePick key={pick.name} pick={pick} index={i} />
            ))}
          </div>

          {/* Full race card */}
          <div className="card-flat" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(197,151,87,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="label" style={{ marginBottom: 6, fontSize: 11 }}>Full Field</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>
                  Race Card — {race.fieldSize} Entries
                </h3>
              </div>
              <div style={{ fontSize: 13, color: '#5A5550' }}>Sorted by GPS Score</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 90px 70px 60px 80px',
              padding: '10px 24px',
              borderBottom: '1px solid rgba(197,151,87,0.06)',
            }}>
              {['Post', 'Horse', 'Style', 'Odds', 'GPS', 'Speed'].map(h => (
                <div key={h} className="label" style={{ fontSize: 10 }}>{h}</div>
              ))}
            </div>

            {sortedHorses.map((horse, i) => (
              <HorseRow key={horse.name} horse={horse} rank={i + 1} />
            ))}
          </div>

          {/* Key metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 32 }}>
            {[
              { label: 'Fastest Closer', value: race.horses.filter(h => h.closingMPH).sort((a, b) => b.closingMPH - a.closingMPH)[0], metric: h => `${h.closingMPH} mph` },
              { label: 'Best Efficiency', value: race.horses.filter(h => h.efficiency).sort((a, b) => b.efficiency - a.efficiency)[0], metric: h => `${h.efficiency}%` },
              { label: 'Peak Speed', value: race.horses.filter(h => h.peakMPH).sort((a, b) => b.peakMPH - a.peakMPH)[0], metric: h => `${h.peakMPH} mph` },
              { label: 'Best Stamina', value: race.horses.filter(h => h.strideFade != null).sort((a, b) => b.strideFade - a.strideFade)[0], metric: h => `${h.strideFade}% fade` },
            ].map(item => (
              <div key={item.label} className="card-flat" style={{ padding: 24 }}>
                <div className="label" style={{ marginBottom: 10, fontSize: 11 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: '#C59757', marginBottom: 4 }}>
                  {item.value?.name || '—'}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#8A847E' }}>
                  {item.value ? item.metric(item.value) : '—'}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5A5550', marginTop: 4 }}>
                  {item.value?.odds || ''}
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
