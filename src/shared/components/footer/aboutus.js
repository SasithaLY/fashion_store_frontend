import React from "react";

const aboutUsCard = () => {

    return (
        <div className="card text-center">
            <div className="card-header">
                <h2>About Us</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title">{process.env.REACT_APP_COMPANY} </h5>
                <p className="card-text">We are a software company that works beyond your imagination.</p>
                <p className="card-text">{process.env.REACT_APP_EMAIL}</p>
                <p className="card-text">{process.env.REACT_APP_PHONE}</p>
            </div>
            <div className="card-footer text-muted">
                {process.env.REACT_APP_COMPANY}
            </div>
        </div>
    )
}

const aboutUs = () => {

    return (

        <div>
            {aboutUsCard()}
        </div>
    );
}

export default aboutUs;
