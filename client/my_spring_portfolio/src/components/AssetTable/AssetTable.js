// import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { AssetModal } from '../AssetModal/AssetModal';
import './AssetTable.css';
import { formatCurrency, formatPercentage } from '../../utils.js';


export function AssetTable({ assets }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({});


    const handleOpenModal = (asset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
    }

    useEffect(() => {
    }, [assets])

  return (
    <div className="container">
    <table className="table table-fixed">
        <thead>
            <tr>
                <th className="text-center" scope="col">Name</th>
                <th className="text-center" scope="col">Type</th>
                <th className="text-center" scope="col">Quantity</th>
                <th className="text-center" scope="col">Current Price</th>
                <th className="text-center" scope="col">Return %</th>
            </tr>
        </thead>
        <tbody>
        {assets.map((asset) => (
            <tr key={asset.id} onClick={() => handleOpenModal(asset)}>
                <td className="text-center">{asset.name}</td>
                <td className="text-center">{asset.type}</td>
                <td className="text-center">{asset.assetQuantity}</td>
                <td className="text-center">{formatCurrency(asset.currentAssetPrice)}</td>
                <td className={`text-center ${asset.percentGain >= 0 ? 'text-success' : 'text-danger'}`}>{formatPercentage(asset.percentGain)}</td>
            </tr>
        ))}
        </tbody>
    </table>
    {isModalOpen &&
        <AssetModal
            asset={selectedAsset}
            onClose={() => setIsModalOpen(false)}
        />
    }
    </div>
    );
}

