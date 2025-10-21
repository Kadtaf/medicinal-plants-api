import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/users',
})

// Intercepteur pour ajouter automatiquement le token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🌿 Fonctions API CRUD
export const getAllUsers = () => api.get("");
export const getUserById = (id) => api.get(`/${id}`);
export const createUser = (data) => api.post("", data);
export const updateUser = (id, data) => api.put(`/${id}`, data);
export const deleteUser = (id) => api.delete(`/${id}`);