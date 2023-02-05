import { createContext } from 'react';

export const PortfolioContext = createContext({
    assets: [],
    setAssets: () => {},
    sampleAssets: [],
    setSampleAssets: () => {},
    currentAssetState: {},
    setCurrentAssetState: () => {},
});
