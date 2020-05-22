import React, { useState } from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logowhite.png";
import { isAuthenticated } from "../../../auth/auth"

const Sidebar = () => {

  const [isOpen, setOpen] = useState(true);

  return (
    <div>
      <div>
        <a className="sidebar-button" style={isOpen ? { paddingLeft: "210px" } : { paddingLeft: "0px" }}>

          <button onClick={() => setOpen(!isOpen)} className="btn btn-outline-warning btn-sm" ><MDBIcon icon="bars" /></button>
        </a>
      </div>
      <div className="sidebar-fixed position-fixed" style={isOpen ? { display: "" } : { display: "none" }}>

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

          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/admin/orders" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="table" className="mr-3" />
            Orders
          </MDBListGroupItem>
            </NavLink>
          }

          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/admin/addAdmin" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="user-secret" className="mr-3" />
            Add New Admin
          </MDBListGroupItem>
            </NavLink>
          }

          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/admin/addManager" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="user-tie" className="mr-3" />
            Add New Manager
          </MDBListGroupItem>
            </NavLink>
          }

          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/admin/viewUsers" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="portrait" className="mr-3" />
            Manage Users
          </MDBListGroupItem>
            </NavLink>
          }

          <NavLink to="/storeManager/allProducts" activeClassName="activeClass">
            <MDBListGroupItem className="list-group-item-custom">
              <MDBIcon icon="portrait" className="mr-3" />
                All Products
            </MDBListGroupItem>
          </NavLink>


          <NavLink to="/addProduct" activeClassName="activeClass">
            <MDBListGroupItem className="list-group-item-custom">
              <MDBIcon icon="tshirt" className="mr-3" />
            Add New Product
          </MDBListGroupItem>
          </NavLink>


          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/addCategory" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="square" className="mr-3" />
            Manage Categories
          </MDBListGroupItem>
            </NavLink>
          }

          {isAuthenticated() && (isAuthenticated().user.role === 1) &&
            <NavLink to="/admin/locations" activeClassName="activeClass">
              <MDBListGroupItem className="list-group-item-custom">
                <MDBIcon icon="globe-americas" className="mr-3" />
            Shipping Locations
          </MDBListGroupItem>
            </NavLink>
          }

          <NavLink to="/admin/promocodes" activeClassName="activeClass">
            <MDBListGroupItem className="list-group-item-custom">
              <MDBIcon icon="dollar-sign" className="mr-3" />
            Promo Codes
          </MDBListGroupItem>
          </NavLink>

        </MDBListGroup>
      </div>
    </div>
  );
};

export default Sidebar;
