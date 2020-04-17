import React, {Component, useEffect} from 'react';
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import ProductCard from "../../Components/Products/productCard";
import {getProductsForHome} from "../../Components/APIBridge/APIProduct";

const {useState} = require("react");

const NewArrivals = () => {

    const [NewArrivalsOfProducts, setNewArrivalsOfProducts] = useState([]);
    const [error, setError] = useState(false);

    const getNewArrivals = () => {
        getProductsForHome('createdAt').then(data => {
            setNewArrivalsOfProducts(data);

        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        getNewArrivals();
    });

    return (
        <div>
            <div className="container-fluid" id="#section1">
                <h1 className="text-center">New Arrivals</h1>
            </div>
            <br/><br/>
            <div className="d-flex justify-content-around">
                <div className="row m-5">
                    {NewArrivalsOfProducts.map((product, i) => (
                        <div key={i} className="col mt-2">
                            <ProductCard Product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <br/><br/>

            <div className="d-flex justify-content-center">
                <button className='btn btn-outline-primary'>Load More</button>
            </div>

        </div>
    );

};

export default NewArrivals;