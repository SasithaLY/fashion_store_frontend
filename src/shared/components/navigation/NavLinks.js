import React from "react";
import SearchBar from "./SearchBar";

import './NavLinks.css';

const NavLinks = props => {

  const categories = [
    {id: 1, item: 'Women'},
    {id: 2, item: 'Men'},
    {id: 3, item: 'Hot'},
    {id: 4, item: 'Summer'},
    {id: 4, item: 'Nights'},
  ];

  return (
    
    <ul className="navbar-nav mx-5 mr-auto">
      <div class="d-flex justify-content-center list-group list-group-horizontal" role="group" aria-label="First group">
        <button className="list-group-item mr-2 bg-transparent text-white" >New Arrivals</button>
        {categories.map((item, key) =>
            <button className="list-group-item mr-2 bg-transparent text-white">{item.item}</button>
        )
        }
      </div>

      <div className="dropdown">
        <button className="list-group-item mr-2 bg-primary text-white dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          More Categories
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
  </ul>
  );
};

export default NavLinks;
