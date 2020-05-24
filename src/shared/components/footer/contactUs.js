import React from "react";

const contactUsCard = () => {

    return (
        <div className="card text-center">
            <div className="card-header">
                <h2>Contact Us</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title">{process.env.REACT_APP_COMPANY} </h5>
                <p className="card-text">codeignitors@gmail.com</p>
                <p className="card-text">0715659749</p>
            </div>
            <div className="card-footer text-muted">
                {process.env.REACT_APP_COMPANY}
            </div>
        </div>
    )
}

const contactUs = () => {

    return (

        <div>
            {contactUsCard()}
        </div>
    );
}

export default contactUs;
