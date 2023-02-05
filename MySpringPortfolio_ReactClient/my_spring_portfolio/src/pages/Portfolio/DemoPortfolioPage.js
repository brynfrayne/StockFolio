import React, { useContext } from 'react';
import { FetchAssets } from '../../components/FetchAssets/FetchAssets';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { PortfolioContext } from '../../context/PortfolioContext';

export function DemoPortfolioPage() {
  const { sampleAssets, setSampleAssets } = useContext(PortfolioContext);

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <FetchAssets assets={sampleAssets} setAssets={setSampleAssets} apiPath="sample" />
    </div>
  );
}
