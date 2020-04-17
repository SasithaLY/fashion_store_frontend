import React, {Component} from 'react';
import model1 from "../../shared/assets/tempImages/shop_model_1.png";

const ProductCard = ({Product}) => {

    return (
        <div className="card" style={{width: '18rem'}} >
            <img className="card-img-top" src={model1} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{Product.name}</h5>
                <p className="card-text">{Product.description}</p>
                <a href="#" className="btn btn-danger text-white">Buy</a>
                <a href="#" className="btn btn-warning text-white ml-3">Add to Cart</a>
            </div>
        </div>
    )
};

export default ProductCard;