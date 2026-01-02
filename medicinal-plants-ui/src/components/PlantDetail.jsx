import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlantById } from '../api/plantApi';
import Breadcrumb from './Breadcrumb';

import '../css/PlantDetail.css';

function PlantDetail() {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPlantById(id)
            .then(res => setPlant(res.data))
            .catch(err => console.error("❌ Erreur API :", err));
    }, [id]);

    if (!plant) return <p>⏳ Chargement...</p>;

    return (
        <>
            <Breadcrumb
                items={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Plantes', link: '/plants' },
                    { label: plant.name }
                ]}
            />
            <div className="plant-detail-container">
                <h2>{plant.name}</h2>
                <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="plant-detail-image"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                />

                <p><strong>Origine :</strong> {plant.origin}</p>
                <p><strong>Description :</strong> {plant.description}</p>
                <p><strong>Saison :</strong> {plant.seasonFound}</p>


                {plant.uses?.length > 0 && (
                    <div className="plant-detail-section">
                        <h4>🧪 Formes d’usage :</h4>
                        <ul>
                            {plant.uses.map((use, index) => (
                                <li key={index}>{use}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {plant.properties?.length > 0 && (
                    <div className="plant-detail-section">
                        <h4>🧠 Propriétés médicinales :</h4>
                        <ul>
                            {plant.properties.map((prop, index) => (
                                <li key={index}>{prop}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {plant.affiliateLink && (
                    <div className="plant-detail-section">
                        <p>
                            🔗 <strong>Produit affilié :</strong>{' '}
                            <a href={plant.affiliateLink} target="_blank" rel="noopener noreferrer">
                                Voir sur Aroma-Zone
                            </a>
                        </p>
                    </div>
                )}
                {plant.id && (
                    <button
                        className="oil-button"
                        onClick={() => navigate(`/oils/plant/${plant.id}`)}
                    >
                        🧴 Voir l’huile issue de cette plante
                    </button>
                )}
                <button className="back-button" onClick={() => navigate('/')}>↩️ Retour à la liste</button>
            </div>
        </>

    );
}

export default PlantDetail;