import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import "./login.style.css"

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedin: false,
            email: '',
            password: '',
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleInputChange(event){
        const target = event.target;
        await this.setState({[target.name]:target.value})
    }
    componentWillMount(){
        console.log("Component will mount Login Page")
        console.log(this.props.token)
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state;
        this.props.setToken(this.state.password)
        console.log(data)
        const user =  {
            email : data.email,
            password: data.password
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(user)
        }
        fetch('http://localhost:8000/login', options)
            .then(
                response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response);
                    return response.json().then(errdata => {
                        this.props.setMassage(errdata.error.massage)
                    })
                }

                response.json().then(data => {
                    console.log(data);
                    this.props.setToken(data.token)
                    this.setState({isLoggedin: true})
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    render(){
        return (
            <div>
                {this.state.isLoggedin &&
                    <Redirect to="/users"></Redirect>
                }
                <h1 className="title">Login</h1>
                <form className="form">                   
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                    <br />
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                    <br />
                    <input className="submitButton" type="submit" onClick={this.handleSubmit} value="LogIn"/>
                </form>
                <div className="link">Don't have an account, <Link to="/signup">Sign Up</Link></div>
            </div>
        )
    }
}

export default Login;