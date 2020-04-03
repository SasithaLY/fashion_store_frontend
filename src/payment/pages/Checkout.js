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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Thilina Trade Center, Sandaresgama, Eppawala, Sri Lanka
                  </label>
                  <button className="btn btn-sm button-transparent mx-2"><i className="fas fa-pen icon-gold"></i></button>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                  />
                  <label class="form-check-label" for="gridRadios1">
                    148/7, Golden Cresent, Pittugala, Malabe, Sri Lanka
                  </label>
                  <button className="btn btn-sm button-transparent mx-2"><i className="fas fa-pen icon-gold"></i></button>
                </div>
                <div className="my-2">
                    <button className="btn btn-sm btn-success">Add New</button>
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
