import React, { useState } from 'react';
import './Navbar.css'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img
                    src="/images/certify.png"
                    alt="Certify Logo"
                    className="navbar-logo"
                />
                <h1 className="navbar-title" style={{fontFamily:"Montserrat"}}>Certify</h1>
            </div>

            <div
                className="navbar-toggle"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className="navbar-toggle-bar"></span>
                <span className="navbar-toggle-bar"></span>
                <span className="navbar-toggle-bar"></span>
            </div>

            <div className={`navbar-right ${isMenuOpen ? 'visible' : ''}`}>
                <a href="/about" className="navbar-link" style={{fontFamily:"Montserrat" ,fontSize:"25px", fontWeight:"500"}}>About</a>
                <a href="/product" className="navbar-link" style={{fontFamily:"Montserrat",fontSize:"25px", fontWeight:"500"}}>Product</a>
                <a href="/help" className="navbar-link" style={{fontFamily:"Montserrat",fontSize:"25px", fontWeight:"500"}}>Help</a>
                <a href="/help" className="navbar-link" style={{fontFamily:"Montserrat",fontSize:"25px", fontWeight:"500"}}>Resources</a>
            </div>
        </nav>
    );
};

export default Navbar;
