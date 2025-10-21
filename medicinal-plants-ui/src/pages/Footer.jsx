import React from 'react';
import './Footer.css';
import { FaFacebook, FaLinkedin, FaFileContract } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/mentions-legales">
                    <FaFileContract style={{ marginRight: '6px' }} />
                    Mentions légales
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook style={{ marginRight: '6px' }} />
                    Facebook
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin style={{ marginRight: '6px' }} />
                    LinkedIn
                </a>
            </div>
            <p className="footer-text">© {new Date().getFullYear()} Plantes Médicinales. Tous droits réservés.</p>
        </footer>
    );
}

export default Footer;