import { React, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';
import { UserContext } from '../../context/UserContext';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils';


export function TransactionConfirmation({
                            assetToPurchase,
                            stock,
                            showConfirmation,
                            setShowConfirmation,
                            setShow,
                            transactionType,
                            apiPath
                        }
                        ) {
    const { assetQuantity, assetCostBasis, ticker, cashBalance } = assetToPurchase;
    const { setAssetToAdd } = useContext(PortfolioContext);
    const { setUser } = useContext(UserContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    const headers = { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } };
    const axiosTransactionCall = () => {
        if (transactionType.type === 'deposit') {
        return axios.put(`${apiUrl}/user/deposit-cash`,
            assetToPurchase,
            headers
        );
    } else if (transactionType.type === 'buy') {
        return axios.post(`${apiUrl}/asset`,
            assetToPurchase,
            headers
        );
    } else if (transactionType.type === 'sell') {
        return axios.put(`${apiUrl}/asset/${stock.id}`,
            assetToPurchase,
            headers
        );
    }
}
    console.log(stock)
    console.log(assetToPurchase)

    const handleConfirm = async () => {
        try {
            const response = await axiosTransactionCall();
            console.log(response);
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
    const confirmMessage = () => {
        if (apiPath === 'asset') {
            return `Are you sure you want to purchase ${assetQuantity} unit(s) of ${ticker} for ${formatCurrency(assetQuantity*assetCostBasis)}?`
        } else if (apiPath === 'user/deposit-cash') {
            return `Are you sure you want to deposit ${formatCurrency(cashBalance)}?`
        } else if (apiPath === 'asset/sell') {
            return `Are you sure you want to sell ${assetQuantity} unit(s) of ${ticker} for ${formatCurrency(assetQuantity*assetCostBasis)}?`
        }
    }

    return (
        <Modal show={showConfirmation} onHide={handleCancel}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Purchase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirmMessage()}
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
