import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TransactionFormInputs } from './TransactionFormInputs';
import { formattedDate } from '../../utils';
import axios from 'axios';


export function TransactionForm({
                    setRequestType,
                    setAssetToPurchase,
                    show,
                    setShow,
                    setShowConfirmation,
                    transactionType,
                    setApiPath,
                    stock,
                    setStock,
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
        if (transactionType.type === 'buy') {
            setAssetToPurchase({
                name: selectedOption[0].name,
                ticker: selectedOption[0].symbol,
                assetQuantity: parseInt(quantity),
                currentAssetPrice: parseFloat(stockPrice),
                assetCostBasis: parseFloat(stockPrice),
                datePurchased: formattedDate,
            });
            setApiPath('asset')
        } else if (transactionType.type === 'sell') {
            setAssetToPurchase({
                name: stock.name,
                ticker: stock.ticker,
                assetQuantity: quantity,
                currentAssetPrice: parseFloat(stock.currentAssetPrice),
                assetCostBasis: parseFloat(stock.assetCostBasis),
                datePurchased: stock.datePurchased,
            });
            setApiPath('asset/sell')
        } else if (transactionType.type === 'deposit') {
            setAssetToPurchase({
                cashBalance: parseInt(quantity),
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
                stock={stock}
                setStock={setStock}
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
