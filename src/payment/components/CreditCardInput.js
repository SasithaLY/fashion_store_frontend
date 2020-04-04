import React, { Component } from "react";

export default class CreditCardInput extends Component {
  render() {
      const {handleInputChange} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cardName">Name on card</label>
            <input
              type="text"
              className="form-control"
              id="cardName"
              name="cardName"
              placeholder=""
              required
              onChange={handleInputChange}
            />
            <small className="text-muted">Full name as displayed on card</small>
            <div className="invalid-feedback">Name on card is required</div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cardNumber">Credit card number</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              placeholder=""
              required
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="cardExpiration">Expiration</label>
            <input
              type="text"
              className="form-control"
              id="cardExpiration"
              name="cardExpiration"
              placeholder=""
              required
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">Expiration date required</div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="cardCVV">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cardCVV"
              name="cardCVV"
              placeholder=""
              required
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">Security code required</div>
          </div>
        </div>
      </div>
    );
  }
}
