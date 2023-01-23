import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css'


export function UpdateForm({ asset, setUpdatedQuantity, updatedPrice, setUpdatedPrice }) {

    return (
        <form>
            <div className="form-group">
                <label htmlFor="assetName">Asset Name</label>
                <p>{asset.name}</p>
            </div>
            <div className="form-group">
                <label htmlFor="assetType">Asset Type</label>
                <p>{asset.type}</p>
            </div>
            <div className="form-group">
                <label htmlFor="assetQuantity">Asset Quantity</label>
                <input type="number" className="form-control" id="assetQuantity" placeholder={asset.assetQuantity} onChange={e => setUpdatedQuantity(e.target.value)} />
                {/* <div className="input-group d-flex align-items-center">
                    <button className="btn" onClick={decrementAssetQuantity}>
                        <i className="fa fa-minus"></i>
                    </button>
                        <span className="" >{displayAssetQuantity}</span>
                    <button className="btn" onClick={() => setDisplayAssetQuantity(displayAssetQuantity + 1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div> */}
            </div>
            <div className="form-group">
                <label htmlFor="assetCostBasis">Asset Price</label>
                <input type="number" step="0.01" className="form-control" id="assetCostBasis" placeholder={asset.currentAssetPrice} onChange={e => setUpdatedPrice(e.target.value)} />
            </div>
        </form>
    )
}
