import React, { useState, useEffect } from "react";

import "../App.css";
import moment from "moment";
import { getCart, removeItem, updateItem } from "./cartHelper";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Products/productCard";
import CheckoutCart from "../payment/pages/checkCart";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div className="container-fluid">
        <h5>Your cart has {`${items.length}`} items</h5>
        <hr></hr>
        <div className="col-12">
          <div className="row">
            {items.map((product, i) => (
              <div key={i} className="col">
                <ProductCard
                  key={i}
                  Product={product}
                  showWishListButton={false}
                  showAddToCartButton={false}
                  showRemoveWishlistButton={false}
                  cartUpdate={true}
                  showRemoveButton={true}
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
      There are no items in your Cart.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h3>
  );
  return (
    <div className="container-fluid">
      <center>
        <h3 className="yell-text">Shopping Cart</h3>
      </center>
      <div className="row mt-4 m-5 d-flex justify-content-center">
        <div className="row">{items.length > 0 ? showItems(items) : noItemMessage()}</div>
      </div>
      <div className="col-6">
        <h3></h3>
        <CheckoutCart products={items} />
      </div>
    </div>
  );
};

export default Cart;
