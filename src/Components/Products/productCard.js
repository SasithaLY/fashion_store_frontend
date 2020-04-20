import React, {Component} from 'react';
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import ProductImageDisplay from "./ProductImageDisplay";

const ProductCard = ({Product}) => {
    // console.log(Product)

    return (
        <div className="card m-2" style={{width: '18rem', height: '25rem'}}>
            <div className="card-img-top">
                <ProductImageDisplay Product={Product} xsize="17.9rem" ysize="13rem"/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{Product.name}</h5>
                <p className="card-text overflow-hidden" style= {{height:"60px", lineHeight:"20px", overflow:"hidden"}}>{Product.description}</p>
                <a href={`/products/${Product._id}`} className="btn btn-danger text-white">Details</a>
                <a href="#" className="btn btn-warning text-white ml-3">Add to Cart</a>
            </div>
        </div>
    )
};

export default ProductCard;