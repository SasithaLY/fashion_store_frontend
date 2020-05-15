import React from "react";
import ProductImageDisplay from "../../Components/Products/ProductImageDisplay";

const ProductItem = (d) => {
  return (
    <li className="list-group-item cus-border">
      <div className="row">
        <div className="col-1 mx-2">
          <ProductImageDisplay
            Product={d.data}
            xsize="auto"
            ysize="5rem"
          />
        </div>
        <div className="col-3">
          <label>Name : </label> {d.data.name}
        </div>
        <div className="col-3">
          <label>Product ID : </label> {d.data._id}
        </div>
        <div className="col-2">
          <label>Price : </label> $ {d.data.price}
        </div>
        <div className="col-2">
          <label>Quantity : </label> {d.data.count}
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
