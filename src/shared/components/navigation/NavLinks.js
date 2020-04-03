import React from "react";
import PostData from "../../../Components/Products/posts.json"


import './NavLinks.css';

const NavLinks = props => {

  const categories = [
    {id: 1, item: 'Women'},
    {id: 2, item: 'Men'},
    {id: 3, item: 'Kids & Babies'},
    {id: 4, item: 'Sportsware'},
    {id: 4, item: 'Homeware'},
  ];

  return (
    
    <ul className="navbar-nav mx-5 mr-auto">
        {categories.map((item, key) =>
            <button className="list-group-item mr-2 mb-2 bg-transparent text-white">{item.item}</button>
        )}
      <div className="dropdown">
        <button className="list-group-item mr-2 mb-2 bg-warning text-white dropdown-toggle w-100 rounded-lg" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
          More Categories
        </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {PostData.map((postDetail, index) => {
              return <a className="dropdown-item" href="/products">{postDetail.title}</a>
            })}
          </div>
      </div>
  </ul>
  );
};

export default NavLinks;
