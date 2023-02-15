import React, { useState } from 'react';
import { TransactionContext } from './TransactionContext';

export function TransactionProvider({children}) {
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assetToPurchase, setAssetToPurchase] = useState({});
    const [apiPath, setApiPath] = useState('');
    const [stock, setStock] = useState(null);
    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [requestType, setRequestType] = useState(null);

    return (
        <TransactionContext.Provider value={{
            apiPath,
            setApiPath,
            assetToPurchase,
            setAssetToPurchase,
            quantity,
            setQuantity,
            show,
            setShow,
            showConfirmation,
            setShowConfirmation,
            stock,
            setStock,
            stockPrice,
            setStockPrice,
            selectedType,
            setSelectedType,
            selectedOption,
            setSelectedOption,
            requestType,
            setRequestType
        }}>
            {children}
        </TransactionContext.Provider>
    );
}
