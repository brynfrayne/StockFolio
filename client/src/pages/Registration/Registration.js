import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

export function Registration() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [failedAuth, setFailedAuth] = useState(false);
    const [failedAuthMessage, setFailedAuthMessage] = useState('');
    const [authSent, setAuthSent] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleSubmit = async (event) => {
        event.preventDefault();
        // const hashedPassword = await bcrypt.hash(password, 10);
        setFailedAuth(false);

        try {
            const response = await axios.post(`${apiUrl}/auth/register`,{
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phoneNumber,
                    // "password": hashedPassword
                    "password": password

            });
            sessionStorage.setItem('token', response.data.token);
            setAuthSent(true);

            const response2 = await axios.get(`${apiUrl}/user`, {
                headers: { 'Authorization': `Bearer ${response.data.token}` }
            });
            sessionStorage.setItem('user', JSON.stringify(response2.data));
            setUser(response2.data);

            navigate('/portfolio');

        } catch (error) {
            if(error.response) {
                console.error(error);
                console.error(error.response.data.message);
                setAuthSent(true);
                setFailedAuth(true);
                setFailedAuthMessage(error.response.data.message);
            }
        }
    };

    const authMessage = () => {
        if (failedAuth) {
            return (
                <div className="alert alert-danger mt-3 text-center" role="alert">
                    {failedAuthMessage}
                </div>
            )
        } else {
            return (
            <div className="alert alert-success mt-3 text-center" role="alert">
                Registration Successful!
            </div>
            )
        }
    }


    return (
        <div className="form-container">
            {authSent &&
                authMessage()
            }
            <form className="form-group login-form">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-wrap flex-column col-6 p-2">
                        <label className="form-label">
                            Email:
                            <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="form-label">
                            Password:
                            <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label className="form-label">
                            Confirm Password:
                            <input className={confirmPassword === password ? "form-control" : "form-control is-invalid"} type="password"  onChange={(e) => setConfirmPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="d-flex flex-wrap flex-column col-6 p-2">
                        <label className="form-label">
                            First Name:
                            <input className="form-control" type="text" onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className="form-label">
                            Last Name:
                            <input className="form-control" type="text" onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <label className="form-label">
                            Phone Number:
                            <input className="form-control" type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center flex-column mt-1">
                    <button className="btn btn-primary mb-2 w-50 m-auto" type="submit" onClick={handleSubmit}>Sign Up</button>
                    <Link className="btn btn-secondary w-50 m-auto" to="/demo">Demo Portfolio</Link>
                    <span className="sign-up__span">Already have an account? <Link className="sign-up__link" to="/login">Login</Link></span>
                </div>
            </form>

        </div>
    );
}
