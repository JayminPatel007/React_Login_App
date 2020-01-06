import React from 'react';

import UserDetail from '../../components/userdetail/userdetail.component'

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
        let data=this.state.data;
        console.log(data)
        
        return(
            <div>
                <h1>Hi</h1>
                {data===null &&
                    <h1>Wait</h1>
                }
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

export default UsersPage;