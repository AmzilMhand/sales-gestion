import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
