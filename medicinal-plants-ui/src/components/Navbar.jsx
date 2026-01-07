// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaLeaf, FaUsersCog } from "react-icons/fa";
import "../css/Navbar.css";

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        onLogout(); // ⚙️ fonction passée depuis App.js
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <FaLeaf style={{ marginRight: "8px" }} />
                    Plantes Médicinales
                </Link>
            </div>
            <button
                className={`burger-button ${menuOpen ? "open" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                }}

            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <ul ref={menuRef} className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/plants">Plantes</Link>
                </li>
                    <Link to="/oils" className="nav-link">Nos huiles</Link>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/about">À propos</Link>
                </li>

                {/* 🔒 Lien visible seulement pour les admins */}
                {isAuthenticated && role === "ROLE_ADMIN" && (
                    <li>
                        <Link to="/users" className="admin-link">
                            <FaUsersCog style={{ marginRight: "6px" }} />
                            Utilisateurs
                        </Link>
                    </li>
                )}

                {/* 🔑 Boutons connexion / déconnexion */}
                {isAuthenticated ? (
                    <li>
                        <button onClick={handleLogout} className="nav-button logout-btn">
                            <FaSignOutAlt style={{ marginRight: "6px" }} />
                            Déconnexion
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className="nav-button login-btn">
                            <FaSignInAlt style={{ marginRight: "6px" }} />
                            Connexion
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
