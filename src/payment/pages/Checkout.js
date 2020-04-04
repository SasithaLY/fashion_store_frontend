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
      shippingAddress: null,
      billingSame: false,
      paymentMethod: null,
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

    this.setState({
      [name]: value,
    },);

    console.log(this.state);
  };

  handleBillingAddressChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  };

  onAddressChange = (event) => {
    const address = this.state.addresses.find(
      (address) => address.id == event.target.value
    );

    this.setState({
      shippingAddress: address,
    });
    console.log(this.state);
  };

  submitNewAddress = (e) => {
    e.preventDefault();
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

  render() {
    const { showing, addresses, billingSame, paymentMethod } = this.state;

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
                              <i className="fas fa-pen icon-gold"></i>
                            </button>
                          </div>
                        );
                      })}
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
