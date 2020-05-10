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
      <h3> Total: LKR{getTotal()}</h3>
    </div>
  }

  export default CheckoutCart;