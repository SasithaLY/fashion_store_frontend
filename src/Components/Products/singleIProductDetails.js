import React, {Component} from 'react';
import ProductImagesSlider from "../ProductImageSlider/ProductImagesSlider";

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
                                <button className="btn btn-danger mr-2">Buy Now</button>
                                <button className="btn btn-warning">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleIProductDetails;