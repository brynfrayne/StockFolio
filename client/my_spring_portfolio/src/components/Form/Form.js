import React, { useState, useEffect } from 'react';
import { QuantityFormInputs } from '../QuantityFormInputs/QuantityFormInputs';
import { StockFormInputs } from '../StockFormInputs/StockFormInputs';
import { formatCurrency } from '../../utils';
import axios from 'axios';

export function Form({ transactionType }) {
    const [selectedOption, setSelectedOption] = useState([]);
    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const financial_modelling_apiKey = process.env.REACT_APP_financial_modelling_apiKey
    const financial_modelling_apiUrl = process.env.REACT_APP_financial_modelling_apiUrl


    const fetchPrice = async (selected) => {
        const ticker = selected[0].symbol;
        const api_url = `${financial_modelling_apiUrl}/quote-short/${ticker}?apikey=${financial_modelling_apiKey}`;
        const response = await axios.get(api_url);
        const { data } = response;
        setStockPrice(data[0].price);
        console.log(data);
    }
    useEffect(() => {
        if (selectedOption.length > 0) {
            fetchPrice(selectedOption);
        }
    }, [selectedOption]);

    return (
        <form>
            { transactionType.type === 'deposit' ? (
                <QuantityFormInputs setQuantity={setQuantity} quantity={quantity} displayInDollars />
            ) : (
            <>
            <div className="form-group mb-2">
                <label className="mb-1" htmlFor="assetName">Asset Name</label>
                <StockFormInputs selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>
            <QuantityFormInputs setQuantity={setQuantity} quantity={quantity} />
            <div className="form-group d-flex justify-content-between mt-3">
                <label htmlFor="assetPrice">Asset Price: </label>
                {stockPrice > 0 ?
                <p>{formatCurrency(stockPrice)}</p>
                :
                <p>Enter a valid ticker</p>
                }
            </div>
            <div className="form-group d-flex justify-content-between mt-1">
                <label htmlFor="totalCost">Total Cost: </label>
                <p>{formatCurrency(stockPrice * quantity)}</p>
            </div>
            </>
            )}
        </form>

    )
}
