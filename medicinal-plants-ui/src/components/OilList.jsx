import React, { useEffect, useState } from 'react';
import { getAllOils, deleteOil } from '../services/OilService';
import OilFilter from './OilFilter';
import OilCard from './OilCard';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../css/OilList.css';

const OilList = () => {
    const [oils, setOils] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ name: '', plant: '', benefit: '' });
    const size = 6;


    const fetchOils = (pageNumber = 0) => {
        const { name, plant, benefit } = filters;

        getAllOils(pageNumber, size, name, plant, benefit).then((res) => {
            setOils(res.data.oils);
            setPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        });
    };

    useEffect(() => {
        fetchOils(page);
    }, [page]);

    useEffect(() => {
        fetchOils(0);
    }, [filters]);

    const handleDelete = (id) => {
        deleteOil(id)
            .then(() => {
                toast.success("Huile supprimée !");
                setOils((prev) => prev.filter((oil) => oil.id !== id));
            })
            .catch(() => toast.error("Erreur lors de la suppression."));
    };

    const handleSearch = (value, type) => {
        const newFilters = { name: '', plant: '', benefit: '' };
        newFilters[type] = value;
        setFilters(newFilters);
        setPage(0); // ✅ pour relancer la pagination à zéro
    };

    const handleReset = () => {
        setFilters({ name: '', plant: '', benefit: '' });
    };


    const handlePageClick = (pageNumber) => {
        if (pageNumber !== page) setPage(pageNumber);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-btn ${i === page ? 'active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i + 1}
                </button>
            );
        }

        return (
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    ◀ Précédent
                </button>
                {pages}
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>
                    Suivant ▶
                </button>
            </div>
        );
    };




    return (
        <div className="oil-list-container">
            <OilFilter onSearch={handleSearch} onReset={handleReset} />
            <div className="oil-list-header">
                <h2>🌿 Liste de nos huiles bio</h2>
                <Link to="/oils/create" className="btn-add-oil">
                    <FaPlus /> Ajouter
                </Link>
            </div>

            <div className="card-grid">
                {oils.map((oil) => (
                    <OilCard key={oil.id} oil={oil} onDelete={handleDelete} />
                ))}
            </div>

            {renderPagination()}
        </div>
    );
};

export default OilList;