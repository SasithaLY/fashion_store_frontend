import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logowhite.png";

const Sidebar = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="/" className="logo-wrapper waves-effect">
        <img alt="MDB React Logo" className="img-fluid" src={logo} />
      </a>
      <MDBListGroup className="list-group-flush">
        <NavLink
          exact={true}
          to="/admin/dashboard"
          activeClassName="activeClass"
        >
          <MDBListGroupItem className="list-group-item-custom">
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/admin/orders" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom">
            <MDBIcon icon="table" className="mr-3" />
            Orders
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/admin/addAdmin" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom">
            <MDBIcon icon="user-secret" className="mr-3" />
            Add New Admin
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/admin/addManager" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom">
            <MDBIcon icon="user-tie" className="mr-3" />
            Add New Manager
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/addProduct" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom">
            <MDBIcon icon="tshirt" className="mr-3" />
            Add New Product
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/addCategory" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom"> 
            <MDBIcon icon="square" className="mr-3" />
            Manage Categories
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/admin/locations" activeClassName="activeClass">
          <MDBListGroupItem className="list-group-item-custom"> 
            <MDBIcon icon="globe-americas" className="mr-3" />
            Shipping Locations
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default Sidebar;
