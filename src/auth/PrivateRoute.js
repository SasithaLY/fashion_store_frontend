import React, { Component } from 'react';
import {isAuthenticated} from "./auth";
import { Route, Redirect } from 'react-router-dom';
import Login from '../user/Pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => isAuthenticated() ? (
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

// const PrivateRoute = ({ component, ...options }) => {
//     debugger;
//     const { user } = isAuthenticated();
//     const finalComponent = user ? component : Login;
  
//     return <Route {...options} component={finalComponent} />;
//   };

// const auth = {
//     isAuthenticatedVal: false,
//     isAuthenticated() {
//       this.isAuthenticatedVal = true
//     },
//   }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         auth.isAuthenticatedVal === true 
//         ? <Component {...props} />
//         : <Redirect to="/signin" />
//     )}/>
// );


export default PrivateRoute;