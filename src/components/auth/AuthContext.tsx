import React, { PropsWithChildren, useContext, useState } from "react";

interface IAuthContext {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth-token'));
    const login = (token: string) => {
        localStorage.setItem('auth-token', token);
        setIsAuthenticated(true);
    }
    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
