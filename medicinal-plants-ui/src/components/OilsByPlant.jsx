import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOilsByPlantId } from '../services/OilService';
import Breadcrumb from './Breadcrumb';
import '../css/OilsByPlant.css';

const OilsByPlant = () => {
    const { plantId } = useParams();
    const [oils, setOils] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOilsByPlantId(plantId)
            .then(res => {
                console.log("✅ Huiles reçues :", res.data);

                setOils(res.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("❌ Erreur chargement huiles par plante :", err);
                setLoading(false);
            });
    }, [plantId]);

    if (loading) return <p>⏳ Chargement des huiles...</p>;
    if (oils.length === 0) return <p>😕 Aucune huile associée à cette plante.</p>;

    return (
        <>
            <Breadcrumb
                items={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Plantes', link: '/plants' },
                    { label: 'Détails plante', link: `/plants/${plantId}` },
                    { label: 'Huiles associées' }
                ]}
            />
            <div className="oils-by-plant-container">
                <h2>🧴 Huiles issues de cette plante</h2>
                <div className="oil-card-list">
                    {oils.map(oil => (
                        <div key={oil.id} className="oil-card">
                            <img
                                src={oil.imageUrl}
                                alt={oil.name}
                                className="oil-card-image"
                                onError={(e) => { e.target.src = '/default-oil.jpg'; }}
                            />
                            <h3>{oil.name}</h3>
                            <p>{oil.description.slice(0, 100)}...</p>
                            <Link to={`/oils/${oil.id}`} className="btn-details">Voir détails</Link>
                        </div>
                    ))}
                </div>
                <Link to={`/plants/${plantId}`} className="btn-back">← Retour à la plante</Link>
            </div>
        </>
    );
};

export default OilsByPlant;