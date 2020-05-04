import React, { Component } from 'react';
import {isAuthenticated} from "./auth";
import { Route, Redirect } from 'react-router-dom';
import Header from "../shared/components/navigation/MainHeader";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated() ? (
            <div>
                <Header />
            <Component {...props} />
            </div>
        ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )}
    />
);

export default PrivateRoute;