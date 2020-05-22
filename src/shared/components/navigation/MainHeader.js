import React, { Fragment, useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { itemTotal } from "../../../cart/cartHelper";
import MainNavigation from "./MainNavigation";
import { countTotal, getWishList } from "../../../wishList/wishAPI";
import { Link } from "react-router-dom";
import "./MainHeader.css";
import { signout, isAuthenticated } from "../../../auth/auth";

const MainHeader = () => {
  const [count, setCount] = useState(0);
  let history = useHistory();
  const { user, token } = isAuthenticated();

  useEffect(() => {
    if (user) {
      getWishList(user._id, token).then((data) => {
        if (data) {
          setCount(data.length);
        } else {
          setCount(0);
        }
      });
    }
  }, []);

  return (
    <header>
      <div className="col-md-12 navbar-dark bg-dark text-light">
        <div className="row container-fluid">
          <div className="col-md-12 text-right">
            <div id="ex4" className="p-1">
              {!isAuthenticated() && (
                <Fragment>
                  <a style={{ textDecoration: "none" }} href={"/signin"} className="text-success">
                    LOGIN
                  </a>

                  <a style={{ textDecoration: "none" }} href={"/signup"} className="mx-3 text-warning">
                    REGISTER
                  </a>
                </Fragment>
              )}

              {isAuthenticated() && (
                <Fragment>
                  Welcome&nbsp;
                  <a style={{ textDecoration: "none" }} href={"/user/profile"} className="text-success">
                    {user.fName}
                  </a>
                  <a
                    className="mx-2 text-warning btn btn-sm btn-outline-warning"
                    onClick={() =>
                      signout(() => {
                        history.push("/");
                      })
                    }
                  >
                    LOGOUT
                  </a>
                </Fragment>
              )}

              <a href={"/cart"}>
                <span className="p1 fa-stack has-badge" data-count={itemTotal()}>
                  <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse icon-white btn-outline-warning"></i>
                </span>
              </a>
              <Link to={"/wishList"}>
                <span className="p1 fa-stack has-badge " data-count={count}>
                  <i className="p3 fas fa-heart fa-stack-1x xfa-inverse icon-white btn-outline-warning"></i>
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
