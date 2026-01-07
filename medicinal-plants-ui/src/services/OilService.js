import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// 🔗 Instance Axios dédiée aux huiles
const api = axios.create({
    baseURL: `${BASE_URL}/api/oils`,
});

// 🔐 Intercepteur : ajoute automatiquement le token
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

// 🛡️ Gestion centralisée des erreurs
const handleError = (error) => {
    console.error("❌ API OilService Error:", error);

    const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Erreur lors de la communication avec le serveur.";

    return Promise.reject(message);
};

// 📌 Récupérer la liste paginée des huiles
export const getAllOils = (
    page = 0,
    size = 6,
    name = "",
    plant = "",
    benefit = ""
) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);

    if (name) params.append("name", name);
    if (plant) params.append("plant", plant);
    if (benefit) params.append("benefit", benefit);

    return api.get(`?${params.toString()}`).catch(handleError);
};

// 📌 Récupérer une huile par ID
export const getOilById = (id) => {
    return api.get(`/id/${id}`).catch(handleError);
};

// 📌 Créer une nouvelle huile
export const createOil = (data) => {
    return api.post("", data).catch(handleError);
};

// 📌 Mettre à jour une huile
export const updateOil = (id, data) => {
    return api.put(`/id/${id}`, data).catch(handleError);
};

// 📌 Supprimer une huile
export const deleteOil = (id) => {
    return api.delete(`/id/${id}`).catch(handleError);
};

// 📌 Récupérer les huiles associées à une plante
export const getOilsByPlantId = (plantId) => {
    return axios
        .get(`${BASE_URL}/api/oils/plant/${plantId}`)
        .catch(handleError);
};