import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Breadcrumb.css';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="breadcrumb">
            {items.map((item, index) => (
                <span key={index}>
          {item.link ? (
              <Link to={item.link}>{item.label}</Link>
          ) : (
              <span className="breadcrumb-current">{item.label}</span>
          )}
                    {index < items.length - 1 && <span className="breadcrumb-separator">›</span>}
        </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;