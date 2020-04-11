import React, {Component, useState} from 'react';
import ProductImagesSlider from "../ProductImageSlider/ProductImagesSlider";
import {addItem,updateItem} from '../../cart/cartHelper'
import {Link, Redirect} from "react-router-dom";
import moment from "moment";
import{showAddToCartButton} from '../../cart/cart';


const cart = ({product,showAddToCartButton = true, cartUpdate = false}) =>{
    
    const[redirect, setRedirect] = useState(false);
    const[count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton =>{
        return(
            showViewProductButton &&(
                    <Link to={'../Products'} className="mr-2">
                        <button className="btn btn-outline-blue mt-2 mb-2">
                            View Product
                        </button>
                    </Link>
            )
        );
    };

    const showAddToCartButton =(showAddToCartButton) =>{
        return(
            showAddToCartButton &&(
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
        )
        );
    };

    const showStock = quantity =>{
        return quantity > 0 ?(
            <span className="badge badge-primary badge-pill">In stock</span>
        ):(
            <span className="badge badge-danger badge-pill">Out of stock</span>
        )

    };
    const handleChange = productId => event =>{
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            UpdateItem(productId,event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate =>{
        return cartUpdate && (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange()}/>
            </div>
        </div>
        )
    }


const addToCart = () =>{
    addItem(product, ()=>{
        setRedirect(true)
    })
}

const shouldRedirect = redirect =>{
    if(redirect){
        return <Redirect to="../../cart/cart.js"/>
    }
}

}
    //     return(
    //         <div className="col-4 mb-3">
    //             <div className="card">
    //                 <div className="card-header">{product.name}</div>
    //                 <div className="card-body">
    //                     <p>{product.description}</p>
    //                     <p>${product.price}</p>
    //                     <Link to="/">
    //                         <button className="btn btn-outline-default mt-2 mb-2">
                                
    //                         </button>
    //                     </Link>
    //                 </div>
    //             </div>
    
    //         </div>
    //     )

class SingleIProductDetails extends Component {

    constructor(props) {
        super(props);
        console.log('aaa', props);
    }

    render() {
        return (
            <div className="">
                <div className="pr-5 pl-5 pt-2 pb-5" style={{backgroundColor: "#515251"}}>
                    <h1 className="my-4">Summer Sale Item
                    </h1><br/>
                    {/*<div className="container">*/}
                    {/*    <span id="rateMe1"></span>*/}
                    {/*</div>*/}

                    {/*<script src="js/addons/rating.js"></script>*/}
                    {shouldRedirect(redirect)}

                    <div className="row">
                        <div className="card p-1 col-md-6 " >
                            <ProductImagesSlider/>
                        </div>
                        <div className="col-md-5 ml-5">
                            <h3 className="my-0 text-warning">Description</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio,
                                gravida
                                pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec
                                metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
                            <h3 className="my-3 text-warning">Item Details</h3>
                            <ul>
                                <li>Lorem Ipsum</li>
                                <li>Dolor Sit Amet</li>
                                <li>Consectetur</li>
                                <li>Adipiscing Elit</li>
                            </ul>
                            <div className="p-1 align-content-between">
                                {showAddToCart(showAddToCartButton)}
                                {showCartUpdateOptions(cartUpdate)}
                                <button className="btn btn-danger mr-2">Buy Now</button>
                                <button on click= {addToCart} className="btn btn-warning">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleIProductDetails;