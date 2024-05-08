import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
    // State to track the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            {/* Left section with the title and logo */}
            <div className="navbar-left">
                <img
                    src="/images/certify.png"
                    alt="Certify Logo"
                    className="navbar-logo"
                />
                <h1 className="navbar-title" style={{fontFamily:"Montserrat"}}>Certify</h1>
            </div>

            {/* Hamburger menu for mobile screens */}
            <div
                className="navbar-toggle"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className="navbar-toggle-bar"></span>
                <span className="navbar-toggle-bar"></span>
                <span className="navbar-toggle-bar"></span>
            </div>

            {/* Right section with navigation links */}
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
