import React, { Component } from "react";

export default class AddressInput extends Component {
  render() {

    const{submitNewAddress, setShowing, handleInputChange, addressErrors, validateAddress} = this.props;

    return (
      <div>
        <hr />

        <form
          className="needs-validation"
          
          onSubmit={submitNewAddress}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder=""
                onChange={handleInputChange}
                onKeyUp={validateAddress}
                required
              />
              <div className="cus-invalid-feedback">
                  {addressErrors.firstName}
                </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder=""
                onChange={handleInputChange}
                onKeyUp={validateAddress}
                required
              />
             <div className="cus-invalid-feedback">
                  {addressErrors.lastName}
                </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address1">Address</label>
            <input
              type="text"
              className="form-control"
              id="address1"
              name="address1"
              placeholder="1234 Main St"
              onChange={handleInputChange}
              onKeyUp={validateAddress}
              required
            />
           <div className="cus-invalid-feedback">
                  {addressErrors.address1}
                </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address2">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              name="address2"
              placeholder="Apartment or suite"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="ex: Colombo"
              onChange={handleInputChange}
              onKeyUp={validateAddress}
              required
            />
            <div className="cus-invalid-feedback">
                  {addressErrors.city}
                </div>
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country">Country</label>
              <select
                className="custom-select d-block w-100"
                id="country"
                name="country"
                onInput={handleInputChange}
                onChange={validateAddress}
                required
              >
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="cus-invalid-feedback">
                  {addressErrors.country}
                </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <select
                className="custom-select d-block w-100"
                id="state"
                name="state"
                onInput={handleInputChange}
                onChange={validateAddress}
            
                required
              >
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className="cus-invalid-feedback">
                  {addressErrors.state}
                </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="postal">Zip/Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postal"
                name="postal"
                placeholder=""
                onChange={handleInputChange}
                onKeyUp={validateAddress}
                required
              />
              <div className="cus-invalid-feedback">
                  {addressErrors.postal}
                </div>
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <div className="float-right">
                <button
                  className="btn btn-sm  btn-danger mx-2"
                  onClick={setShowing}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-success "
                  onClick={submitNewAddress}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
