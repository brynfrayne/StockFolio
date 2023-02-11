import React, { useContext } from 'react';
import { formatCurrency, formatPercentage } from '../../utils';
import { UserContext } from '../../context/UserContext';

export function PortfolioDashboard({ assets }) {
    const { user } = useContext(UserContext);

    const totalCostBasis = () => {
        let sum = 0;
        assets.forEach(asset => {
            let assetSum = asset.assetQuantity*asset.assetCostBasis;
            sum += assetSum;
        })
        return sum;
    }
    const totalCurrentValue = () => {
        let sum = 0;
        assets.forEach(asset => {
            sum += asset.assetQuantity*asset.currentAssetPrice;
        })
        return sum;
    }
    const returnOnInvestment = () => {
        if (totalCostBasis() === 0) {
            return "0.00%";
        }
        return formatPercentage((totalCurrentValue() - totalCostBasis())/totalCostBasis());
    }
    const returnStyles = () => {
        if (returnOnInvestment() < 0) {
            return "text-center text-danger";
        } else {
            return "text-center text-success";
        }
    }

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Total Portfolio Value</th>
                        <th className="text-center" scope="col">Total Cash</th>
                        <th className="text-center" scope="col">Total Assets</th>
                        <th className="text-center" scope="col">Total Return %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{formatCurrency(user.cashBalance + totalCurrentValue())}</td>
                        <td className="text-center">{formatCurrency(user.cashBalance)}</td>
                        <td className="text-center">{formatCurrency(totalCurrentValue())}</td>
                        <td className={returnStyles()}>{returnOnInvestment()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
