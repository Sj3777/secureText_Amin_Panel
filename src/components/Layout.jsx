import React from "react";
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="Main">
      <SideBar />
      <div className="home_container">{children}</div>
    </div>
  );
};

export default Layout;
