import { React, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils';


export function AddAssetConfirmation({ assetToPurchase, showConfirmation, setShowConfirmation, setShow, purchaseAmount }) {
    const { setAssets } = useContext(PortfolioContext);

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    const handleConfirm = () => {
        axios.post('http://localhost:8080/api/v1/asset',
            assetToPurchase
        )
        .then(_response => {
            axios.get('http://localhost:8080/api/v1/asset')
            .then(response => {
                setAssets(response.data);
            })
        })
        .catch(error => {
            console.log(error);
        });
        setShowConfirmation(false);
        setShow(false);
    }
    return (
        <Modal show={showConfirmation} onHide={handleCancel}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Purchase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to purchase {assetToPurchase.assetQuantity} units of {assetToPurchase.assetName} {assetToPurchase.assetType} for {formatCurrency(purchaseAmount)}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
