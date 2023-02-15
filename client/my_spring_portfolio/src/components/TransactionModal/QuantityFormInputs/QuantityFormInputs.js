import React, { useState, useEffect, useContext } from 'react';
import { formatCurrency } from '../../../utils';
import { TransactionContext } from '../../../context/TransactionContext';
import './QuantityFormInputs.css';

export function QuantityFormInputs({ displayInDollars=false }) {
    const [shadow, setShadow] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [timer, setTimer] = useState(null);
    const { quantity, setQuantity } = useContext(TransactionContext);

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
        <div className="form-group d-flex align-items-center justify-content-between mt-2">
            <label htmlFor="assetCostBasis">Quantity</label>
            <div className="d-flex align-items-center">
                <span className="p-2" onClick={() => adjustQuantity('-')}>-</span>
                <span className={`input-group-text ${shadow ? 'shadow' : ''}`} >{checkForDollarSign()}</span>
                <span className="p-2" onClick={() => adjustQuantity('+')}>+</span>
            </div>
        </div>
    );
}
