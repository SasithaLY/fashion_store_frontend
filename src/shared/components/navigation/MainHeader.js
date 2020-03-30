import React from "react";

import MainNavigation from "./MainNavigation";
import "./MainHeader.css";

const MainHeader = props => {
  return (
    <header>
      <nav className="navbar-static-top navbar-dark bg-dark">
        <div class="container-fluid">
          <div class="d-flex justify-content-around">
            <div class="p-2">
              <div class="text-light">
                <i class="fas fa-phone icon-white"></i>&nbsp;
                {process.env.REACT_APP_PHONE}
                &nbsp; &nbsp;<i class="fas fa-envelope icon-white"></i>&nbsp;
                {process.env.REACT_APP_EMAIL}
              </div>
            </div>

            <div id="ex4" className="p-1">
            <a href={"/cart"}>
                <span className="p1 fa-stack has-badge" data-count="0">
                  <i
                    className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse icon-white"
                    data-count=""
                  ></i>
                </span>
              </a>

              <a
                style={{ textDecoration: "none" }}
                href={"/login"}
                className="mx-3 text-success"
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

              
            </div>
          </div>
        </div>
      </nav>

      <div className="my-3">
        <MainNavigation />
      </div>
    </header>
  );
};

export default MainHeader;
