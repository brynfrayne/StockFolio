import React, { useContext, useEffect } from 'react';
import { FetchAssets } from '../../components/FetchAssets/FetchAssets';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { PortfolioContext } from '../../context/PortfolioContext';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

export function DemoPortfolioPage() {
  const { user, setUser } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const email = process.env.REACT_APP_DEMO_EMAIL;
  const password = process.env.REACT_APP_DEMO_PASSWORD;
  const { assets, setAssets } = useContext(PortfolioContext);

  useEffect( () => {
    async function authenticateUser() {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        "email": email,
        "password": password
      });

      sessionStorage.setItem('token', response.data.token);
      const response2 = await axios.get(`${apiUrl}/user`, {
          headers: { 'Authorization': `Bearer ${response.data.token}` }
      });
      sessionStorage.setItem('user', JSON.stringify(response2.data));
      setUser(response2.data);

    } catch (error) {
        console.log(error);
        console.error(error.response.data.message);
    }
  }
  authenticateUser();
  }, []);
  if (!user) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 m-5">
          <h1>Logging in...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <FetchAssets assets={assets} setAssets={setAssets} apiPath="asset" />
    </div>
  );
}
