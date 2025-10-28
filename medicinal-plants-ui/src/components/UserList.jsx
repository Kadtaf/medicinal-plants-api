// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { searchUsers } from "../api/userApi";
import "../css/UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const role = localStorage.getItem("role");
    const [searchTerm, setSearchTerm] = useState("");

    const getRoleLabel = (role) => {
        switch (role) {
            case "ROLE_ADMIN":
                return "Administrateur";
            case "ROLE_USER":
                return "Utilisateur";
            default:
                return role;
        }
    };


    useEffect(() => {
        if (role !== "ROLE_ADMIN") {
            console.warn("Accès refusé : seul un ADMIN peut voir cette page");
            toast.error("⛔ Accès refusé : seuls les administrateurs peuvent voir cette page.");
            return;
        }

        setLoading(true);
        getAllUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.error("❌ Erreur lors du chargement :", err);
                toast.error("⚠️ Erreur lors du chargement des utilisateurs.");
            })
            .finally(() => setLoading(false));
    }, [role]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("🗑️ Voulez-vous vraiment supprimer cet utilisateur ?");
        if (!confirm) return;

        setDeletingId(id);

        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            toast.success("✅ Utilisateur supprimé avec succès !");
        } catch (err) {
            console.error("❌ Erreur suppression :", err);

            if (err.response) {
                const { status, data } = err.response;

                if (status === 403) {
                    toast.error("⛔ Vous n’avez pas les droits pour supprimer cet utilisateur.");
                } else if (status === 404) {
                    toast.error("⚠️ Utilisateur introuvable ou déjà supprimé.");
                } else if (status === 409) {
                    toast.error(`⚠️ Suppression impossible : ${data.message || "Conflit de données."}`);
                } else if (status >= 500) {
                    toast.error("💥 Erreur interne du serveur, réessayez plus tard.");
                } else {
                    toast.error(`❌ Erreur inattendue (${status}).`);
                }
            } else {
                toast.error("🚨 Impossible de contacter le serveur !");
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="user-list">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="🔍 Rechercher par username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={() => {
                        if (searchTerm.trim() === "") {
                            toast.info("💡 Entrez un nom d'utilisateur !");
                            return;
                        }
                        setLoading(true);
                        searchUsers(searchTerm)
                            .then((res) => setUsers(res.data))
                            .catch((err) => {
                                console.error("❌ Erreur recherche :", err);
                                toast.error("⚠️ Aucun utilisateur trouvé.");
                            })
                            .finally(() => setLoading(false));
                    }}
                    className="search-button"
                >
                    🔍 Rechercher
                </button>
            </div>
            {searchTerm && (
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            getAllUsers().then((res) => setUsers(res.data));
                        }}
                        className="reset-button"
                    >
                        🔄 Réinitialiser la recherche
                    </button>
                </div>
            )}
            {/* En-tête avec le bouton à droite */}
            <div className="user-list-header">
                <h2>👤 Gestion des utilisateurs</h2>
                {role === "ROLE_ADMIN" && (
                    <button
                        className="add-button"
                        onClick={() => (window.location.href = "/users/new")}
                    >
                        <FaUserPlus style={{ marginRight: "6px" }} />
                        Ajouter un utilisateur
                    </button>
                )}
            </div>

            {loading ? (
                <p>⏳ Chargement des utilisateurs...</p>
            ) : (
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom d'utilisateur</th>
                        <th>Email</th>
                        <th>Rôles</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.roles?.map(getRoleLabel).join(", ")}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => (window.location.href = `/users/edit/${u.id}`)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(u.id)}
                                        disabled={deletingId === u.id}
                                    >
                                        {deletingId === u.id ? "⏳" : <FaTrash />}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Aucun utilisateur trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
