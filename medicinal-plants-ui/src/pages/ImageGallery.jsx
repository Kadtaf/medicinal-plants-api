import React, { useEffect, useState } from 'react';
import './ImageGallery.css';


function ImageGallery({ selectedUrl, onSelect, usedImages = [] }) {
    const [imageOptions, setImageOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    // 🔄 Chargement des images disponibles
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/images');
                if (!res.ok) {
                    console.error(`❌ HTTP ${res.status}`);
                    setImageOptions([]);
                    return;
                }
                const data = await res.json();
                console.log("✅ Images reçues :", data);
                setImageOptions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("❌ Erreur chargement images :", err);
                setImageOptions([]);
            }
        };
        fetchImages();
    }, []);


    return (
        <div className="image-gallery">
            <p>📷 Sélectionner une image :</p>
            <input
                type="text"
                placeholder="🔍 Rechercher une plante"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="image-search"
            />
            <div className="image-scroll">
                {Array.isArray(imageOptions) &&
                    imageOptions
                        .filter(option =>
                            option.name &&
                            option.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((option, index) => (
                            <div key={index} className="image-item">
                                <div className="image-wrapper">
                                    <img
                                        src={option.url}
                                        alt={option.name}
                                        onClick={() => !usedImages.includes(option.url) && onSelect(option.url)}
                                        className={`${selectedUrl === option.url ? "selected" : ""} ${usedImages.includes(option.url) ? "used" : ""}`}
                                    />
                                    {usedImages.includes(option.url) && (
                                        <span className="used-badge">✔ utilisée</span>
                                    )}
                                </div>
                                <p className="image-label">{option.name}</p>
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default ImageGallery;