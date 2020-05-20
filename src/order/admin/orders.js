import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth/auth";
import { getOrders, getStatus, updateStatus, ordersList } from "./orderHelper";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import OrderCard from "../components/OrderCard";
import Modal from "react-bootstrap/Modal";

import "./orders.css";

const Orders = () => {
  const [values, setValues] = useState({});
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [status, setStatus] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setModal] = useState(false);
  const { user, token } = isAuthenticated();

  const retrieveOrders = () => {
    setLoading(true);
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
    getStatusValues();
  }, []);

  const getStatusValues = () => {
    getStatus(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
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
      name: "Customer",
      selector: "cusName",
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      center: true,
    },
    {
      name: "Amount (USD)",
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
      name: "Payment Method",
      selector: "paymentMethod",
      sortable: true,
      center: true,
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
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleSelect(row.orderId)}
        >
          Set Status
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
        amount: order.amount.toFixed(2),
        orderedOn: moment(order.createdAt).format("YYYY-MM-DD"),
        shipTo:
          order.shippingAddress.city + ", " + order.shippingAddress.country,
        paymentMethod: order.paymentMethod,
        status: order.status,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        products: order.products,
        promocode:order.promocode,
        shipping:order.shipping
      };

      orderArr.push(obj);
    });

    setOrders(orderArr);
    setLoading(false);
  };

  const handleSelect = (id) => {
    setSelectedOrder(id);
    handleShow();
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();

    if (selectedOrder != "") {
      updateStatus(user._id, token, selectedOrder, status).then((data) => {
        if (data.error) {
          console.log("Failed to update status.");
        } else {
          handleClose();
          retrieveOrders();
        }
      });
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

  const handleInputChange = (event) => {
    const target = event.target;

    const name = target.id;
    const value = target.value;

    setValues({
      ...values,
      [name]: value,
    });

  };

  const searchSubmit = (e) =>{
    e.preventDefault()
    searchOrders();
  }

  const searchOrders = () => {
    if(Object.keys(values).length !== 0){
      setLoading(true);
      ordersList(user._id, token, values || undefined ).then(response => {
        setLoading(false);
        if(response.error){
          console.log(response.error);
        }else{
          ordersArray(response);
        }
      })
    }else{
      retrieveOrders();
    }
  }

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  return (
    <div className="container-fluid">
      <h2 className="text-center">
        <label>Orders</label>
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
                      <input placeholder="Order ID" type="text" className="form-control-sm" id="orderId" onChange={handleInputChange} />
                    </div>
                  
                  
                    <div className="form-group m-sm-3">
                      <label htmlFor="product" className="control-label mx-2">
                        Product
                      </label>
                      <input placeholder="Product" type="text" className="form-control-sm" id="product" onChange={handleInputChange} />
                    </div>
                  
                  
                    <div className="form-group m-sm-3">
                      <label htmlFor="from" className="control-label mx-2">
                        From Date
                      </label>
                      <input type="date" className="form-control-sm" id="from" onChange={handleInputChange} />
                    </div>
                  
                  
                    <div className="form-group m-sm-3">
                      <label htmlFor="to" className="control-label mx-2">
                        To Date
                      </label>
                      <input type="date" className="form-control-sm" id="to" onChange={handleInputChange} />
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
              />
            </div>
          )}
          {showLoading()}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <form className="needs-validation" onSubmit={handleUpdateStatus}>
          <Modal.Header closeButton>
            <h4>Change Status</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="status">
                  Status
                </label>
              </div>
              <select className="custom-select" id="status" onChange={handleStatusChange} required>
                <option value="">Choose...</option>
                {statusValues.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;
