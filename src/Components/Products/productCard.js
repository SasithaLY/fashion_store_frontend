import React, {Component, useState} from 'react';
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import ProductImageDisplay from "./ProductImageDisplay";
import moment from "moment";
import {addItem, updateItem, removeItem} from "../../cart/cartHelper";
import {Link, Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {deleteProduct} from "../APIBridge/APIProduct";
import {isAuthenticated} from "../../auth/auth";
import {createWishlist} from "../../wishList/wishAPI";

let showAdminOptions = false;
const ProductCard = ({Product,showWishListButton = true,showsoldout= true, showAddToCartButton = true, showRemoveButton=false, setRun = f => f,run = undefined, cartUpdate = false, Admin}) => {
    // console.log(Product)
    const { user, token } = isAuthenticated();

    if (Admin) {
        showAdminOptions = Admin;
    }

    // console.log(showAdminOptions)

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(Product.count);

    const addToCart = () => {
        addItem(Product, () => {
            setRedirect(true);
        });
    };
    //const userId = isAuthenticated().user._id;
    

    const AddToWishList =() =>{
        let createWishData = {
            products: Product
        }
        createWishlist(user._id, token, createWishData);
            
    };
    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart"/>;
        }
    };

    const showAddToCart = (showAddToCartButton) => {
        if(Product.quantity !== 0){
            return (
            
                showAddToCartButton && (
                    <button
                        onClick={addToCart}
                        className="btn btn-outline-warning mt-1 mb-1 mx-1"
                    >
                       Add to Cart
                    </button>
                )
            );
                
        }
       
    };
    const showSoldOut = (showsoldout) =>{
       if(Product.quantity <= 0){
        return (
            
            showsoldout && (
               <label className="badge badge-danger mt-3 text-white p-2">Sold Out</label>
            )
        );
       }
            

        
    }
    const showWishList = (showWishListButton) => {
        return (
            showWishListButton && (
                <button onClick={AddToWishList} className="btn btn-outline-primary mt-1 mb-1 mx-1"><i class="fa fa-heart  icon-yellow"></i></button>
            )
        );
    };
    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            if(Product.quantity >= event.target.value){
                updateItem(productId, event.target.value);
            }else{
                setCount(event.target.value = Product.quantity);
                
            }
           
        }
    };
    const showRemoveButtonCart = showRemoveButton => {
        return (
            showRemoveButton && (
                <button
                    onClick={() => {removeItem(Product._id); setRun(!run);}}
                    className="btn btn-outline-danger mt-1 mb-1 mx-1"
                >
                   Remove Product
                </button>
            )
        );
    };
    const showCartUpdateOption = cartUpdate => {

        return cartUpdate && <div>
            <div className ="input-group mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Product Quantity:</span>
                </div>
                <input type ="number" className="form-control" value={count} onChange={handleChange(Product._id)}/>
            </div>
        </div>
    };

    const showUserSegment = () => {
        return ( showAdminOptions === false &&
            <div>
                <a href={`/products/${Product._id}`} className="btn btn-outline-success text-green">Details</a>
                
                    {showWishList(showWishListButton)}
               
                {showAddToCart(showAddToCartButton)}
                
                {/* <a href="#" className="btn btn-warning text-white ml-3">Add to Cart</a> */}
            </div>
        )
    };

    const showAdminSegment = () => {
        return ( showAdminOptions === true &&
            <div>
                <Link to={`/storeManager/updateProducts/${Product._id}`} className="btn btn-warning">Update</Link>
                <Button className="btn btn-danger ml-2" data-toggle="modal"
                        data-target="#exampleModal">Delete</Button>
            </div>
        )
    };

    const handleDelete = (ID) => {
        deleteProduct(ID, user._id, token).then(data => {
            console.log(data)
            alert('Successfully deleted!');
            window.location.reload();
        }).catch(reason => {
            alert(reason);
        })
    };

    return (
        <div className="card m-2" style={{width: '18rem', height: '32rem'}}>
            <div className="card-img-top">
                <span className="badge badge-danger position-absolute m-1"  hidden={!Product.oldPrice}>SALE</span>
                <ProductImageDisplay Product={Product} xsize="17.9rem" ysize="13rem"/>
            </div>
            <div className="card-body">

                <h5 className="card-title">{Product.name} <span>{showSoldOut(showsoldout)}</span></h5>
                <p className="card-text overflow-hidden opacity-70"
                   style={{height: "60px", lineHeight: "20px", overflow: "hidden"}}>{Product.description}</p>
                <div className="row ml-1">
                    <p className='text-warning'>USD {Product.price}</p>
                    <p className='text-secondary ml-2' hidden={!Product.oldPrice}><s>USD {Product.oldPrice}</s></p>
                </div>

                {showAdminSegment()}
                <div id="outerButton">
                    <div className= "innerButton">
                        {showUserSegment()}
                    </div>
                    <div className="innerButton">
                        {showRemoveButtonCart(showRemoveButton)}
                    </div>
                </div>
                {showCartUpdateOption(cartUpdate)}


            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">Alert!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className='text-black-50'>Are you sure want to delete {Product.name}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                    onClick={() => handleDelete(Product._id)}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ProductCard;