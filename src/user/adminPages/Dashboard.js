import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";

const adminNavs = () => {
    const { user: { _id, fName, lName, email, gender, role } } = isAuthenticated();

    return (

        <ul className="nav nav-pills flex-column" id="myTab" role="tablist">

            <li className="nav-item">
                <Link
                    className="nav-link active"
                    to="/user/profile"
                >
                    Profile
                </Link>
            </li>
        </ul>
    )
}

const Dashboard = () => {
    return (
        <div className="row">
            <div className="col-md-2 mb-3">
            {adminNavs()}
            </div>
        </div>
    )

}

export default Dashboard;