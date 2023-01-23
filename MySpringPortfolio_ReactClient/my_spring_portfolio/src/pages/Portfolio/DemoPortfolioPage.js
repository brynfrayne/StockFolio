import React, { useContext, useEffect, useState } from 'react';
import { AssetTable } from '../../components/AssetTable/AssetTable';
import { AddAssetModal } from '../../components/AddAssetModal/AddAssetModal';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from 'axios';

export function DemoPortfolioPage() {
    const { assets, setAssets } = useContext(PortfolioContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios.get('http://localhost:8080/api/v1/asset')
        .then(response => {
          console.log("this is from the main call to get assets:",response);
          setAssets(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }, [setAssets]);

    return (
        <div className="container">
            <h1>Demo Asset Tracker</h1>
            <AddAssetModal/>
            {isLoading ? <div>Loading...</div> :
            <AssetTable/>
            }
        </div>
    )
}
