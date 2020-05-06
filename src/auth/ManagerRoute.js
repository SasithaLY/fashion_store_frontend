import React, { Component } from 'react';
import {isAuthenticated} from "./auth";
import { Route, Redirect } from 'react-router-dom';

const ManagerRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated() && (isAuthenticated().user.role === 1 || isAuthenticated().user.role === 2) ? (
            <Component {...props} />
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

export default ManagerRoute;