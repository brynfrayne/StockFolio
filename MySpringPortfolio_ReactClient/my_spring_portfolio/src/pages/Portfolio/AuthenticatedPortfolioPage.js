import React, { useContext } from 'react';
import { FetchAssets } from '../../components/FetchAssets/FetchAssets';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { PortfolioContext } from '../../context/PortfolioContext';

export function AuthenticatedPortfolioPage() {
    const { assets, setAssets } = useContext(PortfolioContext);

    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <FetchAssets assets={assets} setAssets={setAssets} apiPath="asset" />
      </div>
    );
  }
