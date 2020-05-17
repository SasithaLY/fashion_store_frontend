import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import {createWishlist, getWishList} from "./wishAPI";
import {isAuthenticated} from "../auth/auth";
import ProductCard from "../Components/Products/productCard";

const WishList = () => {
    const [items, setItems] = useState([]);
    const[run,setRun] = useState(false);
    const [error, setError] = useState({ isSet: false, message: "" });

    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    const getList = (userId, token) => {
      getWishList(userId, token).then((data) => {
       
          setItems(data);
         
      });
    };
  
    useEffect(() => {
      getList(userId, token);;
    }, [run]);


const showItems = () => {
    console.log(items);
    return (
      <div className="container">
        <h5 >Your Wishlist has  items</h5>
        <hr></hr>
        
        {items.map((product, i) => (
          
          <ProductCard
            key={i}
            Product={product}
            showAddToCartButton={true}
            showWishListButton = {false}
        
            showRemoveButton={false}
            setRun = {setRun}
            run ={run}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => (
    <h3 class="yell-text">
      Your Wishlist is Empty.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h3>
  );
  return (
    <div className="container-fluid">
      <center><h3 class="yell-text" >Wish List</h3></center>
      <div className="row mt-4 m-5 d-flex justify-content-center">
      <div className="row" >
        <div class="column">
          <div class="card">
         
              {items.length > 0 ? showItems(items) : noItemMessage()} 
             
          </div>
        </div> 
      </div>
      </div> 
    </div> 
   
  );
};

export default WishList;
