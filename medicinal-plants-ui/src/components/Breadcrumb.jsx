import React from "react";
import { Link } from "react-router-dom";
import "../css/Breadcrumb.css";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="breadcrumb-container" aria-label="Fil d’Ariane">
            <ul className="breadcrumb-list">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {item.link ? (
                            <Link to={item.link} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="breadcrumb-current">{item.label}</span>
                        )}

                        {index < items.length - 1 && (
                            <span className="breadcrumb-separator">›</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;