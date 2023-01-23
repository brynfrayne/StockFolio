import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddAssetConfirmation } from './AddAssetConfirmation';
import { AddAssetForm } from './AddAssetForm';


export function AddAssetModal() {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [purchaseAmount, setPurchaseAmount] = useState(0);
    const [assetToPurchase, setAssetToPurchase] = useState({});

    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add Asset
        </Button>
        <AddAssetForm
            assetToPurchase={assetToPurchase}
            show={show}
            setAssetToPurchase={setAssetToPurchase}
            setShow={setShow}
            setShowConfirmation={setShowConfirmation}
            setPurchaseAmount={setPurchaseAmount}
        />
        <AddAssetConfirmation
            assetToPurchase={assetToPurchase}
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            setShow={setShow}
            purchaseAmount={purchaseAmount}
        />
        </>
    );
}
