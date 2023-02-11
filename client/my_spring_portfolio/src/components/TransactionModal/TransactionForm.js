import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TransactionFormInputs } from './TransactionFormInputs';
import { formattedDate } from '../../utils';


export function TransactionForm({
                    setAssetToPurchase,
                    show,
                    setShow,
                    setShowConfirmation,
                    transactionType,
                    setApiPath,
                    stockPrice,
                    setStockPrice,
                    quantity,
                    setQuantity,
                    selectedOption,
                    setSelectedOption
                }
                ) {
    const handleClose = () => setShow(false);

    const handleBuyAsset = () => {
        updateAssetToPurchase();
        setShowConfirmation(true);
        setShow(false);
    }

    const updateAssetToPurchase = () => {
        if (transactionType.type === 'buy' ||
            transactionType.type === 'sell'
            ) {
            setAssetToPurchase({
                name: selectedOption[0].name,
                ticker: selectedOption[0].symbol,
                assetQuantity: parseInt(quantity),
                currentAssetPrice: parseFloat(stockPrice),
                assetCostBasis: parseFloat(stockPrice),
                datePurchased: formattedDate,
            });
            setApiPath('asset')
        } else {
            setAssetToPurchase({
                type: transactionType.type,
                quantity: parseInt(quantity),
            })
            setApiPath('user/deposit-cash')
        }
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
