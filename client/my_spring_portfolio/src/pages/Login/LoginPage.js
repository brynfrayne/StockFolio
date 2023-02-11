import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import './LoginPage.css'

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            "email": email,
            "password": password
        });
        console.log("this is the response:", response);

        sessionStorage.setItem('token', response.data.token);
        const response2 = await axios.get(`${apiUrl}/user`, {
            headers: { 'Authorization': `Bearer ${response.data.token}` }
        });
        console.log("this is the response2:", response2);
        sessionStorage.setItem('user', JSON.stringify(response2.data));
        setUser(response2.data);

        navigate('/portfolio');
    } catch (error) {
        console.log(error);
        console.error(error.response.data.message);
    }
  }
  return (

     <div className="form-container">
      <form className="form-group login-form" onSubmit={handleLogin}>
        <label className="form-label">
          Email:
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="d-flex justify-content-center flex-column mt-1">
          <button className="btn btn-primary mb-2" type="submit">Login</button>
          <Link className="btn btn-secondary" to="/demo">Demo Portfolio</Link>
        </div>
        <span className="sign-up__span">Don't have an account?
          <Link className="sign-up__link" to="/register">Sign up</Link>
        </span>
      </form>
    </div>
  );

};


