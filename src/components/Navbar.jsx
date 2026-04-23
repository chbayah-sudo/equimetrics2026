import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/live-replay', label: 'Live Replay' },
  { path: '/deep-dive', label: 'Deep Dive' },
  { path: '/horse-profiles', label: 'Horse Profiles' },
  { path: '/forecast', label: 'Forecast' },
  { path: '/gps-edge', label: 'GPS Edge' },
  { path: '/horsellm', label: 'HorseLLM' },
  { path: '/stable-match', label: 'StableMatch' },
  { path: '/equibets', label: 'EquiBets' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 72,
        backgroundColor: 'rgba(13, 17, 10, 0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(197, 151, 87, 0.08)' : 'rgba(197, 151, 87, 0.03)'}`,
        transition: 'border-color 400ms ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600, color: '#D6D1CC', letterSpacing: '0.5px' }}>
            EQUI
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600, color: '#C59757', letterSpacing: '0.5px' }}>
            METRICS
          </span>
        </Link>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 30 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: 17, fontWeight: 400, textDecoration: 'none',
                  color: isActive ? '#C59757' : '#5A5550',
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#D6D1CC'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#5A5550'; }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

      </div>
    </motion.nav>
  );
}
