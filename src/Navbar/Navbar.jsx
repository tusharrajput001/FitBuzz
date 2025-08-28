import React from 'react';
import './Navbar.css';

const Navbar = () =>{
    
    return(
        <div className='Navbar-container'>
            <div className='Navbar'>
                <button>Home</button>
                <button>About</button>
                <button>Contact</button>
            </div>
        </div>
    )
}

export default Navbar;