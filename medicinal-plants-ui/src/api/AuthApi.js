// src/api/AuthApi.js
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:8080/api/users', // adapte selon ton backend
});

export const login = (credentials) =>
    authApi.post('/login', credentials, { withCredentials: true });