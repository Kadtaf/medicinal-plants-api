// src/components/PlantList.jsx
import React, { useEffect, useState } from 'react';
import { getAllPlants, deletePlant } from '../api/plantApi';
import './PlantList.css';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

function PlantList() {
    const [plants, setPlants] = useState([]);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const isAdmin = role === 'ADMIN';

    useEffect(() => {
        getAllPlants()
            .then((res) => {
                console.log('✅ Plantes reçues :', res.data);
                setPlants(res.data);
            })
            .catch((err) => console.error('❌ Erreur API :', err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cette plante ?')) {
            deletePlant(id)
                .then(() => {
                    setPlants((prev) => prev.filter((p) => p.id !== id));
                })
                .catch((err) => console.error('❌ Erreur suppression :', err));
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/plants/edit/${id}`;
    };

    return (
        <div className="plant-list">
            <div className="plant-list-header">
                <h2>🌿 Plantes médicinales</h2>

                {/* 🔒 Bouton Ajouter visible uniquement pour ADMIN */}
                {isAdmin && isLoggedIn && (
                    <button
                        className="add-button"
                        onClick={() => (window.location.href = '/plants/new')}
                    >
                        ➕ Ajouter une plante
                    </button>
                )}
            </div>

            {/* 🔒 Message d’information si non connecté */}
            {!isLoggedIn && (
                <p style={{ color: 'gray', textAlign: 'center' }}>
                    🔒 Connectez-vous pour ajouter ou modifier des plantes.
                </p>
            )}

            <div className="card-grid">
                {plants.map((plant) => (
                    <div className="plant-card" key={plant.id}>
                        <img src={plant.imageUrl} alt={plant.name} className="plant-image" />
                        <div className="plant-info">
                            <h3>{plant.name}</h3>
                            <p>
                                <strong>Origine :</strong> {plant.origin}
                            </p>
                            <p>
                                <strong>Description :</strong> {plant.description}
                            </p>
                            <p>
                                <strong>Saison :</strong> {plant.seasonFound}
                            </p>

                            <div className="button-group">
                                <div className="button-row">
                                    <button
                                        className="view-button"
                                        onClick={() => (window.location.href = `/plants/${plant.id}`)}
                                    >
                                        <FaEye style={{ marginRight: '6px' }} />
                                        Voir plus
                                    </button>

                                    {/* 🔒 Modifier visible uniquement pour ADMIN */}
                                    {isAdmin && isLoggedIn && (
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(plant.id)}
                                        >
                                            <FaEdit style={{ marginRight: '6px' }} />
                                            Modifier
                                        </button>
                                    )}
                                </div>

                                {/* 🔒 Supprimer visible uniquement pour ADMIN */}
                                {isAdmin && isLoggedIn && (
                                    <div className="button-row">
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(plant.id)}
                                        >
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
