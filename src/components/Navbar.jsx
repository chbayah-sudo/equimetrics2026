import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/race-night', label: 'Race Night' },
  { path: '/xray', label: 'X-Ray' },
  { path: '/profiles', label: 'Profiles' },
  { path: '/preview', label: 'Preview' },
  { path: '/insights', label: 'Insights' },
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
        backgroundColor: 'rgba(12, 10, 9, 0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(197, 151, 87, 0.08)' : 'rgba(197, 151, 87, 0.03)'}`,
        transition: 'border-color 400ms ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: '#D6D1CC', letterSpacing: '0.5px' }}>
            GALLOP
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: '#C59757', letterSpacing: '0.5px' }}>
            IQ
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: 13, fontWeight: 400, textDecoration: 'none',
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

        {/* CTA */}
        <Link to="/race-night" className="hidden md:inline-flex btn-primary" style={{ padding: '10px 22px', fontSize: 11 }}>
          Explore Race
        </Link>
      </div>
    </motion.nav>
  );
}
