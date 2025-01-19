import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authReducer";
import "./Sidebar.css";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { ShoppingCart } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <ShoppingCart size={50} />

          <h3 className="logo-title"><span>Sales</span> Management</h3>
        </div>
      </div>
      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
        >
          <MdDashboard className="nav-icon" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/sales"
          className={`nav-item ${isActive("/sales") ? "active" : ""}`}
        >
          <MdShoppingCart className="nav-icon" />
          <span>Sales</span>
        </Link>
        {role === "admin" && (
          <Link
            to="/users"
            className={`nav-item ${isActive("/users") ? "active" : ""}`}
          >
            <MdPeople className="nav-icon" />
            <span>Users</span>
          </Link>
        )}
        {/* <Link
          to="/settings"
          className={`nav-item ${isActive("/settings") ? "active" : ""}`}
        >
          <MdSettings className="nav-icon" />
          <span>Settings</span>
        </Link> */}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <div class="button-icon">
            <MdLogout className="nav-icon" />
          </div>
          <p class="button-text">Log Out </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
