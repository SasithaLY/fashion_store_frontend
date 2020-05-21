import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Cart from "../components/Cart";
import {isAuthenticated} from "../../auth/auth";

const CheckoutCart = ({products}) => {
    const getTotal = () => {
      return products.reduce((currentVal, nextVal) => {
          return currentVal + nextVal.count * nextVal.price;
      }, 0);
    }
    
    return<div>
      <h3 className="yell-text mt-2 mb-2 mx-2" >Sub Total: USD {getTotal()}</h3>
      {isAuthenticated() ? (
         <Link to="/Checkout"><button className="btn btn-outline-warning mt-2 mb-2 mx-2">Checkout</button></Link>
      ): (<Link to= "/signin"> <button className="btn btn-outline-danger mt-2 mb-2 mx-2">Sign In to Checkout</button> </Link>)}
    </div>
  }

  export default CheckoutCart;