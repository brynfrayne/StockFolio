import { createContext } from 'react';

const user = JSON.parse(sessionStorage.getItem('user'));
export const UserContext = createContext({
    user: user,
    setUser: () => {},
});

