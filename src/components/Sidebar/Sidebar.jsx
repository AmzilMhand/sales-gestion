import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FcSalesPerformance } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { IoSettingsSharp, IoGrid, IoLogOut } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <h1>
          <FcSalesPerformance />
          Gestion Sales
        </h1>
      </div>
      <div className="sidebar-content">
        <div className="top-section">
          <NavLink to={"/Dashboard"}>
            <IoGrid />
            Dashboard
          </NavLink>
          <NavLink to={"/sales"}>
            <AiFillProduct />
            Sales
          </NavLink>
          <NavLink to={"/sales-form"}>
            <AiFillProduct />
            Add Sales
          </NavLink>
          <NavLink to={"/Sellers"}>
            <FaUsers />
            Sellers
          </NavLink>
        </div>
        <div className="bottom-section">
          <NavLink to={"/Settings"}>
            <IoSettingsSharp />
            Settings
          </NavLink>
          <NavLink to={"/Login"} className={"logout-button"}>
            <IoLogOut />
            Log Out
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
