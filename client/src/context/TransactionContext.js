import React, { createContext } from 'react';

export const TransactionContext = createContext({
    show: false,
    setShow: () => {},
    showConfirmation: false,
    setShowConfirmation: () => {},
    assetToPurchase: {},
    setAssetToPurchase: () => {},
    apiPath: '',
    setApiPath: () => {},
    selectedType: null,
    setSelectedType: () => {},
    stock: null,
    setStock: () => {},
    stockPrice: 0,
    setStockPrice: () => {},
    quantity: 0,
    setQuantity: () => {},
    selectedOption: [],
    setSelectedOption: () => {},
    requestType: null,
    setRequestType: () => {}
});

