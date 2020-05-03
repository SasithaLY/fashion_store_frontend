import React from "react";
import "../components/profileStyles.css";
import { isAuthenticated } from "../../auth/auth";

const Profile = () => {

    const {user: {fName, lName, email, gender, role}} = isAuthenticated();

    return (
      <div className="container-fluid p-5">
        {/* <h1>Bootstrap 4 Vertical Nav Tabs</h1> */}
        <hr />
        <div className="row">
          <div className="col-md-2 mb-3">
            <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="orders-tab"
                  data-toggle="tab"
                  href="#orders"
                  role="tab"
                  aria-controls="orders"
                  aria-selected="false"
                >
                  Purchase History
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-10">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active" 
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 img">
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
                      <p>
                        {email} <br />
                        {gender} <br />
                        {role}
                      </p>
                      <a href="#">Edit Profile</a>
                      <br />
                      <a href="#">Change Password</a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="orders"
                role="tabpanel"
                aria-labelledby="orders-tab"
              >
                <center>
                  <div className="form-group col-lg-6 my-3">
                    <div className="panel panel-primary">
                      <div className="panel-heading">
                        <h3 className="panel-title">Orders</h3>
                        <div className="pull-right">
                          <span
                            className="clickable filter"
                            data-toggle="tooltip"
                            title="Toggle table filter"
                            data-container="body"
                          >
                            <i className="glyphicon glyphicon-filter"></i>
                          </span>
                        </div>
                      </div>
                      <div className="panel-body">
                        <input
                          type="text"
                          className="form-control"
                          id="dev-table-filter"
                          data-action="filter"
                          data-filters="#dev-table"
                          placeholder="Filter Developers"
                        />
                      </div>
                      <table className="table table-hover" id="dev-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Kilgore</td>
                            <td>Trout</td>
                            <td>kilgore</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Profile;
