import './header.css';
import { LogoutOutlined } from '@ant-design/icons';
const Header = () => {
  return (
    <div className="header-admin">
      <h1>
        <div className="p1">Admin</div>
        <div className="p2">Website</div>
      </h1>
      <div className="logout-btn">
        <button>
          <LogoutOutlined /> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;