import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/oils',
});

// Intercepteur : ajoute le token à toutes les requêtes si présent
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

// Récupérer la liste paginée des huiles
export const getAllOils = (page = 0, size = 6, name = '', plant = '', benefit = '') => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    if (name) params.append('name', name);
    if (plant) params.append('plant', plant);
    if (benefit) params.append('benefit', benefit);

    return api.get(`?${params.toString()}`);
};

// Récupérer une huile par son ID
export const getOilById = (id) => {
    return api.get(`/id/${id}`);
};

// Rechercher des huiles par nom
export const searchOilsByName = (name) => {
    return api.get(`/search?name=${encodeURIComponent(name)}`);
};

// Rechercher des huiles par nom de plante
export const searchOilsByPlant = (plantName) => {
    return api.get(`/searchByPlant?plant=${encodeURIComponent(plantName)}`);
};

// Créer une nouvelle huile
export const createOil = (data) => {
    return api.post('', data);
};

// Mettre à jour une huile existante
export const updateOil = (id, data) => {
    return api.put(`/id/${id}`, data);
};

// Supprimer une huile
export const deleteOil = (id) => {
    return api.delete(`/id/${id}`);
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const getOilsByPlantId = (plantId) => {
    return axios.get(`${BASE_URL}/api/oils/plant/${plantId}`);
};