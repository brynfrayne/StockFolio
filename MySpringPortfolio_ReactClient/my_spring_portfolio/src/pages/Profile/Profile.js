import React, { useState, useContext, useEffect } from 'react'
import editIcon from '../../assets/edit-button.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Profile.css'

export function UserProfile() {
    const [user, setUser] = useState({})
    const { isAuthenticated } = useContext(AuthContext)
    const sampleUser = {
        name: 'John Doe',
        email: 'johndoe@abc.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA'
    }
    useEffect(() => {
        if (isAuthenticated === false) {
            setUser(sampleUser)
        }
    }, [isAuthenticated])

    return (
        <div className="container bg-light profile">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/editprofile">
                    <img src={editIcon} alt="edit" className="edit-icon" />
                </Link>
            </div>
            <div key={user.id}>
                <div className="d-flex justify-content-between">
                    <p>Name</p>
                    <p>{user.name}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Email</p>
                    <p>
                        <a href={`mailto:${user.email}`}>
                            {user.email}
                        </a>
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Phone</p>
                    <p>{user.phone}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Address</p>
                    <p>{user.address}</p>
                </div>
            </div>
        </div>
    )
}
