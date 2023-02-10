import { React, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TransactionFormInputs } from './TransactionFormInputs';
import { formattedDate } from '../../utils';


export function TransactionForm({
                    setAssetToPurchase,
                    show,
                    setShow,
                    setShowConfirmation,
                    transactionType
                }
                ) {
    const [selectedOption, setSelectedOption] = useState([]);
    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handleClose = () => setShow(false);

    const handleBuyAsset = () => {
        console.log('this is the handleBuyAsset function')
        updateAssetToPurchase();
        setShowConfirmation(true);
        setShow(false);
    }

    const updateAssetToPurchase = () => {
        setAssetToPurchase({
            name: selectedOption[0].name,
            ticker: selectedOption[0].symbol,
            assetQuantity: parseInt(quantity),
            currentAssetPrice: parseFloat(stockPrice),
            assetCostBasis: parseFloat(stockPrice),
            datePurchased: formattedDate
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{transactionType.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TransactionFormInputs
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                stockPrice={stockPrice}
                setStockPrice={setStockPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                transactionType={transactionType}
            />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleBuyAsset}>
            {transactionType.name}
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
