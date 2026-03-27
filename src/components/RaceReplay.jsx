import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { HorseRunning } from './HorseIcon';
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
        setCurrentGate((prev) => {
          if (prev >= totalGates - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 800 / speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, totalGates]);

  const reset = () => { setIsPlaying(false); setCurrentGate(0); };

  const sortedHorses = [...featuredRace.horses].sort(
    (a, b) => currentData.positions[a.name] - currentData.positions[b.name]
  );

  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 6, background: 'rgba(194,101,58,0.12)', color: '#E07A5F', border: '1px solid rgba(194,101,58,0.2)' }}>REPLAY</span>
            <HorseRunning className="w-4 h-4 animate-gallop" color="#E07A5F" />
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8' }}>
              {featuredRace.trackName} Race {featuredRace.raceNumber}
            </h3>
          </div>
          <p style={{ fontSize: 11, color: '#4A5D54', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
            {featuredRace.distance} {featuredRace.surface} &middot; {featuredRace.type} &middot; {featuredRace.purse} &middot; {featuredRace.fieldSize} runners
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#E07A5F' }}>
            {currentData.label}
          </div>
          <div style={{ fontSize: 11, color: '#4A5D54' }}>Gate {currentData.gate}</div>
        </div>
      </div>

      {/* Race visualization */}
      <div style={{ padding: '16px 24px' }}>
        {sortedHorses.map((horse) => {
          const position = currentData.positions[horse.name];
          const totalHorses = featuredRace.fieldSize;
          const barWidth = Math.max(15, 100 - ((position - 1) / (totalHorses - 1)) * 55 - (currentGate < totalGates - 1 ? (totalGates - 1 - currentGate) * 2 : 0));
          const isLeader = position === 1;

          return (
            <div key={horse.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              {/* Position */}
              <div style={{
                width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0,
                background: isLeader ? `${horse.color}20` : 'rgba(255,255,255,0.03)',
                color: isLeader ? horse.color : '#4A5D54',
                border: isLeader ? `1px solid ${horse.color}40` : '1px solid transparent',
              }}>
                {position}
              </div>

              {/* Horse icon + name */}
              <div style={{ width: 150, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <HorseRunning className="w-3.5 h-3.5" color={isLeader ? horse.color : '#4A5D54'} />
                <span style={{ fontSize: 13, fontWeight: 500, color: isLeader ? horse.color : '#8A9B92', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {horse.name}
                </span>
              </div>

              {/* Bar */}
              <div style={{ flex: 1, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.02)', overflow: 'hidden', position: 'relative' }}>
                <motion.div
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: 8, position: 'relative',
                    background: `linear-gradient(90deg, ${horse.color}08, ${horse.color}20)`,
                    borderRight: `3px solid ${horse.color}`,
                  }}
                />
                <motion.div
                  animate={{ left: `calc(${barWidth}% - 10px)` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                  }}
                >
                  <HorseRunning className="w-5 h-4" color={horse.color} />
                </motion.div>
              </div>

              <div style={{ width: 36, textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#4A5D54' }}>P{horse.post}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(82,183,136,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setIsPlaying(!isPlaying)} style={{
            width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(194,101,58,0.3)',
            background: 'rgba(194,101,58,0.15)', color: '#E07A5F', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isPlaying ? <Pause style={{ width: 16, height: 16 }} /> : <Play style={{ width: 16, height: 16, marginLeft: 2 }} />}
          </button>
          <button onClick={reset} style={{
            width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(82,183,136,0.1)',
            background: 'rgba(82,183,136,0.05)', color: '#8A9B92', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <RotateCcw style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Speed */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 4].map((s) => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, cursor: 'pointer',
              background: speed === s ? 'rgba(194,101,58,0.15)' : 'rgba(255,255,255,0.02)',
              color: speed === s ? '#E07A5F' : '#4A5D54',
              border: speed === s ? '1px solid rgba(194,101,58,0.25)' : '1px solid transparent',
            }}>
              {s}x
            </button>
          ))}
        </div>

        {/* Slider */}
        <div style={{ flex: 1 }}>
          <input
            type="range" min={0} max={totalGates - 1} value={currentGate}
            onChange={(e) => { setCurrentGate(parseInt(e.target.value)); setIsPlaying(false); }}
            style={{ width: '100%', height: 4, borderRadius: 2, appearance: 'none', cursor: 'pointer',
              background: `linear-gradient(to right, #C2653A ${progress}%, rgba(82,183,136,0.1) ${progress}%)`,
              accentColor: '#C2653A',
            }}
          />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#E07A5F', fontVariantNumeric: 'tabular-nums' }}>
          {currentGate + 1}/{totalGates}
        </div>
      </div>
    </div>
  );
}
