import React, { useState, useEffect } from "react";
import "../App.css";
import moment from "moment";
import { getCart } from "./cartHelper";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Products/productCard";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    console.log(items);
    return (
      <div className="container">
        <h5 >Your cart has {items.length} items</h5>
        <hr></hr>
        
        {items.map((product, i) => (
          
          <ProductCard
            key={i}
            Product={product}
            showAddToCartButton={false}
            cartUpdate={true}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => (
    <h4>
      Your cart is Empty.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h4>
  );
  return (
    <div className="container-fluid">
      <center><h3 class="yell-text" >Shopping Cart</h3></center>
      
        <div className="col-12">
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>
        
        <div className="col-6">
          <button className="btn btn-outline-warning mt-2 mb-2 mx-2">Show checkout options</button>
        </div>
      </div>
   
  );
};

export default Cart;
// export default class cart extends Component {
//     render() {
//         return (
//             <div>
//                <h1>cart page thadiya</h1>
//             </div>
//         )
//     }
// }
