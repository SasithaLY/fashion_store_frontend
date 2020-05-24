import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Cart from "../components/Cart";
import AddressInput from "../components/AddressInput";
import { isAuthenticated } from "../../auth/auth";
import BillingAddress from "../components/BillingAddress";
import CreditCardInput from "../components/CreditCardInput";
import { getAddresses, insertAddress, updateAddress, deleteAddress, getBraintreeToken, processPayment, createOrder } from "./paymentHelper";
import { getCart, clearCart } from "../../cart/cartHelper";
import { confirmAlert } from "react-confirm-alert";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import { getSinglePromoCode } from "../../promo/promoHelper";
import { getCountries } from "../../locations/locationHelper";
import swal from "@sweetalert/with-react";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./Checkout.css";

const Checkout = (product) => {
  const [payment, setPayment] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const [redirect, setRedirect] = useState(false);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState({ isSet: false, message: "" });
  const [success, setSuccess] = useState({ isSet: false, message: "" });
  const [shippingCost, setShipping] = useState({ shipping: "" });
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [values, setValues] = useState({
    showing: false,
    showDivs: true,
    isEdit: false,
    btnDissable: false,
    success: "",
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
      promocode: "",
    },
    code: "",
    promocode: {
      applied: false,
      code: "",
      discount: 0,
    },
  });
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const loadCountries = (userId, token) => {
    getCountries(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCountries(data);
      }
    });
  };

  const initAddress = (userId, token) => {
    getAddresses(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAddresses(data);
      }
    });
  };

  const getToken = (userId, token) => {
    getBraintreeToken(userId, token).then((data) => {
      if (data.error) {
        setPayment({ ...payment, error: data.error });
      } else {
        setPayment({ ...payment, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    if (product.location.product) {
      setCart([product.location.product]);
      initAddress(userId, token);
      loadCountries(userId, token);
      getToken(userId, token);
    } else {
      let data = getCart();
      if (data.length == 0) {
        setRedirect(true);
      } else {
        setCart(data);
        initAddress(userId, token);
        loadCountries(userId, token);
        getToken(userId, token);
      }
    }
  }, []);

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/home" />;
    }
  };

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

  const getTotal = () => {
    let cartTotal = cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);

    if (values.promocode.applied) {
      cartTotal = cartTotal - (cartTotal * values.promocode.discount) / 100;
    }
    if (shippingCost.shipping !== "") {
      cartTotal = cartTotal + shippingCost.shipping;
    }
    return cartTotal;
  };

  const showDropIn = () => (
    <div onBlur={() => setPayment({ ...payment, error: "" })}>
      {payment.clientToken !== null && cart.length > 0 && values.paymentMethod === "paynow" ? (
        <div>
          <DropIn
            options={{
              authorization: payment.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (payment.instance = instance)}
          />
        </div>
      ) : null}
    </div>
  );

  const onAddressChange = (event) => {
    const address = addresses.find((address) => address._id == event.target.value);
    const newErr = values.errors;

    const selectCountry = countries.find((country) => country.country === address.country);
    setShipping(selectCountry);

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
    if (values.paymentMethod === "paynow" && Object.keys(payment.instance).length === 0) {
      //newErr["paymentMethod"] = "Wait for payment methods to load.";
      setPayment({ ...payment, error: "Wait for payment methods to load." });
      count++;
    } else {
      setPayment({ ...payment, error: "" });
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
      if (values.firstName.replace(/\s/g, "") === "") {
        newErr["firstName"] = "Valid first name is required.";
        count++;
      } else {
        newErr["firstName"] = null;
      }
      if (values.lastName.replace(/\s/g, "") === "") {
        newErr["lastName"] = "Valid last name is required.";
        count++;
      } else {
        newErr["lastName"] = null;
      }
      if (values.address1.replace(/\s/g, "") === "") {
        newErr["address1"] = "Please enter your billing address.";
        count++;
      } else {
        newErr["address1"] = null;
      }
      if (values.city.replace(/\s/g, "") === "") {
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
      if (values.postal.replace(/\s/g, "") === "") {
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

  const getBillingAddress = () => {
    let billingAddress = {
      firstName: values.billingFirstName,
      lastName: values.billingLastName,
      address1: values.billingAddress1,
      address2: values.billingAddress2,
      city: values.billingCity,
      state: values.billingState,
      country: values.billingCountry,
      postal: values.billingPostal,
    };

    return billingAddress;
  };

  const submitCheckout = (e) => {
    e.preventDefault();

    if (validate()) {
      setPayment({ ...payment, error: "" });
      setValues({ ...values, btnDissable: true });

      //collect order data
      let billAddress = {};
      if (values.billingSame) {
        billAddress = values.shippingAddress;
      } else {
        billAddress = getBillingAddress();
      }

      let orderData = {
        products: cart,
        shippingAddress: values.shippingAddress,
        billingAddress: billAddress,
        promocode: values.promocode,
        shipping: shippingCost,
      };

      if (values.paymentMethod === "cod") {
        setLoading(true);
        orderData.paymentMethod = "COD";
        orderData.transactionId = "";
        orderData.amount = getTotal(cart);

        createOrder(userId, token, orderData).then((data) => {
          setOrder(data);
          setLoading(false);
        });
        setPayment({ ...payment, success: true });
        setValues({ ...values, showDivs: false });

        clearCart(() => {
          console.log("payment success, empty cart");
        });
        setCart(getCart());
      } else {
        
        let nonce;
        let getNonce = payment.instance
          .requestPaymentMethod()
          .then((data) => {
            nonce = data.nonce;
            setLoading(true);
            const payData = {
              paymentMethodNonce: nonce,
              amount: getTotal(cart),
            };

            processPayment(userId, token, payData)
              .then((response) => {
                orderData.paymentMethod = data.type;
                orderData.transactionId = response.transaction.id;
                orderData.amount = response.transaction.amount;
                
                createOrder(userId, token, orderData).then((data) => {
                  setOrder(data);
                  setLoading(false);
                });
                setPayment({ ...payment, success: true });
                setValues({ ...values, showDivs: false });

                clearCart(() => {
                  console.log("payment success, empty cart");
                });
                setCart(getCart());
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            setPayment({ ...payment, error: error.message });
            setValues({ ...values, btnDissable: false });
          });
      }
    }
  };

  const submitPromoCode = (e) => {
    e.preventDefault();
    if (values.code && values.code !== "") {
      getSinglePromoCode(userId, token, { promocode: values.code } || undefined).then((response) => {
        if (response.error) {
          let newErr = values.errors;
          newErr.promocode = response.error;
          setValues({ ...values, errors: newErr });
        } else {
          let newErr = values.errors;
          newErr.promocode = "";
          setValues({
            ...values,
            promocode: {
              applied: true,
              code: response.promocode,
              discount: response.discount,
            },
            errors: newErr,
          });
        }
      });
    }
  };

  const getAddressData = () => {
    let address = {
      firstName: values.firstName,
      lastName: values.lastName,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      postal: values.postal,
    };

    return address;
  };

  const submitNewAddress = (e) => {
    e.preventDefault();
    const isAddressValid = validateAddress();

    if (isAddressValid) {
      insertAddress(userId, token, getAddressData()).then((data) => {
        if (data.error) {
          setError({ isSet: true, message: data.error });
        } else {
          handleCancel();
          setSuccess({ isSet: true, message: "Address added successfully!" });
          initAddress(userId, token);
          window.setTimeout(() => {
            setSuccess({ isSet: false, message: "" });
          }, 5000);
        }
      });
    }
  };

  const showSuccess = () => {
    if (success.isSet) {
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: success.isSet ? "" : "none" }}>
          {success.message}
        </div>
      );
    }
  };

  const showError = () => {
    if (error.isSet) {
      return (
        <div className="alert alert-danger alert-dismissible" role="alert" style={{ display: error.isSet ? "" : "none" }}>
          {error.message}
        </div>
      );
    }
  };

  const showPayError = (error) => (
    <div className="alert alert-danger alert-dismissible" role="alert" style={{ display: payment.error ? "" : "none" }}>
      {error}
    </div>
  );

  const showPaySuccess = (success) => (
    <div className="alert alert-success alert-dismissible" role="alert" style={{ display: payment.success ? "" : "none" }}>
      Order Placed Successfully!
    </div>
  );

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    const isAddressValid = validateAddress();

    if (isAddressValid) {
      updateAddress(userId, token, values.editAddress._id, getAddressData()).then((data) => {
        if (data.error) {
          setError({ isSet: true, message: data.error });
        } else {
          handleCancel();
          setSuccess({
            isSet: true,
            message: "Address Updated successfully!",
          });
          initAddress(userId, token);
          window.setTimeout(() => {
            setSuccess({ isSet: false, message: "" });
          }, 5000);
        }
      });
    }
  };

  const handleCancel = () => {
    setValues({
      ...values,
      editAddress: {},
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
    });
  };

  const handleEdit = (id) => {
    const selectAddress = addresses.find((address) => address._id === id);

    setValues({
      ...values,
      shippingAddress: "",
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

  const handleDeleteAddress = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAddress(userId, id, token).then((data) => {
          if (data.error) {
            setError({ isSet: true, message: data.error });
          } else {
            setSuccess({
              isSet: true,
              message: "Address Deleted Successfully!",
            });
            setValues({ ...values, shippingAddress: "" });
            initAddress(userId, token);
            window.setTimeout(() => {
              setSuccess({ isSet: false, message: "" });
            }, 5000);
          }
        });
      }
    });
  };

  const viewOrderData = (isShow) => {
    if (isShow) {
      return (
        <div className="card card-body border-success">
          <center>
            <h6>Thank you for your purchase. You will receive an email with the order receipt.</h6>
            <h4>
              <label>Order ID : </label>
              {order._id}
            </h4>
          </center>
          <div className="">
            <Link to="user/orderHistory">
              <button className="btn btn-outline-warning float-right">View Orders</button>
            </Link>
          </div>
        </div>
      );
    }
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="container d-flex justify-content-center">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="container-lg" onBlur={() => setPayment({ ...payment, error: "" })}>
      {shouldRedirect(redirect)}
      <h2>
        <b>Checkout</b>
      </h2>
      <div style={{ display: !values.showDivs ? "" : "none" }}>
        {showPaySuccess(payment.success)}

        {viewOrderData(payment.success)}
        <h4 className="mt-3">
          <Link to="/home">Continue Shopping...</Link>
        </h4>
      </div>

      <div className="col-md-12" style={{ display: values.showDivs ? "" : "none" }}>
        <div className="row my-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h6>Shipping Address</h6>
              </div>
              {showSuccess()}
              {showError()}
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="cus-invalid-feedback">{addresses.length == 0 ? "No Addresses Found" : ""}</div>

                    {values.showing
                      ? null
                      : addresses.map((address) => {
                          return (
                            <div className="custom-form-check mx-2" key={address._id}>
                              <label className="form-check-label">
                                <ul
                                  style={{
                                    listStyleType: "none",
                                    padding: "0px",
                                  }}
                                >
                                  <li>{address.firstName + " " + address.lastName},</li>
                                  <li>{address.address1},</li>
                                  <li>{address.address2}</li>
                                  <li>{address.city + " " + address.postal},</li>
                                  <li>{address.country}.</li>
                                  <li>
                                    <a className="text-danger pr-2" onClick={() => handleDeleteAddress(address._id)}>
                                      Delete
                                    </a>
                                    <a className="text-success" onClick={() => handleEdit(address._id)}>
                                      Edit
                                    </a>
                                  </li>
                                </ul>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="shippingAddress"
                                  id={"radio" + address.id}
                                  value={address._id}
                                  onChange={onAddressChange}
                                  checked={values.shippingAddress._id && values.shippingAddress._id == address._id ? true : false}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          );
                        })}
                  </div>
                  <div className="cus-invalid-feedback">{values.errors.shippingAddress}</div>
                  {values.showing ? null : (
                    <div className="row">
                      <div className="my-2">
                        <button className="btn btn-sm btn-success" onClick={() => setValues({ ...values, showing: true })}>
                          Add New
                        </button>
                      </div>
                    </div>
                  )}
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
                          countries={countries}
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
                      <input className="form-check-input" type="checkbox" name="billingSame" id="billingSame" onChange={handleInputChange} />
                      <label className="form-check-label" htmlFor="addressCheck">
                        Billing address is the same as my Shipping address
                      </label>
                    </div>
                  </div>

                  <div>
                    {values.billingSame ? null : (
                      <BillingAddress handleInputChange={handleInputChange} errors={values.errors} validate={validate} countries={countries} />
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
                        Pay Now
                        <input type="radio" className="form-check-input" name="paymentMethod" value="paynow" onChange={handleInputChange} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="custom-form-check">
                      <label className="form-check-label">
                        Cash On Delivery
                        <input type="radio" className="form-check-input" name="paymentMethod" value="cod" onChange={handleInputChange} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="cus-invalid-feedback">{values.errors.paymentMethod}</div>
                  </div>
                  {showPayError(payment.error)}
                  {showDropIn()}
                  {showLoading()}
                  <hr className="mb-4" />
                  <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={submitCheckout} disabled={values.btnDissable}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <Cart
              cart={cart}
              error={values.errors.promocode}
              promocode={values.promocode}
              handleInputChange={handleInputChange}
              submitPromoCode={submitPromoCode}
              shipping={shippingCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
