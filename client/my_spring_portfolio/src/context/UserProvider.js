import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export function UserProvider({children}) {
    // const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user);
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

