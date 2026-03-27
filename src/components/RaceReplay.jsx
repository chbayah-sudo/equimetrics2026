import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { featuredRace, gpsRaceData } from '../data/raceData';

export default function RaceReplay() {
  const [currentGate, setCurrentGate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);
  const totalGates = gpsRaceData.length;
  const progress = (currentGate / (totalGates - 1)) * 100;
  const currentData = gpsRaceData[currentGate];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentGate(prev => { if (prev >= totalGates - 1) { setIsPlaying(false); return prev; } return prev + 1; });
      }, 800 / speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, totalGates]);

  const reset = () => { setIsPlaying(false); setCurrentGate(0); };
  const sortedHorses = [...featuredRace.horses].sort((a, b) => currentData.positions[a.name] - currentData.positions[b.name]);

  return (
    <div className="card-flat" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(197,151,87,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="label" style={{ color: '#C59757', marginBottom: 6 }}>Race Replay</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#D6D1CC' }}>
            {featuredRace.trackName} Race {featuredRace.raceNumber}
          </h3>
          <p style={{ fontSize: 13, color: '#5A5550', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {featuredRace.distance} {featuredRace.surface} · {featuredRace.type} · {featuredRace.purse}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, color: '#C59757' }}>{currentData.label}</div>
          <div style={{ fontSize: 13, color: '#5A5550' }}>Gate {currentData.gate}</div>
        </div>
      </div>

      {/* Horses */}
      <div style={{ padding: '16px 28px' }}>
        {sortedHorses.map(horse => {
          const position = currentData.positions[horse.name];
          const barWidth = Math.max(15, 100 - ((position - 1) / (featuredRace.fieldSize - 1)) * 55 - (currentGate < totalGates - 1 ? (totalGates - 1 - currentGate) * 2 : 0));
          const isLeader = position === 1;
          return (
            <div key={horse.name} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 5 }}>
              <div style={{ width: 24, fontFamily: 'var(--font-serif)', fontSize: 14, color: isLeader ? '#C59757' : '#5A5550', textAlign: 'center' }}>{position}</div>
              <div style={{ width: 140, fontSize: 13, fontWeight: 500, color: isLeader ? '#D6D1CC' : '#5A5550', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{horse.name}</div>
              <div style={{ flex: 1, height: 20, borderRadius: 2, background: '#1C2418', overflow: 'hidden', position: 'relative' }}>
                <motion.div animate={{ width: `${barWidth}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${horse.color}10, ${horse.color}30)`, borderRight: `2px solid ${horse.color}` }} />
                <motion.div animate={{ left: `calc(${barWidth}% - 4px)` }} transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: horse.color, zIndex: 2 }} />
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
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#C59757', fontVariantNumeric: 'tabular-nums' }}>{currentGate + 1}/{totalGates}</span>
      </div>
    </div>
  );
}
