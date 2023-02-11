import { React, useContext, useEffect } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils';


export function TransactionConfirmation({
                            assetToPurchase,
                            showConfirmation,
                            setShowConfirmation,
                            setShow,
                        }
                        ) {
    const { setAssetToAdd } = useContext(PortfolioContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCancel = () => {
        setShowConfirmation(false);
    }
    console.log(assetToPurchase);
    const handleConfirm = async () => {

        try {
            const response = await axios.post(`${apiUrl}/asset`,
                assetToPurchase,
                {
                    headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            console.log(response);
            setShowConfirmation(false);
            setShow(false);
            setAssetToAdd(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    const { name, ticker, assetQuantity, assetCostBasis } = assetToPurchase;

    return (
        <Modal show={showConfirmation} onHide={handleCancel}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Purchase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to purchase {assetQuantity} unit(s) of {ticker} for {formatCurrency(assetQuantity*assetCostBasis)}?
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
