import React, { PropsWithChildren, useContext, useState } from "react";

interface IAuthContext {
    isAuthenticated: boolean;
    experimentalMode: boolean;
    login: (token: string) => void;
    logout: () => void;
    setExperimentalModeOnOff: (mode: boolean) => void;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth-token'));
    const [experimentalMode, setExperimentalMode] = useState<boolean>(localStorage.getItem('experimental-mode') === 'true')
    const login = (token: string) => {
        localStorage.setItem('auth-token', token);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };
    const enableExperimentalMode = (mode: boolean) => {
        localStorage.setItem('experimental-mode', String(mode));
        setExperimentalMode(mode);
    };
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, experimentalMode, setExperimentalModeOnOff: enableExperimentalMode}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
