import React from "react";
import logo from "../../assets/images/logowhite.png";

import "./MainNavigation.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

const MainNavigation = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark topnav">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <a className="navbar-brand" href="./">
        <img src={logo} className="logo"></img>
      </a>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <NavLinks />
        <SearchBar />
        <div>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink-4"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user"></i> Profile{" "}
          </a>
          <div
            className="dropdown-menu dropdown-menu-right dropdown-info"
            aria-labelledby="navbarDropdownMenuLink-4"
          >
            <a className="dropdown-item" href="#">
              My account
            </a>
            <a className="dropdown-item" href="#">
              Log out
            </a>
          </div>
        </li>
        </ul>
      </div>
      </div>
      
    </nav>
  );
};

export default MainNavigation;
