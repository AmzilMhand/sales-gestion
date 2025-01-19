import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdLogout, MdOutlineNotificationsNone } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authReducer";

import { IoGrid, IoLogOut, IoSettingsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="search product..." />
        <FaSearch />
      </div>
      <div className="admin-section">
        <div className="profile" onClick={toggleMenu}>
          <FaCircleUser />
          <IoIosArrowDown className={`arrow ${menuVisible ? "rotated" : ""}`} />
        </div>
      </div>

      {menuVisible && (
        <div className="admin-menu" ref={menuRef}>
          <NavLink to={"/dashboard"}>
            <IoGrid />
            Dashboard
          </NavLink>
          {/* <NavLink to={"/profile"}>
            <FaUser />
            Profile
          </NavLink> */}
          <NavLink to={"/settings"}>
            <IoSettingsSharp />
            Settings
          </NavLink>
          <button onClick={handleLogout} className="logout-button">
            <div class="button-icon">
              <MdLogout className="nav-icon" />
            </div>
            <p class="button-text">Log Out </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
