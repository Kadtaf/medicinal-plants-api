import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOilById } from '../services/OilService';
import '../css/OilDetails.css';
import Breadcrumb from "./Breadcrumb";

const OilDetails = () => {
    const { id } = useParams();
    const [oil, setOil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOilById(id)
            .then((res) => {
                setOil(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement de l'huile :", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!oil) return <p>Huile introuvable.</p>;

    return (
        <>
            <Breadcrumb
                items={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Huiles', link: '/oils' },
                    { label: oil.name }
                ]}
            />
            <div className="oil-details-container">
                <h2>{oil.name}</h2>
                <img
                    src={oil.imageUrl}
                    alt={oil.name}
                    className="oil-details-image"
                    onError={(e) => { e.target.src = '/default-oil.jpg'; }}
                />
                <div className="oil-details-content">
                    <p><strong>Description :</strong> {oil.description}</p>
                    <p><strong>Bienfaits :</strong> {oil.benefits}</p>
                    <p><strong>Précautions :</strong> {oil.precautions}</p>
                    {oil.plantImageUrl && oil.plantId && (
                        <div className="plant-image-section">
                            <h4>🌿 Plante associée : {oil.plantName}</h4>
                            <Link to={`/plants/${oil.plantId}`}>
                                <img
                                    src={oil.plantImageUrl}
                                    alt={oil.plantName}
                                    className="plant-details-image clickable"
                                    onError={(e) => { e.target.src = '/default-plant.jpg'; }}
                                />
                            </Link>
                        </div>
                    )}
                    {oil.affiliateLink && (
                        <p>
                            <strong>🛒 Acheter :</strong>{' '}
                            <a href={oil.affiliateLink} target="_blank" rel="noopener noreferrer">
                                Lien partenaire
                            </a>
                        </p>
                    )}
                    <div className="oil-details-actions">
                        <Link to={`/oils/edit/${oil.id}`} className="btn-edit">Modifier</Link>
                        <Link to="/oils" className="btn-back">← Retour à la liste</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OilDetails;