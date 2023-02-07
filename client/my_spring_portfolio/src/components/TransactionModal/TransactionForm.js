import { React, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form } from '../Form/Form';
import { formattedDate } from '../../utils';


export function TransactionForm({
                    assetToPurchase,
                    setAssetToPurchase,
                    show,
                    setShow,
                    setShowConfirmation,
                    setPurchaseAmount,
                    transactionType
                }
                ) {

    const assetRefs = {
        assetName: useRef(null),
        assetType: useRef(null),
        assetQuantity: useRef(null),
        assetCostBasis: useRef(null),
      };

    const handleClose = () => setShow(false);

    const handleBuyAsset = () => {
        const amount = parseFloat(assetRefs.assetQuantity.current.value) * parseFloat(assetRefs.assetCostBasis.current.value);
        setPurchaseAmount(amount);
        updateAssetToPurchase(assetRefs);
        setShowConfirmation(true);
        setShow(false);
        console.log(assetToPurchase)
    }

    const updateAssetToPurchase = (assetRefs) => {
        setAssetToPurchase({
            name: assetRefs.assetName.current.value,
            type: assetRefs.assetType.current.value,
            assetQuantity: parseInt(assetRefs.assetQuantity.current.value),
            currentAssetPrice: parseFloat(assetRefs.assetCostBasis.current.value),
            assetCostBasis: parseFloat(assetRefs.assetCostBasis.current.value),
            datePurchased: formattedDate
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{transactionType.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form assetRefs={assetRefs} transactionType={transactionType}/>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleBuyAsset}>
            Buy Asset
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
