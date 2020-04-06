import React, { Component } from "react";

export default class BillingAddress extends Component {
  render() {
    const { handleInputChange, errors, validate } = this.props;

    return (
      <div className="row ">
        <div className="col justify-content-center my-3">
          <hr />
          <form className="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="billingFirstName">First name</label>
                <input
                  type="text"
                  className={
                    errors.billingFirstName === null
                      ? "form-control cus-valid"
                      : errors.billingFirstName === ""
                      ? "form-control"
                      : "form-control cus-invalid"
                  }
                  id="billingFirstName"
                  name="billingFirstName"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="cus-invalid-feedback">
                  {errors.billingFirstName}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="billingLastName">Last name</label>
                <input
                  type="text"
                  className={
                    errors.billingLastName === null
                      ? "form-control cus-valid"
                      : errors.billingLastName === ""
                      ? "form-control"
                      : "form-control cus-invalid"
                  }
                  id="billingLastName"
                  name="billingLastName"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="cus-invalid-feedback">
                  {errors.billingLastName}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="billingAddress1">Address</label>
              <input
                type="text"
                className={
                  errors.billingAddress1 === null
                    ? "form-control cus-valid"
                    : errors.billingAddress1 === ""
                    ? "form-control"
                    : "form-control cus-invalid"
                }
                id="billingAddress1"
                name="billingAddress1"
                placeholder="1234 Main St"
                required
                onChange={handleInputChange}
              />
              <div className="cus-invalid-feedback">
                {errors.billingAddress1}
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
                className={
                  errors.billingCity === null
                    ? "form-control cus-valid"
                    : errors.billingCity === ""
                    ? "form-control"
                    : "form-control cus-invalid"
                }
                id="billingCity"
                name="billingCity"
                placeholder="ex: Colombo"
                required
                onChange={handleInputChange}
              />
              <div className="cus-invalid-feedback">{errors.billingCity}</div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="billingCountry">Country</label>
                <select
                  className={
                    errors.billingCountry === null
                      ? "custom-select d-block w-100 cus-valid"
                      : errors.billingCountry === ""
                      ? "custom-select d-block w-100"
                      : "custom-select d-block w-100 cus-invalid"
                  }
                  id="billingCountry"
                  name="billingCountry"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="cus-invalid-feedback">
                  {errors.billingCountry}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="billingState">State</label>
                <select
                  className={
                    errors.billingState === null
                      ? "custom-select d-block w-100 cus-valid"
                      : errors.billingState === ""
                      ? "custom-select d-block w-100"
                      : "custom-select d-block w-100 cus-invalid"
                  }
                  id="billingState"
                  name="billingState"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="cus-invalid-feedback">
                  {errors.billingState}
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="billingPostal">Zip/Postal Code</label>
                <input
                  type="text"
                  className={
                    errors.billingPostal === null
                      ? "form-control cus-valid"
                      : errors.billingPostal === ""
                      ? "form-control"
                      : "form-control cus-invalid"
                  }
                  id="billingPostal"
                  name="billingPostal"
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                <div className="cus-invalid-feedback">
                  {errors.billingPostal}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
