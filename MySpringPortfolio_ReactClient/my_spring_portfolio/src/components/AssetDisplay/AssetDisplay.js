import React from 'react';
import { formatCurrency, formatPercentage, formatDate } from '../../utils';


export function AssetDisplay({ asset }) {
    return (
        <>
        <div className="row">
            <div className="col-6">
                <p>Type: {asset.type}</p>
                <p>Quantity: {asset.assetQuantity}</p>
            </div>
            <div className="col-6">
                <p>Current Price: {formatCurrency(asset.currentAssetPrice)}</p>
                <p>Cost Basis: {formatCurrency(asset.assetCostBasis)}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <p>Current Value: {formatCurrency(asset.currentTotalValue)}</p>
                <p>Total Cost Basis: {formatCurrency(asset.totalCostBasis)}</p>
            </div>
            <div className="col-6">
                <p>Percent Gain: {formatPercentage(asset.percentGain)}</p>
                <p>Date Purchased: {formatDate(asset.datePurchased)}</p>
            </div>
        </div>
        </>
    )
}
