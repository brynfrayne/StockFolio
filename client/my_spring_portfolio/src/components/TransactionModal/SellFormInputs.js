import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../../context/PortfolioContext';
import { formatCurrency } from '../../utils';
import { TransactionContext } from '../../context/TransactionContext';

export function SellFormInputs() {
    const { assets } = useContext(PortfolioContext)
    const [chosenAssetId, setChosenAssetId] = useState('')
    const {
        quantity,
        setQuantity,
        stock,
        setStock
    } = useContext(TransactionContext);

    useEffect(() => {
        setStock(assets.find(asset => asset.id === chosenAssetId))
    }, [chosenAssetId])

    return (
        <>
            <div className="form-group mb-2">
                <label
                    className="mb-1"
                    htmlFor="assetName"
                >
                    Asset Name
                </label>
                <div className="d-flex">
                <select className="form-select" id="assetName" onChange={(e) => setChosenAssetId(parseInt(e.target.value))}>
                    <option value="" disabled selected hidden>Select an asset</option>
                    {assets.map((asset) => (
                        <option key={asset.id} value={asset.id}>{asset.name}</option>
                    ))}
                </select>
            </div>
            </div>
            <div className="form-group mb-2">
                <label
                    className="mb-1"
                    htmlFor="Quantity"
                >
                    Quantity
                </label>
                <select className="form-select select-with-caret" id="Quantity" onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    <option value="" disabled selected hidden>Select a quantity</option>
                    {stock ?
                    [...Array(stock.assetQuantity).keys()].map((quantity) => (
                        <option key={stock.assetQuantity - quantity} value={stock.assetQuantity - quantity}>
                          {stock.assetQuantity - quantity}
                        </option>
                      ))
                    :
                    <option value="0">Select an asset</option>
                    }
                </select>
            </div>
            <div className="form-group d-flex justify-content-between mt-3">
                <label
                    htmlFor="assetPrice">
                    Asset Price:
                </label>

                {stock ?
                <p>{formatCurrency(stock.currentAssetPrice)}</p>
                :
                <p>Enter a valid ticker</p>
                }
            </div>
            <div className="form-group d-flex justify-content-between mt-1">
                <label htmlFor="totalCost">Total Cost: </label>
                { !stock ?
                <p>$0.00</p>
                :
                <p>{formatCurrency(stock.currentAssetPrice * quantity)}</p>
                }
            </div>
        </>
    )
}
