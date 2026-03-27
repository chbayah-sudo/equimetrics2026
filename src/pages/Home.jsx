import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ComparisonTable from '../components/ComparisonTable';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Home() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            ref={el => { if (el) el.playbackRate = 2; }}>
            <source src="/horse.webm" type="video/webm" />
          </video>
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 600, padding: '0 32px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            {/* Gold line */}
            <div className="gold-line" style={{ margin: '0 auto 24px' }} />

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(52px, 8vw, 78px)', fontWeight: 500, color: '#D6D1CC', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: 24 }}>
              GallopIQ
            </h1>

            <p style={{ fontSize: 18, color: '#8A847E', marginBottom: 12, lineHeight: 1.6 }}>
              See horse races like never before.
            </p>

            <p style={{ fontSize: 13, color: '#5A5550', maxWidth: 420, margin: '0 auto 48px', lineHeight: 1.7 }}>
              GPS-powered race intelligence that reveals ground loss, true speed, stride fatigue, and predictive pace scenarios.
            </p>

            <Link to="/race-night" className="btn-primary">
              Explore a Race <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </motion.div>

          {/* Scroll line */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            style={{ position: 'absolute', bottom: -120, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: '#5A5550' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #C59757, transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ maxWidth: 1100, margin: '-60px auto 0', padding: '0 32px', position: 'relative', zIndex: 20 }}>
        <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
          <div className="card-flat" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '40px 0' }}>
            {[
              { value: '985K+', label: 'GPS Data Points' },
              { value: '32', label: 'GPS Tracks' },
              { value: '2,847', label: 'Races Analyzed' },
              { value: '8.2', label: 'Avg Field Size' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                textAlign: 'center', padding: '0 24px',
                borderRight: i < 3 ? '1px solid rgba(197, 151, 87, 0.08)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 38, fontWeight: 400, color: '#C59757', marginBottom: 8 }}>
                  {stat.value}
                </div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) 32px' }}>
        <motion.div {...fadeUp} style={{ marginBottom: 56 }}>
          <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Intelligence Modules</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4vw, 42px)', fontWeight: 500, color: '#D6D1CC', maxWidth: 500 }}>
            Six tools that transform GPS telemetry into insight
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
          {[
            { label: 'Live Replay', title: 'Race Night', desc: 'Gate-by-gate GPS tracking. Watch positions evolve in real time with animated telemetry data from every horse.', to: '/race-night' },
            { label: 'Deep Analysis', title: 'Race X-Ray', desc: 'Speed traces, stride patterns, and ground loss metrics. See what chart callers with binoculars physically cannot.', to: '/xray' },
            { label: 'Horse DNA', title: 'Profiles', desc: 'Running style classification, stride signatures, and performance radar built from historical GPS data.', to: '/profiles' },
            { label: 'Predictions', title: 'Race Preview', desc: 'AI-powered pace projections and value picks for upcoming races based on GPS-derived running styles.', to: '/preview' },
            { label: 'Data Advantage', title: 'GPS Insights', desc: 'Side-by-side comparison showing exactly what GPS reveals that traditional data misses, with real examples.', to: '/insights' },
            { label: 'Surface Intel', title: 'Track Bias', desc: 'Detect rail advantages, speed bias, and surface patterns using granular GPS positioning data.', to: '/insights' },
          ].map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Link to={f.to} className="card" style={{ display: 'block', padding: 32, textDecoration: 'none', height: '100%' }}>
                <div className="label" style={{ marginBottom: 10 }}>{f.label}</div>
                <div className="gold-line" style={{ marginBottom: 14 }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 500, color: '#D6D1CC', marginBottom: 12 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: '#8A847E', lineHeight: 1.7, marginBottom: 20 }}>
                  {f.desc}
                </p>
                <span style={{ fontSize: 13, color: '#C59757', transition: 'opacity 300ms', opacity: 0.7 }}>
                  Explore &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px clamp(80px, 12vw, 160px)' }}>
        <motion.div {...fadeUp} style={{ marginBottom: 56 }}>
          <div className="label" style={{ color: '#C59757', marginBottom: 12 }}>Data Advantage</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4vw, 42px)', fontWeight: 500, color: '#D6D1CC' }}>
            Why GPS changes everything
          </h2>
        </motion.div>
        <ComparisonTable />
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px clamp(80px, 12vw, 160px)', textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <div className="gold-line" style={{ margin: '0 auto 32px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500, color: '#D6D1CC', marginBottom: 16 }}>
            Ready to see racing differently?
          </h2>
          <p style={{ fontSize: 14, color: '#8A847E', marginBottom: 48, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            Dive into a featured race with full GPS telemetry — speed, stride, ground loss, and more.
          </p>
          <Link to="/race-night" className="btn-primary">
            Launch Race Night <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid rgba(197, 151, 87, 0.06)', padding: '48px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#D6D1CC' }}>
            GALLOP<span style={{ color: '#C59757' }}>IQ</span>
          </span>
          <p style={{ fontSize: 11, color: '#5A5550' }}>
            985,000+ GPS data points &middot; 32 tracks &middot; Data by Equibase &middot; 2026 Econ Games
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 12 }}>
            {['/race-night', '/xray', '/preview', '/insights'].map(p => (
              <Link key={p} to={p} style={{ color: '#5A5550', textDecoration: 'none', transition: 'color 300ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C59757'}
                onMouseLeave={e => e.currentTarget.style.color = '#5A5550'}>
                {p.replace('/', '').replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
