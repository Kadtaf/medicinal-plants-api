// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaLeaf, FaUsersCog } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        onLogout(); // ⚙️ fonction passée depuis App.js
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <FaLeaf style={{ marginRight: "8px" }} />
                    Plantes Médicinales
                </Link>
            </div>

            <ul className="navbar-links">
                <li>
                    <Link to="/plants">Plantes</Link>
                </li>
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
