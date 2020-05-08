import React, {Component} from 'react';
import {isAuthenticated} from "./auth";
import {Route, Redirect} from 'react-router-dom';
import Header from "../shared/components/navigation/MainHeader";

const AdminRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <div>
                <Header/>
                <Component {...props} />
            </div>
        ) : (
            <Redirect
                to={{
                    pathname: "/signin",
                    state: {from: props.location}
                }}
            />
        )}
    />
);

export default AdminRoute;