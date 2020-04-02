import React from "react";
import ImageSlider from "../components/ImageSlider";
import model1 from "../../shared/assets/tempImages/shop_model_1.png";
import model2 from "../../shared/assets/tempImages/shop_model_2.png";
import model3 from "../../shared/assets/tempImages/shop_model_3.png";

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
<br /><br />
        <div className="d-flex justify-content-around">
            <div className="row">
                <div className="card m-2" style={{width: '18rem'}}>
                    <img className="card-img-top" src={model1} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="btn btn-warning text-white">Buy</a>
                        </div>
                </div>
                <div className="card m-2" style={{width: '18rem'}}>
                    <img className="card-img-top" src={model2} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the
                            bulk of the card's content.</p>
                        <a href="#" className="btn btn-warning text-white">Buy</a>
                    </div>
                </div>
                <div className="card m-2" style={{width: '18rem'}}>
                    <img className="card-img-top" src={model3} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the
                            bulk of the card's content.</p>
                        <a href="#" className="btn btn-warning text-white">Buy</a>
                    </div>
                </div>
                <div className="card m-2" style={{width: '18rem'}}>
                <img className="card-img-top" src={model1} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the
                        bulk of the card's content.</p>
                    <a href="#" className="btn btn-warning text-white">Buy</a>
                </div>
            </div>
            </div>
        </div>
        <br /><br />

        <div className="d-flex justify-content-center">
            <button className='btn btn-outline-primary'>Load More </button>
        </div>

    </div>
  );
};

export default home;
