import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { PortfolioDashboard } from '../../components/PortfolioDashboard/PortfolioDashboard';
import { PortfolioContext } from '../../context/PortfolioContext';
import { AssetTable } from '../../components/AssetTable/AssetTable';



export function FetchAssets({ assets, setAssets, apiPath }) {
    const [isLoading, setIsLoading] = useState(true);
    const { assetToAdd } = useContext(PortfolioContext);
    const token = sessionStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const axiosCallAuthCondition = () => {
      if (token) {
        return axios.get(`${apiUrl}/${apiPath}`, {
          headers: {'Authorization': `Bearer ${token}`},
        })
      } else {
        return axios.get(`${apiUrl}/${apiPath}`)
      }
    }

    useEffect(() => {
      axiosCallAuthCondition()
      .then(response => {
        setAssets(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    }, [apiPath, apiUrl, token, assetToAdd]);


    return isLoading ? (
      <div className="d-flex justify-content-center m-3">
        <Spinner />
      </div>
    ) : (
      <div className="flex-grow-1 m-5">
        <PortfolioDashboard assets={assets} />
        <AssetTable assets={assets} />
      </div>
    );
}
