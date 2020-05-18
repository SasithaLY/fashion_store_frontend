import React, { useEffect, useState, createRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import swal from "@sweetalert/with-react";
import {
  addPromoCode,
  getPromoCodes,
  updatePromoCode,
  deletePromoCode,
  getSinglePromoCode,
  search
} from "./promoHelper";
import { isAuthenticated } from "../auth/auth";

const Promo = () => {
  const [values, setValues] = useState({ promocode: "", discount: "" });
  const [promoId, setPomoId] = useState("");
  const [promocodes, setPromocodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [btnDisable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, token } = isAuthenticated();

  useEffect(() => {
    loadPromocodes(user._id, token);
  }, []);

  const columns = [
    {
      name: "Promocode",
      selector: "promocode",
      sortable: true,
    },
    {
      name: "Discount Percentage",
      selector: "discount",
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

  const loadPromocodes = (userId, token) => {
    setLoading(true);
    getPromoCodes(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPromocodes(data);
        setLoading(false);
      }
    });
  };

  const handleSelect = (id) => {
    const selectPromo = promocodes.find((promo) => promo._id === id);
    setValues({
      id: selectPromo._id,
      promocode: selectPromo.promocode,
      discount: selectPromo.discount,
    });
    setEdit(true);
    handleShow();
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        deletePromoCode(user._id, token, id).then((data) => {
          loadPromocodes(user._id, token);
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
    if(values.searchPromocode && values.searchPromocode != ""){
      setLoading(true);
      search(user._id, token, {promocode:values.searchPromocode} || undefined ).then(response => {
        setLoading(false);
        if(response.error){
          console.log(response.error);
        }else{
          setPromocodes(response);
        }
      })
    }else{
      loadPromocodes(user._id, token);
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

  const submitPromocode = (e) => {
    e.preventDefault();
    let promoData = { promocode: values.promocode, discount: values.discount };
    if (validate()) {
      setDisable(true);
      addPromoCode(user._id, token, promoData).then((data) => {
        setDisable(false);
        if (data.error) {
          swal(data.error, {
            icon: "error",
          });
        } else {
          loadPromocodes(user._id, token);
          setValues({ promocode: "", discount: "" });
          handleClose();
          swal("PromoCode Added Successfully!", {
            icon: "success",
          });
        }
      });
    }
  };

  const validate = () => {
    let number = /^[0-9.9]+$/;
    //let letters = /^[a-zA-Z][a-zA-Z\s]*$/;
    let count = 0;
    let err = {};
    if ((values.promocode === "")) {
      count++;
      err.promocode = "Please Enter Code!";
    } else {
      err.promocode = "";
    }
    if ((values.discount === "") || (!number.test(values.discount))) {
      count++;
      err.discount = "Please Enter Valid Discount!";
    } else {
      err.discount = "";
    }

    if (count > 0) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleUpdatePromocode = (e) => {
    e.preventDefault();
    let promoData = { promocode: values.promocode, discount: values.discount };
    if (validate()) {
      setDisable(true);
      updatePromoCode(user._id, token, values.id, promoData).then((data) => {
        setDisable(false);
        if (data.error) {
          console.log(data.error);
          swal(data.error, {
            icon: "error",
          });
        } else {
          loadPromocodes(user._id, token);
          setValues({ promocode: "", discount: "" });
          handleClose();
          swal("Promocode Updated Successfully!", {
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
    setValues({ promocode: "", discount: "" });
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
                    id="searchPromocode"
                    placeholder="Code"
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
                data={promocodes}
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
          onSubmit={edit ? handleUpdatePromocode : submitPromocode}
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
                    htmlFor="promocode"
                    className="col-sm-4 col-form-label text-dark"
                  >
                    Country
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={
                        errors.promocode
                          ? "form-control cus-invalid"
                          : "form-control"
                      }
                      id="promocode"
                      placeholder="Promocode"
                      onChange={handleInputChange}
                      value={values.promocode}
                    />
                    <div className="cus-invalid-feedback">{errors.promocode}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="discount"
                    className="col-sm-4 col-form-label text-dark"
                  >
                    Shipping Amount
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className={
                        errors.discount
                          ? "form-control cus-invalid"
                          : "form-control"
                      }
                      id="discount"
                      placeholder="Discount"
                      onChange={handleInputChange}
                      value={values.discount}
                    />
                    <div className="cus-invalid-feedback">{errors.discount}</div>
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

export default Promo;
