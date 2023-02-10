import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ChartIcon from '../../assets/stock-chart-icon.png'
import './NavBar.css'


export function NavBar() {
    const location = useLocation();
    const { user } = useContext(UserContext)

    const urlToPageTitleMap = {
        '/': 'Login',
        '/portfolio': 'Portfolio',
        '/login': 'Login',
        '/register': 'Sign Up',
        '/demo': 'Demo Portfolio',
        '/profile': 'Profile',
        '/editprofile': 'Edit Profile',
    }
    const tokenCheck = () => {
        if (sessionStorage.getItem('token') !== null) {
            return true;
        } else {
            return false;
        }
    }
    console.log(user)

    const setPageTitle = () => {
        const path = location.pathname;
        return urlToPageTitleMap[path];
    }

    const allLinks = [
      { title: 'Login', href: '/login', isAuthRequired: false },
      { title: 'Sign Up', href: '/register', isAuthRequired: false },
      { title: 'Demo Portfolio', href: '/demo', isAuthRequired: false },
      { title: 'Logout', href: '/logout', isAuthRequired: true },
      { title: 'Profile', href: '/profile', isAuthRequired: true },
      { title: 'Portfolio', href: '/portfolio', isAuthRequired: true },
    ];

    const currentPage = window.location.pathname;
    const links = allLinks.filter(link => link.href !== currentPage && link.isAuthRequired === tokenCheck());

    const renderDropdownLinks = () => links.map(link => {
      return (
        <Dropdown.Item key={link.href} href={link.href}>
          {link.title}
        </Dropdown.Item>
      );
    });

    return (
        <nav className="navbar navbar-light bg-light p-3">
            <div>
              <div className="d-flex align-items-center">
                <img src={ChartIcon} alt="chart icon" className="chart-icon"/>
                <h1 className="navbar-brand">
                  {setPageTitle()}
                </h1>
              </div>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-primary"/>
                <Dropdown.Menu>
                  {renderDropdownLinks()}
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    )
}
