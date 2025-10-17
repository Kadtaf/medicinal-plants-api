import React, { useState } from 'react';
import { login } from '../api/AuthApi'; // ✅ utilise ton API dédiée

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ username, password }); // ✅ appel via AuthApi
            setMessage('Connexion réussie ✅');
            console.log("✅ Réponse backend :", response.data);
            // Tu peux stocker un token ici si ton backend le renvoie
        } catch (error) {
            setMessage('Échec de la connexion ❌');
            console.error("❌ Erreur de connexion :", error);
        }
    };

    return (
        <form onSubmit={handleLogin} style={styles.form}>
            <h2>Se connecter</h2>
            <div style={styles.field}>
                <label>Nom d'utilisateur</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div style={styles.field}>
                <label>Mot de passe</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Connexion</button>
            {message && <p>{message}</p>}
        </form>
    );
};

const styles = {
    form: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    field: {
        marginBottom: '1rem',
    },
};

export default LoginForm;