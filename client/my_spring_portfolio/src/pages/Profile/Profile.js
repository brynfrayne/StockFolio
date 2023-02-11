import React, { useContext, useEffect, useState } from 'react'
import editIcon from '../../assets/edit-button.svg'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils'
import { UserContext } from '../../context/UserContext'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'
import './Profile.css'

export function UserProfile() {
    const { user, setUser } = useContext(UserContext)
    const [updateUser, setUpdateUser] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL
    const token = sessionStorage.getItem('token')


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                sessionStorage.setItem('user', JSON.stringify(response.data))
                setUser(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    if (!user) return ( <Spinner /> )

    return (
        <div className="container bg-light profile">
            <div className="d-flex justify-content-end mb-3">
                <Link to={{
                    pathname: '/edit-profile',
                    state: { setUpdateUser }
                }}>
                    <img src={editIcon} alt="edit" className="edit-icon" />
                </Link>
            </div>
            <div key={user.id}>
                <div className="d-flex justify-content-between">
                    <p>Name</p>
                    <p>{user.firstName} {user.lastName}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Email</p>
                    <p>
                        {user.email}
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Cash Balance</p>
                    <p>{user.cashBalance ? formatCurrency(user.cashBalance) : 0}</p>
                </div>
            </div>
        </div>
    )
}
