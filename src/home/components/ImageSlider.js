import React from "react";
import "./ImageSlider.css";

import slide1 from "../../shared/assets/images/slide1.jpg";
import slide2 from "../../shared/assets/images/slide2.jpg";
import slide3 from "../../shared/assets/images/slide3.jpg";

const ImageSlider = () => {
  return (
    <div>
      <div
        id="carousel-example-1z"
        class="carousel slide carousel-fade cus-slider"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carousel-example-1z"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carousel-example-1z" data-slide-to="1"></li>
          <li data-target="#carousel-example-1z" data-slide-to="2"></li>
        </ol>

        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <div class="view h-100">
              <img
                class="d-block h-100 w-lg-100"
                src={slide1}
                alt="First slide"
              />
            </div>
          </div>

          <div class="carousel-item h-100">
            <div class="view h-100">
              <img
                class="d-block h-100 w-lg-100"
                src={slide2}
                alt="Second slide"
              />
              
            </div>
          </div>

          <div class="carousel-item">
            <div class="view h-100">
              <img
                class="d-block h-100 w-lg-100"
                src={slide3}
                alt="Third slide"
              />
              
            </div>
          </div>
        </div>

        <a
          class="carousel-control-prev"
          href="#carousel-example-1z"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carousel-example-1z"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default ImageSlider;
