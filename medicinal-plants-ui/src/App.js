import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import PlantList from "./pages/PlantList";
import PlantDetail from "./pages/PlantDetail";
import PlantForm from "./pages/PlantForm";
import PlantEditForm from "./pages/PlantEditForm";
import LoginForm from "./pages/LoginForm";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LegalPage from "./pages/LegalPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookieBanner from "./pages/CookieBanner";
import ProtectedRoute from "./pages/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm"; // 🔒 Import de la route protégée

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    // 🧠 Vérifie au chargement s’il existe un token en localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        if (token) {
            setIsAuthenticated(true);
            setRole(storedRole);
        }
    }, []);

    const handleLogin = (token, userRole) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main className="main-content">
                    <Routes>
                        {/* 🌿 Routes publiques */}
                        <Route path="/" element={<PlantList />} />
                        <Route path="/plants" element={<PlantList />} />
                        <Route path="/plants/:id" element={<PlantDetail />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/mentions-legales" element={<LegalPage />} />
                        <Route path="/confidentialite" element={<PrivacyPolicyPage />} />
                        <Route path="/access-denied" element={<AccessDenied />} />

                        {/* 🔒 Routes Plants réservées à l’ADMIN */}
                        <Route
                            path="/plants/new"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <PlantForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/plants/edit/:id"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <PlantEditForm />
                                </ProtectedRoute>
                            }
                        />
                        {/* 🔒 Routes Users protégées ADMIN */}
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <UserList />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/users/new"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <UserForm />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/users/edit/:id"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <UserForm />
                                </ProtectedRoute>
                            }
                        />
                        {/* 🔐 Connexion */}
                        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    </Routes>
                </main>
                <CookieBanner />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
