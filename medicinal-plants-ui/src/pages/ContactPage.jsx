import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

function ContactPage() {
    const form = useRef();
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('');
        setError('');

        emailjs.sendForm(
            'service_xxxxxx', // ← ton ID de service EmailJS
            'template_xxxxxx', // ← ton ID de template EmailJS
            form.current,
            'user_xxxxxx' // ← ton clé publique EmailJS
        )
            .then(() => {
                setStatus("✅ Message envoyé avec succès !");
                form.current.reset();
            })
            .catch((err) => {
                console.error("❌ Erreur EmailJS :", err);
                setError("Une erreur est survenue. Veuillez réessayer.");
            });
    };


    return (
        <div className="contact-page-wrapper">
            <div className="contact-page">
                <h2>📬 Contactez-nous</h2>
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <label>Nom</label>
                    <input type="text" name="user_name" required />

                    <label>Email</label>
                    <input type="email" name="user_email" required />

                    <label>Sujet</label>
                    <input type="text" name="subject" required />

                    <label>Message</label>
                    <textarea name="message" rows="5" required />

                    <button type="submit">📨 Envoyer</button>
                </form>

                {status && <p className="success">{status}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default ContactPage;