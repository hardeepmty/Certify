import React from 'react';
import './Footer.css'; // Importing the CSS file for styling

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <p style={{fontFamily:"Montserrat"}}>© {new Date().getFullYear()} Certify App</p>
                </div>
                <div className="footer-section">
                    <ul className="footer-links">
                        <li style={{fontFamily:"Montserrat"}}><a href="/terms">Terms & Conditions</a></li>
                        <li style={{fontFamily:"Montserrat"}}><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <ul className="footer-socials">
                        <li><a href="#"><img src="/images/facebook.png" alt="Facebook" /></a></li>
                        <li><a href="#"><img src="/images/twitter.png" alt="Twitter" /></a></li>
                        <li><a href="#"><img src="/images/insta.png" alt="Instagram" /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
