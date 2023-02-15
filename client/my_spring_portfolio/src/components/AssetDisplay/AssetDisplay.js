import React, { useContext } from 'react';
import { formatCurrency, formatPercentage } from '../../utils';
import { PortfolioContext } from '../../context/PortfolioContext';


export function AssetDisplay({ asset }) {
    const { assetCostBasis, assetQuantity, currentAssetPrice, name, ticker } = asset;
    const currentAssetValue = assetQuantity * currentAssetPrice;
    const { assets } = useContext(PortfolioContext)
    const percentageOfPortfolio = formatPercentage((currentAssetValue / assets.reduce((total, asset) => total + asset.currentAssetPrice * asset.assetQuantity, 0)))
    return (
        <>
        <div className="row">
            <div className="col-6">
                <p>Name: {name}</p>
                <p>Ticker: {ticker}</p>
                <p>Quantity: {assetQuantity}</p>
                <p>Asset Weighting: {percentageOfPortfolio}</p>
            </div>
            <div className="col-6">
                <p>Current Price: {formatCurrency(currentAssetPrice)}</p>
                <p>Cost Basis: {formatCurrency(assetCostBasis)}</p>
                <p>Total Current Value: {formatCurrency(currentAssetValue)}</p>
                <p>Return: {formatPercentage((currentAssetValue - assetCostBasis * assetQuantity) / (assetCostBasis * assetQuantity))}</p>
            </div>
        </div>
        </>
    )
}
