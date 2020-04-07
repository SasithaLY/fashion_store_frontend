import React, {Component} from "react";
import "../../home/components/ImageSlider.css"

import slide1 from "../../shared/assets/tempImages/shop_model_1.png";
import slide2 from "../../shared/assets/tempImages/shop_model_2.png";
import slide3 from "../../shared/assets/tempImages/shop_model_3.png";

class ImageSlider extends Component {



    render() {

        return (
            <div>
                <div
                    id="carousel-example-1z"
                    className="carousel slide carousel-fade cus-slider"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li
                            data-target="#carousel-example-1z"
                            data-slide-to="0"
                            className="active"
                        ></li>
                        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <div className="view h-100">
                                <img
                                    className="d-block h-100 w-lg-100"
                                    src={slide1}
                                    alt="First slide"
                                />
                            </div>
                        </div>

                        <div className="carousel-item h-100">
                            <div className="view h-100">
                                <img
                                    className="d-block h-100 w-lg-100"
                                    src={slide2}
                                    alt="Second slide"
                                />

                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="view h-100">
                                <img
                                    className="d-block h-100 w-lg-100"
                                    src={slide3}
                                    alt="Third slide"
                                />

                            </div>
                        </div>
                    </div>

                    <a
                        className="carousel-control-prev"
                        href="#carousel-example-1z"
                        role="button"
                        data-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carousel-example-1z"
                        role="button"
                        data-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }

}

export default ImageSlider;
