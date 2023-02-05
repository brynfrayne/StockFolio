import React from 'react';
import { formatCurrency, formatPercentage } from '../../utils';

export function PortfolioDashboard({ assets }) {

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
        return 10000 - sumHoldingCostBasis();
    }
    const returnOnInvestment = () => {
        return formatPercentage((sumCurrentHoldingsValue() - sumHoldingCostBasis())/sumHoldingCostBasis());
    }
    const returnStyles = () => {
        if (returnOnInvestment() > 0) {
            return "text-center text-success";
        } else {
            return "text-center text-danger";
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
