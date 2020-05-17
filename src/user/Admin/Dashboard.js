import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";
import userImg from "../../shared/assets/images/index.png"

const userProfile = () => {

    const { user: { _id, fName, lName, email, gender, role } } = isAuthenticated();

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 img">
                        <h3> Hi! {fName}, Have a Good Day! </h3> <br />
                        <img
                            src={userImg}
                            alt=""
                            className="img-rounded"
                        />
                    </div>
                    <div className="col-md-6 details">
                        <blockquote>
                            <h5>{fName} {lName}</h5>
                        </blockquote>
                        <p> Email: {email}  </p>
                        <p> Gender: {gender}  </p>
                        <p> Role: {role === 1 ? "Admin" : role === 2 ? "Store Manager" : "Registered User"}  </p>
                        <p>
                            <Link className="nav-link" aria-selected="true" to={`/user/editProfile/${_id}`}>
                                Edit Profile
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-9">
                {userProfile()}
            </div>
        </div>

    )

}

export default Dashboard;