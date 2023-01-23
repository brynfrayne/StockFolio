import React, { useState } from 'react';
import { PortfolioContext } from './PortfolioContext';

export function PortfolioProvider({children}) {
    const [assets, setAssets] = useState([]);

    return (
        <PortfolioContext.Provider value={{ assets, setAssets }}>
            {children}
        </PortfolioContext.Provider>
    );
}
