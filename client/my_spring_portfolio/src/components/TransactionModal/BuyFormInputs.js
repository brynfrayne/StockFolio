import React, { useContext } from 'react';
import { StockFormInputs } from './StockFormInputs/StockFormInputs';
import { QuantityFormInputs } from './QuantityFormInputs/QuantityFormInputs';
import { formatCurrency } from '../../utils';
import { TransactionContext } from '../../context/TransactionContext';

export function BuyFormInputs({ transactionType }) {
    const {
        selectedOption,
        setSelectedOption,
        quantity,
        stockPrice,
    } = useContext(TransactionContext);
    return (
    <>
    <div className="form-group mb-2">
        <label
            className="mb-1"
            htmlFor="assetName"
        >
            Asset Name
        </label>
        <StockFormInputs
            transactionType={transactionType}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
        />
    </div>
    <QuantityFormInputs transactionType={transactionType}/>
    <div className="form-group d-flex justify-content-between mt-3">
        <label htmlFor="assetPrice">
            Asset Price:
        </label>

        {stockPrice > 0 ?
        <p>{formatCurrency(stockPrice)}</p>
        :
        <p>Enter a valid ticker</p>
        }
    </div>
    <div className="form-group d-flex justify-content-between mt-1">
        <label htmlFor="totalCost">
            Total Cost:
        </label>
        <p>{formatCurrency(stockPrice * quantity)}</p>
    </div>
    </>
    )
}
