import React, { Component } from "react";
import '../components/profileStyles.css'

class Profile extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item col-sm">
                        <a className="nav-link active" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="home" aria-selected="true">Orders</a>
                    </li>
                    <li className="nav-item col-sm">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                        <center>
                            <div className="form-group col-lg-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Orders</h3>
                                        <div className="pull-right">
                                            <span className="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">
                                                <i className="glyphicon glyphicon-filter"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
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
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q" alt="" className="img-rounded" />
                                </div>
                                <div className="col-md-6 details">
                                    <blockquote>
                                        <h5>Fiona Gallagher</h5>
                                        <small><cite title="Source Title">Chicago, United States of America  <i className="icon-map-marker"></i></cite></small>
                                    </blockquote>
                                    <p>
                                        fionagallager@shameless.com <br />
                                        Female
                                    </p>
                                    <a href="#">Edit Profile</a><br/>
                                    <a href="#">Change Password</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Profile;