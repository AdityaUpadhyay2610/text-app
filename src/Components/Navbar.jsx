import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Make sure to create or update the CSS for styling

const Navbar = ({ title, aboutText, mode, toggleMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when the location changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  return (
    <nav>
      <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }}>{title}</h1>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn" style={{ color: mode === 'dark' ? 'white' : 'black' }}>Menu</button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/bmi">BMI Calculator</Link>
            <Link to="/semi">Simple Calculator</Link>
            {/* Dark mode toggle for mobile */}
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault" 
                onClick={toggleMode} 
                checked={mode === 'dark'}
              />
              <label 
                className="form-check-label" 
                htmlFor="flexSwitchCheckDefault">
                {mode === 'light' ? 'Light mode' : 'Dark Mode'}
              </label>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;