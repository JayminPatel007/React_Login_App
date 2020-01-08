import React, { Component } from 'react'
import {Redirect, withRouter, Link} from "react-router-dom"

class EditUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            _id: "",
            email:"",
            name:'',
            gender:'male',
            birthDate: new Date(),
            address: '',
            password: '',
            err:"",
            passwordError: '',
            nameError: '',
            editcomplete: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.ValidateEmail = this.ValidateEmail.bind(this)
    }
    async handleInputChange(event){
        const target = event.target;
        await this.setState({[target.name]:target.value})
    }

    ValidateEmail(mail) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
            return (false)
    }

    validate(){
        let emailError= "";
        let nameError="";
        let passwordError= "";
        if (!this.ValidateEmail(this.state.email)){
            emailError = "Email is not valid"
        }else{
            this.setState({emailError: ""});
        }
        if (this.state.name === ""){
            nameError = "Name field should not be empty"
        }else{
            this.setState({nameError: ""})
        }
        if (this.state.password === ""){
            passwordError = "Password field shold not be Empty"
        }else{
            this.setState({passwordError: ""})
        }if(emailError){
            this.setState({emailError: emailError})
            return false
        }if(nameError){
            this.setState({nameError: nameError})
            return false
        }
        if(passwordError){
            this.setState({passwordError: passwordError});
            return false
        }
        return true
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("Handle Submit is called")
        const isValid = this.validate()
        if (!isValid){
            return
        }
        const data = this.state;
        const user =  {
            email : data.email,
            name: data.name,
            gender: data.gender,
            birthDate: data.birthDate,
            address: data.address,
            password: data.password,
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+this.props.token
            }, 
            body: JSON.stringify(user)
        }
        fetch('http://localhost:8000/users/'+this.state._id, options)
            .then(
                response => {
                    console.log("Logged in then")
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return response.json().then(errdata=>{
                        this.props.setMassage(errdata.error.massage)
                    });
                }

                // Examine the text in the response
                response.json().then(data => {
                    // console.log(data);
                    // console.log(this.props);
                    this.props.setMassage("User edited!")
                    this.setState({editcomplete: true})
                    console.log("User Edited!")
                });
                }
            )
            .catch(function(err) {
                console.log("Logged in catch")
                console.log('Fetch Error :-S', err);
            });
    }

    componentDidMount(){
        let id= this.props.match.params.id;
        console.log(this.props.token)
        const options = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+this.props.token
            }
        }
        fetch('http://localhost:8000/users/'+id, options)
            .then(
                response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                }

                // Examine the text in the response
                response.json().then(data => {
                    this.setState(data)
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    render() {
        console.log(this.state);
        if (this.state.editcomplete){
            return <Redirect to="/users"></Redirect>
        }
        return (
            <div>
                <h1 className="title">Edit User</h1>
                <form className="form">
                    <label>Email</label>
                    <input id="disabledInput"  type="email" name="email" value={this.state.email} disabled/>
                    { this.state.emailError ? <div className="error">{this.state.emailError}</div> : null}
                    <br></br>
                    <label>Name</label>
                    <input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
                    { this.state.nameError ? <div className="error">{this.state.nameError}</div> : null}
                    <br></br>
                    <label>Gender</label>
                    <select name="gender" onChange={this.handleInputChange} value={this.state.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <br></br>
                    <label >BirthDate</label>
                    <input type="date" name="birthDate" onChange={event => this.setState({birthDate: event.target.value})} value={this.state.birthDate}/>
                    <br></br>
                    <label>Address</label>
                    <textarea name="address" onChange={this.handleInputChange} value={this.state.address}></textarea>
                    <br></br>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                    { this.state.passwordError ? <div className="error">{this.state.passwordError}</div> : null}
                    <br></br>
                    <input className="submitButton" onClick={this.handleSubmit} type="submit" value="Edit"/>
                </form>
                <div className="link">Don't want to change? <Link to="/users">Go back</Link></div>

            </div>
        )
    }
}

export default withRouter(EditUser);

