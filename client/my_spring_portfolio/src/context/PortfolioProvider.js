import React, { useState } from 'react';
import { PortfolioContext } from './PortfolioContext';

export function PortfolioProvider({children}) {
    const [assets, setAssets] = useState([]);
    const [sampleAssets, setSampleAssets] = useState([]);
    const [currentAssetState, setCurrentAssetState] = useState(null);
    const [assetToAdd, setAssetToAdd] = useState(false);

    return (
        <PortfolioContext.Provider value={{ assets, setAssets, sampleAssets, setSampleAssets, currentAssetState, setCurrentAssetState, assetToAdd, setAssetToAdd }}>
            {children}
        </PortfolioContext.Provider>
    );
}

