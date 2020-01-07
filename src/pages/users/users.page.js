import React from 'react';

import UserDetail from '../../components/userdetail/userdetail.component'
import { Redirect } from 'react-router-dom';

class UsersPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: null
        }
    }

    componentDidMount(){
        console.log("compount did mount")
        console.log(this.props.token)
        const options = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+this.props.token
            }
        }
        fetch('http://localhost:8000/users', options)
            .then(
                response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    console.log(this.props);
                }

                // Examine the text in the response
                response.json().then(data => {
                    console.log(data)
                    this.setState({data: data})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    render(){
        const data = this.state.data;
        console.log("token is", this.props.token)
        console.log(this.props.token ==="")
        if (this.props.token ==="") {
            console.log("Reached here!")
            return <Redirect to="/login"></Redirect>
        }
        else{
            return(
                <div> 
                    <button onClick={this.props.logOut}>Logout</button>
                    {data !==null &&
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Birthdate</th>
                                <th>Gender</th>
                                <th>Address</th>
                            </tr>
                            {data.map(user=>{
                                return (<UserDetail user={user} ></UserDetail>)
                            })}
                        </table> 
                    }
                    
                </div>
            )
        }
    }
        
}

export default UsersPage;
