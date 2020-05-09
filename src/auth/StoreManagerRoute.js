import React, {Component} from 'react';
import {isAuthenticated} from "./auth";
import {Route, Redirect} from 'react-router-dom';
import Header from "../shared/components/navigation/MainHeader";

const StoreManagerRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated() && isAuthenticated().user.role !== 0 ? (

            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: "/",
                    state: {from: props.location}
                }}
            />
        )}
    />
);

export default StoreManagerRoute;