import React, { Component, useEffect, useState } from "react";
import ProductImagesSlider from "../ProductImageSlider/ProductImagesSlider";
import { addItem, updateItem } from "../../cart/cartHelper";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { showAddToCartButton } from "../../cart/cart";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../Components/APIBridge/APIProduct";
import ProductImageDisplay from "./ProductImageDisplay";
import { updateReviewOnProduct } from "../APIBridge/APIProduct";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const SingleIProductDetails = ({ product, showCartAddButton = true, cartUpdate = false }) => {
  const [subject, setSubject] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  let [overallRating, setOverallRating] = useState(0);

  // const { subject,  review,  error, formData } = values;

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(1);
  const [singleProductDetails, setSingleProductDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentReviews, setCurrentReviews] = useState([]);
  const [buyOptions, setOptions] = useState(true);

  const params = useParams();

  const getSingleProductDetails = () => {
    let total = 0;
    let dataLength = 0;
    let ratingarray = [];
    getSingleProduct(params.id)
      .then((data) => {
        data.count = 1;
        setSingleProductDetails(data);
        setCurrentReviews(data.review);
        ratingarray = data.review;
        dataLength = data.review.length;
        ratingarray.map((value) => {
          total = total + value.rating;
        });

        setOverallRating(total / dataLength);
        if (data.quantity == 0) {
          setOptions(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleProductDetails();
  }, []);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={"../Products"} className="mr-2">
          <button className="btn btn-outline-blue mt-2 mb-2">View Product</button>
        </Link>
      )
    );
  };

  const showAddToCartButton = (showCartAddButton) => {
    return (
      showCartAddButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 mx-2">
          Add to Cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    if (event.target.value >= 1) {
      if (singleProductDetails.quantity >= event.target.value) {
        setSingleProductDetails({ ...singleProductDetails, count: event.target.value });
      } else {
        setSingleProductDetails({ ...singleProductDetails, count: singleProductDetails.quantity });
      }
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="col-md-3">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
            </div>
            <input type="number" className="form-control" value={singleProductDetails.count || 1} onChange={handleChange()} />
          </div>
        </div>
      )
    );
  };

  const addToCart = () => {
    addItem(singleProductDetails, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    console.log(subject, review);
    const data = {
      rating: rating,
      subject: subject,
      review: review,
    };

    updateReviewOnProduct(params.id, data).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess("Got the Review!");
        setSubject("");
        setReview("");
        setRating(0);
      }
    });
  };

  const handleChangeOfDetails = (name) => (event) => {
    const value = event.target.value;
    console.log(value);
    // name === 'subject' ? setSubject(value) : setReview(value)
    if (name === "subject") {
      setSubject(value);
    } else if (name === "review") {
      setReview(value);
    } else if (name === "rating") {
      setRating(value);
    }
  };

  const displayError = () => (
    <div className="alert border-danger alert-danger m-2" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const displaySuccess = () => (
    <div className="alert border-success alert-success m-2" style={{ display: success ? "" : "none" }}>
      {success}
    </div>
  );

  const showSoldOut = (showsoldout) => {
    if (singleProductDetails.quantity <= 0) {
      return showsoldout && <label className="badge badge-danger mt-3 text-white p-2">Sold Out</label>;
    }
  };

  return (
    <div className="">
      <div className="pr-5 pl-5 pt-2 pb-5" style={{ backgroundColor: "#515251" }}>
        <h1 className="my-4 text-capitalize">{singleProductDetails.name}</h1>
        <br />
        {/*<div className="container">*/}
        {/*    <span id="rateMe1"></span>*/}
        {/*</div>*/}

        {/*<script src="js/addons/rating.js"></script>*/}
        {shouldRedirect(redirect)}

        <div className="row">
          <div className="card p-1 col-md-6 ">
            <ProductImageDisplay Product={singleProductDetails} xsize="100%" ysize="auto" />
          </div>

          <div className="col-md-5 ml-5">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating</Typography>
              <Rating name="read-only" value={overallRating} readOnly />
            </Box>

            <h3 className="my-3 text-warning">Price USD {singleProductDetails.price}</h3>

            <h3 className="my-0 text-warning">Description</h3>
            <p>{singleProductDetails.description}</p>
            <div>
              <span>{showSoldOut(true)}</span>
            </div>

            <div className="p-1 align-content-between">
              {buyOptions ? (
                <div>
                  {showCartUpdateOptions(buyOptions)}
                  {showAddToCartButton(buyOptions)}
                  <Link
                    to={{
                      pathname: "/checkout",
                      product: singleProductDetails,
                    }}
                  >
                    <button className="btn btn-danger mr-2">Buy Now</button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark mt-4 p-3">
        <h4 className="text-warning mb-3">Product's Reviews and Ratings</h4>
        {currentReviews &&
          currentReviews.map((value, i) => (
            <div className="container-fluid rounded m2 p-3 mt-2" style={{ backgroundColor: "#515251" }} key={i}>
              <Box component="fieldset" mb={1} borderColor="transparent">
                <Rating name="read-only" value={value.rating} readOnly />
              </Box>
              <b>
                <h6 className="text-warning">{value.subject}</h6>
              </b>
              <p
                className="card-text overflow-hidden"
                style={{
                  height: "40px",
                  lineHeight: "20px",
                  overflow: "hidden",
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
      </div>
      <p className="d-flex justify-content-center mt-4">
        <a
          className="badge badge-warning"
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Add a Review
        </a>
      </p>

      <div className="container-fluid bg-dark mt-4 p-3 collapse" id="collapseExample">
        {displayError()}
        {displaySuccess()}
        <h4 className="text-warning mb-3">Add a Review</h4>
        <div className="container-fluid rounded m2 p-3 mt-2" style={{ backgroundColor: "#515251" }}>
          <form onSubmit={handleSubmitReview}>
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Typography component="legend">Rating</Typography>
              <Rating name="simple-controlled" value={rating} onChange={handleChangeOfDetails("rating")} />
            </Box>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="subject"
                onChange={handleChangeOfDetails("subject")}
                value={subject}
                placeholder="Subject..."
                required
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="review"
                onChange={handleChangeOfDetails("review")}
                value={review}
                placeholder="Add your Review Here..."
                style={{ height: "80px" }}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleIProductDetails;
