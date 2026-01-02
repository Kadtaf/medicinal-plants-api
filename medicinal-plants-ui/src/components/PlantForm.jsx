import React, { useEffect, useState } from 'react';
import { createPlant, getAllPlants } from '../api/plantApi';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import { toast } from 'react-toastify';
import '../css/PlantForm.css';

function PlantForm() {
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        description: '',
        seasonFound: '',
        imageUrl: '',
        affiliateLink: '',
        uses: '', // champ texte, sera converti en tableau
        properties: []
    });

    const [usedImages, setUsedImages] = useState([]);
    const [imageOptions, setImageOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllPlants(0, 1000)
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

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'origin', 'description', 'seasonFound', 'imageUrl'];
        const missing = requiredFields.filter(field => !formData[field]);

        if (missing.length > 0) {
            toast.warn("⚠️ Tous les champs obligatoires doivent être remplis.");
            return;
        }

        if (!isValidUrl(formData.imageUrl)) {
            toast.warn("⚠️ L'URL de l'image est invalide.");
            return;
        }

        const payload = {
            ...formData,
            uses: formData.uses
                .split(',')
                .map(u => u.trim())
                .filter(u => u.length > 0)
        };

        console.log("Payload envoyé :", payload);

        createPlant(payload)
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
            <button className="back-button" type="button" onClick={() => navigate('/')}>↩️ Retour à la liste</button>
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
                        <img src={formData.imageUrl} alt="Preview" onError={(e) => (e.target.src = "/placeholder.jpg")}
                        />
                    </div>
                )}

                <label>Lien affilié (optionnel)</label>
                <input
                    type="text"
                    name="affiliateLink"
                    value={formData.affiliateLink}
                    onChange={handleChange}
                    placeholder="https://aroma-zone.com/produit/tisane-lavande"
                />

                <label>Formes d’usage (séparées par des virgules)</label>
                <input
                    type="text"
                    name="uses"
                    value={formData.uses}
                    onChange={handleChange}
                    placeholder="Infusion, Décoction, Gélule"
                />
                <label>Propriétés médicinales (séparées par des virgules)</label>
                <input
                    type="text"
                    name="properties"
                    value={formData.properties.join(", ")}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            properties: e.target.value.split(",").map(p => p.trim())
                        }))
                    }
                />

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