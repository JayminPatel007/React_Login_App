import React from 'react';
import {Link, Redirect} from 'react-router-dom'

import './userdetail.style.css'

class UserDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userid: this.props.user._id,
            refresh: false
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    async handleDelete(){
        const conformation = window.confirm("Press a button!");
        if (conformation){
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer "+this.props.token
                }
            }
            console.log('http://localhost:8000/users/'+this.state.userid)
            fetch('http://localhost:8000/users/'+this.state.userid, options)
            .then(
                response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    // console.log(this.props);
                }

                // Examine the text in the response
                response.json().then(data => {
                    this.props.setMassage(data.massage)
                    this.setState({refresh: true})
                    window.scrollTo(0, 0);
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }else{
            return
        }

    }

    render(){
        if(this.state.refresh){
            return <Redirect to="/users"></Redirect>
        }
        return(
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.birthDate}</td>
                <td>{this.props.user.gender}</td>
                <td>{this.props.user.address}</td>
                <td>
                    <Link className="btn btn-primary" user={this.props.user} to={"/users/edit/"+this.state.userid}>Edit</Link>
                    <Link onClick={this.handleDelete} className="btn btn-danger delete" to="#">Delete</Link>

                </td>
            </tr>
        )
    }
}

export default UserDetail;