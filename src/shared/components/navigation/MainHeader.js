import React, {Fragment} from "react";
import { useHistory, withRouter } from "react-router-dom";
import { itemTotal } from "../../../cart/cartHelper";
import MainNavigation from "./MainNavigation";
import { Link } from "react-router-dom";
import "./MainHeader.css";
import { signout, isAuthenticated } from "../../../auth/auth"

const MainHeader = () => {

  let history = useHistory();

  return (
    <header>
      <div className="col-md-12 navbar-dark bg-dark text-light">
        <div className="row container-fluid">
          <div className="col-md-12 text-right">
            <div id="ex4" className="p-1">

              {!isAuthenticated() &&

                <Fragment>
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

                </Fragment>
              }

              {isAuthenticated() &&
                <Fragment>
                  <a
                    style={{ cursor: "pointer", color: "#ffffff" }}
                    className="mx-3 text-warning"
                    onClick={() => signout(() => {
                      history.push("/");
                    })}
                  >
                    SignOut
              </a>
                </Fragment>
              }

              <a  href={"/cart"}  >
                <span className="p1 fa-stack has-badge" data-count={itemTotal()}>
                  <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse icon-white">

                  </i>
                </span>
              </a>
              <Link to={"/wishList"}>
                <span className="p1 fa-stack has-badge ">
                <i className="fas fa-heart fa-stack-1x xfa-inverse icon-white"></i>
                </span>
              </Link>
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

export default withRouter(MainHeader);
