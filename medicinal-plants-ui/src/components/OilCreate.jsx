import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOil } from '../services/oilService';
import { getAllPlants } from '../api/plantApi';
import OilForm from './OilForm';
import './OilCreateEdit.css';

const OilCreate = () => {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPlants().then((res) => {
            setPlants(res.data);
        });
    }, []);

    const handleCreate = (data) => {
        const token = localStorage.getItem('token');
        createOil(data, token)
            .then(() => navigate('/oils'))
            .catch((err) => console.error('Erreur lors de la création :', err));
    };

    return (
        <div className="oil-form-page">
            <h2>➕ Ajouter une huile essentielle</h2>
            <OilForm onSubmit={handleCreate} plants={plants} />
        </div>
    );
};

export default OilCreate;