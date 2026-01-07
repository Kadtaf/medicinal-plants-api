import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOilById } from "../services/OilService";
import "../css/OilDetails.css";
import Breadcrumb from "./Breadcrumb";

const OilDetails = () => {
    const { id } = useParams();
    const [oil, setOil] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 Récupération du rôle et du token
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    const isAdmin = role === "ROLE_ADMIN";

    useEffect(() => {
        getOilById(id)
            .then((res) => {
                setOil(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Erreur lors du chargement de l'huile :", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p className="loading-text">⏳ Chargement de l’huile...</p>;
    }

    if (!oil) {
        return <p className="error-text">⚠️ Huile introuvable.</p>;
    }

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Accueil", link: "/" },
                    { label: "Huiles", link: "/oils" },
                    { label: oil.name }
                ]}
            />

            <div className="oil-details-container">
                <h2 className="oil-title">{oil.name}</h2>

                <img
                    src={oil.imageUrl}
                    alt={oil.name}
                    className="oil-details-image"
                    onError={(e) => {
                        e.target.src = "/default-oil.jpg";
                    }}
                />

                <div className="oil-details-content">
                    {/* Description */}
                    <section className="oil-section">
                        <h3>📘 Description</h3>
                        <p>{oil.description}</p>
                    </section>

                    {/* Bienfaits */}
                    <section className="oil-section">
                        <h3>🌿 Bienfaits</h3>
                        <p>{oil.benefits}</p>
                    </section>

                    {/* Précautions */}
                    <section className="oil-section">
                        <h3>⚠️ Précautions</h3>
                        <p>{oil.precautions}</p>
                    </section>

                    {/* Plante associée */}
                    {oil.plantImageUrl && oil.plantId && (
                        <section className="oil-section plant-section">
                            <h3>🌱 Plante associée : {oil.plantName}</h3>

                            <Link to={`/plants/${oil.plantId}`}>
                                <img
                                    src={oil.plantImageUrl}
                                    alt={oil.plantName}
                                    className="plant-details-image clickable"
                                    onError={(e) => {
                                        e.target.src = "/default-plant.jpg";
                                    }}
                                />
                            </Link>
                        </section>
                    )}

                    {/* Lien affilié */}
                    {oil.affiliateLink && (
                        <section className="oil-section">
                            <h3>🛒 Acheter</h3>
                            <a
                                href={oil.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="affiliate-link"
                            >
                                Voir le produit partenaire →
                            </a>
                        </section>
                    )}

                    {/* Actions */}
                    <div className="oil-details-actions">
                        {isAdmin && isLoggedIn && (
                            <Link to={`/oils/edit/${oil.id}`} className="btn-edit">
                                ✏️ Modifier
                            </Link>
                        )}

                        <Link to="/oils" className="btn-back">
                            ← Retour à la liste
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OilDetails;