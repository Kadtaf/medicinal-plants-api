import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOil, getAllOils } from '../services/OilService';
import OilForm from './OilForm';
import { toast } from 'react-toastify';
import '../css/OilCreateEdit.css';

const OilCreate = () => {
    const navigate = useNavigate();
    const [usedImages, setUsedImages] = useState([]);

    // 🔄 Charger les images déjà utilisées par d'autres huiles
    useEffect(() => {
        getAllOils(0, 1000)
            .then((res) => {
                const urls = res.data.oils.map(o => o.imageUrl);
                setUsedImages(urls);
            })
            .catch(() => console.error("❌ Erreur chargement images utilisées"));
    }, []);

    const handleCreate = (data) => {
        createOil(data)
            .then(() => {
                toast.success("✅ Huile créée avec succès !");
                navigate('/oils');
            })
            .catch(() => toast.error("❌ Erreur lors de la création."));
    };

    return (
        <div className="oil-form-page">
            <h2>➕ Ajouter une huile essentielle</h2>
            <OilForm onSubmit={handleCreate} usedImages={usedImages} />
        </div>
    );
};

export default OilCreate;