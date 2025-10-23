import React, {useEffect, useState} from 'react';
import {createPlant, getAllPlants} from '../api/plantApi';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import { toast } from 'react-toastify';
import './PlantForm.css';

function PlantForm() {
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        description: '',
        seasonFound: '',
        imageUrl: ''
    });

    const [usedImages, setUsedImages] = useState([]);
    const [imageOptions, setImageOptions] = useState([]);

    useEffect(() => {
        getAllPlants(0, 1000) // ou une API dédiée si tu veux juste les images
            .then(res => {
                const images = res.data.plants.map(p => p.imageUrl);
                setUsedImages(images);
            })
            .catch(err => console.error("❌ Erreur chargement des plantes :", err));
    }, []);


    useEffect(() => {
        fetch('http://localhost:8080/api/images')
            .then(res => res.json())
            .then(data => setImageOptions(data))
            .catch(err => console.error("❌ Erreur chargement images :", err));
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.origin || !formData.description || !formData.seasonFound || !formData.imageUrl) {
            toast.warn("⚠️ Tous les champs sont obligatoires.");
            return;
        }

        console.log("Payload envoyé :", formData);
        createPlant(formData)
            .then(() => {
                toast.success("🌿 Plante ajoutée avec succès !");
                navigate('/');
            })
            .catch(err => {
                console.error("❌ Erreur création :", err);
                toast.error("❌ Erreur lors de l'ajout de la plante.");
            });
    };

    return (
        <div className="plant-form-container">
            <h2>➕ Ajouter une plante médicinale</h2>
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

                <button type="submit">✅ Ajouter</button>
            </form>
            <ImageGallery
                selectedUrl={formData.imageUrl}
                onSelect={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                usedImages={usedImages}
            />
        </div>
    );
}

export default PlantForm;