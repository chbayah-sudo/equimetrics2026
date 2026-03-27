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
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#EF5B5B', background: '#07080C', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Render Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, color: '#F0EDE8' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#8A8592', marginTop: 12 }}>
            {this.state.error?.stack}
          </pre>
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
        <div className="min-h-screen bg-bg-primary text-text-primary">
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
