import React from 'react';
import leftArrow from '../../assets/arrow-left.png';
import rightArrow from '../../assets/arrow-right.png';
import './SidebarCollapseIcon.css';

export function CollapseIcon({sidebarOpen, setSidebarOpen}) {
    return (
        <div className={`d-flex flex-column justify-content-center ${!sidebarOpen ? 'sidebar-closed__arrow' : ''}`}>
            <div
                className="sidebar-arrow__container"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >

                <img
                    src={ sidebarOpen ? rightArrow : leftArrow }
                    alt="left arrow"
                    className="arrow"
                />
            </div>
        </div>
    )
}
