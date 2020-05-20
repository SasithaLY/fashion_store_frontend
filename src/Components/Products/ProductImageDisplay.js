import React, {Component} from 'react';

const ProductImageDisplay = ({Product, xsize, ysize}) => {
    // console.log(Product)
return (
    <div className="card-img-top">

        <img src={`${process.env.REACT_APP_APIURL}/productsRouter/product/photo/${Product._id}`} className="rounded-top" style={{width: `${xsize}`, height: `${ysize}`}}  alt="ProductPhoto"/>
        {/*"http://localhost:8000/productsRouter/product/photo/5e99bfca40555909f89a8a19"*/}
    </div>
)


};

export default ProductImageDisplay
