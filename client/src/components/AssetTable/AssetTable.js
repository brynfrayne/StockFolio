import { React, useState } from 'react';
import { AssetModal } from '../AssetModal/AssetModal';
import './AssetTable.css';
import { formatCurrency, formatPercentage } from '../../utils.js';


export function AssetTable({ assets }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({});
    const [showAssetModal, setShowAssetModal] = useState(false);

    const returnOnInvestment = (asset) => {
        let totalCostBasis = asset.assetCostBasis*asset.assetQuantity;
        let totalCurrentValue = asset.currentAssetPrice*asset.assetQuantity;
        if (totalCostBasis === totalCurrentValue) {
            return "0.00%";
        }
        return formatPercentage((totalCurrentValue - totalCostBasis)/totalCostBasis);
    }
    const returnStyles = (asset) => {
        if (returnOnInvestment(asset) < 0) {
            return "text-center text-danger";
        } else {
            return "text-center text-success";
        }
    }

    const handleOpenModal = (asset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
        setShowAssetModal(true);
    }

  return (
    <div className="container">
    <table className="table table-fixed">
        <thead>
            <tr>
                <th className="text-center" scope="col">Name</th>
                <th className="text-center" scope="col">Ticker</th>
                <th className="text-center" scope="col">Quantity</th>
                <th className="text-center" scope="col">Current Price</th>
                <th className="text-center" scope="col">Return %</th>
            </tr>
        </thead>
        <tbody>
        {assets.map((asset) => (
            <tr key={asset.id} onClick={() => handleOpenModal(asset)}>
             {/* <tr key={asset.id}> */}
                <td className="text-center">{asset.name}</td>
                <td className="text-center">{asset.ticker}</td>
                <td className="text-center">{asset.assetQuantity}</td>
                <td className="text-center">{formatCurrency(asset.currentAssetPrice)}</td>
                <td className={returnStyles(asset)}>{returnOnInvestment(asset)}</td>
            </tr>
        ))}
        </tbody>
    </table>
    <AssetModal
        asset={selectedAsset}
        showAssetModal={showAssetModal}
        setShowAssetModal={setShowAssetModal}
    />
    </div>
    );
}

