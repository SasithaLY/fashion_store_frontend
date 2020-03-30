import React from "react";
import './Navigation.css';

const SearchBar = () => {
  return (
    <form className="form-inline">
      <input className="form-control mr-sm-2" placeholder="Search"/>
      <button className="btn btn-md btn-outline-warning"><i className="fas fa-search icon-white"></i></button>
    </form>
  );
};

export default SearchBar;
