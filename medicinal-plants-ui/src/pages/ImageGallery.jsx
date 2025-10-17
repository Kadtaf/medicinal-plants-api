import React, { useEffect, useState } from 'react';
import './ImageGallery.css';
import {data} from "react-router-dom";

function ImageGallery({ selectedUrl, onSelect }) {
    const [imageOptions, setImageOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [usedImages, setUsedImages] = useState([]);

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

    // 🔄 Chargement des images déjà utilisées
    useEffect(() => {
        const fetchUsedImages = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/plants');
                const data = await res.json();
                const urls = data.map(plant => plant.imageUrl);
                setUsedImages(urls);
            } catch (err) {
                console.error("❌ Erreur chargement plantes :", err);
            }
        };
        fetchUsedImages();
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
                                        onClick={() => onSelect(option.url)}
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