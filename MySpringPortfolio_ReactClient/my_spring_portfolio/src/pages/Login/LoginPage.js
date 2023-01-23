import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';
// import { useAuth } from '../../context/AuthContext'; --- not created yet, but will be in the next step

export function LoginPage() {
//   const { login } = useAuth(); // this is not created yet, but will be in the next step
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // this is not created yet, but will be in the next step
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const hashedPassword = await bcrypt.hash(password, 10);
    // send a request to the server to authenticate the user
    axios.post('http://localhost:8080/api/v1/auth/login', {
        email: email,
        password: hashedPassword
    })
    .then(_response => {
        //if successful, call the login function and set isAuthenticated to true
        login();
        setIsAuthenticated(true);
    })
    .catch(error => {
        //if unsuccessful, show an error message
        console.log(error);
        alert('Invalid email or password, Please try again.');
    });
}



  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <label className="form-label">
          Email:
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="form-label">
          Password:
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">Login</button>
        <Link className="btn btn-secondary" to="/demo">Demo Portfolio</Link>
      </form>
    </div>
  );

};
