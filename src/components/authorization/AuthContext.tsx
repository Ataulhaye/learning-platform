import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    user: { email: string; role: string } | null;
    login: (user: { email: string; role: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);

    const login = (user: { email: string; role: string }) => {
        setIsAuthenticated(true);
        setUser(user);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const GardRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};