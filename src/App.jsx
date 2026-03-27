import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveReplay from './pages/RaceNight';
import DeepDive from './pages/RaceXRay';
import HorseDNA from './pages/Profiles';
import Forecast from './pages/Preview';
import GPSEdge from './pages/Insights';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 60, color: '#C59757', background: '#0D110A', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 20 }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 15, color: '#8A847E' }}>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: '#0D110A', color: '#D6D1CC' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live-replay" element={<LiveReplay />} />
            <Route path="/deep-dive" element={<DeepDive />} />
            <Route path="/horse-dna" element={<HorseDNA />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/gps-edge" element={<GPSEdge />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
