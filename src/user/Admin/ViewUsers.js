import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from "../../auth/auth";
import { listUsers } from "../UserAPIs/userApi";

const ViewUsers = () => {

    const [users, setUsers] = useState([])

    const{user, token} = isAuthenticated()

    const loadUsers = () => {
        listUsers(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const showTotalUsers = () => {
        if(users.length > 0) {
            return (
                <h4 className="text-danger display-2">
                    Total Users: {users.length}
                </h4>
            )
        }
    }

    const userTable = () => (
        <div className="container-fluid">
            <h2 className="text-center">
                Users
            </h2>
        </div>
    ) 

    return (
        <div>
            {userTable()}
            {showTotalUsers()}
            {JSON.stringify(users)}
        </div>        
    )
}

export default ViewUsers;