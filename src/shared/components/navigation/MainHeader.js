import React from "react";

import MainNavigation from "./MainNavigation";
import "./MainHeader.css";

const MainHeader = props => {
  return (
    <header>
      <div className="col-md-12 navbar-dark bg-dark text-light">
        <div className="row container-fluid">
          

          <div className="col-md-12 text-right">
            <div id="ex4" className="p-1">
              <a
                style={{ textDecoration: "none" }}
                href={"/login"}
                className="text-success"
              >
                <span>Login</span>
              </a>

              <a
                style={{ textDecoration: "none" }}
                href={"/register"}
                className="mx-3 text-warning"
              >
                Register
              </a>

              <a href={"/cart"}>
                <span className="p1 fa-stack has-badge" data-count="0">
                  <i
                    className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse icon-white"
                    data-count=""
                  ></i>
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
