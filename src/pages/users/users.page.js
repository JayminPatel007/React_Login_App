import React from 'react';

import UserDetail from '../../components/userdetail/userdetail.component'

class UsersPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: null
        }
    }

    async componentDidMount(){
        let data = await fetch("http://localhost:3000/users", {headers: {'Authorization': 'Bearer '+this.props.token}})
        data=await data.json()
        this.setState({data: data})
    }

    render(){
        let data=this.state.data;
        
        return(
            <div>
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
            </div>
        )
    }
}

export default UsersPage;