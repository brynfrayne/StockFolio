import React, { useState } from 'react';
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { CollapseIcon } from '../SidebarCollapseIcon/SidebarCollapseIcon';
import './Sidebar.css';

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sideBarStyles = () => {
        if(!sidebarOpen) {
            return "sidebar sidebar-closed"
        } else {
            return "sidebar bg-light px-3 w-max-content"
        }
    }
    const transactionTypes = [
        {
            name: "Buy Asset",
            type: "buy",
            color: "light"
        },
        {
            name: "Sell Asset",
            type: "sell",
            color: "light"
        },
        {
            name: "Add Cash",
            type: "deposit",
            color: "light"
        }
    ]

    return (
        <div className="d-flex">
            <div className={sideBarStyles()}>
                <ul className="list-unstyled mt-0 d-flex flex-column justify-content-center vh-100">
                    {transactionTypes.map((transactionType, index) => {
                        return (
                            <li className={sidebarOpen ? "py-3" : "hidden-list"} key={index}>
                                <TransactionModal transactionType={transactionType} />
                            </li>
                        )}
                    )}
                </ul>
            </div>
            <CollapseIcon sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </div>
    )
}


