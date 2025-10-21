import React from 'react';
import './StaticPage.css';

function LegalPage() {
    return (
        <div className="static-page">
            <h2>📄 Mentions légales</h2>

            <section>
                <h3>Éditeur du site</h3>
                <p>
                    Le site <strong>Plantes Médicinales</strong> est édité par TAFTAF Abdelkader, développeur full-stack en reconversion, domicilié à Gradignan, Nouvelle-Aquitaine, France.
                </p>
            </section>

            <section>
                <h3>Responsable de la publication</h3>
                <p>
                    Médicinale plantes, en qualité de créateur et administrateur du projet, est responsable du contenu publié sur ce site.
                </p>
            </section>

            <section>
                <h3>Hébergement</h3>
                <p>
                    Le site est hébergé par un fournisseur cloud sécurisé, garantissant la disponibilité, la confidentialité et la protection des données.
                </p>
            </section>

            <section>
                <h3>Propriété intellectuelle</h3>
                <p>
                    Tous les contenus présents sur le site (textes, images, code source, logos) sont la propriété exclusive de l’éditeur, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite.
                </p>
            </section>

            <section>
                <h3>Données personnelles</h3>
                <p>
                    Aucune donnée personnelle n’est collectée sans consentement explicite. Les informations saisies dans le formulaire de contact sont utilisées uniquement pour répondre aux demandes et ne sont jamais transmises à des tiers.
                </p>
            </section>

            <section>
                <h3>Cookies</h3>
                <p>
                    Ce site utilise des cookies techniques pour améliorer la navigation et l’expérience utilisateur. Aucun cookie publicitaire ou de traçage n’est utilisé.
                </p>
            </section>

            <section>
                <h3>Accessibilité</h3>
                <p>
                    Le site est conçu pour être accessible à tous les utilisateurs, y compris ceux en situation de handicap. Nous nous engageons à améliorer continuellement l’ergonomie et la compatibilité avec les outils d’assistance.
                </p>
            </section>

            <section>
                <h3>Contact</h3>
                <p>
                    Pour toute question relative aux mentions légales, vous pouvez nous contacter via le formulaire disponible sur la page <a href="/contact">Contact</a>.
                </p>
            </section>
            <section>
                <h3>Protection des données personnelles (RGPD)</h3>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679), nous nous engageons à garantir la confidentialité, la sécurité et le contrôle des données personnelles que vous pourriez nous transmettre via ce site.
                </p>
                <p>
                    Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont ni conservées au-delà de la durée nécessaire, ni transmises à des tiers sans votre consentement explicite.
                </p>
                <p>
                    Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation du traitement, de portabilité et d’opposition concernant vos données. Pour exercer ces droits, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:contact@plantesmedicinales.fr">contact@plantesmedicinales.fr</a>.
                </p>
                <p>
                    En cas de litige, vous avez également le droit d’introduire une réclamation auprès de la CNIL (Commission Nationale de l’Informatique et des Libertés).
                </p>
            </section>
        </div>
    );
}

export default LegalPage;