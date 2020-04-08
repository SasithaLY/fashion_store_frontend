import React, { Component } from 'react'
import moment from "moment";
import {addItem} from './cartHelper'
import { Link } from 'react-router-dom';

const cart = ({product}) =>{
    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="btn btn-outline-default mt-2 mb-2">
                            
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
export default class cart extends Component {
    render() {
        return (
            <div>
               <h1>cart page thadiya</h1> 
            </div>
        )
    }
}
