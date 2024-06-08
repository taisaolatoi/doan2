import './header.css';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Header = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="header-admin">
      <h1>
        <div className="p1">Admin</div>
        <div className="p2">Website</div>
      </h1>
      <div className="logout-btn">
        <button onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;