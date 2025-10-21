import React from "react";
import { Navigate } from "react-router-dom";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🚫 Non connecté → redirige vers login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 Pas admin → page d’accès refusé
    if (requireAdmin && role !== "ADMIN") {
        return <AccessDenied />;
    }

    // ✅ Accès autorisé
    return children;
};

export default ProtectedRoute;
