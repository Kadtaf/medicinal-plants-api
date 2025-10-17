import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantById } from '../api/plantApi';

function PlantDetail() {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        getPlantById(id)
            .then(res => setPlant(res.data))
            .catch(err => console.error("❌ Erreur API :", err));
    }, [id]);

    if (!plant) return <p>Chargement...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>{plant.name}</h2>
            <img src={plant.imageUrl} alt={plant.name} style={{ width: '300px', borderRadius: '8px' }} />
            <p><strong>Origine :</strong> {plant.origin}</p>
            <p><strong>Description :</strong> {plant.description}</p>
            <p><strong>Saison :</strong> {plant.seasonFound}</p>
        </div>
    );
}

export default PlantDetail;