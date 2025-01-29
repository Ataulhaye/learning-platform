import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { email: string; role: string } | null;
    login: (user: { email: string; role: string }, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = Cookies.get('token');
        return !!token;
    });
    const [user, setUser] = useState<{ email: string; role: string } | null>(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                return { email: decoded.email, role: decoded.role };
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        return null;
    });


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setIsAuthenticated(true);
                setUser({ email: decoded.email, role: decoded.role });
            } catch (error) {
                console.error('Invalid token:', error);
                setIsAuthenticated(false);
                setUser(null);
                Cookies.remove('token'); // Remove invalid token
            }
        }
        else {
            setIsAuthenticated(false);
            setUser(null);  
        }
    }, []);

    const login = (user: { email: string; role: string }, token: string) => {
        Cookies.set('token', token, { expires: 7 }); // Store token in cookies with an expiration
        setIsAuthenticated(true);
        setUser(user);
        //localStorage.setItem('isAuthenticated', 'true');
        //localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
        //localStorage.removeItem('isAuthenticated');
        //localStorage.removeItem('user');
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