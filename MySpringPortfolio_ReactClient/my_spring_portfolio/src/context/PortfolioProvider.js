import React, { useState } from 'react';
import { PortfolioContext } from './PortfolioContext';

export function PortfolioProvider({children}) {
    const [assets, setAssets] = useState([]);
    const [currentAssetState, setCurrentAssetState] = useState(null);

    return (
        <PortfolioContext.Provider value={{ assets, setAssets, currentAssetState, setCurrentAssetState }}>
            {children}
        </PortfolioContext.Provider>
    );
}
