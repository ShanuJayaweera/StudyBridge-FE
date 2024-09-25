import LogoHeader from "./logo-header";
import '../assets/css/side-menu.css'

import React from "react";

function Sidebar() {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {/* Sidebar items */}
            <li className="nav-item active">
              <a data-bs-toggle="collapse" href="#dashboard">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="dashboard">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="#dashboard1">
                      <span className="sub-item">Dashboard 1</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* Other sidebar items */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
