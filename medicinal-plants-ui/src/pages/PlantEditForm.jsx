import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlantById, updatePlant } from '../api/plantApi';
import ImageGallery from "./ImageGallery";
import './PlantForm.css';

function PlantEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        description: '',
        seasonFound: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        getPlantById(id)
            .then(res => setFormData(res.data))
            .catch(err => {
                console.error("❌ Erreur chargement :", err);
                setError("Impossible de charger la plante.");
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.origin || !formData.description || !formData.seasonFound || !formData.imageUrl) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        updatePlant(id, formData)
            .then(() => navigate('/'))
            .catch(err => {
                console.error("❌ Erreur modification :", err);
                setError("Erreur lors de la modification.");
            });
    };

    return (
        <div className="plant-form-container">
            <h2>✏️ Modifier la plante</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="plant-form">
                <label>Nom</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />

                <label>Origine</label>
                <input type="text" name="origin" value={formData.origin} onChange={handleChange} />

                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />

                <label>Saison</label>
                <input type="text" name="seasonFound" value={formData.seasonFound} onChange={handleChange} />

                <label>Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

                {formData.imageUrl && (
                    <div className="image-preview">
                        <img src={formData.imageUrl} alt="Preview" />
                    </div>
                )}

                <button type="submit">💾 Enregistrer</button>
            </form>
            <ImageGallery
                selectedUrl={formData.imageUrl}
                onSelect={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />
        </div>
    );
}

export default PlantEditForm;