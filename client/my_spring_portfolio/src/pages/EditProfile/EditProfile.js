import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './EditProfile.css';
import axios from 'axios';

export function EditProfile() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user, setUser } = useContext(UserContext);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);
    const [body, setBody] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBody({ ...body, [name]: value });
    }

    const filterBody = () => {
        const filteredBody = {};
        Object.entries(body).forEach(([key, value]) => {
            if (value && value !== user[key]) filteredBody[key] = value;
        });
        return filteredBody;
    }

    const filteredUpdatedValues = Object.entries(filterBody()).map(([key, value]) => {
        return `${key}: ${value}`;
    }).join('\n');

    const updateProfile = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, ...filterBody() };

        if (Object.keys(filterBody()).length !== 0) {
            const confirmation = window.confirm(
                `Are you sure you want to update the following values?\n${filteredUpdatedValues}`
                );
            if (!confirmation) return;
        } else {
            console.log('no changes made');
            setFailedSubmit(true);
            setTimeout(() => setFailedSubmit(false), 1500);
            return;
        }

        try {
            const response = await axios.put(`${apiUrl}/users`,
                updatedUser,
                {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
                }
            );
            console.log(response);
            setSuccess(true);

            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    const successMessage = () => {
        return (
            <alert className="alert alert-success p-2 mt-2 text-center" role="alert">
                Profile updated successfully!
            </alert>
        )
    }
    const errorMessage = () => {
        return (
            <alert className="alert alert-danger p-2 mt-2 text-center" role="alert">
                Error updating profile!
            </alert>
        )
    }

    return (
        <div className="form-container">
            <form className="login-form">
                <div className="form-group">
                    <div className="d-flex flex-column">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className={`form-control ${failedSubmit ? 'glow-shadow' : ''}`}
                            id="firstName"
                            placeholder="John"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className={`form-control ${failedSubmit ? 'glow-shadow' : ''}`}
                            id="lastName"
                            placeholder="Doe"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${failedSubmit ? 'glow-shadow' : ''}`}
                            id="email"
                            placeholder="johndoe@abc.com"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${failedSubmit ? 'glow-shadow' : ''}`}
                            id="password"
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${failedSubmit ? 'glow-shadow' : ''}`}
                            id="confirmPassword"
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className={`btn btn-primary mt-3 ${failedSubmit ? "save-button--error" : ""}`} onClick={updateProfile}>Save Changes</button>
                {success ? successMessage() : null}
                {error ? errorMessage() : null}
            </form>
        </div>
    )
}
