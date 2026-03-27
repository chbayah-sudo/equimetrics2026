import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RaceNight from './pages/RaceNight';
import RaceXRay from './pages/RaceXRay';
import Profiles from './pages/Profiles';
import Preview from './pages/Preview';
import Insights from './pages/Insights';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 60, color: '#C59757', background: '#0C0A09', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 20 }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#8A847E' }}>{this.state.error?.message}</pre>
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
        <div style={{ minHeight: '100vh', backgroundColor: '#0C0A09', color: '#D6D1CC' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/race-night" element={<RaceNight />} />
            <Route path="/xray" element={<RaceXRay />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
