import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure the CSS file is correctly linked

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/prediction" className="nav-link">Prediction</Link>
        </li>
        <li>
          <Link to="/graphs" className="nav-link">Graphs</Link>
        </li>
        <li>
          <Link to="/blog" className="nav-link">Blog</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
