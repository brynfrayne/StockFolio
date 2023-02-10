import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PortfolioProvider } from './context/PortfolioProvider';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

