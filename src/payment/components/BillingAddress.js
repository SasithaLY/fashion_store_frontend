import React, { Component } from "react";

export default class BillingAddress extends Component {
  render() {
    const {handleInputChange} = this.props;

    return (
      <div className="row ">
        <div className="col justify-content-center my-3">
          <hr />
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="billingFirstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="billingFirstName"
                  name="billingFirstName"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="billingLastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="billingLastName"
                  name="billingLastName"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="billingAddress1">Address</label>
              <input
                type="text"
                className="form-control"
                id="billingAddress1"
                name="billingAddress1"
                placeholder="1234 Main St"
                required
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                Please enter your billing address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="billingAddress2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="billingAddress2"
                name="billingAddress2"
                placeholder="Apartment or suite"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="billingCity">City</label>
              <input
                type="text"
                className="form-control"
                id="billingCity"
                name="billingCity"
                placeholder="ex: Colombo"
                required
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please enter your city.</div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="billingCountry">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="billingCountry"
                  name="billingCountry"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="billingState">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="billingState"
                  name="billingState"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="billingPostal">Zip/Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="billingPostal"
                  name="billingPostal"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Zip/Postal code required.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
