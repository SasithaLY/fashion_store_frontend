import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { createWishlist, getWishList, deleteWishList } from "./wishAPI";
import { isAuthenticated } from "../auth/auth";
import ProductCard from "../Components/Products/productCard";

const WishList = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [error, setError] = useState({ isSet: false, message: "" });

  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const getList = (userId, token) => {
    getWishList(userId, token).then((data) => {
      setItems(data);
    });
  };

  useEffect(() => {
    getList(userId, token);
  }, [run]);

  const showItems = () => {
    return (
      <div className="container-lg">
        <h5>Your Wishlist has {items.length} items</h5>
        <hr></hr>
        <div className="col-12">
          <div className="row">
            {items.map((WishItem, i) => (
              <div key={i} className="col mx-2">
                <ProductCard
                  key={i}
                  WishListId={WishItem._id}
                  Product={WishItem.products}
                  showWishListButton={false}
                  showAddToCartButton={true}
                  showRemoveButton={false}
                  showRemoveWishlistButton={true}
                  setRun={setRun}
                  run={run}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const noItemMessage = () => (
    <h3 className="yell-text">
      Your Wishlist is Empty.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h3>
  );
  return (
    <div className="container-fluid">
      <center>
        <h3 className="yell-text"> My Wishlist</h3>
      </center>
      <div>{items.length > 0 ? showItems(items) : noItemMessage()}</div>
    </div>
  );
};

export default WishList;
