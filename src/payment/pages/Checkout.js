import React, { Component } from "react";

import Cart from "../components/Cart";
import AddressInput from "../components/AddressInput";

import "./Checkout.css";
import BillingAddress from "../components/BillingAddress";
import CreditCardInput from "../components/CreditCardInput";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      isEdit: false,
      editAddress: null,
      shippingAddress: "",
      billingSame: false,
      paymentMethod: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postal: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddress1: "",
      billingAddress2: "",
      billingCity: "",
      billingCountry: "",
      billingState: "",
      billingPostal: "",
      addresses: [
        {
          id: 1,
          firstName: "Sasitha",
          lastName: "Layan",
          address1: "Thilina Trade Center",
          address2: "Sandaresgama",
          city: "Eppawala",
          state: "Anuradhapura",
          country: "Sri Lanka",
          postal: "25060",
          isPrimary: true,
        },
        {
          id: 2,
          firstName: "Sasitha",
          lastName: "Layan",
          address1: " 148/7, Golden Cresent",
          address2: "Pittugala",
          city: "Malabe",
          state: "Colombo",
          country: "Sri Lanka",
          postal: "25060",
          isPrimary: false,
        },
      ],
      errors: {
        billingFirstName: "",
        billingLastName: "",
        billingAddress1: "",
        billingCity: "",
        billingCountry: "",
        billingState: "",
        billingPostal: "",
        paymentMethod: "",
        shippingAddress: "",
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        country: "",
        state: "",
        postal: "",
      },
    };

    this.err = {
      billingFirstName: "Valid first name is required.",
      billingLastName: "Valid last name is required.",
      billingAddress1: "Please enter your billing address.",
      billingCity: "Please enter your city.",
      billingCountry: "Please select a country.",
      billingState: "Please provide a valid state.",
      billingPostal: "Zip/Postal code required.",
      firstName: "Valid first name is required.",
      lastName: "Valid last name is required.",
      address1: "Please enter your address.",
      city: "Please enter your city.",
      country: "Please select a country.",
      state: "Please provide a valid state.",
      postal: "Zip/Postal code required.",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBillingAddressChange = this.handleBillingAddressChange.bind(
      this
    );
    this.onAddressChange = this.onAddressChange.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;

    const name = target.name;
    const value = target.id === "billingSame" ? target.checked : target.value;

    const newErr = this.state.errors;

    //validate while typing
    if (name != "billingSame") {
      if (value.replace(/\s/g, "") === "") {
        let e = this.err[name];
        newErr[name] = e;
      } else {
        newErr[name] = null;
      }
    }

    this.setState(
      {
        [name]: value,
        errors: newErr,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleBillingAddressChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  onAddressChange = (event) => {
    const address = this.state.addresses.find(
      (address) => address.id == event.target.value
    );

    const newErr = this.state.errors;

    if (this.state.shippingAddress === "") {
      let e = this.err[event.target.name];
      newErr["shippingAddress"] = e;
    } else {
      newErr["shippingAddress"] = null;
    }

    this.setState(
      {
        shippingAddress: address,
        errors: newErr,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  submitNewAddress = (e) => {
    e.preventDefault();
    const isAddressValid = this.validateAddress();

    if (isAddressValid) {
      console.log("input new address");
    }
  };

  submitCheckout = (e) => {
    e.preventDefault();

    const isValid = this.validate();
    if (isValid) {
      console.log("Valid!");
    }
  };

  setShowing = (e) => {
    e.preventDefault();

    this.setState({
      showing: false,
    });
  };

  handleEdit = (id) => {
    const selectAddress = this.state.addresses.find(
      (address) => address.id === id
    );
    console.log(id);
    console.log(selectAddress);
    this.setState({
      editAddress: selectAddress,
      isEdit: true,
    });
  };

  validateAddress = () => {
    let count = 0;
    const newErr = this.state.errors;

    if (this.state.showing) {
      if (this.state.firstName === "") {
        newErr["firstName"] = "Valid first name is required.";
        count++;
      } else {
        newErr["firstName"] = null;
      }
      if (this.state.lastName === "") {
        newErr["lastName"] = "Valid last name is required.";
        count++;
      } else {
        newErr["lastName"] = null;
      }
      if (this.state.address1 === "") {
        newErr["address1"] = "Please enter your billing address.";
        count++;
      } else {
        newErr["address1"] = null;
      }
      if (this.state.city === "") {
        newErr["city"] = "Please enter your city.";
        count++;
      } else {
        newErr["city"] = null;
      }
      if (this.state.country === "") {
        newErr["country"] = "Please select a country.";
        count++;
      } else {
        newErr["country"] = null;
      }
      if (this.state.state === "") {
        newErr["state"] = "Please provide a valid state.";
        count++;
      } else {
        newErr["state"] = null;
      }
      if (this.state.postal === "") {
        newErr["postal"] = "Zip/Postal code required.";
        count++;
      } else {
        newErr["postal"] = null;
      }
    }

    this.setState({
      errors: newErr,
    });

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  validate = () => {
    const newErr = this.state.errors;
    let count = 0;

    if (!this.state.billingSame) {
      if (this.state.billingFirstName === "") {
        newErr["billingFirstName"] = "Valid first name is required.";
        count++;
      } else {
        newErr["billingFirstName"] = null;
      }
      if (this.state.billingLastName === "") {
        newErr["billingLastName"] = "Valid last name is required.";
        count++;
      } else {
        newErr["billingLastName"] = null;
      }
      if (this.state.billingAddress1 === "") {
        newErr["billingAddress1"] = "Please enter your billing address.";
        count++;
      } else {
        newErr["billingAddress1"] = null;
      }
      if (this.state.billingCity === "") {
        newErr["billingCity"] = "Please enter your city.";
        count++;
      } else {
        newErr["billingCity"] = null;
      }
      if (this.state.billingCountry === "") {
        newErr["billingCountry"] = "Please select a country.";
        count++;
      } else {
        newErr["billingCountry"] = null;
      }
      if (this.state.billingState === "") {
        newErr["billingState"] = "Please provide a valid state.";
        count++;
      } else {
        newErr["billingState"] = null;
      }
      if (this.state.billingPostal === "") {
        newErr["billingPostal"] = "Zip/Postal code required.";
        count++;
      } else {
        newErr["billingPostal"] = null;
      }
    }

    if (this.state.paymentMethod === "") {
      newErr["paymentMethod"] = "Please select a payment method.";
      count++;
    } else {
      newErr["paymentMethod"] = null;
    }
    if (this.state.shippingAddress === "") {
      newErr["shippingAddress"] = "Please Select a shipping address";
      count++;
    } else {
      newErr["shippingAddress"] = null;
    }

    this.setState({
      errors: newErr,
    });

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const {
      showing,
      addresses,
      billingSame,
      paymentMethod,
      errors,
    } = this.state;

    return (
      <div className="container-lg">
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
                  <div className="container-fluid">
                    <div className="row">
                      {addresses.map((address) => {
                        return (
                          <div key={address.id} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="shippingAddress"
                              id={"radio" + address.id}
                              value={address.id}
                              onChange={this.onAddressChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"radio" + address.id}
                            >
                              {address.firstName +
                                " " +
                                address.lastName +
                                ", " +
                                address.address1 +
                                ", " +
                                address.address2 +
                                ", " +
                                address.city +
                                ", " +
                                address.postal +
                                ", " +
                                address.country}
                            </label>

                            <button
                              className="btn btn-sm button-transparent mx-2"
                              onClick={() => this.handleEdit(address.id)}
                            >
                              <i className="fas fa-pen icon-white"></i>
                            </button>
                          </div>
                        );
                      })}
                      <div className="cus-invalid-feedback">
                        {errors.shippingAddress}
                      </div>
                    </div>
                    <div className="row">
                      <div className="my-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => this.setState({ showing: true })}
                        >
                          Add New
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col justify-content-center my-3">
                        {showing ? (
                          <AddressInput
                            setShowing={this.setShowing}
                            editAddress={this.state.editAddress}
                            handleInputChange={this.handleInputChange}
                            submitNewAddress={this.submitNewAddress}
                            errors={errors}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card my-2">
                <div className="card-header">
                  <h6>Billing Address</h6>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="billingSame"
                          id="billingSame"
                          onChange={this.handleInputChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="addressCheck"
                        >
                          Billing address is the same as my Shipping address
                        </label>
                      </div>
                    </div>

                    <div>
                      {billingSame ? null : (
                        <BillingAddress
                          handleInputChange={this.handleInputChange}
                          errors={errors}
                          validate={this.validate}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card my-2">
                <div className="card-header">
                  <h6 className="mb-3">Payment</h6>
                </div>
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="d-block my-3">
                      <div className="custom-form-check">
                        <label className="form-check-label">
                          Credit/Debit Card
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            value="card"
                            onChange={this.handleInputChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="custom-form-check">
                        <label className="form-check-label">
                          Paypal
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            value="paypal"
                            onChange={this.handleInputChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="custom-form-check">
                        <label className="form-check-label">
                          Cash On Delivery
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            value="cod"
                            onChange={this.handleInputChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="cus-invalid-feedback">
                        {errors.paymentMethod}
                      </div>
                    </div>
                    {paymentMethod === "card" ? (
                      <CreditCardInput
                        handleInputChange={this.handleInputChange}
                      />
                    ) : null}
                    <hr className="mb-4" />
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                      onClick={this.submitCheckout}
                    >
                      Continue to checkout
                    </button>
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
  }
}
