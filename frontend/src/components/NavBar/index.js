import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='navbarMainDiv'>
      <div className="navLinks">
        <Link className="styleNavBar" to="/">Home</Link>
        <Link className="styleNavBar" to="/judges">Judge</Link>
        <Link className="styleNavBar" to="/county">County</Link>
        <Link className="styleNavBar" to="/crimes">Crime</Link>
      </div>

      <div className="hamburgerWrapper">
        <button
          className="hamburgerBtn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        > 
          {menuOpen ? '✕' : 'More Info'}
        </button>

        {menuOpen && (
          <div className="dropdownMenu">
            <Link className="styleNavBar dropdown" to="/spiel" onClick={() => setMenuOpen(false)}>Our Mission</Link>
            <Link className="styleNavBar dropdown" to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link>
            <Link className="styleNavBar dropdown" to="/datasets" onClick={() => setMenuOpen(false)}>Data Sets</Link>
            <Link className="styleNavBar dropdown" to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;