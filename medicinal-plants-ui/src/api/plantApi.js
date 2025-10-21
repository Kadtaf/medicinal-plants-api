// src/api/plantApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/plants',
});

// 🛡️ Intercepteur : ajoute le token à toutes les requêtes si présent
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🌿 Fonctions API
export const getAllPlants = () => api.get('');
export const getPlantById = (id) => api.get(`/id/${id}`);
export const createPlant = (data) => api.post('', data);
export const updatePlant = (id, data) => api.put(`/id/${id}`, data);
export const deletePlant = (id) => api.delete(`/id/${id}`);
