import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOilById, updateOil, getAllOils } from "../services/OilService";
import OilForm from "./OilForm";
import { toast } from "react-toastify";
import "../css/OilCreateEdit.css";

const OilEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [oil, setOil] = useState(null);
    const [usedImages, setUsedImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔄 Charger l’huile à modifier
    useEffect(() => {
        getOilById(id)
            .then((res) => {
                const oilData = res.data;
                setOil({
                    ...oilData,
                    plantId: oilData.plant?.id || "",
                    id: oilData.id,
                });
            })
            .catch(() => {
                toast.error("❌ Huile introuvable");
                navigate("/oils");
            });
    }, [id, navigate]);

    // 🔄 Charger les images déjà utilisées
    useEffect(() => {
        getAllOils(0, 1000)
            .then((res) => {
                const urls = res.data.oils
                    .filter((o) => o.id !== parseInt(id)) // exclure l’huile en cours d’édition
                    .map((o) => o.imageUrl);
                setUsedImages(urls);
            })
            .catch(() => {
                console.error("❌ Erreur chargement images utilisées");
                toast.error("Impossible de charger les images existantes.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpdate = (data) => {
        updateOil(id, data)
            .then(() => {
                toast.success("🧴 Huile mise à jour avec succès !");
                navigate(`/oils/id/${id}`);
            })
            .catch(() => toast.error("❌ Erreur lors de la mise à jour."));
    };

    return (
        <div className="oil-form-page">
            <h2>✏️ Modifier l’huile essentielle</h2>

            {loading ? (
                <p className="loading-text">Chargement...</p>
            ) : (
                oil && (
                    <OilForm
                        initialData={oil}
                        onSubmit={handleUpdate}
                        usedImages={usedImages}
                    />
                )
            )}
        </div>
    );
};

export default OilEdit;