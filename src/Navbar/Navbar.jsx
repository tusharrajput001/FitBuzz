import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='logo'>
                    <span className='logo-text'>FitBuzz</span>
                </div>
                <div className='nav-buttons'>
                    <button className='signin-btn'>Sign In</button>
                    <button className='signup-btn'>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;