import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth/auth";
import { getOrders } from "./orderHelper";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import OrderCard from '../components/OrderCard';

import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});

  const { user, token } = isAuthenticated();

  const retrieveOrders = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        ordersArray(data);
      }
    });
  };

  useEffect(() => {
    retrieveOrders();
  }, []);

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
      name: "Customer",
      selector: "cusName",
      sortable: true,
      right: true,
    },
    {
      name: "Email",
      selector: "email",
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
      name: "Ship To",
      selector: "shipTo",
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
            color: "lightblue",
          },
        },
        {
          when: (row) => row.status == "Delivered",
          style: {
            color: "green",
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
    {
      cell: () => (
        <button
          className="btn btn-primary btn-sm"
          onClick={handleViewButton("transactionId")}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        color: "#ffd700",
      },
    },
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
        orderedOn:
          moment(order.createdAt).year() +
          "-" +
          (moment(order.createdAt).month() + 1) +
          "-" +
          moment(order.createdAt).date(),
        shipTo:
          order.shippingAddress.city + ", " + order.shippingAddress.country,
        paymentMethod: order.paymentMethod,
        status: order.status,
        shippingAddress:order.shippingAddress,
        billingAddress:order.billingAddress,
        products:order.products
      };

      orderArr.push(obj);
    });

    setOrders(orderArr);
  };

  const handleViewButton = (id) => {};

  const showNoOrders = (orders) => {
    return orders.length < 1 ? (
      <span className="text-danger">No Orders</span>
    ) : null;
  };

  const Card = (d) => (
    <div className="card">
      <div className="card-body">
        <h4>{d.data.orderId}</h4>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div>
        <div className="card">
          <div className="card-header">
            <h4>Orders</h4>
          </div>
          <div className="card-body">
            {showNoOrders(orders)}
            <DataTable
              theme="dark"
              columns={columns}
              data={orders}
              pagination={true}
              customStyles={customStyles}
              expandableRows
              expandableRowsComponent={<OrderCard />}
            />
           
          </div>
        </div>
      </div>

      <div
        className="modal fade bd-example-modal-lg"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
