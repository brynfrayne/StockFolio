import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LoginPage } from './pages/Login/LoginPage';
import { Logout } from './pages/Logout/Logout';
import { DemoPortfolioPage } from './pages/Portfolio/DemoPortfolioPage';
import { Registration } from './pages/Registration/Registration';
import { AuthenticatedPortfolioPage } from './pages/Portfolio/AuthenticatedPortfolioPage';
import { UserProfile } from './pages/Profile/Profile';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/portfolio" element={<AuthenticatedPortfolioPage />} />
        <Route path="/demo" element={<DemoPortfolioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </Router>
  );
}
export default App;
