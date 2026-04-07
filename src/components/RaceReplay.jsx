import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getPortrait } from '../data/portraits';

const COLORS = ['#C59757','#52B788','#5B8DEF','#E8B86D','#9B72CF','#C2653A','#4ECDC4','#EF5B5B','#D4A574','#74C69D','#8B4226','#5BEF8D','#E07A5F','#95D5B2'];

export default function RaceReplay({ race }) {
  const [currentGate, setCurrentGate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);

  const gateData = race.gateData;
  const totalGates = gateData.length;
  const progress = (currentGate / (totalGates - 1)) * 100;
  const currentData = gateData[currentGate];

  // Reset when race changes
  useEffect(() => { setCurrentGate(0); setIsPlaying(false); }, [race.id]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentGate(prev => { if (prev >= totalGates - 1) { setIsPlaying(false); return prev; } return prev + 1; });
      }, 700 / speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, totalGates]);

  const reset = () => { setIsPlaying(false); setCurrentGate(0); };

  // Assign colors to horses
  const horses = race.horses.map((h, i) => ({ ...h, color: COLORS[i % COLORS.length] }));

  // Sort by current position
  const sortedHorses = [...horses].sort((a, b) => {
    const posA = currentData.positions[a.name] || 99;
    const posB = currentData.positions[b.name] || 99;
    return posA - posB;
  });

  return (
    <div className="card-flat" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(197,151,87,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>
            {race.track} Race {race.raceNumber}
          </h3>
          <p style={{ fontSize: 13, color: '#5A5550', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {race.distance} {race.surface} · {race.type} · {race.purse} · {race.fieldSize} runners
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, color: '#C59757' }}>{currentData.label}</div>
          <div style={{ fontSize: 13, color: '#5A5550' }}>
            {currentGate === totalGates - 1 ? 'Final' : `Gate ${currentData.gate}`}
          </div>
        </div>
      </div>

      {/* Horses */}
      <div style={{ padding: '16px 28px' }}>
        {sortedHorses.map(horse => {
          const position = currentData.positions[horse.name] || race.fieldSize;
          const raceProgress = currentGate / Math.max(1, totalGates - 1); // 0 at start, 1 at finish
          const posSpread = ((position - 1) / Math.max(1, race.fieldSize - 1)) * 50 * raceProgress; // spread grows as race progresses
          const baseProgress = raceProgress * 60 + 15; // all horses advance from 15% to 75% together
          const barWidth = Math.max(12, baseProgress - posSpread);
          const isLeader = position === 1;

          return (
            <div key={horse.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              {/* Position */}
              <div style={{ width: 22, fontFamily: 'var(--font-serif)', fontSize: 14, color: isLeader ? '#C59757' : '#5A5550', textAlign: 'center', flexShrink: 0 }}>
                {position}
              </div>

              {/* Name */}
              <div style={{ width: 130, fontSize: 13, fontWeight: 500, color: isLeader ? '#D6D1CC' : '#5A5550', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {horse.name}
              </div>

              {/* Bar + portrait at the end */}
              <div style={{ flex: 1, height: 28, borderRadius: 2, background: '#1C2418', overflow: 'visible', position: 'relative' }}>
                <motion.div
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${horse.color}08, ${horse.color}25)`, borderRight: `2px solid ${horse.color}` }}
                />
                {/* Portrait at the tip */}
                <motion.div
                  animate={{ left: `calc(${barWidth}% - 14px)` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 4, overflow: 'hidden',
                    border: `2px solid ${horse.color}`,
                    boxShadow: `0 0 8px ${horse.color}40`,
                  }}>
                    <img src={getPortrait(horse.name)} alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(197,151,87,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setIsPlaying(!isPlaying)} className="btn-primary" style={{ padding: '8px 12px', fontSize: 0, lineHeight: 0 }}>
          {isPlaying ? <Pause style={{ width: 14, height: 14 }} /> : <Play style={{ width: 14, height: 14, marginLeft: 1 }} />}
        </button>
        <button onClick={reset} style={{ width: 34, height: 34, borderRadius: 4, border: '1px solid rgba(197,151,87,0.06)', background: 'transparent', color: '#5A5550', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RotateCcw style={{ width: 13, height: 13 }} />
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 4].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{ padding: '5px 10px', borderRadius: 3, fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, cursor: 'pointer', background: speed === s ? 'rgba(197,151,87,0.1)' : 'transparent', color: speed === s ? '#C59757' : '#5A5550', border: speed === s ? '1px solid rgba(197,151,87,0.15)' : '1px solid transparent' }}>
              {s}x
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <input type="range" min={0} max={totalGates - 1} value={currentGate}
            onChange={e => { setCurrentGate(parseInt(e.target.value)); setIsPlaying(false); }}
            style={{ width: '100%', height: 2, appearance: 'none', cursor: 'pointer', background: `linear-gradient(to right, #C59757 ${progress}%, #1C2418 ${progress}%)`, borderRadius: 1, accentColor: '#C59757' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#C59757', fontVariantNumeric: 'tabular-nums' }}>
          {currentGate + 1}/{totalGates}
        </span>
      </div>
    </div>
  );
}
