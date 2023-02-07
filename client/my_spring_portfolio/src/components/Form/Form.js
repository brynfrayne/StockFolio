import React from 'react';
import { CashFormInputs } from '../CashFormInputs/CashFormInputs';

export function Form({ assetRefs, transactionType }) {
    const { assetName, assetType, assetQuantity, assetCostBasis } = assetRefs;
    const buySellOptions = {
        selectOptions:['Stock','Bond','Real Estate','Currency'],
        assetNameLabel: 'Asset Name',
        assetPriceLabel: 'Asset Price',
    }
    const transctionTypeOptions = {
        'buy': {
            selectOptions:['Stock','Bond','Real Estate','Currency'],
            assetNameLabel: 'Asset Name',
            assetPriceLabel: 'Asset Price',
        },
        'sell': {
            selectOptions:['Stock','Bond','Real Estate','Currency'],
            assetNameLabel: 'Asset Name',
            assetPriceLabel: 'Asset Price',
        },
        'deposit': {
            selectOptions: ['Cash'],
            buttonLabel: 'Add Cash',
            assetNameLabel: 'Cash',
            assetPriceLabel: 'Cash Amount',
            assetQuantityLabel: 'Cash Amount'
        },
    }
    const { selectOptions, buttonLabel, assetNameLabel, assetPriceLabel, assetQuantityLabel } = transctionTypeOptions[transactionType.type];
    return (
        <form>
                { transactionType.type === 'deposit' ? (
                    <CashFormInputs />
                ) : (
                // return (
                <>
                <div className="form-group">
                    <label htmlFor="assetName">Asset Name</label>
                    <input type="text" className="form-control" id="assetName" placeholder="Enter asset name" ref={assetName} />
                </div>
                <div className="form-group">
                    <label htmlFor="assetType">Asset Type</label>
                    <select className="form-control" id="assetType" ref={assetType} >
                        <option value="">Select an Asset Type</option>
                        {selectOptions.map((option, index) => {
                            return (
                                <option key={index} value={option}>{option}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="assetQuantity">{assetQuantityLabel}</label>
                    <input type="text" className="form-control" id="assetQuantity" placeholder="Enter asset quantity" ref={assetQuantity}/>
                </div>
                <div className="form-group">
                    <label htmlFor="assetCostBasis">Asset Price</label>
                    <input type="text" className="form-control" id="assetCostBasis" placeholder="Enter current asset price" ref={assetCostBasis}/>
                </div>
                </>
                // )
            )}
        </form>

    )
}
