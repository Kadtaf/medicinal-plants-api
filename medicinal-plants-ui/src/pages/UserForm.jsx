// src/components/UserForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { toast } from "react-toastify";
import "./UserForm.css";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        roles: ["ROLE_USER"], // ✅ cohérent avec la DB
    });

    useEffect(() => {
        if (isEdit) {
            getUserById(id)
                .then((res) => {
                    // 🔧 On s'assure que le rôle soit bien sous forme de tableau
                    const data = res.data;
                    if (!Array.isArray(data.roles)) {
                        data.roles = [data.roles];
                    }
                    setUser(data);
                })
                .catch(() => toast.error("❌ Erreur lors du chargement de l'utilisateur"));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateUser(id, user);
                toast.success("💾 Utilisateur modifié avec succès !");
            } else {
                await createUser(user);
                toast.success("✅ Nouvel utilisateur créé !");
            }

            // 🕒 Redirection douce après 1,5s
            setTimeout(() => navigate("/users"), 1500);
        } catch (err) {
            console.error("❌ Erreur enregistrement :", err);

            // 🔍 Si le backend renvoie un message précis
            if (err.response?.data) {
                const message =
                    typeof err.response.data === "string"
                        ? err.response.data
                        : Object.values(err.response.data).join("\n");
                toast.error(`⚠️ ${message}`);
            } else {
                toast.error("⚠️ Erreur lors de l'enregistrement. Vérifiez les champs !");
            }
        }
    };

    return (
        <div className="user-form-container">
            <h2>{isEdit ? "✏️ Modifier un utilisateur" : "➕ Ajouter un utilisateur"}</h2>

            <form onSubmit={handleSubmit} className="user-form">
                {/* Nom d'utilisateur */}
                <label>Nom d'utilisateur</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                {/* Email */}
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                {/* Mot de passe uniquement en création */}
                {!isEdit && (
                    <>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                {/* Rôle */}
                <label>Rôle</label>
                <select
                    name="roles"
                    value={user.roles[0]}
                    onChange={(e) => setUser({ ...user, roles: [e.target.value] })}
                >
                    <option value="ROLE_USER">ROLE_USER</option>
                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select>

                <button type="submit" className="save-button">
                    {isEdit ? "💾 Enregistrer" : "✅ Créer"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
