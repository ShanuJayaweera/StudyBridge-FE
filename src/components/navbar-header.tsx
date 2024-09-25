import '../assets/css/navbar-header.css';

import React from "react";

function NavbarHeader() {
  return (
    <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
      <div className="container-fluid">
        {/* Search form */}
        <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
          <div className="input-group">
            <div className="input-group-prepend">
              <button type="button" className="btn btn-search pe-1">
                <i className="fa fa-search search-icon"></i>
              </button>
            </div>
            <input type="text" placeholder="Search ..." className="form-control" />
          </div>
        </nav>

        {/* Notification and user profile */}
        <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
          <li className="nav-item topbar-icon dropdown hidden-caret">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
              <i className="fa fa-bell"></i>
              <span className="notification">4</span>
            </a>
            {/* Notification dropdown */}
          </li>

          <li className="nav-item topbar-user dropdown hidden-caret">
            <a className="dropdown-toggle profile-pic" data-bs-toggle="dropdown" href="#">
              <div className="avatar-sm">
                <img src="assets/img/profile.jpg" alt="Profile" className="avatar-img rounded-circle" />
              </div>
              <span className="profile-username">Hi, Hizrian</span>
            </a>
            {/* User dropdown */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarHeader;
