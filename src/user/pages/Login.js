import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../../auth/auth'

const Login = () => {

    const [values, setValues] = useState({
        password: "",
        email: "",
        error: "",
        loading: false,
        redirectUser: false,
    });

    const { password, email, loading, error, redirectUser } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectUser: true
                        });
                    });
                }
            })
    };

    const signinForm = () => (
        <div className="container">
            <form>
                <center>
                    <h2>Login</h2><br />

                    <div className="form-group col-md-6">
                        <label>E-mail</label>
                        <input type="email" onChange={handleChange("email")} value={email} className="form-control" />

                        <label>Password</label>
                        <input type="password" onChange={handleChange("password")} value={password} className="form-control" /> <br />

                        {/* <label className="form-check-label mb-2 mt-2">
                            <a href="#">Forgot Password?</a>
                        </label> */}

                        <button onClick={clickSubmit} className="btn btn-outline-warning btn-md btn-block">Sign in</button>

                        <label className="form-check-label mb-2 mt-2">
                            Don't have an account?<br />
                            <button type="button" className="btn btn-outline-warning btn-md mt-2"><Link to="/signup">SignUp</Link></button>

                        </label>
                    </div>

                </center>
            </form>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="container d-flex justify-content-center">
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    )

    const redirect = () => {
        if (redirectUser) {
            if (user && (user.role === 1 || user.role === 2)) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/profile" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <div>
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirect()}
        </div>
    );
}


export default Login;