import React, { useState, useEffect } from 'react';
import '../css/CookieBanner.css';

function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookiesAccepted");
        if (!accepted) setVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="cookie-banner">
            <p>
                Ce site utilise des cookies techniques pour améliorer votre expérience. Aucun cookie publicitaire n’est utilisé.
            </p>
            <button onClick={acceptCookies}>J’accepte</button>
        </div>
    );
}

export default CookieBanner;