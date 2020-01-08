import React from 'react';
import { Redirect} from 'react-router-dom';

import './users.style.css'

import UserDetail from '../../components/userdetail/userdetail.component'

class UsersPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: null,
            currentPage: 0,
            totalPages: 0,
            searchQuery: "",
        }
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        fetch('http://localhost:8000/users?page=1', options)
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
                    this.setState({data: data.docs, currentPage:1, totalPages: data.pages})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    async nextPage(event){
        event.preventDefault();
        const options = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+this.props.token
            }
        }
        const nextPage=this.state.currentPage+1
        fetch('http://localhost:8000/users?page='+nextPage+'&query='+this.state.searchQuery, options)
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
                    this.setState({data: data.docs, currentPage:nextPage})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    async previousPage(event){
        event.preventDefault();
        const options = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+this.props.token
            }
        }
        const prevPage=this.state.currentPage-1
        console.log('http://localhost:8000/users?page='+prevPage)
        fetch('http://localhost:8000/users?page='+prevPage+'&query='+this.state.searchQuery, options)
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
                    this.setState({data: data.docs, currentPage:prevPage})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    async handleChange(event){
        event.preventDefault();
        const target = event.target;
        await this.setState({searchQuery: target.value})
    }

    handleSubmit(event){
        event.preventDefault()
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
        fetch('http://localhost:8000/users?page=1&query='+this.state.searchQuery, options)
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
                    this.setState({data: data.docs, currentPage:1, totalPages: data.pages})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }


    render(){
        console.log(this.state)
        let data = this.state.data;
        console.log(this.props.token ==="")
        if (this.props.token ==="") {
            this.props.setMassage("Please Login to view this page")
            return <Redirect to="/login"></Redirect>
        }
        else{
            return(
                    <div> 
                    <button className="logout" onClick={this.props.logOut}>Logout</button>
                    {data !==null &&
                        <div>
                        <form className="search">
                            <input classNmae=" form-control" onChange={this.handleChange} value={this.state.searchQuery} placeholder="Search"/>
                            <input type="submit" onClick={this.handleSubmit}></input>
                        </form>
                        <table className="users-page">
                            <tr>
                                <th className="name">Name</th>
                                <th className="email">Email</th>
                                <th className="birthdate">Birthdate</th>
                                <th className="gender">Gender</th>
                                <th className="address">Address</th>
                                <th className="actions">Actions</th>
                            </tr>
                            {data.map(user=>{
                                return (<UserDetail setMassage={this.props.setMassage} token={this.props.token} key={user.email} user={user} ></UserDetail>)
                            })}
                            <tr>
                                <td>
                            {this.state.currentPage>1 &&
                                <button className="previous" onClick={this.previousPage}>Previous</button>
                            }
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                            {this.state.currentPage<this.state.totalPages &&
                                <button className="next" onClick={this.nextPage}>Next</button>
                            }
                            </td>
                            </tr>
                        </table> 
                        </div>
                    }
                    
                    
                    </div>

            )
        }
    }
        
}

export default UsersPage;
