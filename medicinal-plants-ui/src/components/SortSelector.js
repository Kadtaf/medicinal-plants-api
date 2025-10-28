import React from 'react';
import '../css/SortSelector.css'; // si tu veux styliser

function SortSelector({ sortBy, direction, onChange }) {
    return (
        <div className="sort-selector">
            <label>Trier par :</label>
            <select value={sortBy} onChange={(e) => onChange(e.target.value, direction)}>
                <option value="name">Nom</option>
                <option value="seasonFound">Saison</option>
                <option value="origin">Origine</option>
            </select>

            <label>Ordre :</label>
            <select value={direction} onChange={(e) => onChange(sortBy, e.target.value)}>
                <option value="asc">⬆️ Croissant</option>
                <option value="desc">⬇️ Décroissant</option>
            </select>
        </div>
    );
}

export default SortSelector;