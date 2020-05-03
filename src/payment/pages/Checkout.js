import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import AddressInput from "../components/AddressInput";

import "./Checkout.css";
import BillingAddress from "../components/BillingAddress";
import CreditCardInput from "../components/CreditCardInput";

export default function Checkout() {
  const [values, setValues] = useState({
    showing: false,
    isEdit: false,
    editAddress: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postal: "",
    },
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
    cart: [
      {
        id: 1,
        itemName: "Skirt",
        price: "1200",
        quantity: 1,
      },
      {
        id: 2,
        itemName: "Jean",
        price: "2000",
        quantity: 1,
      },
    ],
    promocode: {
      applied: false,
      code: "10OUT",
      discount: 10,
    },
  });

  const err = {
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

  const onAddressChange = (event) => {
    const address = values.addresses.find(
      (address) => address.id == event.target.value
    );

    const newErr = values.errors;

    if (values.shippingAddress === "") {
      let e = err[event.target.name];
      newErr["shippingAddress"] = e;
    } else {
      newErr["shippingAddress"] = null;
    }

    setValues({
      ...values,
      shippingAddress: address,
      errors: newErr,
    });

    console.log(values.shippingAddress);
  };

  const handleInputChange = (event) => {
    const target = event.target;

    const name = target.name;
    const value = target.id === "billingSame" ? target.checked : target.value;

    const newErr = values.errors;

    //validate while typing
    if (name != "billingSame" && name != "promo") {
      if (value.replace(/\s/g, "") === "") {
        let e = err[name];
        newErr[name] = e;
      } else {
        newErr[name] = null;
      }
    }

    setValues({
      ...values,
      [name]: value,
      errors: newErr,
    });
  };

  const validate = () => {
    const newErr = values.errors;
    let count = 0;

    if (!values.billingSame) {
      if (values.billingFirstName === "") {
        newErr["billingFirstName"] = "Valid first name is required.";
        count++;
      } else {
        newErr["billingFirstName"] = null;
      }
      if (values.billingLastName === "") {
        newErr["billingLastName"] = "Valid last name is required.";
        count++;
      } else {
        newErr["billingLastName"] = null;
      }
      if (values.billingAddress1 === "") {
        newErr["billingAddress1"] = "Please enter your billing address.";
        count++;
      } else {
        newErr["billingAddress1"] = null;
      }
      if (values.billingCity === "") {
        newErr["billingCity"] = "Please enter your city.";
        count++;
      } else {
        newErr["billingCity"] = null;
      }
      if (values.billingCountry === "") {
        newErr["billingCountry"] = "Please select a country.";
        count++;
      } else {
        newErr["billingCountry"] = null;
      }
      if (values.billingState === "") {
        newErr["billingState"] = "Please provide a valid state.";
        count++;
      } else {
        newErr["billingState"] = null;
      }
      if (values.billingPostal === "") {
        newErr["billingPostal"] = "Zip/Postal code required.";
        count++;
      } else {
        newErr["billingPostal"] = null;
      }
    }

    if (values.paymentMethod === "") {
      newErr["paymentMethod"] = "Please select a payment method.";
      count++;
    } else {
      newErr["paymentMethod"] = null;
    }
    if (values.shippingAddress === "") {
      newErr["shippingAddress"] = "Please Select a shipping address";
      count++;
    } else {
      newErr["shippingAddress"] = null;
    }

    setValues({
      ...values,
      errors: newErr,
    });

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateAddress = () => {
    let count = 0;
    const newErr = values.errors;

    if (values.showing) {
      if (values.firstName === "") {
        newErr["firstName"] = "Valid first name is required.";
        count++;
      } else {
        newErr["firstName"] = null;
      }
      if (values.lastName === "") {
        newErr["lastName"] = "Valid last name is required.";
        count++;
      } else {
        newErr["lastName"] = null;
      }
      if (values.address1 === "") {
        newErr["address1"] = "Please enter your billing address.";
        count++;
      } else {
        newErr["address1"] = null;
      }
      if (values.city === "") {
        newErr["city"] = "Please enter your city.";
        count++;
      } else {
        newErr["city"] = null;
      }
      if (values.country === "") {
        newErr["country"] = "Please select a country.";
        count++;
      } else {
        newErr["country"] = null;
      }
      if (values.state === "") {
        newErr["state"] = "Please provide a valid state.";
        count++;
      } else {
        newErr["state"] = null;
      }
      if (values.postal === "") {
        newErr["postal"] = "Zip/Postal code required.";
        count++;
      } else {
        newErr["postal"] = null;
      }
    }

   setValues({
       ...values,
      errors: newErr,
    });

    if (count > 0) {
      return false;
    } else {
      return true;
    }
  };

  const submitCheckout = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      console.log("Valid!");
    }
  };

  const submitPromoCode = (e) => {
    e.preventDefault();

    //this is dummy for now, should validate the code with db.
    setValues({
        ...values,
      promocode: {
        applied: true,
        code: values.promo,
        discount: 10,
      },
    });
  };

  const submitNewAddress = (e) => {
    e.preventDefault();
    const isAddressValid = validateAddress();

    if (isAddressValid) {
      console.log("input new address");
    }
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    const isAddressValid = validateAddress();

    if (isAddressValid) {
      //update the address and call function to retrieve addresses
      console.log("update address valid and updating");
    }
  };

  const handleCancel = () => {
    setValues({
      ...values,
      editAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        postal: "",
      },
      isEdit: false,
      showing: false,
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postal: "",
    });
  };

  const handleEdit = (id) => {
    const selectAddress = values.addresses.find((address) => address.id === id);
    console.log(id);
    console.log(selectAddress);

    setValues({
      ...values,
      editAddress: selectAddress,
      isEdit: true,
      showing: true,
      firstName: selectAddress.firstName,
      lastName: selectAddress.lastName,
      address1: selectAddress.address1,
      address2: selectAddress.address2,
      city: selectAddress.city,
      state: selectAddress.state,
      country: selectAddress.country,
      postal: selectAddress.postal,
    });
  };
  
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
                    {values.addresses.map((address) => {
                      return (
                        <div key={address.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="shippingAddress"
                            id={"radio" + address.id}
                            value={address.id}
                            onChange={onAddressChange}
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
                            onClick={() => handleEdit(address.id)}
                          >
                            <i className="fas fa-pen icon-white"></i>
                          </button>
                        </div>
                      );
                    })}
                    <div className="cus-invalid-feedback">
                      {values.errors.shippingAddress}
                    </div>
                  </div>
                  <div className="row">
                    <div className="my-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => setValues({ ...values, showing: true })}
                      >
                        Add New
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col justify-content-center my-3">
                      {values.showing ? (
                        <AddressInput
                          isEdit={values.isEdit}
                          values={values}
                          handleInputChange={handleInputChange}
                          submitNewAddress={submitNewAddress}
                          handleUpdateAddress={handleUpdateAddress}
                          handleCancel={handleCancel}
                          errors={values.errors}
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
                        onChange={handleInputChange}
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
                    {values.billingSame ? null : (
                      <BillingAddress
                        handleInputChange={handleInputChange}
                        errors={values.errors}
                        validate={validate}
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="cus-invalid-feedback">
                      {values.errors.paymentMethod}
                    </div>
                  </div>
                  {values.paymentMethod === "card" ? (
                    <CreditCardInput
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                  <hr className="mb-4" />
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={submitCheckout}
                  >
                    Continue to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <Cart
              cart={values.cart}
              promocode={values.promocode}
              handleInputChange={handleInputChange}
              submitPromoCode={submitPromoCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
