// src/pages/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/AuthApi";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {  // ✅ <-- ajout du onLogin reçu depuis App.js
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // 🧩 Fonction utilitaire : décoder un token JWT sans dépendance externe
    const decodeToken = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("❌ Erreur lors du décodage du token :", error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ username, password });
            console.log("✅ Réponse backend :", response.data);

            const { token, role: roleFromBackend, username: backendUsername } = response.data;

            if (token) {
                // ✅ On décode pour vérifier les infos du token
                const decoded = decodeToken(token);
                const role = roleFromBackend || decoded?.role || "USER";
                const user = backendUsername || decoded?.sub || username;

                // ✅ Sauvegarde dans localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("username", user);

                // ✅ Informe le composant parent (App) du login
                if (onLogin) {
                    onLogin(token, role);
                }

                setMessage("Connexion réussie ✅");

                // 🔁 Redirection vers la page des plantes
                setTimeout(() => navigate("/plants"), 800);
            } else {
                setMessage("Aucun token reçu du serveur ❌");
            }
        } catch (error) {
            console.error("❌ Erreur de connexion :", error);
            setMessage("Identifiants incorrects ❌");
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Se connecter</h2>

                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Connexion</button>

                {message && (
                    <p className={message.includes("✅") ? "success" : "error"}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginForm;
