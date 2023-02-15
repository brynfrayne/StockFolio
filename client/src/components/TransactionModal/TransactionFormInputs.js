import React, { useEffect, useContext } from 'react';
import { DepositFormInputs } from './DepositFormInputs';
import { BuyFormInputs } from './BuyFormInputs';
import { SellFormInputs } from './SellFormInputs';
import { TransactionContext } from '../../context/TransactionContext';
import axios from 'axios';

export function TransactionFormInputs({ transactionType, selectedType }) {
    const financial_modelling_apiKey = process.env.REACT_APP_financial_modelling_apiKey
    const financial_modelling_apiUrl = process.env.REACT_APP_financial_modelling_apiUrl
    
    const {
        selectedOption,
        setStockPrice,
    } = useContext(TransactionContext);

    const fetchPrice = async (selected) => {
        const ticker = selected[0].symbol;
        const api_url = `${financial_modelling_apiUrl}/quote-short/${ticker}?apikey=${financial_modelling_apiKey}`;
        const response = await axios.get(api_url);
        setStockPrice(response.data[0].price);
    }

    useEffect(() => {
        if (selectedOption.length > 0) {
            fetchPrice(selectedOption);
        }
    }, [selectedOption]);

    return (
        <form>
            {selectedType.type === 'deposit' && <DepositFormInputs transactionType={transactionType} />}
            {selectedType.type === 'sell' && <SellFormInputs />}
            {selectedType.type === 'buy' && <BuyFormInputs transactionType={transactionType} />}
        </form>

    )
}
