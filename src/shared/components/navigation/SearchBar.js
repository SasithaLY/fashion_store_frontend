import React, {useState} from "react";
import './Navigation.css';

const SearchBar = () => {

    const [keyWord, setKeyWord] = useState('');

    const handleChange = (event) => {
        setKeyWord(event.target.value);
        console.log(keyWord)

    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" placeholder="Search" onChange={handleChange} value={keyWord}/>
            <a className="btn btn-md btn-outline-warning" href={`/allProducts/search/${keyWord}`} ><i className="fas fa-search icon-white"></i></a>&nbsp;
        </form>
    );
};

export default SearchBar;
