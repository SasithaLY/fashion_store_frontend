import React from "react";
import SearchBar from "./SearchBar";

import './NavLinks.css';  

const NavLinks = props => {
  return (
    
    <ul className="navbar-nav mx-5 mr-auto">
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Main Cat 1
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Sub Cat 1</a>
        <a className="dropdown-item" href="#">Sub Cat 2</a>
      </div>
    </li>

    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Main Cat 2
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Sub Cat 1</a>
        <a className="dropdown-item" href="#">Sub Cat 2</a>
      </div>
    </li>
  </ul>

    
    
  );
};

export default NavLinks;
