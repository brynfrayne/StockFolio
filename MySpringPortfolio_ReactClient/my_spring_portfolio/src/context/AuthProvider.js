import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}
