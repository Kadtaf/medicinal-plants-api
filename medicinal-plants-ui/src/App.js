import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlantList from "./components/PlantList";
import PlantDetail from "./components/PlantDetail";
import PlantForm from "./components/PlantForm";
import PlantEditForm from "./components/PlantEditForm";
import LoginForm from "./components/LoginForm";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import LegalPage from "./components/LegalPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import CookieBanner from "./components/CookieBanner";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm"; // 🔒 Import de la route protégée
import OilList from "./components/OilList";
import OilDetails from "./components/OilDetails";
import OilCreate from "./components/OilCreate";
import OilEdit from "./components/OilEdit";
import OilsByPlant from "./components/OilsByPlant";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    // Vérifie au chargement s’il existe un token en localStorage
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
                        <Route path="/oils/plant/:plantId" element={<OilsByPlant />} />
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

                        {/* 🌿 Routes Huiles essentielles */}
                        <Route path="/oils" element={<OilList />} />
                        <Route path="/oils/id/:id" element={<OilDetails />} />
                        <Route path="/oils/:id" element={<OilDetails />} />
                        <Route
                            path="/oils/create"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <OilCreate />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/oils/edit/:id"
                            element={
                                <ProtectedRoute requireAdmin={true}>
                                    <OilEdit />
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
