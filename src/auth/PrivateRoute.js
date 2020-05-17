import React, { Component } from "react";
import { isAuthenticated } from "./auth";
import { Route, Redirect } from "react-router-dom";
import Header from "../shared/components/navigation/MainHeader";
import Footer from "../shared/components/footer/Footer";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <div>
          <Header />
          <Component {...props} />
          <div className="cusfooter">
            <Footer />
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
