import React, { useState, useEffect, useContext } from 'react';
import { formatCurrency } from '../../../utils';
import { PortfolioContext } from '../../../context/PortfolioContext';
import './QuantityFormInputs.css';

export function QuantityFormInputs({
                                quantity,
                                setQuantity,
                                transactionType,
                                displayInDollars=false
                            }
                            ) {
    const [shadow, setShadow] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [timer, setTimer] = useState(null);
    const { assets } = useContext(PortfolioContext);

    const adjustQuantity = (direction) => {
        if (clickCount >= 8) {
            setIncrement(1000);
        } else if (clickCount >= 5) {
            setIncrement(100);
        } else if (clickCount >= 3) {
            setIncrement(10);
        }
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            setClickCount(0);
            if (increment !== 1) {
                setIncrement(1);
            }
        }, 1000));
        setClickCount(prevCount => prevCount + 1);
        if (quantity > 0 && direction === '-') {
            return setQuantity(quantity - increment);
        } else if (direction === '+') {
            return setQuantity(quantity + increment);
        } else if (quantity === 0 && direction === '-') {
            setShadow(true);
            setTimeout(() => setShadow(false), 1000);
        }
    };
    const checkForDollarSign = () => {
        if (displayInDollars) {
            return formatCurrency(quantity);
        } else {
            return quantity;
        }
    };

    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    return (
        <>
        { transactionType.type === 'sell' ?
        <div className="form-group d-flex align-items-center justify-content-between mt-2">
            <label htmlFor="assetCostBasis">Quantity</label>
            <select className="form-select" aria-label="Default select example" onChange={e => setQuantity(e.target.value)}>
                <option value="0">Select Quantity</option>
                {/* {[...Array(specificAsset[0].quantity).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))} */}
            </select>
        </div>
        :
        <div className="form-group d-flex align-items-center justify-content-between mt-2">
            <label htmlFor="assetCostBasis">Quantity</label>
            <div className="d-flex align-items-center">
                <span className="p-2" onClick={() => adjustQuantity('-')}>-</span>
                <span className={`input-group-text ${shadow ? 'shadow' : ''}`} >{checkForDollarSign()}</span>
                <span className="p-2" onClick={() => adjustQuantity('+')}>+</span>
            </div>
        </div>
        }
        </>
    );
}
