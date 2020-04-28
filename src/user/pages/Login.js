import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <center>
                        <h2>Login</h2><br />

                        <div className="form-group col-md-6">
                            <label>E-mail</label>
                            <input type="email" className="form-control" />

                            <label>Password</label>
                            <input type="password" className="form-control" />

                            <label className="form-check-label mb-2 mt-2">
                                <a href="#">Forgot Password?</a>
                            </label>

                            <button type="submit" className="btn btn-outline-warning btn-md btn-block">Sign in</button>

                            <label className="form-check-label mb-2 mt-2">
                                Don't have an account?<br />
                                <button type="button" className="btn btn-outline-warning btn-md mt-2">Sign Up</button>

                            </label>
                        </div>

                    </center>
                </form>
            </div>
        );
    }
}

export default Login;