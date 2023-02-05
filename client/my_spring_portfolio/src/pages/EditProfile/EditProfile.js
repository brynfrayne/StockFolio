import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function EditProfile() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [body, setBody] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const apiUrl = process.env.REACT_APP_API_URL;

    const updateProfile = async (e) => {
        e.preventDefault();

        const updatedValues = Object.entries(filterBody()).map(([key, value]) => `${key}: ${value}`).join('\n');
        const confirmation = window.confirm(
            `Are you sure you want to update the following values?\n${updatedValues}`
            );
        if (!confirmation) return;

        try {
            const response = await axios.put(`${apiUrl}/users`, filterBody());
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBody({ ...body, [name]: value });
    }

    const filterBody = () => {
        const filteredBody = {};
        Object.entries(body).forEach(([key, value]) => {
            if (value) filteredBody[key] = value;
        });
        console.log(filteredBody);
        return filteredBody;
    }


    return (
        <div className="form-container">
            <form className="login-form">
                <div className="form-group">
                    <div className="d-flex flex-column">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="John Doe"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="johndoe@abc.com"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            id="phone"
                            placeholder="123-456-7890"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                            placeholder="123 Main St, Anytown, USA"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3" onClick={updateProfile}>Save Changes</button>
                {success ? successMessage() : null}
                {error ? errorMessage() : null}
            </form>
        </div>
    )
}
