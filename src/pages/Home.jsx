import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Radio, Eye, Users, TrendingUp, Activity, Zap,
  ArrowRight, Database, MapPin, Timer, ChevronDown, BarChart3
} from 'lucide-react';
import { HorseRunning, HorseGalloping, TripleHorses, HorseSilhouette } from '../components/HorseIcon';
import ComparisonTable from '../components/ComparisonTable';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      {/* ======= HERO SECTION ======= */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            ref={(el) => { if (el) el.playbackRate = 2; }}
          >
            <source src="/horse.webm" type="video/webm" />
          </video>
          <div className="hero-gradient" style={{ position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,15,13,0.5) 0%, transparent 30%, transparent 70%, rgba(10,15,13,0.5) 100%)' }} />
        </div>

        {/* Ambient glows */}
        <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '15%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(194,101,58,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div className="animate-float" style={{ position: 'absolute', bottom: '25%', right: '15%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(82,183,136,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animationDelay: '3s' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            {/* Animated horses badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 30, background: 'linear-gradient(135deg, rgba(194,101,58,0.12), rgba(27,67,50,0.15))', border: '1px solid rgba(194,101,58,0.2)', marginBottom: 32 }}
            >
              <TripleHorses className="w-16 h-6" color="#E07A5F" />
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#E07A5F', letterSpacing: '1.5px' }}>
                985,000+ GPS DATA POINTS
              </span>
            </motion.div>

            {/* Title with horse silhouette */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20 }}>
                <span className="text-gradient-terra text-glow-terra">GallopIQ</span>
              </h1>
              {/* Decorative horse behind title */}
              <div style={{ position: 'absolute', top: '-20%', right: '-15%', opacity: 0.06, pointerEvents: 'none' }}>
                <HorseSilhouette className="w-48 h-40" color="#E07A5F" />
              </div>
            </div>

            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 300, color: '#8A9B92', marginBottom: 8, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              See horse races like never before.
            </p>
            <p style={{ fontSize: 13, color: '#4A5D54', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.6 }}>
              GPS-powered race intelligence that reveals ground loss, true speed, stride fatigue, and predictive pace scenarios.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/race-night"
                className="glow-terra"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #C2653A, #8B4226)',
                  color: 'white', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', transition: 'all 0.3s',
                  border: 'none',
                }}
              >
                <HorseRunning className="w-5 h-5" color="white" />
                Explore a Race
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link
                to="/preview"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', borderRadius: 12,
                  background: 'rgba(82, 183, 136, 0.08)',
                  border: '2px solid rgba(82, 183, 136, 0.2)',
                  color: '#F0EDE8', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
              >
                <TrendingUp style={{ width: 16, height: 16 }} />
                Upcoming Races
              </Link>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)' }}
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown style={{ width: 20, height: 20, color: '#4A5D54' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======= VISUAL STATS BAR ======= */}
      <section style={{ position: 'relative', zIndex: 20, maxWidth: 1100, margin: '-80px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { icon: Database, label: 'GPS Data Points', value: '985K+', sub: 'Across 3 months of racing', accent: true, color: '#E07A5F' },
            { icon: MapPin, label: 'GPS Tracks', value: '32', sub: '16 with latest-gen RTK hardware', color: '#52B788' },
            { icon: BarChart3, label: 'Races Analyzed', value: '2,847', sub: 'Dec 2025 — Mar 2026', color: '#74C69D' },
            { icon: Timer, label: 'Avg Field Size', value: '8.2', sub: 'Horses per race', color: '#95D5B2' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={stat.accent ? 'glass-card-terra glow-terra' : 'glass-card'}
              style={{ padding: 20, position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative mini horse in corner */}
              <div style={{ position: 'absolute', top: 10, right: 10, opacity: 0.04 }}>
                <HorseRunning className="w-16 h-16" color={stat.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#4A5D54' }}>{stat.label}</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon style={{ width: 16, height: 16, color: stat.color }} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: stat.color, letterSpacing: '-1px' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#8A9B92', marginTop: 4 }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======= FEATURES GRID — VISUAL CARDS ======= */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 12 }}>
            Intelligence <span className="text-gradient-terra">Modules</span>
          </h2>
          <p style={{ color: '#8A9B92', maxWidth: 500, margin: '0 auto', fontSize: 15 }}>
            Six tools that transform raw GPS telemetry into actionable racing intelligence.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {[
            { title: 'Race Night', desc: 'Live replay with gate-by-gate GPS tracking. Watch positions evolve with animated telemetry.', icon: Radio, to: '/race-night', color: '#E07A5F', highlight: true },
            { title: 'Race X-Ray', desc: 'Speed traces, stride patterns, and ground loss. See what chart callers physically cannot observe.', icon: Eye, to: '/xray', color: '#52B788' },
            { title: 'Horse Profiles', desc: 'Running style DNA, stride signatures, and radar charts built from GPS history.', icon: Users, to: '/profiles', color: '#74C69D' },
            { title: 'Race Preview', desc: 'AI pace projections and value picks for upcoming races based on GPS-derived running styles.', icon: TrendingUp, to: '/preview', color: '#E8B86D' },
            { title: 'GPS Insights', desc: 'Side-by-side comparison showing exactly what GPS reveals that traditional data misses.', icon: Activity, to: '/insights', color: '#40916C' },
            { title: 'Track Bias', desc: 'Detect rail advantages, speed bias, and surface patterns using granular GPS positioning.', icon: Zap, to: '/insights', color: '#D4A574' },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={feature.to}
                className={feature.highlight ? 'glass-card-terra glow-terra' : 'glass-card'}
                style={{ display: 'block', padding: 28, textDecoration: 'none', height: '100%', position: 'relative', overflow: 'hidden', transition: 'all 0.4s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${feature.color}30`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ''; }}
              >
                {/* Horse watermark */}
                <div style={{ position: 'absolute', bottom: -5, right: -5, opacity: 0.03 }}>
                  <HorseGalloping className="w-32 h-20" color={feature.color} />
                </div>

                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${feature.color}12`, border: `1px solid ${feature.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <feature.icon style={{ width: 24, height: 24, color: feature.color }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#F0EDE8', marginBottom: 8 }}>{feature.title}</h3>
                <p style={{ fontSize: 13, color: '#8A9B92', lineHeight: 1.6, marginBottom: 16 }}>{feature.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: feature.color }}>
                  <span>Explore</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======= GPS vs TRADITIONAL — VISUAL ======= */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px' }}>
        <ComparisonTable />
      </section>

      {/* ======= CTA WITH HORSE IMAGERY ======= */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card-terra glow-terra"
          style={{ padding: 'clamp(40px, 6vw, 64px)', position: 'relative', overflow: 'hidden' }}
        >
          {/* Decorative horses */}
          <div style={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)', opacity: 0.05 }}>
            <HorseSilhouette className="w-32 h-24" color="#E07A5F" />
          </div>
          <div style={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%) scaleX(-1)', opacity: 0.05 }}>
            <HorseSilhouette className="w-32 h-24" color="#52B788" />
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <HorseGalloping className="w-20 h-12 mx-auto mb-4" color="#E07A5F" />
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 12 }}>
              Ready to see racing differently?
            </h2>
            <p style={{ color: '#8A9B92', marginBottom: 32, maxWidth: 450, marginLeft: 'auto', marginRight: 'auto', fontSize: 14 }}>
              Dive into a featured race with full GPS telemetry — speed, stride, ground loss, and more.
            </p>
            <Link
              to="/race-night"
              className="glow-terra"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 12,
                background: 'linear-gradient(135deg, #C2653A, #8B4226)',
                color: 'white', fontWeight: 600, fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <HorseRunning className="w-5 h-5" color="white" />
              Launch Race Night
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer style={{ borderTop: '1px solid rgba(82, 183, 136, 0.08)', padding: '40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(194, 101, 58, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HorseRunning className="w-3.5 h-3.5" color="#E07A5F" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F0EDE8' }}>
              GALLOP<span style={{ color: '#E07A5F' }}>IQ</span>
            </span>
          </div>
          <p style={{ fontSize: 11, color: '#4A5D54', textAlign: 'center' }}>
            Built with 985,000+ GPS data points from 32 tracks &middot; Data by Equibase &middot; 2026 Econ Games
          </p>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            {[
              { to: '/race-night', label: 'Race Night' },
              { to: '/xray', label: 'X-Ray' },
              { to: '/preview', label: 'Preview' },
              { to: '/insights', label: 'Insights' },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ color: '#4A5D54', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E07A5F'}
                onMouseLeave={e => e.currentTarget.style.color = '#4A5D54'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
