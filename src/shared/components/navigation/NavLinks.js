import React from "react";
import SearchBar from "./SearchBar";

import './NavLinks.css';  

const NavLinks = props => {
  return (
    
    <ul class="navbar-nav mx-5 mr-auto">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Main Cat 1
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">Sub Cat 1</a>
        <a class="dropdown-item" href="#">Sub Cat 2</a>
      </div>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Main Cat 2
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">Sub Cat 1</a>
        <a class="dropdown-item" href="#">Sub Cat 2</a>
      </div>
    </li>
  </ul>

    
    
  );
};

export default NavLinks;
