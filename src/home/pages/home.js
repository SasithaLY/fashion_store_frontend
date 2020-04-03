import React from "react";
import ImageSlider from "../components/ImageSlider";
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import model2 from "../../shared/assets/tempImages/shop_model_2.png";
import model3 from "../../shared/assets/tempImages/shop_model_3.png";
import NewArrivals from "../components/NewArrivals";

const home = () => {
  return (
    <div>
        <div style={{marginTop:'-15px'}}>
        <ImageSlider />
        <NewArrivals />
        </div>
      
      <hr />

    </div>
  );
};


export default home;
