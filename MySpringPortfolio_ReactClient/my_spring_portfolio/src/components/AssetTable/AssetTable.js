import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useContext, useEffect } from 'react';
import { AssetModal } from '../AssetModal/AssetModal';
import './AssetTable.css';
import { PortfolioContext } from '../../context/PortfolioContext';
import { formatCurrency } from '../../utils.js';


export function AssetTable() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({});

    const { assets } = useContext(PortfolioContext);

    const handleOpenModal = (asset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
    }

    useEffect(() => {
    }, [assets])

  return (
    <div className="table-responsive">
    <table className="table table-striped">
        <thead>
            <tr>
                <th className="text-center" scope="col">Name</th>
                <th className="text-center" scope="col">Type</th>
                <th className="text-center" scope="col">Quantity</th>
                <th className="text-center" scope="col">Current Price</th>
            </tr>
        </thead>
        <tbody>
        {assets.map((asset) => (
            <tr key={asset.id} className="cursor-pointer" onClick={() => handleOpenModal(asset)}>
                <td className="text-center">{asset.name}</td>
                <td className="text-center">{asset.type}</td>
                <td className="text-center assetQty">{asset.assetQuantity}</td>
                <td className="text-center">{formatCurrency(asset.currentAssetPrice)}</td>
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

