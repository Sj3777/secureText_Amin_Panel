import React from "react";
import { SideBarData } from "./SideBarData";
import "./SideBar.css";
const SideBar = () => {
  return (
      <div className="Sidebar">
        <div className="heading">SecureText</div>
        <ul className="SidebarList">
          {SideBarData.map((val, key) => {
            return (
              <li
                key={key}
                id={window.location.pathname === val.link ? "active" : ""}
                className="row"
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
    </div>
  );
};

export default SideBar;
