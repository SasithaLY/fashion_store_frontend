import React, { useState } from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import "./profileStyles.css"

const UserNavs = () => {
    const [isOpen, setOpen] = useState(true);
  return (
    <div>
      <div>
        <a className="sidebar-profile-button" style={isOpen ? { paddingLeft: "210px" } : { paddingLeft: "0px" }}>

          <button onClick={() => setOpen(!isOpen)} className="btn btn-outline-warning btn" ><MDBIcon icon={isOpen ? "angle-left" : "angle-right"} /></button>
        </a>
      </div>
      <div className="sidebar-profile position-fixed" style={isOpen ? { display: "" } : { display: "none" }}>
        
        <MDBListGroup className="list-group-flush">
          <NavLink
            exact={true}
            to="/user/profile"
            activeClassName="activeClass"
          >
            <MDBListGroupItem className="list-group-item-custom">
              <MDBIcon icon="user" className="mr-3" />
            Profile
          </MDBListGroupItem>
          </NavLink>


          <NavLink to="/user/orderHistory" activeClassName="activeClass">
            <MDBListGroupItem className="list-group-item-custom">
              <MDBIcon icon="table" className="mr-3" />
            Orders
          </MDBListGroupItem>
          </NavLink>

        </MDBListGroup>
      </div>
    </div>
  );
};

export default UserNavs;
