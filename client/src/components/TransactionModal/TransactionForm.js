import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TransactionFormInputs } from './TransactionFormInputs';
import { formattedDate } from '../../utils';
import { TransactionContext } from '../../context/TransactionContext';


export function TransactionForm({ transactionType, selectedType }) {
    const handleClose = () => setShow(false);
    const {
        setAssetToPurchase,
        show,
        setShow,
        setShowConfirmation,
        setApiPath,
        stock,
        stockPrice,
        quantity,
        selectedOption,
      } = useContext(TransactionContext);

    const handleBuyAsset = () => {
        updateAssetToPurchase();
        setShowConfirmation(true);
        setShow(false);
    }

    const updateAssetToPurchase = () => {
        if (selectedType.type === 'buy') {
            setAssetToPurchase({
                name: selectedOption[0].name,
                ticker: selectedOption[0].symbol,
                assetQuantity: parseInt(quantity),
                currentAssetPrice: parseFloat(stockPrice),
                assetCostBasis: parseFloat(stockPrice),
                datePurchased: [formattedDate],
            });
            setApiPath('asset')
        } else if (selectedType.type === 'sell') {
            setAssetToPurchase({
                name: stock.name,
                ticker: stock.ticker,
                assetQuantity: quantity,
                currentAssetPrice: parseFloat(stock.currentAssetPrice),
                assetCostBasis: parseFloat(stock.assetCostBasis),
            });
            setApiPath('asset/sell')
        } else if (selectedType.type === 'deposit') {
            setAssetToPurchase({
                cashBalance: parseInt(quantity),
            })
            setApiPath('user/deposit-cash')
        }
    }
    if (!selectedType) {
        return null;
    }
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{selectedType.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TransactionFormInputs transactionType={transactionType} selectedType={selectedType} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleBuyAsset}>
            {selectedType.name}
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
