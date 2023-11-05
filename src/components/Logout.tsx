import React, { useEffect } from "react";
import { useAuth } from "./auth/AuthContext";
import { Navigate } from "react-router-dom";

export const Logout: React.FC = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    }, []);
    return <Navigate to="/login" />;
}