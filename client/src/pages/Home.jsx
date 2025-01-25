import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img
        className="background-image"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
        alt="Smart City Energy"
      />
      <div className="content-overlay">
        <h1 className="title">
          Pune Smart Energy Management
        </h1>
        <p className="subtitle">
          Revolutionize your city's energy consumption with AI-powered analytics and real-time optimization. 
          Our platform helps you reduce costs, improve efficiency, and build a sustainable future.
        </p>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">30%</div>
            <div className="stat-label">Energy Savings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Monitoring</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100+</div>
            <div className="stat-label">Cities</div>
          </div>
        </div>

        <button 
          className="cta-button"
          onClick={() => navigate('/dashboard')}
        >
          Explore Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
