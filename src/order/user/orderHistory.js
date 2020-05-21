import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth/auth";
import { getOrdersHistory, searchOrderHistory } from "../admin/orderHelper";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import ProductItem from "../components/ProductItem";

import "../admin/orders.css";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [values, setValues] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    retrieveOrders();
  }, []);

  const retrieveOrders = () => {
    getOrdersHistory(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        ordersArray(data);
      }
    });
  };

  const ordersArray = (orders) => {
    let orderArr = [];

    orders.map((order, orderIndex) => {
      let obj = {
        orderId: order._id,
        transactionId: order.transactionId,
        cusName: order.user.fName + " " + order.user.lName,
        email: order.user.email,
        amount: "$ " + order.amount.toFixed(2),
        orderedOn: moment(order.createdAt).format("YYYY-MM-DD"),
        shipTo:
          order.shippingAddress.city + ", " + order.shippingAddress.country,
        paymentMethod: order.paymentMethod,
        status: order.status,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        products: order.products,
        expanded: false,
        promocode:order.promocode,
        shipping:order.shipping
      };

      orderArr.push(obj);
    });

    setOrders(orderArr);
    setLoading(false);
  };

  const handleInputChange = (event) => {
    const target = event.target;

    const name = target.id;
    const value = target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchOrders();
  };

  const searchOrders = () => {
    if (Object.keys(values).length !== 0) {
      setLoading(true);
      searchOrderHistory(user._id, token, values || undefined).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            ordersArray(response);
          }
        }
      );
    } else {
      retrieveOrders();
    }
  };

  const getTotal = (products) => {
    return products.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const columns = [
    {
      name: "Order ID",
      selector: "orderId",
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: "transactionId",
      sortable: true,
      right: true,
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
      right: true,
    },
    {
      name: "Ordered On",
      selector: "orderedOn",
      sortable: true,
      right: true,
    },
    {
      name: "Payement Method",
      selector: "paymentMethod",
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      right: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Not processed",
          style: {
            color: "white",
          },
        },
        {
          when: (row) => row.status == "Processing",
          style: {
            color: "gold",
          },
        },
        {
          when: (row) => row.status == "Shipped",
          style: {
            color: "skyblue",
          },
        },
        {
          when: (row) => row.status == "Delivered",
          style: {
            color: "lightgreen",
          },
        },
        {
          when: (row) => row.status == "Cancelled",
          style: {
            color: "red",
          },
        },
      ],
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        color: "#ffd700",
      },
    },
  };

  const OrderCard = (d) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="col-12">
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
    <div>
      <div className="container-fluid px-5">
        <Link to="/user/profile">
        <a className="badge badge-warning mt-3 text-dark p-2">Back To Profile</a>
        </Link>
        <h2 className="text-center">
          <label>Your Orders</label>
        </h2>
        <div>
          <div className="card">
            <div className="card-header">
              <form className="form-inline" onSubmit={searchSubmit}>
              <div className="row">
                <div className="form-group m-sm-3">
                  <label htmlFor="orderId" className="control-label mx-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    className="form-control-sm"
                    id="orderId"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group m-sm-3">
                  <label htmlFor="product" className="control-label mx-2">
                    Product
                  </label>
                  <input
                    type="text"
                    className="form-control-sm"
                    id="product"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group m-sm-3">
                  <label htmlFor="from" className="control-label mx-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    className="form-control-sm"
                    id="from"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group m-sm-3">
                  <label htmlFor="to" className="control-label mx-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="form-control-sm"
                    id="to"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group m-sm-3 px-2">
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
                </div>
                </div>
              </form>
            </div>
            {loading ? null : (
              <div className="card-body">
                <DataTable
                  theme="dark"
                  columns={columns}
                  data={orders}
                  noHeader
                  pagination={true}
                  customStyles={customStyles}
                  expandableRows
                  expandableRowsComponent={<OrderCard />}
                  expandableRowExpanded={(row) => row.expanded}
                />
              </div>
            )}
            {showLoading()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
