import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LoginPage } from './pages/Login/LoginPage';
import { DemoPortfolioPage } from './pages/Portfolio/DemoPortfolioPage';
import { Registration } from './pages/Registration/Registration';
import { AuthenticatedPortfolioPage } from './pages/Portfolio/AuthenticatedPortfolioPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<AuthenticatedPortfolioPage />} />
        <Route path="/" element={<DemoPortfolioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}
export default App;
