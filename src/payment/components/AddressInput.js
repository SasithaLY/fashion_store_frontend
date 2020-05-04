import React, { Component } from "react";

export default class AddressInput extends Component {
  render() {
    const {
      submitNewAddress,
      handleInputChange,
      errors,
      validateAddress,
      isEdit,
      editAddress,
      handleCancel,
      handleUpdateAddress,
      values
    } = this.props;

    return (
      <div>
        <hr />

        <form className="needs-validation" onSubmit={isEdit ? handleUpdateAddress : submitNewAddress}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className={
                  errors.firstName === null
                    ? "form-control cus-valid"
                    : errors.firstName === ""
                    ? "form-control"
                    : "form-control cus-invalid"
                }
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                required
              />
              <div className="cus-invalid-feedback">{errors.firstName}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className={
                  errors.lastName === null
                    ? "form-control cus-valid"
                    : errors.lastName === ""
                    ? "form-control"
                    : "form-control cus-invalid"
                }
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                required
              />
              <div className="cus-invalid-feedback">{errors.lastName}</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address1">Address</label>
            <input
              type="text"
              className={
                errors.address1 === null
                  ? "form-control cus-valid"
                  : errors.address1 === ""
                  ? "form-control"
                  : "form-control cus-invalid"
              }
              id="address1"
              name="address1"
              placeholder="1234 Main St"
              value={values.address1}
              onChange={handleInputChange}
              required
            />
            <div className="cus-invalid-feedback">{errors.address1}</div>
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
              value={values.address2}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className={
                errors.city === null
                  ? "form-control cus-valid"
                  : errors.city === ""
                  ? "form-control"
                  : "form-control cus-invalid"
              }
              id="city"
              name="city"
              placeholder="ex: Colombo"
              value={values.city}
              onChange={handleInputChange}
              required
            />
            <div className="cus-invalid-feedback">{errors.city}</div>
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country">Country</label>
              <select
                className={
                  errors.country === null
                    ? "custom-select d-block w-100 cus-valid"
                    : errors.country === ""
                    ? "custom-select d-block w-100"
                    : "custom-select d-block w-100 cus-invalid"
                }
                id="country"
                name="country"
                value={values.country}
                onInput={handleInputChange}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose...</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="United States">United States</option>
              </select>
              <div className="cus-invalid-feedback">{errors.country}</div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <select
                className={
                  errors.state === null
                    ? "custom-select d-block w-100 cus-valid"
                    : errors.state === ""
                    ? "custom-select d-block w-100"
                    : "custom-select d-block w-100 cus-invalid"
                }
                id="state"
                name="state"
                value={values.state}
                onInput={handleInputChange}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose...</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Colombo">Colombo</option>
              </select>
              <div className="cus-invalid-feedback">{errors.state}</div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="postal">Zip/Postal Code</label>
              <input
                type="text"
                className={
                  errors.postal === null
                    ? "form-control cus-valid"
                    : errors.postal === ""
                    ? "form-control"
                    : "form-control cus-invalid"
                }
                id="postal"
                name="postal"
                value={values.postal}
                onChange={handleInputChange}
                required
              />
              <div className="cus-invalid-feedback">{errors.postal}</div>
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <div className="float-right">
                <button
                  className="btn btn-sm  btn-danger mx-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                {
                  isEdit ? <button
                  className="btn btn-sm btn-success "
                >
                  Edit
                </button> : <button
                  type="submit"
                  className="btn btn-sm btn-success "
                  
                >
                  Save
                </button>
                }
                
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
