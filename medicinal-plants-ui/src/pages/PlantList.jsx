import React, { useEffect, useState } from 'react';
import { getAllPlants } from '../api/plantApi';
import './PlantList.css';
import { deletePlant } from '../api/plantApi';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';




function PlantList() {
    const [plants, setPlants] = useState([]);
    const isAdmin = true; // 🔐 À remplacer plus tard par une vraie vérification

    useEffect(() => {
        getAllPlants()
            .then(res => {
                console.log("✅ Plantes reçues :", res.data);

                setPlants(res.data);
            })
            .catch(err => console.error("❌ Erreur API :", err));
    }, []);

    function handleDelete(id) {
        if (window.confirm("Voulez-vous vraiment supprimer cette plante ?")) {
            deletePlant(id)
                .then(() => {
                    setPlants(prev => prev.filter(p => p.id !== id));
                })
                .catch(err => console.error("❌ Erreur suppression :", err));
        }
    }

    function handleEdit(id) {
        window.location.href = `/plants/edit/${id}`; // 🔄 Redirection vers la future page d’édition
    }


    return (
        <div className="plant-list">
            <div className="plant-list-header">
                <h2>🌿 Plantes médicinales</h2>
                <button className="add-button" onClick={() => window.location.href = '/plants/new'}>
                    ➕ Ajouter une plante
                </button>
            </div>
            <div className="card-grid">
                {plants.map(plant => (
                    <div className="plant-card" key={plant.id}>
                        <img src={plant.imageUrl} alt={plant.name} className="plant-image" />
                        <div className="plant-info">
                            <h3>{plant.name}</h3>
                            <p><strong>Origine :</strong> {plant.origin}</p>
                            <p><strong>Description :</strong> {plant.description}</p>
                            <p><strong>Saison :</strong> {plant.seasonFound}</p>
                            <div className="button-group">
                                <div className="button-row">
                                    <button className="view-button" onClick={() => window.location.href = `/plants/${plant.id}`}>
                                        <FaEye style={{ marginRight: '6px' }} />
                                        Voir plus
                                    </button>

                                    {isAdmin && (
                                        <button className="edit-button" onClick={() => handleEdit(plant.id)}>
                                            <FaEdit style={{ marginRight: '6px' }} />
                                            Modifier
                                        </button>
                                    )}
                                </div>

                                {isAdmin && (
                                    <div className="button-row">
                                        <button className="delete-button" onClick={() => handleDelete(plant.id)}>
                                            <FaTrash style={{ marginRight: '6px' }} />
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlantList;