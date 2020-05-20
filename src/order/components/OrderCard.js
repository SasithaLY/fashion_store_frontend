import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";

const OrderCard = (d) => {
  const getTotal = (products) => {
    return products.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <h6>
                <label>Order ID : </label> <span>{d.data.orderId}</span>
              </h6>
            </div>
            <div className="col-3">
              <h6>
                <label>Total Amount (USD) : </label> <span>{d.data.amount}</span>
              </h6>
            </div>
            <div className="col-2">
              <h6>
                <label>No of items : </label>{" "}
                <span>{d.data.products.length}</span>
              </h6>
            </div>
            <div className="col-3">
              <h6>
                <label>Promo : </label>{" "}
                <span>
                  {d.data.promocode.code}
                </span>
              </h6>
            </div>
          </div>
          <div className="row" style={{ paddingTop: "20px" }}>
            <div className="col-3">
              <ul>
                <li>
                  <label>Transaction ID : </label>{" "}
                  <span>{d.data.transactionId}</span>
                </li>
                <li>
                  <label>Payment Method : </label>{" "}
                  <span>{d.data.paymentMethod}</span>
                </li>
                <li>
                  <label>Purchase Date : </label>{" "}
                  <span>{d.data.orderedOn}</span>
                </li>
                <li>
                  <label>Customer : </label> <span>{d.data.cusName}</span>
                </li>
                <li>
                  <label>Email : </label> <span>{d.data.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h6>
                <label>Shipping Address</label>
              </h6>
              <ul
                style={{
                  listStyleType: "none",
                  padding: "0px",
                }}
              >
                <li>
                  {d.data.shippingAddress.firstName +
                    " " +
                    d.data.shippingAddress.lastName}
                </li>
                <li>{d.data.shippingAddress.address1}</li>
                <li>{d.data.shippingAddress.address2}</li>
                <li>
                  {d.data.shippingAddress.city +
                    " " +
                    d.data.shippingAddress.postal}
                </li>
                <li>{d.data.shippingAddress.state}</li>
                <li>{d.data.shippingAddress.country}</li>
              </ul>
            </div>
            <div className="col-3">
              <h6>
                <label>Billing Address</label>
              </h6>
              <ul
                style={{
                  listStyleType: "none",
                  padding: "0px",
                }}
              >
                <li>
                  {d.data.billingAddress.firstName +
                    " " +
                    d.data.billingAddress.lastName}
                </li>
                <li>{d.data.billingAddress.address1}</li>
                <li>{d.data.billingAddress.address2}</li>
                <li>
                  {d.data.billingAddress.city +
                    " " +
                    d.data.billingAddress.postal}
                </li>
                <li>{d.data.billingAddress.state}</li>
                <li>{d.data.billingAddress.country}</li>
              </ul>
            </div>
            <div className="col-3 px-5">
              <center>
                <h6>
                  <label>Order Summery</label>
                </h6>
                <ul style={{ listStyleType: "none" }}>
                  <li className="d-flex justify-content-between">
                    <label>Sub Total (USD) :</label>{" "}
                    {getTotal(d.data.products).toFixed(2)}
                  </li>
                  <li className="d-flex justify-content-between">
                    <label>Shipping (USD) :</label>{" "}
                    {d.data.shipping.shipping.toFixed(2)}
                  </li>
                  <li className="d-flex justify-content-between">
                    <label>Discount (USD) :</label> -{" "}
                    {(
                      (getTotal(d.data.products) * d.data.promocode.discount) /
                      100
                    ).toFixed(2)}
                  </li>
                  <li className="d-flex justify-content-between">
                    <label>Total (USD) :</label>{" "}
                    {(
                      getTotal(d.data.products) +
                      d.data.shipping.shipping -
                      (getTotal(d.data.products) * d.data.promocode.discount) /
                        100
                    ).toFixed(2)}
                  </li>
                </ul>
              </center>
            </div>
          </div>
          <div>
            <h4>
              <label>Items</label>
            </h4>

            <ul className="list-group ">
              {d.data.products.map((item) => {
                return <ProductItem key={item._id} data={item} />;
              })}
            </ul>
          </div>
        </div>
        <div className="col-12"></div>
      </div>
    </div>
  );
};

export default OrderCard;
