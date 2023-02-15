import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AssetDisplay } from '../AssetDisplay/AssetDisplay';
import { TransactionForm } from '../TransactionModal/TransactionForm';
import { TransactionContext } from '../../context/TransactionContext';


export function AssetModal({
                                asset,
                                showAssetModal,
                                setShowAssetModal
                            }
                            ) {
    const [transactionType, setTransactionType] = useState({})
    const { setShow, setSelectedType } = useContext(TransactionContext)
    const transactionTypes = [
        {
            name: "Buy Asset",
            type: "buy",
            color: "light"
        },
        {
            name: "Sell Asset",
            type: "sell",
            color: "light"
        },
    ]

    const handleSellAsset = () => {
        setShowAssetModal(false)
        setShow(true)
        setTransactionType(transactionTypes[1])
        setSelectedType(transactionTypes[1])
    }
    const handleBuyAsset = () => {
        setShowAssetModal(false)
        setShow(true)
        setTransactionType(transactionTypes[0])
        setSelectedType(transactionTypes[0])
    }


    return (
      <>
        <Modal show={showAssetModal} onHide={() => setShowAssetModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{asset.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AssetDisplay asset={asset} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={handleSellAsset}>
                    Sell
                </Button>
                <Button variant="light" onClick={handleBuyAsset}>
                    Buy
                </Button>
            </Modal.Footer>
        </Modal>

        <TransactionForm transactionType={transactionType} />
        </>
    )
}
