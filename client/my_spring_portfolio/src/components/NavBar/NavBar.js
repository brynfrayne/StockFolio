import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext'
import ChartIcon from '../../assets/stock-chart-icon.png'
import './NavBar.css'


export function NavBar() {
    console.log("sessionStorage.getItem('token'): " + sessionStorage.getItem('token'));
    console.log("sessionStorage.length: " + sessionStorage.length)

    const { isAuthenticated } = useContext(AuthContext);
    console.log("isAuthenticated: " + isAuthenticated);
    const urlToPageTitleMap = {
        '/': 'Login',
        '/portfolio': 'Portfolio',
        '/login': 'Login',
        '/register': 'Sign Up',
        '/demo': 'Demo Portfolio',
        '/profile': 'Profile',
        '/editprofile': 'Edit Profile',
    }
    const setPageTitle = () => {
        const path = window.location.pathname;
        return urlToPageTitleMap[path];
    }

    const allLinks = [
      { title: 'Login', href: '/login', isAuthRequired: false },
      { title: 'Sign Up', href: '/register', isAuthRequired: false },
      { title: 'Demo Portfolio', href: '/demo', isAuthRequired: false },
      { title: 'Logout', href: '/login', isAuthRequired: true },
      { title: 'Profile', href: '/profile', isAuthRequired: true },
      { title: 'Portfolio', href: '/portfolio', isAuthRequired: true },
    ];

    const currentPage = window.location.pathname;
    const links = allLinks.filter(link => link.href !== currentPage && link.isAuthRequired === isAuthenticated);

    const renderDropdownLinks = () => links.map(link => {
      return (
        <Dropdown.Item key={link.href} href={link.href}>
          {link.title}
        </Dropdown.Item>
      );
    });

    const dropdownState = () => {
      if (isAuthenticated) {
        return (
        <>
        <Dropdown.Item href="/login">Logout</Dropdown.Item>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="/portfolio">Portfolio</Dropdown.Item>
        </>
        )
      } else {
        return (
        <>
        {renderDropdownLinks()}
        </>
        )
      }
    }


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
                  {dropdownState()}
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    )
}
