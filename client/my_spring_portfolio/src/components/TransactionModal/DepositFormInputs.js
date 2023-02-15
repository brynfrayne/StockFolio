import React from 'react';
import { QuantityFormInputs } from './QuantityFormInputs/QuantityFormInputs';

export function DepositFormInputs({ transactionType }) {
    return (
        <QuantityFormInputs
                    transactionType={transactionType}
                    displayInDollars
                />
    )
}
