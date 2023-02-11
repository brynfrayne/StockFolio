import { React, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';
import { UserContext } from '../../context/UserContext';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils';


export function TransactionConfirmation({
                            assetToPurchase,
                            showConfirmation,
                            setShowConfirmation,
                            setShow,
                            apiPath
                        }
                        ) {
    const { setAssetToAdd } = useContext(PortfolioContext);
    const { setUser } = useContext(UserContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCancel = () => {
        setShowConfirmation(false);
    }
    const handleConfirm = async () => {

        try {
            let request;
            if (apiPath === 'asset') {
                request = axios.post
            } else if (apiPath === 'deposit') {
                request = axios.put
            }
            const assetPostOrPutResponse = await request(`${apiUrl}/${apiPath}`,
                assetToPurchase,
                {
                    headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            const updatedUserResponse = await axios.get(`${apiUrl}/user`,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            sessionStorage.setItem('user', JSON.stringify(updatedUserResponse.data));
            setUser(updatedUserResponse.data);
            setShowConfirmation(false);
            setShow(false);
            setAssetToAdd(true)
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
