import React, { useEffect, useState } from "react";
import { getAllOils, deleteOil } from "../services/OilService";
import OilFilter from "./OilFilter";
import OilCard from "./OilCard";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "../css/OilList.css";

const OilList = () => {
    const [oils, setOils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ name: "", plant: "", benefit: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const size = 6;
    const navigate = useNavigate();

    // 🔐 Récupération du rôle et du token
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const isAdmin = role === "ROLE_ADMIN";

    // 🔄 Charger les huiles
    const fetchOils = (pageNumber = 0) => {
        setLoading(true);

        const { name, plant, benefit } = filters;

        getAllOils(pageNumber, size, name, plant, benefit)
            .then((res) => {
                setOils(res.data.oils || []);
                setPage(res.data.currentPage || 0);
                setTotalPages(res.data.totalPages || 1);
            })
            .catch(() => {
                toast.error("⚠️ Impossible de charger les huiles !");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOils(page);
    }, [page]);

    useEffect(() => {
        fetchOils(0);
    }, [filters]);

    // 🗑️ Suppression avec double confirmation
    const handleDelete = (id) => {
        if (!isAdmin) {
            toast.error("❌ Vous n'avez pas l'autorisation de supprimer.");
            return;
        }

        if (deleteConfirm === id) {
            deleteOil(id)
                .then(() => {
                    setOils((prev) => prev.filter((oil) => oil.id !== id));
                    toast.success("🧴 Huile supprimée avec succès !");
                    setDeleteConfirm(null);
                })
                .catch(() => toast.error("⚠️ Erreur lors de la suppression."));
        } else {
            setDeleteConfirm(id);
            toast.warn("⚠️ Cliquez à nouveau pour confirmer la suppression.", {
                autoClose: 3000,
            });
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    // 🔍 Recherche
    const handleSearch = (value, type) => {
        const newFilters = { name: "", plant: "", benefit: "" };
        newFilters[type] = value;
        setFilters(newFilters);
        setPage(0);
    };

    const handleReset = () => {
        setFilters({ name: "", plant: "", benefit: "" });
    };

    // 🔢 Pagination
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="pagination">
                <button
                    className="page-button nav-button"
                    onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                    disabled={page === 0}
                >
                    <FaChevronLeft /> Précédent
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`page-button ${page === i ? "active" : ""}`}
                        onClick={() => setPage(i)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="page-button nav-button"
                    onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    disabled={page === totalPages - 1}
                >
                    Suivant <FaChevronRight />
                </button>
            </div>
        );
    };

    if (loading) return <p style={{ textAlign: "center" }}>⏳ Chargement des huiles...</p>;

    return (
        <div className="oil-list-container">
            <OilFilter onSearch={handleSearch} onReset={handleReset} />

            <div className="oil-list-header">
                <h2>🧴 Huiles essentielles</h2>

                {isAdmin && isLoggedIn && (
                    <button
                        className="btn-add-oil"
                        onClick={() => navigate("/oils/create")}
                    >
                        <FaPlus /> Ajouter une huile
                    </button>
                )}
            </div>

            {!isLoggedIn && (
                <p style={{ color: "gray", textAlign: "center" }}>
                    🔒 Connectez-vous pour ajouter ou modifier des huiles.
                </p>
            )}

            <div className="card-grid">
                {oils.length === 0 ? (
                    <p style={{ textAlign: "center", color: "gray" }}>
                        Aucune huile trouvée.
                    </p>
                ) : (
                    oils.map((oil) => (
                        <OilCard
                            key={oil.id}
                            oil={oil}
                            onDelete={handleDelete}
                            isAdmin={isAdmin}
                        />
                    ))
                )}
            </div>

            {renderPagination()}
        </div>
    );
};

export default OilList;