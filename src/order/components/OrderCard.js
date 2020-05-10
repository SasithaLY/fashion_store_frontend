import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";

const OrderCard = (d) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <h4>
                <label>Order ID : </label> <span>{d.data.orderId}</span>
              </h4>
            </div>
            <div className="col-4">
              <h4>
                <label>Total Amount : </label> <span>{d.data.amount}</span>
              </h4>
            </div>
            <div className="col-4">
              <h4>
                <label>No of items : </label>{" "}
                <span>{d.data.products.length}</span>
              </h4>
            </div>
          </div>
          <div className="row" style={{ paddingTop: "20px" }}>
            <div className="col-4">
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
            <div className="col-4">
              <h6>
                <label>Shipping Address</label>
              </h6>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  {d.data.shippingAddress.firstName +
                    " " +
                    d.data.shippingAddress.lastName}
                </li>
                <li>{d.data.shippingAddress.address1}</li>
                <li>{d.data.shippingAddress.address2}</li>
                <li>{d.data.shippingAddress.city}</li>
                <li>{d.data.shippingAddress.state}</li>
                <li>{d.data.shippingAddress.postal}</li>
                <li>{d.data.shippingAddress.country}</li>
              </ul>
            </div>
            <div className="col-4">
              <h6>
                <label>Billing Address</label>
              </h6>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  {d.data.billingAddress.firstName +
                    " " +
                    d.data.billingAddress.lastName}
                </li>
                <li>{d.data.billingAddress.address1}</li>
                <li>{d.data.billingAddress.address2}</li>
                <li>{d.data.billingAddress.city}</li>
                <li>{d.data.billingAddress.state}</li>
                <li>{d.data.billingAddress.postal}</li>
                <li>{d.data.billingAddress.country}</li>
              </ul>
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
