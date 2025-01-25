import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Sector = lazy(() => import('./pages/Sector'));
const Weather = lazy(() => import('./pages/Weather'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Routing Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with page routing.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  console.log("App component rendering");

  return (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      <Navbar />
      <Chatbot />

      <div
        style={{
          flex: '0.85',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'flex 0.3s ease',
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="/dashboard" 
                element={<Dashboard />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="/sector" 
                element={<Sector />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="/weather" 
                element={<Weather />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="/about" 
                element={<About />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="/contact" 
                element={<Contact />} 
                errorElement={<Navigate to="/" replace />}
              />
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
