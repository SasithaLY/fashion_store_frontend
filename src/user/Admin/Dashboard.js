import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";

const adminNavs = () => {

    return (

        <div className="container">
            <br /> <br />
            <ul className="nav nav-pills flex-column">

                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        aria-selected="true"
                    >
                        Profile
            </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-selected="true"
                        to="/addProduct"
                    >
                        Create New Product
            </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-selected="false"
                        to="/addCategory"
                    >
                        Create New Category
            </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-selected="false"
                        to="/purchaseHistory"
                    >
                        Edit Profile
            </Link>
                </li>
            </ul>
        </div>
    )
}

const userProfile = () => {

    const { user: { fName, lName, email, gender, role } } = isAuthenticated();

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 img">
                        <h3> Hi! {fName}, Have a Good Day! </h3> <br />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q"
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
                        <p> Role: {role === 1 ? "Admin" : "Registered User"}  </p>
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
                {adminNavs()}
            </div>
            <div className="col-9">
                {userProfile()}
            </div>
        </div>
    )

}

export default Dashboard;