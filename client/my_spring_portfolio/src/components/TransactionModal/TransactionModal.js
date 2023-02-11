import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TransactionConfirmation } from './TransactionConfirmation';
import { TransactionForm } from './TransactionForm';


export function TransactionModal({ transactionType }) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assetToPurchase, setAssetToPurchase] = useState({});
    const [apiPath, setApiPath] = useState('');
    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);

    const handleShow = () => {
        setShow(true);
        setStockPrice(0);
        setQuantity(0);
        setSelectedOption([]);
    }

    return (
        <>
        <Button variant={transactionType.color} onClick={handleShow}>
            {transactionType.name}
        </Button>
        <TransactionForm
            transactionType={transactionType}
            show={show}
            setAssetToPurchase={setAssetToPurchase}
            setShow={setShow}
            setShowConfirmation={setShowConfirmation}
            setApiPath={setApiPath}
            stockPrice={stockPrice}
            setStockPrice={setStockPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
        />
        { assetToPurchase.name &&
        <TransactionConfirmation
            assetToPurchase={assetToPurchase}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            setShow={setShow}
            apiPath={apiPath}
        />
        }
        </>
    );
}
