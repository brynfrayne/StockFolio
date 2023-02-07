import React, { useState } from 'react';
import { TransactionModal } from '../TransactionModal/TransactionModal';
import { CollapseIcon } from '../SidebarCollapseIcon/SidebarCollapseIcon';
import { Button } from 'react-bootstrap';
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
        },
        {
            name: "Sell Asset",
            type: "sell",
        },
        {
            name: "Add Cash",
            type: "deposit",
        }
    ]




    return (
        <div className="d-flex">
            <div className={sideBarStyles()}>
                <ul className="list-unstyled d-flex flex-column justify-content-center vh-100">
                    {transactionTypes.map((transactionType, index) => {
                        return (
                            <li className={sidebarOpen ? "pt-3" : "hidden-list"} key={index}>
                                <TransactionModal transactionType={transactionType} />
                            </li>
                        )
                    }
                    )}
                    {/* <li className={sidebarOpen ? "pt-3" : "hidden-list"}>
                        <Button variant="primary" >
                            Add Cash
                        </Button>
                    </li>
                    <li className={sidebarOpen ? "pt-3" : "hidden-list"}>
                        <TransactionModal/>
                    </li>
                    <li className={sidebarOpen ? "pt-3" : "hidden-list"}>
                        <Button variant="primary" >
                            Sell Asset
                        </Button>
                    </li> */}
                </ul>
            </div>
            <CollapseIcon sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </div>
    )
}


