import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { IoGrid, IoLogOut, IoSettingsSharp } from "react-icons/io5";

const Header = () => {
  // State to manage the visibility of the admin menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Ref for the admin menu
  const menuRef = useRef(null);

  // Toggle the admin menu visibility
  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  // Close menu when clicking outside
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

  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="search product..." />
        <FaSearch />
      </div>
      <div className="admin-section">
        <div className="notofication">
          <MdOutlineNotificationsNone />
        </div>
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
          <NavLink to={"/profile"}>
            <FaUser />
            Profile
          </NavLink>
          <NavLink to={"/settings"}>
            <IoSettingsSharp />
            Settings
          </NavLink>
          <NavLink to={"/logout"} className={"logout-button"}>
            <IoLogOut />
            Log Out
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
