import React, { Component } from 'react';
import uuid from 'react-uuid';

class ViewUsers extends Component {
    state = {
        users: [
            { id: uuid(), fName: "Pasan", lName: "Nethsara", email: "pasa@g.com", gender: "Male" },
            { id: uuid(), fName: "Sasitha", lName: "Layan", email: "pasa@g.com", gender: "Male" },
            { id: uuid(), fName: "Anolie", lName: "Oshini", email: "pasa@g.com", gender: "Female" }
        ]
    }
    render() {
        const { users } = this.state;
        return (
            <div className="container-sm">
                <button
                    onClick={() => {
                        const fName = prompt("Enter Name");
                        if (fName) {
                            this.setState(state => ({
                                users: [...state.users, { id: uuid(), fName: fName }]
                            }));
                        }
                    }}>
                    Add User
                </button>
                <h2><center>View All Users</center></h2>
                <table className="table table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ id, fName, lName, email, gender }) => (
                            <tr key="id">
                                <th><button
                                    onClick={() => {
                                        this.setState(state => ({
                                            users: state.users.filter(user => user.id !== id)
                                        }));
                                    }}
                                >&times;</button></th>
                                <th>{fName}</th>
                                <th>{lName}</th>
                                <th>{email}</th>
                                <th>{gender}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewUsers;