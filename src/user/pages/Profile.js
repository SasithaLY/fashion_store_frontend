import React from "react";
import { Link } from 'react-router-dom';
import "../components/profileStyles.css";
import { isAuthenticated } from "../../auth/auth";
import userImg from "../../shared/assets/images/index.png"
import UserNavs from "../components/UserNavs"

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

/* const userNavs = () => {

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
            aria-selected="false"
            to="/cart"
          >
            Cart
        </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            aria-selected="false"
            to="/user/orderHistory"
          >
            Purchase History
        </Link>
        </li>
      </ul>
    </div>
  )

} */

const Profile = () => {

  return (

    <div className="row">
      <UserNavs/>
      <div className="col-3">
        
      </div>
      <div className="col-9">
        {userProfile()}
      </div>
    </div>
  );
}

export default Profile;
