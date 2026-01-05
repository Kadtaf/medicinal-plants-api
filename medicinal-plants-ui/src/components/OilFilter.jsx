import React, { useState } from "react";
import "../css/OilFilter.css";
import { toast } from "react-toastify";

const OilFilter = ({ onSearch, onReset }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");

    const handleSearchClick = () => {
        if (searchTerm.trim() === "") {
            toast.info("💡 Entrez un mot-clé avant de rechercher !");
            return;
        }

        onSearch(searchTerm, filterType);
    };

    const handleReset = () => {
        setSearchTerm("");
        onReset();
    };

    return (
        <div className="oil-filter-bar">
            {/* Type de filtre */}
            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="oil-filter-select"
            >
                <option value="name">Nom</option>
                <option value="plant">Plante associée</option>
                <option value="benefit">Bienfait</option>
            </select>

            {/* Champ de recherche */}
            <input
                type="text"
                placeholder={`🔍 Rechercher par ${
                    filterType === "name"
                        ? "nom"
                        : filterType === "plant"
                            ? "plante associée"
                            : "bienfait"
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="oil-filter-input"
            />

            {/* Bouton rechercher */}
            <button
                type="button"
                onClick={handleSearchClick}
                className="oil-filter-button"
            >
                🔍 Rechercher
            </button>

            {/* Bouton reset */}
            {searchTerm.trim() !== "" && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="oil-filter-reset"
                >
                    🔄 Réinitialiser
                </button>
            )}
        </div>
    );
};

export default OilFilter;