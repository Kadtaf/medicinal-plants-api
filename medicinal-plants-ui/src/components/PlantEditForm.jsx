import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPlants, getPlantById, updatePlant } from '../api/plantApi';
import ImageGallery from "./ImageGallery";
import '../css/PlantForm.css';
import { toast } from "react-toastify";

function PlantEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        description: '',
        seasonFound: '',
        imageUrl: '',
        affiliateLink: '',
        uses: '', // champ texte, sera converti en tableau
        properties: '' // ✅ champ texte, sera converti en tableau
    });

    const [error, setError] = useState('');
    const [usedImages, setUsedImages] = useState([]);

    useEffect(() => {
        getAllPlants(0, 1000)
            .then(res => {
                const urls = res.data.plants
                    .filter(p => p.id !== parseInt(id))
                    .map(p => p.imageUrl);
                setUsedImages(urls);
            })
            .catch(err => console.error("❌ Erreur chargement images utilisées :", err));
    }, [id]);

    useEffect(() => {
        getPlantById(id)
            .then(res => {
                const plant = res.data;
                setFormData({
                    ...plant,
                    uses: plant.uses ? plant.uses.join(', ') : '',
                    properties: plant.properties ? plant.properties.join(', ') : '' // ✅ conversion tableau → texte
                });
            })
            .catch(err => {
                console.error("❌ Erreur chargement :", err);
                toast.error("❌ Impossible de charger la plante.");
            });
    }, [id]);

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
                .filter(u => u.length > 0),
            properties: formData.properties
                .split(',')
                .map(p => p.trim())
                .filter(p => p.length > 0) // ✅ conversion texte → tableau
        };

        updatePlant(id, payload)
            .then(() => {
                toast.success("✅ Plante modifiée avec succès !");
                navigate('/');
            })
            .catch(err => {
                console.error("❌ Erreur modification :", err);
                toast.error("❌ Erreur lors de la modification.");
            });
    };

    return (
        <div className="plant-form-container">
            <h2>✏️ Modifier la plante</h2>
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
                    value={formData.properties}
                    onChange={handleChange}
                    placeholder="Anxiété, Digestion, Sommeil"
                />

                <button type="submit">💾 Enregistrer</button>
            </form>

            <ImageGallery
                selectedUrl={formData.imageUrl}
                onSelect={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                usedImages={usedImages}
            />
        </div>
    );
}

export default PlantEditForm;