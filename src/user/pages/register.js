import React, { Component } from 'react';

class Register extends Component {

    render() {
        return (
            <div className='container-sm'>
                <h2><center>Register</center></h2><br/>
                <form>
                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label>First Name</label>
                            <input type="text" className="form-control textColor" />
                        </div>
                        <div className="form-group col-sm">
                            <label >Last Name</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label>Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="form-group col-sm">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm">
                            <label>E-mail</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group col-sm">
                            <label>Gender</label>
                            <select className="form-control">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="custom-control custom-checkbox">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                                I agree to Terms and Conditions.
                            </label>
                        </div>
                    </div><br/>
                    <button type="submit" className="btn btn-outline-warning btn-md btn-block">Sign in</button>
                </form>
            </div>
        );
    }
}

export default Register;