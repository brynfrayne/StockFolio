import React from 'react';


export function Form({ assetRefs }) {
    const { assetName, assetType, assetQuantity, assetCostBasis } = assetRefs;
    return (
        <form>
                <div className="form-group">
                    <label htmlFor="assetName">Asset Name</label>
                    <input type="text" className="form-control" id="assetName" placeholder="Enter asset name" ref={assetName} />
                </div>
                <div className="form-group">
                    <label htmlFor="assetType">Asset Type</label>
                    <select className="form-control" id="assetType" ref={assetType}>
                        <option value="">Select an Asset Type</option>
                        <option value="Stock">Stock</option>
                        <option value="Bond">Bond</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="assetQuantity">Asset Quantity</label>
                    <input type="text" className="form-control" id="assetQuantity" placeholder="Enter asset quantity" ref={assetQuantity}/>
                </div>
                <div className="form-group">
                    <label htmlFor="assetCostBasis">Asset Price</label>
                    <input type="text" className="form-control" id="assetCostBasis" placeholder="Enter current asset price" ref={assetCostBasis}/>
                </div>
            </form>
    )
}
