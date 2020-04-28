import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../../auth/auth'

const Login = () => {

    const [values, setValues] = useState({
        password: "",
        email: "",
        error: "",
        loading: false,
        redirectToHome: false,
    });

    const { password, email, loading, error, redirectToHome } = values;

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
                            redirectToHome: true
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
                        <input type="password" onChange={handleChange("password")} value={password} className="form-control" />

                        <label className="form-check-label mb-2 mt-2">
                            <a href="#">Forgot Password?</a>
                        </label>

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
            <div className="alert alert-info">
                <h3>Loading....Please Wait!</h3>
            </div>
        )
    )

    const redirect = () => {
        if (redirectToHome) {
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