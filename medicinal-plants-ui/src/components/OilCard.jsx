import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../css/OilCard.css';

const OilCard = ({ oil, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Confirmer la suppression ?")) {
            if (onDelete) onDelete(oil.id); // ✅ délégation uniquement
        }
    };


    return (
        <div className="oil-card">
            <img src={oil.imageUrl || '/img/default.jpg'} alt={oil.name} className="oil-card-image" />
            <div className="oil-card-content">
                <h3>{oil.name}</h3>
                <p>{oil.benefits?.slice(0, 100)}...</p>
                <div className="oil-card-actions">
                    <Link to={`/oils/id/${oil.id}`} className="btn-icon btn-view">
                        <FaEye /> Voir Plus
                    </Link>
                    <Link to={`/oils/edit/${oil.id}`} className="btn-icon">
                        <FaEdit /> Modifier
                    </Link>
                    <button onClick={handleDelete} className="btn-icon btn-delete">
                        <FaTrash /> Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};


export default OilCard;