// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "./UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [confirmId, setConfirmId] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "ADMIN") {
            console.warn("Accès refusé : seul un ADMIN peut voir cette page");
            return;
        }

        getAllUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => {
                console.error("❌ Erreur lors du chargement :", err);
                toast.error("Erreur de chargement des utilisateurs !");
            });
    }, [role]);

    const handleDelete = async (id) => {
        if (confirmId === id) {
            // ✅ Deuxième clic : suppression confirmée
            try {
                await deleteUser(id);
                setUsers((prev) => prev.filter((u) => u.id !== id));
                toast.success("🗑️ Utilisateur supprimé !");
                setConfirmId(null);
            } catch (err) {
                console.error("❌ Erreur suppression :", err);
                toast.error("Erreur lors de la suppression !");
            }
        } else {
            // ⚠️ Premier clic : demande confirmation
            setConfirmId(id);
            toast.info("Cliquez à nouveau pour confirmer la suppression !");
            setTimeout(() => setConfirmId(null), 4000);
        }
    };

    return (
        <div className="user-list">
            <div className="user-list-header">
                <h2>👤 Gestion des utilisateurs</h2>
                {role === "ADMIN" && (
                    <button
                        className="add-button"
                        onClick={() => (window.location.href = "/users/new")}
                    >
                        <FaUserPlus style={{ marginRight: "6px" }} />
                        Ajouter un utilisateur
                    </button>
                )}
            </div>

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

                            {/* ✅ Affiche les rôles exactement comme en base */}
                            <td>{u.roles?.join(", ")}</td>

                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        (window.location.href = `/users/edit/${u.id}`)
                                    }
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className={`delete-button ${
                                        confirmId === u.id ? "confirm-delete" : ""
                                    }`}
                                    onClick={() => handleDelete(u.id)}
                                >
                                    <FaTrash />
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
        </div>
    );
};

export default UserList;
