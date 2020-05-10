import React, { useState, useEffect } from "react";
import "../App.css";
import moment from "moment";
import { getCart,removeItem,updateItem} from "./cartHelper";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Products/productCard";
import CheckoutCart from "../payment/pages/checkCart";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = items => {
    console.log(items);
    return (
      <div className="container">
        <h5 >Your cart has {`${items.length}`} items</h5>
        <hr></hr>
        
        {items.map((product, i) => (
          
          <ProductCard
            key={i}
            Product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => (
    <h3 class="yell-text">
      Your cart is Empty.
      <br />
      <Link to="../Components/Products">Click here to continue shopping...</Link>
    </h3>
  );
  return (
    <div className="container-fluid">
      <center><h3 class="yell-text" >Shopping Cart</h3></center>
     
      <div className="row mt-4 m-5 d-flex justify-content-center">
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>
        
        <div className="col-6">
          <h3> Your Total</h3>
          <CheckoutCart products={items}/>
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
