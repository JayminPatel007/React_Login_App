import React from 'react';

function UserDetail(props){
    return(
        <tr>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.birthDate}</td>
            <td>{props.user.gender}</td>
            <td>{props.user.address}</td>
        </tr>
    )
}

export default UserDetail;