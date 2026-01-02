import React, { useState } from 'react';
import '../css/OilFilter.css';

const OilFilter = ({ onSearch, onReset }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('name');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm, filterType);
    };

    const handleReset = () => {
        setSearchTerm('');
        onSearch('', 'name'); // recharge toutes les huiles
        onReset();
    };

    return (
        <div className="oil-filter-bar">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="name">Nom</option>
                <option value="plant">Plante associée</option>
                <option value="benefit">Bienfait</option>
            </select>

            <input
                type="text"
                placeholder={`🔍 Rechercher par ${filterType}`}
                value={searchTerm}
                onChange={handleChange}
            />

            <button type="button" onClick={handleSearchClick}>🔍 Rechercher</button>

            {searchTerm.trim() !== '' && (
                <button type="button" onClick={handleReset}>Réinitialiser</button>
            )}
        </div>
    );
};

export default OilFilter;