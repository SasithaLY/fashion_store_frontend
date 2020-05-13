import React, { Component } from "react";
import { isAuthenticated } from "./auth";
import { Route, Redirect } from "react-router-dom";

import Header from "../shared/components/navigation/MainHeader";
import Footer from "../shared/components/footer/Footer";
import "../Admin.css";

const NormalRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <div>
        <Header />
        <Component {...props} />
        <div className="cusfooter">
          <Footer />
        </div>
      </div>
    )}
  />
);

export default NormalRoute;
