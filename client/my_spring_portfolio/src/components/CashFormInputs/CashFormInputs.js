import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils';
import './CashFormInputs.css';

export function CashFormInputs() {
    const [cash, setCash] = useState(0);
    const [shadow, setShadow] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);
    
    const adjustCash = (direction) => {
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
        if (cash > 0 && direction === '-') {
            return setCash(cash - increment);
        } else if (direction === '+') {
            return setCash(cash + increment);
        } else if (cash === 0 && direction === '-') {
            setShadow(true);
            setTimeout(() => setShadow(false), 1000);
        }
    };

    return (
        <div className="form-group d-flex align-items-center justify-content-between">
            <label htmlFor="assetCostBasis">Quantity</label>
            <div className={`d-flex align-items-center`}>
                <span className="p-2" onClick={() => adjustCash('-')}>-</span>
                <span className={`input-group-text ${shadow ? 'shadow' : ''}`} >{formatCurrency(cash)}</span>
                <span className="p-2" onClick={() => adjustCash('+')}>+</span>
            </div>
        </div>
    );
}
