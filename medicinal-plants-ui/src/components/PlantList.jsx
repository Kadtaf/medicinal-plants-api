import React, { useEffect, useState } from "react";
import { getAllPlants, deletePlant } from "../api/plantApi";
import { FaEye, FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "../css/PlantList.css";
import { useNavigate } from "react-router-dom";

function PlantList() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");
    const navigate = useNavigate();
    const size = 6;

    // 🔹 Charger les plantes paginées depuis l'API
    const fetchPlants = (pageNumber = 0, search = "") => {
        setLoading(true);

        const name = filterType === "name" ? search : "";
        const season = filterType === "season" ? search : "";
        const property = filterType === "property" ? search : "";

        getAllPlants(pageNumber, size, name, season, property)
            .then((res) => {
                setPlants(res.data.plants || []);
                setTotalPages(res.data.totalPages || 1);
                setPage(res.data.currentPage || 0);
            })
            .catch((err) => {
                console.error("❌ Erreur chargement :", err);
                toast.error("⚠️ Impossible de charger les plantes !");
            })
            .finally(() => setLoading(false));
    };

    // 🔄 Réinitialisation via navigation
    useEffect(() => {
        if (window.location.pathname === "/plants") {
            setSearchTerm("");
            fetchPlants(0, "");
        }
    }, [window.location.pathname]);

    useEffect(() => {
        fetchPlants(page);
    }, [page]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            fetchPlants(0, "");
        }
    }, [searchTerm]);

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const isAdmin = role === "ROLE_ADMIN";

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDelete = (id) => {
        if (deleteConfirm === id) {
            deletePlant(id)
                .then(() => {
                    setPlants((prev) => prev.filter((p) => p.id !== id));
                    toast.success("🌿 Plante supprimée avec succès !");
                    setDeleteConfirm(null);
                })
                .catch((err) => {
                    console.error("❌ Erreur suppression :", err);
                    toast.error("⚠️ Échec de la suppression !");
                });
        } else {
            setDeleteConfirm(id);
            toast.warn("⚠️ Cliquez à nouveau sur « Supprimer » pour confirmer.", {
                autoClose: 3000,
            });
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>⏳ Chargement des plantes...</p>;
    return (
        <div className="plant-list">
            {/* 🔍 Barre de recherche */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Rechercher par ${filterType === "name" ? "nom" : filterType === "season" ? "saison" : "propriété"}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="filter-select"
                >
                    <option value="name">Nom</option>
                    <option value="season">Saison</option>
                    <option value="property">Propriété</option>
                </select>
                <button
                    onClick={() => {
                        if (searchTerm.trim() === "") {
                            toast.info("💡 Entrez un mot-clé avant de rechercher !");
                            return;
                        }
                        fetchPlants(0, searchTerm);
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
                            fetchPlants(0, "");
                        }}
                        className="reset-button"
                    >
                        🔄 Réinitialiser la recherche
                    </button>
                </div>
            )}

            <div className="plant-list-header">
                <h2>🌿 Plantes médicinales</h2>

                {isAdmin && isLoggedIn && (
                    <button
                        className="add-button"
                        onClick={() => navigate("/plants/new")}
                    >
                        ➕ Ajouter une plante
                    </button>
                )}
            </div>

            {!isLoggedIn && (
                <p style={{ color: "gray", textAlign: "center" }}>
                    🔒 Connectez-vous pour ajouter ou modifier des plantes.
                </p>
            )}

            {plants.length === 0 ? (
                <p style={{ textAlign: "center", color: "gray" }}>🌾 Aucune plante trouvée.</p>
            ) : (
                <div className="card-grid">
                    {plants.map((plant) => (
                        <div className="plant-card" key={plant.id}>
                            <img
                                src={plant.imageUrl}
                                alt={plant.name}
                                className="plant-image"
                                onError={(e) => (e.target.src = "/placeholder.jpg")}
                            />
                            <div className="plant-info">
                                <h3>{plant.name}</h3>
                                <p><strong>Origine :</strong> {plant.origin}</p>
                                <p><strong>Description :</strong> {plant.description}</p>
                                <p><strong>Saison :</strong> {plant.seasonFound}</p>

                                <div className="button-group">
                                    <div className="button-row">
                                        <button
                                            className="view-button"
                                            onClick={() => navigate(`/plants/${plant.id}`)}
                                        >
                                            <FaEye /> Voir plus
                                        </button>

                                        {isAdmin && (
                                            <button
                                                className="edit-button"
                                                onClick={() => navigate(`/plants/edit/${plant.id}`)}
                                            >
                                                <FaEdit /> Modifier
                                            </button>
                                        )}
                                    </div>

                                    {isAdmin && (
                                        <div className="button-row">
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(plant.id)}
                                                disabled={deletingId === plant.id}
                                            >
                                                {deletingId === plant.id ? "⏳" : <><FaTrash /> Supprimer</>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔢 Pagination améliorée */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
}

export default PlantList;
