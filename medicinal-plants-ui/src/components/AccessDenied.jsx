import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import "../css/AccessDenied.css";

const AccessDenied = () => {
    return (
        <div className="access-denied">
            <div className="access-card">
                <FaLock className="lock-icon" />
                <h1>⛔ Accès refusé</h1>
                <p>
                    Vous n’avez pas la permission d’accéder à cette page.
                </p>
                <Link to="/plants" className="back-button">
                    <FaArrowLeft style={{ marginRight: "8px" }} />
                    Retour à la liste des plantes
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;
