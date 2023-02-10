import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TransactionConfirmation } from './TransactionConfirmation';
import { TransactionForm } from './TransactionForm';


export function TransactionModal({ transactionType }) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assetToPurchase, setAssetToPurchase] = useState({});

    const handleShow = () => setShow(true);

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
        />
        { assetToPurchase.name &&
        <TransactionConfirmation
            assetToPurchase={assetToPurchase}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            setShow={setShow}
        />
        }
        </>
    );
}
