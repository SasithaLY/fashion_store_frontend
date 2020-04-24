import React, {Component, useState} from 'react';
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import ProductImageDisplay from "./ProductImageDisplay";
import {addItem, updateItem} from "../../cart/cartHelper";
import {Link, Redirect} from "react-router-dom";


const ProductCard = ({Product, showAddToCartButton = true}) => {
    // console.log(Product)

    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(Product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart"/>;
        }
    };

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning mt-2 mb-2 mx-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    return (
        <div className="card m-2" style={{width: '18rem', height: '25rem'}}>
            <div className="card-img-top">
                <ProductImageDisplay Product={Product} xsize="17.9rem" ysize="13rem"/>
            </div>
            <div className="card-body">
                
                <h5 className="card-title">{Product.name}</h5>
                <p className="card-text overflow-hidden" style= {{height:"60px", lineHeight:"20px", overflow:"hidden"}}>{Product.description}</p>
                <a href={`/products/${Product._id}`} className="btn btn-danger text-white">Details</a>
                {showAddToCart(showAddToCartButton)}
                {/* <a href="#" className="btn btn-warning text-white ml-3">Add to Cart</a> */}
            </div>
        </div>
    )
};

export default ProductCard;