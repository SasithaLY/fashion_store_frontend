import React from "react";
import ImageSlider from "../components/ImageSlider";
import image from "../../shared/assets/images/slide1.jpg";

const home = () => {
  return (
    <div>
        <div style={{marginTop:'-15px'}}>
        <ImageSlider />
        </div>
      
      <hr />
      <div className="container-fluid">
        <h1 className="text-center">New Arrivals</h1>
      </div>
    </div>
  );
};

export default home;
