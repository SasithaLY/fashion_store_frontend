import React from "react";
import { itemTotal } from "../../../cart/cartHelper";
import MainNavigation from "./MainNavigation";
import "./MainHeader.css";
import { Link } from "react-router-dom";

const MainHeader = (props) => {
  return (
    <header>
      <div className="col-md-12 navbar-dark bg-dark text-light">
        <div className="row container-fluid">
          <div className="col-md-12 text-right">
            <div id="ex4" className="p-1">
              <a
                style={{ textDecoration: "none" }}
                href={"/signin"}
                className="text-success"
              >
                <span>SignIn</span>
              </a>

              <a
                style={{ textDecoration: "none" }}
                href={"/signup"}
                className="mx-3 text-warning"
              >
                SignUp
              </a>

              <a href={"/cart"}>
                <span className="p1 fa-stack has-badge" data-count={itemTotal()}>
                  <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse icon-white">
                    
                  </i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <MainNavigation />
      </div>
    </header>
  );
};

export default MainHeader;
