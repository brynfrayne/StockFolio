import { createContext } from 'react';

export const PortfolioContext = createContext({
    assets: [],
    setAssets: () => {},
    currentAssetState: {},
    setCurrentAssetState: () => {},
});
