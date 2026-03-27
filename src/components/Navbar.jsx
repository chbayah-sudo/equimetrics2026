import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Users, TrendingUp, Zap, Menu, X, Radio, Activity } from 'lucide-react';
import { HorseRunning } from './HorseIcon';

const navItems = [
  { path: '/', label: 'Home', icon: Zap },
  { path: '/race-night', label: 'Race Night', icon: Radio },
  { path: '/xray', label: 'Race X-Ray', icon: Eye },
  { path: '/profiles', label: 'Profiles', icon: Users },
  { path: '/preview', label: 'Preview', icon: TrendingUp },
  { path: '/insights', label: 'GPS Insights', icon: Activity },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          backgroundColor: scrolled ? 'rgba(10, 15, 13, 0.95)' : 'rgba(12, 18, 16, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(82, 183, 136, 0.1)' : '1px solid rgba(82, 183, 136, 0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(194, 101, 58, 0.2), rgba(27, 67, 50, 0.3))',
              border: '1px solid rgba(194, 101, 58, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HorseRunning className="w-5 h-5" color="#E07A5F" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.5px', color: '#F0EDE8', lineHeight: 1 }}>
                GALLOP<span style={{ color: '#E07A5F' }}>IQ</span>
              </div>
              <div style={{ fontSize: 9, letterSpacing: '2px', color: '#4A5D54', textTransform: 'uppercase', lineHeight: 1, marginTop: 3 }}>
                GPS Racing Intelligence
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    textDecoration: 'none',
                    color: isActive ? '#E07A5F' : '#8A9B92',
                    backgroundColor: isActive ? 'rgba(194, 101, 58, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(194, 101, 58, 0.2)' : '1px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#F0EDE8';
                      e.currentTarget.style.backgroundColor = 'rgba(82, 183, 136, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#8A9B92';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon style={{ width: 14, height: 14 }} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Live badge */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 20,
              background: 'rgba(82, 183, 136, 0.08)',
              border: '1px solid rgba(82, 183, 136, 0.15)',
            }}>
              <div style={{ position: 'relative', width: 8, height: 8 }}>
                <div style={{ position: 'absolute', inset: 0, background: '#52B788', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: 0, background: '#52B788', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              </div>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#52B788' }}>LIVE DATA</span>
            </div>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#8A9B92' }}
          >
            {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40, paddingTop: 72,
              backgroundColor: 'rgba(10, 15, 13, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
            className="md:hidden"
          >
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link
                      to={item.path}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '14px 18px', borderRadius: 12,
                        fontSize: 15, fontWeight: 500, textDecoration: 'none',
                        color: isActive ? '#E07A5F' : '#8A9B92',
                        background: isActive ? 'rgba(194, 101, 58, 0.1)' : 'transparent',
                        border: isActive ? '1px solid rgba(194, 101, 58, 0.2)' : '1px solid transparent',
                      }}
                    >
                      <Icon style={{ width: 20, height: 20 }} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
