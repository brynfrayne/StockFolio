import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { TransactionConfirmation } from './TransactionConfirmation';
import { TransactionForm } from './TransactionForm';
import { TransactionContext } from '../../context/TransactionContext';


export function TransactionModal({ transactionType }) {
    const {
        assetToPurchase,
        setAssetToPurchase,
        setQuantity,
        selectedType,
        setSelectedType,
        setSelectedOption,
        setShow,
        setStockPrice,
        show
    } = useContext(TransactionContext);

    const handleShow = () => {
        setShow(true);
        setStockPrice(0);
        setQuantity(0);
        setSelectedOption([]);
        setAssetToPurchase({});
        setSelectedType(transactionType)
    }


    return (
        <>
        <Button variant={transactionType.color} onClick={handleShow}>
            {transactionType.name}
        </Button>
        <TransactionForm transactionType={transactionType} selectedType={selectedType}/>
        { Object.keys(assetToPurchase) &&
        <TransactionConfirmation transactionType={transactionType}/>
        }
        </>
    );
}
