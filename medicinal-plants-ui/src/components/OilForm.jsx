import React, { useState, useEffect } from "react";
import { getAllPlants } from "../api/plantApi";
import { getAllOils } from "../services/OilService";
import { FaCheckCircle, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OilImageGallery from "./OilImageGallery";
import "../css/OilForm.css";

const OilForm = ({ initialData = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        benefits: "",
        precautions: "",
        imageUrl: "",
        affiliateLink: "",
        plantId: "",
    });

    const [plants, setPlants] = useState([]);
    const [usedImages, setUsedImages] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 🔄 Charger les plantes
    useEffect(() => {
        getAllPlants(0, 100)
            .then((res) => setPlants(res.data.plants || []))
            .catch(() => console.error("Erreur chargement plantes"));
    }, []);

    // 🔄 Charger les images déjà utilisées
    useEffect(() => {
        getAllOils(0, 1000)
            .then((res) => {
                const urls = res.data.oils
                    .filter((o) => !(initialData?.id && o.id === initialData.id))
                    .map((o) => o.imageUrl);
                setUsedImages(urls);
            })
            .catch(() => console.error("Erreur chargement images utilisées"));
    }, [initialData?.id]);

    // 🔄 Préremplir si édition
    useEffect(() => {
        if (initialData && initialData.id) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                benefits: initialData.benefits || "",
                precautions: initialData.precautions || "",
                imageUrl: initialData.imageUrl || "",
                affiliateLink: initialData.affiliateLink || "",
                plantId: initialData.plantId?.toString() || "",
            });
        }
    }, [initialData?.id]);

    // 🧪 Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Le nom est requis.";
        if (!formData.description.trim()) newErrors.description = "La description est requise.";
        if (!formData.benefits.trim()) newErrors.benefits = "Les bienfaits sont requis.";
        if (!formData.imageUrl.trim()) newErrors.imageUrl = "L’URL de l’image est requise.";
        if (formData.affiliateLink && !formData.affiliateLink.startsWith("http"))
            newErrors.affiliateLink = "Le lien doit commencer par http(s).";
        if (!formData.plantId) newErrors.plantId = "La plante associée est requise.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🖊 Gestion des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 📤 Soumission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                ...formData,
                plant: { id: formData.plantId },
            };
            onSubmit(payload);
        }
    };

    // 🧩 Générateur de champs
    const renderField = (label, name, type = "text", isTextarea = false) => (
        <label>
            {label}
            <div className="input-with-icon">
                {isTextarea ? (
                    <textarea name={name} value={formData[name]} onChange={handleChange} />
                ) : (
                    <input type={type} name={name} value={formData[name]} onChange={handleChange} />
                )}

                {formData[name].trim() && !errors[name] && (
                    <FaCheckCircle className="icon valid" />
                )}
                {errors[name] && <FaExclamationCircle className="icon invalid" />}
            </div>

            {errors[name] && <span className="error">{errors[name]}</span>}
        </label>
    );

    return (
        <>
            {/* 🔙 Bouton retour */}
            <div className="back-button-container">
                <button type="button" className="back-button" onClick={() => navigate("/oils")}>
                    <FaArrowLeft style={{ marginRight: "6px" }} />
                    Retour à la liste des huiles
                </button>
            </div>

            {/* 🧴 Formulaire */}
            <form className="oil-form" onSubmit={handleSubmit}>
                {renderField("Nom :", "name")}
                {renderField("Description :", "description", "text", true)}
                {renderField("Bienfaits :", "benefits", "text", true)}
                {renderField("Précautions :", "precautions", "text", true)}
                {renderField("Image (URL) :", "imageUrl")}

                {/* 🖼 Aperçu image */}
                {formData.imageUrl && (
                    <div className="image-preview">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                        />
                    </div>
                )}

                {renderField("Lien partenaire :", "affiliateLink")}

                {/* 🌿 Sélection plante */}
                <label>
                    Plante associée :
                    <div className="input-with-icon">
                        <select name="plantId" value={formData.plantId} onChange={handleChange}>
                            <option value="">-- Sélectionner une plante --</option>
                            {plants.map((plant) => (
                                <option key={plant.id} value={plant.id}>
                                    {plant.name}
                                </option>
                            ))}
                        </select>

                        {formData.plantId && !errors.plantId && (
                            <FaCheckCircle className="icon valid" />
                        )}
                        {errors.plantId && <FaExclamationCircle className="icon invalid" />}
                    </div>

                    {errors.plantId && <span className="error">{errors.plantId}</span>}
                </label>

                {/* ✔ Bouton valider */}
                <button type="submit" className="submit-button">
                    Valider
                </button>

                {/* 🖼 Galerie d’images */}
                <OilImageGallery
                    selectedUrl={formData.imageUrl}
                    onSelect={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                    usedImages={usedImages}
                />
            </form>
        </>
    );
};

export default OilForm;