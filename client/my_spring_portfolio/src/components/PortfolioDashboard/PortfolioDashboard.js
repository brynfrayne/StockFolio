import React, { useContext } from 'react';
import { formatCurrency, formatPercentage } from '../../utils';
import { UserContext } from '../../context/UserContext';

export function PortfolioDashboard({ assets }) {
    const { user } = useContext(UserContext);

    const sumHoldingCostBasis = () => {
        let sum = 0;
        assets.forEach(asset => {
            sum += asset.totalCostBasis;
        })
        return sum;
    }
    const sumCurrentHoldingsValue = () => {
        let sum = 0;
        assets.forEach(asset => {
            sum += asset.currentTotalValue;
        })
        return sum;
    }
    
    const currentCashBalance = () => {
        const cashBalance = user ? user.cashBalance : 10000;
        return cashBalance - sumHoldingCostBasis();
    }
    const returnOnInvestment = () => {
        console.log(sumHoldingCostBasis());
        if (sumHoldingCostBasis() === 0) {
            console.log("0.00%");
            return "0.00%";
        }
        return formatPercentage((sumCurrentHoldingsValue() - sumHoldingCostBasis())/sumHoldingCostBasis());
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
                        <td className="text-center">{formatCurrency(currentCashBalance() + sumCurrentHoldingsValue())}</td>
                        <td className="text-center">{formatCurrency(currentCashBalance())}</td>
                        <td className="text-center">{formatCurrency(sumCurrentHoldingsValue())}</td>
                        <td className={returnStyles()}>{returnOnInvestment()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
