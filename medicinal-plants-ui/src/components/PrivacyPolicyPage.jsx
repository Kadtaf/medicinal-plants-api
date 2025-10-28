import React from 'react';
import '../css/StaticPage.css';

function PrivacyPolicyPage() {
    return (
        <div className="static-page">
            <h2>🔐 Politique de confidentialité</h2>

            <section>
                <h3>Collecte des données</h3>
                <p>
                    Nous collectons uniquement les données nécessaires à la communication via notre formulaire de contact : nom, adresse email, sujet et message.
                </p>
            </section>

            <section>
                <h3>Utilisation des données</h3>
                <p>
                    Les données sont utilisées exclusivement pour répondre aux demandes envoyées via le formulaire. Elles ne sont ni conservées au-delà de la durée nécessaire, ni partagées avec des tiers.
                </p>
            </section>

            <section>
                <h3>Vos droits</h3>
                <p>
                    Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, limitation, portabilité et opposition. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@plantesmedicinales.fr">contact@plantesmedicinales.fr</a>.
                </p>
            </section>

            <section>
                <h3>Sécurité</h3>
                <p>
                    Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou altération.
                </p>
            </section>

            <section>
                <h3>Cookies</h3>
                <p>
                    Ce site utilise uniquement des cookies techniques pour améliorer la navigation. Aucun cookie publicitaire ou de traçage n’est utilisé.
                </p>
            </section>

            <section>
                <h3>Réclamations</h3>
                <p>
                    En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr">www.cnil.fr</a>.
                </p>
            </section>
        </div>
    );
}

export default PrivacyPolicyPage;