import { React, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';
import { TransactionContext } from '../../context/TransactionContext';
import { UserContext } from '../../context/UserContext';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils';


export function TransactionConfirmation({ transactionType }) {
    const { assetToAdd, setAssetToAdd } = useContext(PortfolioContext);
    const { setUser } = useContext(UserContext);
    const {
        assetToPurchase,
        selectedType,
        stock,
        showConfirmation,
        setShowConfirmation,
        setShow,
        apiPath
    } = useContext(TransactionContext);
    const { assetQuantity, assetCostBasis, ticker, cashBalance } = assetToPurchase;
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    const headers = { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } };
    const axiosTransactionCall = () => {
        if (selectedType.type === 'deposit') {
        return axios.put(`${apiUrl}/user/deposit-cash`,
            assetToPurchase,
            headers
        );
        } else if (selectedType.type === 'buy') {
            return axios.post(`${apiUrl}/asset`,
                assetToPurchase,
                headers
            );
        } else if (selectedType.type === 'sell') {
            return axios.put(`${apiUrl}/asset/${stock.id}`,
                assetToPurchase,
                headers
            );
        }
    }
    const handleConfirm = async () => {
        try {
            const response = await axiosTransactionCall();
            
            setAssetToAdd(!assetToAdd); // this solves the useEffect dependency issue - in a less than ideal way
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
