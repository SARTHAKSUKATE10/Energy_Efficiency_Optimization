import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // No need to import BrowserRouter here
import Navbar from './components/Navbar'; // Navbar component
import Home from './pages/Home'; // Home page
import Dashboard from './pages/Dashboard'; // Dashboard page
import Sector from './pages/Sector';
import Prediction from './pages/Prediction'; // Prediction page
import Graphs from './pages/Graphs'; // Graphs page
import Weather from './pages/Weather'; // Weather page
import About from './pages/About'; // Blog page
import Contact from './pages/Contact'; // Contact page

const App = () => {
  return (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      <Navbar /> {/* Navbar no longer requires toggling logic */}

      <div
        style={{
          flex: '0.85',  // Fixed flex size since no toggle is needed
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'flex 0.3s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sector" element={<Sector />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;





