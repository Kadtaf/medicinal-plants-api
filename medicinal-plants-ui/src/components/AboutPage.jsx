import React from 'react';
import '../css/StaticPage.css';

function AboutPage() {
    return (
        <div className="static-page">
            <h2>🌿 À propos de nous</h2>

            <section>
                <h3>Notre mission</h3>
                <p>
                    Plantes Médicinales est une plateforme dédiée à la valorisation des plantes aux vertus thérapeutiques.
                    Notre objectif est de rendre accessible le savoir botanique traditionnel et scientifique à tous, à travers une interface moderne, intuitive et sécurisée.
                </p>
            </section>

            <section>
                <h3>Origine du projet</h3>
                <p>
                    Ce projet est né de la passion de <strong>TAFTAF Abdelkader</strong>, développeur full-stack en reconversion, ancien chef de cuisine.
                    Il allie la rigueur culinaire à la précision logicielle pour créer une application utile, documentée et professionnelle.
                </p>
                <p>
                    Chaque plante, chaque fonctionnalité, chaque ligne de code est pensée pour offrir une expérience enrichissante, fiable et esthétique.
                </p>
            </section>

            <section>
                <h3>Ce que nous proposons</h3>
                <ul>
                    <li>🧪 Fiches détaillées sur les plantes médicinales : origine, saison, image, description</li>
                    <li>🔍 Moteur de recherche intelligent par nom, saison ou usage</li>
                    <li>🖥️ Interface moderne construite avec React et Spring Boot</li>
                    <li>🔐 Sécurité renforcée avec Spring Security et gestion des rôles</li>
                    <li>📬 Formulaire de contact intégré avec EmailJS</li>
                </ul>
            </section>

            <section>
                <h3>Nos valeurs</h3>
                <ul>
                    <li>🌱 Respect du vivant et des savoirs traditionnels</li>
                    <li>📚 Accessibilité et pédagogie</li>
                    <li>🔐 Confidentialité et sécurité des données</li>
                    <li>🤝 Collaboration ouverte avec les passionnés de botanique et de développement</li>
                </ul>
            </section>

            <section>
                <h3>Technologie</h3>
                <p>
                    Le projet repose sur une stack moderne :
                </p>
                <ul>
                    <li><strong>Frontend :</strong> React 18+, React Router v7, Axios, EmailJS</li>
                    <li><strong>Backend :</strong> Spring Boot, MariaDB, Spring Security</li>
                    <li><strong>Architecture :</strong> RESTful API, composants modulaires, gestion des rôles</li>
                    <li><strong>Déploiement :</strong> prêt pour l’hébergement cloud et l’intégration continue</li>
                </ul>
            </section>

            <section>
                <h3>Rejoignez-nous</h3>
                <p>
                    Vous êtes passionné·e par la nature, la santé ou le développement web ? Contactez-nous pour contribuer, suggérer des améliorations ou simplement échanger.
                </p>
            </section>
        </div>
    );
}

export default AboutPage;