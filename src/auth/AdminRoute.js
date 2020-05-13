import React, { Component } from "react";
import { isAuthenticated } from "./auth";
import { Route, Redirect } from "react-router-dom";
import Header from "../shared/components/navigation/MainHeader";
import Sidebar from "../shared/components/admin/Sidebar";
import Footer from "../shared/components/admin/Footer";
import TopNavigationBar from "../shared/components/admin/TopNavigationBar";
import "../Admin.css";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <div>
          <div className="flexible-content">
            <TopNavigationBar />
            <Sidebar />
            <main id="content" className="p-5">
              <Component {...props} />
            </main>
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

export default AdminRoute;
