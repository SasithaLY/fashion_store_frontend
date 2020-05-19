import React, { Component } from "react";

import './Cart.css';

export default class Cart extends Component {
  render() {
    const { cart, promocode, submitPromoCode, handleInputChange, error } = this.props;
    let total = 0;
    return (
      <div className="custom-div">
        <div className="order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span>Your cart</span>
            <span className="badge badge-danger badge-pill">{cart.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {cart.map((item) => {
              total += item.price * item.count;
              return (
                <li key={item._id} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="custom-span">
                      x {item.count}
                    </small>
                  </div>
                  <span className="custom-span">
                    USD {(item.price * item.count).toFixed(2)}
                  </span>
                </li>
              );
            })}
            {
              promocode.applied ? <li className="list-group-item d-flex justify-content-between bg-dark">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
            <small>{promocode.code}</small>
              </div>
            <span className="text-success">- USD {(total * promocode.discount / 100).toFixed(2)}</span>
            </li> : null
            }
            
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{promocode.applied ? (total - (total * promocode.discount / 100)).toFixed(2) : total.toFixed(2)}</strong>
            </li>
          </ul>

          <form className="card p-2" onSubmit={submitPromoCode}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Promo code"
                onChange={handleInputChange}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-success ">
                  Redeem
                </button>
              </div>
            </div>
            <div className="cus-invalid-feedback">
                  {error}
                </div>
          </form>
        </div>
      </div>
    );
  }
}
