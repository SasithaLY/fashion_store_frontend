import React from "react";
import SearchBar from "./SearchBar";

import './NavLinks.css';

const NavLinks = props => {

  const categories = [
    {id: 1, item: 'Women'},
    {id: 2, item: 'Men'},
    {id: 3, item: 'Hot'},
    {id: 4, item: 'Summer'},
  ];

  return (
    
    <ul className="navbar-nav mx-5 mr-auto">
      <div class="list-group list-group-horizontal" role="group" aria-label="First group">
        <button className="list-group-item mr-2 bg-transparent text-white" >New Arrivals</button>
        {categories.map((item, key) =>
            <button className="list-group-item mr-2 bg-transparent text-white">{item.item}</button>
        )
        }
        {/*<button type="button" className="btn btn-secondary mr-2">New Arrivals</button>*/}
        {/*<button type="button" className="btn btn-secondary mr-2">Products</button>*/}
        {/*<button type="button" className="btn btn-secondary mr-2">T-shirts</button>*/}
      </div>
  </ul>
  );
};

export default NavLinks;
