import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    setToken: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

