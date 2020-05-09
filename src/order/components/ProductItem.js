import React from 'react';


const ProductItem = (d) => {
    return (
        <li className="list-group-item cus-border">
            <div className="row">
            <div className="col-3">
                <label>Name : </label> {d.data.name}
            </div>
            <div className="col-3">
                <label>Product ID : </label> {d.data._id}
            </div>
            <div className="col-3">
                <label>Price : </label> $ {d.data.price}
            </div>
            <div className="col-3">
                <label>Quantity : </label> {d.data.count}
            </div>
            </div>
        </li>
    )
}

export default ProductItem
