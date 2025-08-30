import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="navbar">
        {/* Logo / Brand */}
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="logo-main">Fit</span>
            <span className="logo-highlight">Buzz</span>
          </Link>
        </div>

        {/* Buttons */}
        <div className="nav-buttons">
          <button 
            className="btn-outline" 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
          <button 
            className="btn-fill" 
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
