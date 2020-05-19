import React, { useState } from 'react';

const ViewUsers = () => {

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
        </div>        
    )
}

export default ViewUsers;