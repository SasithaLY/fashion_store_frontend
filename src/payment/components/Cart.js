import React from "react";

import './Cart.css';

const Cart = () => {
  return (
    <div className="custom-div">
      <div className="order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span>Your cart</span>
          <span className="badge badge-danger badge-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Product name</h6>
              <small className="custom-span">Brief description</small>
            </div>
            <span className="custom-span">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Second product</h6>
              <small className="custom-span">Brief description</small>
            </div>
            <span className="custom-span">$8</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Third item</h6>
              <small className="custom-span">Brief description</small>
            </div>
            <span className="custom-span">$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between bg-dark">
            <div className="text-success">
              <h6 className="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span className="text-success">-$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form className="card p-2">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Promo code" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-success ">
                Redeem
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
