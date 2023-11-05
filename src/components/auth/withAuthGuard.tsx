import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const withAuthGuard = <P extends object>(Component: React.ComponentType<P>) => {
    const WithAuthGuard: React.FC<P> = (props) => {
        const { isAuthenticated } = useAuth();
        if (isAuthenticated) return <Component {...props} />;
        else return <Navigate to="/login" />
    };
    return WithAuthGuard;
}