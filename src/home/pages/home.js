import React from "react";
import ImageSlider from "../components/ImageSlider";
import NewArrivals from "../components/NewArrivals";

const home = () => {
  return (
    <div>
        <div style={{marginTop:'-15px'}}>
        <ImageSlider />
        <hr />
        <NewArrivals />
        </div>
      
      <hr />

    </div>
  );
};


export default home;
