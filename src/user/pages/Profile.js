import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";
import UserNavs from "../components/UserNavs"

const userProfile = () => {

  const { user: { _id, fName, lName, email, gender, role } } = isAuthenticated();

  return (
    <div className="card text-center">
      <div className="card-header">
        <h2>Profile</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">Hi! {fName}, Have a Good Day! </h5>
        <p className="card-text">Name: {fName} {lName}</p>
        <p className="card-text">Email: {email}</p>
        <p className="card-text">Gender: {gender}</p>
        <p className="card-text">Role: {role === 1 ? "Admin" : role === 2 ? "Store Manager" : "Registered User"} </p>
        <p>
          <Link className="nav-link" aria-selected="true" to={`/user/editProfile/${_id}`}>
            Edit Profile
              </Link>
        </p>
      </div>
      <div className="card-footer text-muted">
        Fashion Store
    </div>
    </div>
  )
}

const Profile = () => {

  return (

    <div className="row">
      <UserNavs />
      <div className="container-fluid mr-3 profile-content">
        {userProfile()}
      </div>
    </div>
  );
}

export default Profile;
