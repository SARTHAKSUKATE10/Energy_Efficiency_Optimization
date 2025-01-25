import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`navbar-toggle ${isOpen ? 'open' : 'closed'}`} 
        onClick={toggleNavbar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`navbar ${isOpen ? 'open' : 'closed'}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/sector" className="nav-link">SectorWise</Link>
          </li>
          <li>
            <Link to="/weather" className="nav-link">Weather</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
