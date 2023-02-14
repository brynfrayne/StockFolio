import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TransactionConfirmation } from './TransactionConfirmation';
import { TransactionForm } from './TransactionForm';


export function TransactionModal({ transactionType }) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assetToPurchase, setAssetToPurchase] = useState({});
    const [apiPath, setApiPath] = useState('');
    const [stock, setStock] = useState(null);
    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const [requestType, setRequestType] = useState(null);

    const handleShow = () => {
        setShow(true);
        setStockPrice(0);
        setQuantity(0);
        setSelectedOption([]);
        setAssetToPurchase({});
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
            setRequestType={setRequestType}
            setShow={setShow}
            setShowConfirmation={setShowConfirmation}
            setApiPath={setApiPath}
            stock={stock}
            setStock={setStock}
            stockPrice={stockPrice}
            setStockPrice={setStockPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
        />
        { Object.keys(assetToPurchase) &&
        <TransactionConfirmation
            assetToPurchase={assetToPurchase}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            setShow={setShow}
            stock={stock}
            apiPath={apiPath}
            requestType={requestType}
            transactionType={transactionType}
        />
        }
        </>
    );
}
