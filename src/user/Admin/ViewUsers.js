import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";
import { listUsers } from "../UserAPIs/userApi";

const ViewUsers = () => {

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([])

    const { user, token } = isAuthenticated()

    const loadUsers = () => {
        setLoading(true);
        listUsers(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const showTotalUsers = () => {
        if (users.length > 0) {
            return (
                <h4 className="text-danger">
                    Total Users: {users.length}
                </h4>
            )
        }
    }

    const showLoading = () => (
        loading && (
            <div className="container d-flex justify-content-center">
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    )

    const userTable = () => (
        <div className="container-fluid">
            <h2 className="text-center">
                Manage Users
            </h2><br />
            {showLoading()}
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, uIndex) => {
                        return (
                            <tr key={uIndex}>
                                <td>{u._id}</td>
                                <td>{u.fName}</td>
                                <td>{u.lName}</td>
                                <td>{u.email}</td>
                                <td>{u.role == 0 ? "Registered User" : u.role === 1 ? "Admin" : "Store Manager"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

    return (
        <div>
            {userTable()}
            {showTotalUsers()}
        </div>
    )
}

export default ViewUsers;