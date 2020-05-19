import React, { useEffect, useState, createRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import swal from "@sweetalert/with-react";
import {
  addCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  getSingleCountry,
  search
} from "./locationHelper";
import { isAuthenticated } from "../auth/auth";

const Locations = () => {
  const [values, setValues] = useState({ country: "", shipping: "" });
  const [locationId, setLocationId] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [btnDisable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, token } = isAuthenticated();

  useEffect(() => {
    loadCountries(user._id, token);
  }, []);

  const columns = [
    {
      name: "Country",
      selector: "country",
      sortable: true,
    },
    {
      name: "Shipping Price (USD)",
      selector: "shipping",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary btn-sm mx-2"
            onClick={() => handleSelect(row._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm mx-2"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        color: "#ffd700",
      },
    },
  };

  const loadCountries = (userId, token) => {
    setLoading(true);
    getCountries(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCountries(data);
        setLoading(false);
      }
    });
  };

  const handleSelect = (id) => {
    const selectCountry = countries.find((country) => country._id === id);
    setValues({
      id: selectCountry._id,
      country: selectCountry.country,
      shipping: selectCountry.shipping,
    });
    setEdit(true);
    handleShow();
    //setModalLoading(true);
  };

  const handleDelete = (id) => {
    //setSelectedOrder(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        deleteCountry(user._id, token, id).then((data) => {
          loadCountries(user._id, token);
          if (data.error) {
            swal(data.error, {
              icon: "error",
            });
          } else {
            swal(data.message, {
              icon: "success",
            });
          }
        });
      }
      
    });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if(values.searchCountry && values.searchCountry != ""){
      setLoading(true);
      search(user._id, token, {country:values.searchCountry} || undefined ).then(response => {
        setLoading(false);
        if(response.error){
          console.log(response.error);
        }else{
          setCountries(response);
        }
      })
    }else{
      loadCountries(user._id, token);
    }
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

  const submitLocation = (e) => {
    e.preventDefault();
    let countryData = { country: values.country, shipping: values.shipping };
    if (validate()) {
      setDisable(true);
      addCountry(user._id, token, countryData).then((data) => {
        setDisable(false);
        if (data.error) {
          swal(data.error, {
            icon: "error",
          });
        } else {
          loadCountries(user._id, token);
          setValues({ country: "", shipping: "" });
          handleClose();
          swal("Country Added Successfully!", {
            icon: "success",
          });
        }
      });
    }
  };

  const validate = () => {
    let number = /^[0-9.9]+$/;
    let letters = /^[a-zA-Z][a-zA-Z\s]*$/;
    let count = 0;
    let err = {};
    if ((values.country === "") || (!letters.test(values.country))) {
      count++;
      err.country = "Please Enter Country!";
    } else {
      err.country = "";
    }
    if ((values.shipping === "") || (!number.test(values.shipping))) {
      count++;
      err.shipping = "Please Enter Valid Amount!";
    } else {
      err.shipping = "";
    }

    console.log(errors);
    if (count > 0) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleUpdateLocation = (e) => {
    e.preventDefault();
    let countryData = { country: values.country, shipping: values.shipping };
    if (validate()) {
      setDisable(true);
      updateCountry(user._id, token, values.id, countryData).then((data) => {
        setDisable(false);
        if (data.error) {
          console.log(data.error);
          swal(data.error, {
            icon: "error",
          });
        } else {
          loadCountries(user._id, token);
          setValues({ country: "", shipping: "" });
          handleClose();
          swal("Country Updated Successfully!", {
            icon: "success",
          });
        }
      });
    }
  };

  const showInsert = () => {
    setEdit(false);
    handleShow();
  };

  const handleClose = () => {
    setModal(false);
    setValues({ country: "", shipping: "" });
  };
  const handleShow = () => setModal(true);

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

  const showModalLoading = () => {
    return (
      modalLoading && (
        <div className="container d-flex justify-content-center">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="container-fluid">
      <div className="my-2">
        <div className="card">
          <div className="card-header">
            <button
              className="btn btn-primary"
              onClick={() => {
                showInsert();
              }}
            >
              Add Country
            </button>
            <div className="float-right">
              <form className="form-inline " onSubmit={searchSubmit}>
                <div className="form-group mx-sm-3">
                  <input
                    type="text"
                    className="form-control-sm"
                    id="searchCountry"
                    placeholder="Country"
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm ">
                  Search
                </button>
              </form>
            </div>
          </div>
          {loading ? null : (
            <div className="card-body">
              <DataTable
                theme="dark"
                columns={columns}
                data={countries}
                noHeader
                pagination={true}
                customStyles={customStyles}
              />
            </div>
          )}
          {showLoading()}
        </div>
      </div>

      <Modal size="md" show={showModal} onHide={handleClose}>
        <form
          className="needs-validation"
          onSubmit={edit ? handleUpdateLocation : submitLocation}
        >
          <Modal.Header closeButton>
            <h4>{edit ? "Edit Country" : "Insert Country"}</h4>
          </Modal.Header>
          <Modal.Body>
            {showModalLoading()}
            {modalLoading ? null : (
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="country"
                    className="col-sm-4 col-form-label text-dark"
                  >
                    Country
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={
                        errors.country
                          ? "form-control cus-invalid"
                          : "form-control"
                      }
                      id="country"
                      placeholder="Country"
                      onChange={handleInputChange}
                      value={values.country}
                    />
                    <div className="cus-invalid-feedback">{errors.country}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="shipping"
                    className="col-sm-4 col-form-label text-dark"
                  >
                    Shipping Amount
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={
                        errors.shipping
                          ? "form-control cus-invalid"
                          : "form-control"
                      }
                      id="shipping"
                      placeholder="Amount"
                      onChange={handleInputChange}
                      value={values.shipping}
                    />
                    <div className="cus-invalid-feedback">{errors.shipping}</div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-success"
              disabled={btnDisable}
            >
              {edit ? "Edit" : "Add"}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Locations;
