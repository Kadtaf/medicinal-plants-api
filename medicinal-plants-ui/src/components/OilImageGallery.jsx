import React, { useEffect, useState } from "react";
import "../css/ImageGallery.css";

function OilImageGallery({ selectedUrl, onSelect, usedImages = [] }) {
    const [imageOptions, setImageOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔄 Chargement des images disponibles
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/oil-images");

                if (!res.ok) {
                    setError(`Erreur serveur : ${res.status}`);
                    setImageOptions([]);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setImageOptions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("❌ Erreur chargement images huiles :", err);
                setError("Impossible de charger les images.");
                setImageOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    // 🔍 Filtrage des images
    const filteredImages = imageOptions.filter(
        (option) =>
            option.name &&
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="image-gallery">
            <p className="gallery-title">📷 Sélectionner une image d’huile essentielle :</p>

            {/* 🔍 Barre de recherche */}
            <input
                type="text"
                placeholder="🔍 Rechercher une huile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="image-search"
            />

            {/* ⏳ Loader */}
            {loading && <p className="gallery-loading">Chargement des images...</p>}

            {/* ⚠️ Erreur */}
            {error && <p className="gallery-error">{error}</p>}

            {/* 🖼 Liste des images */}
            {!loading && !error && (
                <div className="image-scroll">
                    {filteredImages.length === 0 ? (
                        <p className="gallery-empty">Aucune image trouvée.</p>
                    ) : (
                        filteredImages.map((option, index) => {
                            const isUsed = usedImages.includes(option.url);
                            const isSelected = selectedUrl === option.url;

                            return (
                                <div key={index} className="image-item">
                                    <div className="image-wrapper">
                                        <img
                                            src={option.url}
                                            alt={option.name}
                                            aria-label={`Image ${option.name}`}
                                            onClick={() =>
                                                !isUsed && onSelect(option.url)
                                            }
                                            className={`gallery-image 
                                                ${isSelected ? "selected" : ""} 
                                                ${isUsed ? "used" : ""}`}
                                        />

                                        {isUsed && (
                                            <span className="used-badge">✔ utilisée</span>
                                        )}
                                    </div>

                                    <p className="image-label">{option.name}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

export default OilImageGallery;