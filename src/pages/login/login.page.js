import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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

                // Examine the text in the response
                response.json().then(data => {
                    console.log(data);
                    // this.props.setToken(data.token)
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
                {this.props.token !== "" &&
                    <Redirect to="/users"></Redirect>
                }
                <Link to="/signup">Sign Up</Link>
                <form>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                    <br />
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                    <br />
                    <input type="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}

export default Login;