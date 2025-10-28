// src/components/UserForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { toast } from "react-toastify";
import "../css/UserForm.css";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        roles: ["ROLE_USER"],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);

    // 🔹 Chargement des infos si édition
    useEffect(() => {
        if (isEdit) {
            setLoadingUser(true);
            getUserById(id)
                .then((res) => {
                    const data = res.data;
                    if (!Array.isArray(data.roles)) {
                        data.roles = [data.roles];
                    }
                    setUser(data);
                })
                .catch(() => toast.error("❌ Erreur lors du chargement de l'utilisateur."))
                .finally(() => setLoadingUser(false));
        }
    }, [id, isEdit]);

    // 🔹 Gestion des changements de champ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Validation basique côté frontend
    const validateForm = () => {
        if (!user.username.trim()) {
            toast.error("⚠️ Le nom d'utilisateur est obligatoire.");
            return false;
        }
        if (!user.email.trim()) {
            toast.error("⚠️ L'email est obligatoire.");
            return false;
        }
        if (!isEdit && !user.password.trim()) {
            toast.error("⚠️ Le mot de passe est obligatoire.");
            return false;
        }
        return true;
    };

    // 🔹 Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            if (isEdit) {
                await updateUser(id, user);
                toast.success("💾 Modifications enregistrées avec succès !");
            } else {
                await createUser(user);
                toast.success("✅ Utilisateur créé avec succès !");
            }

            // 🔁 Redirection fluide après succès
            navigate("/users");
        } catch (err) {
            console.error("❌ Erreur lors de l'enregistrement :", err);

            if (err.response) {
                const { status, data } = err.response;

                // Cas 400 : validation
                if (status === 400 && typeof data === "object") {
                    Object.values(data).forEach((msg) => toast.error(`⚠️ ${msg}`));
                }
                // Cas 409 : conflit
                else if (status === 409) {
                    toast.error(`⚠️ ${data.message || "Utilisateur ou email déjà existant."}`);
                }
                // Cas 403 : accès refusé
                else if (status === 403) {
                    toast.error("⛔ Vous n’avez pas les droits nécessaires pour cette action.");
                }
                // Cas 500+
                else if (status >= 500) {
                    toast.error("💥 Erreur interne du serveur. Réessayez plus tard.");
                }
                // Autres cas
                else {
                    toast.error(`❌ Erreur inattendue (${status}).`);
                }
            } else {
                toast.error("🚨 Impossible de contacter le serveur !");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="user-form-container">
            <h2>{isEdit ? "✏️ Modifier un utilisateur" : "➕ Ajouter un utilisateur"}</h2>

            {loadingUser ? (
                <p>⏳ Chargement de l'utilisateur...</p>
            ) : (
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

                    {/* Mot de passe seulement à la création */}
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
                        <option value="ROLE_USER">Utilisateur</option>
                        <option value="ROLE_ADMIN">Administrateur</option>
                    </select>

                    {/* Bouton de sauvegarde */}
                    <button
                        type="submit"
                        className="save-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "⏳ Enregistrement..."
                            : isEdit
                                ? "💾 Enregistrer"
                                : "✅ Créer"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserForm;
