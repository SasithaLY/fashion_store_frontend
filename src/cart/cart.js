import React, { useState, useEffect } from "react";
import "../App.css";
import moment from "moment";
import { getCart } from "./cartHelper";
import { Link } from "react-router-dom";
import singleIProductDetails from "../Components/Products/singleIProductDetails";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2 className="cart-header">Your cart has{"${items.length}"} items</h2>
        <hr></hr>
        {items.map((product, i) => (
          <singleIProductDetails
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => (
    <h4 className="card-header">
      Your cart is Empty.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h4>
  );
  return (
    <div
      title="Shopping Cart"
      description="Manage your cart items.."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>
        <div className="col-6">
          <p>Show checkout options</p>
        </div>
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
