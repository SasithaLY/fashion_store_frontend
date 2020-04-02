import React from "react";
import Cart from "../components/Cart";

const Checkout = () => {
  return (
    <div className="container">
      <h2>
        <b>Checkout</b>
      </h2>
      <div className="col-md-12">
        <div className="row my-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h6>Shipping Address</h6>
              </div>
              <div className="card-body">
                    <div className="input-group">
                        <input type="radio" className="custom-radio"></input>
                    </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
