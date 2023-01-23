import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PortfolioProvider } from './context/PortfolioProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);

