import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/plants', // adapte si ton port change
});

export const getAllPlants = () => api.get('');
export const getPlantById = (id) => api.get(`/id/${id}`);
export const createPlant = (data) => api.post('', data);
export const updatePlant = (id, data) => api.put(`/id/${id}`, data);
export const deletePlant = (id) => api.delete(`/id/${id}`);

