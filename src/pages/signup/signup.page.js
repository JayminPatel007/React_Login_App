import React from 'react';
import {Link} from 'react-router-dom';


class Signup extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            email:"",
            name:'',
            gender:'male',
            birthdate: new Date(),
            address: '',
            password: '',
            password2: '',
            err:"",
            emailError: '',
            passwordError: '',
            password2Error: '',
            nameError: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        let password2Error= "";
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
        }if(this.state.password2 !== this.state.password){
            password2Error = "Passwords do not match"
        }else{
            this.setState({password2Error: ""})
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
        }if(password2Error){
            this.setState({password2Error: password2Error});
            return false
        }
        return true
    }

    handleSubmit(event){
        event.preventDefault();
        const isValid = this.validate()
        if (!isValid){
            return
        }
        const data = this.state;
        const user =  {
            email : data.email,
            name: data.name,
            gender: data.gender,
            birthDate: data.birthdate,
            address: data.address,
            password: data.password,
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(user)
        }
        fetch('http://localhost:8000/signup', options)
            .then(
                response => {
                if (response.status !== 201) {
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
                    this.props.setMassage("User created!")
                    console.log("User Created!")
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
                <h1 className="title">SignUp</h1>
                <form className="form">
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
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
                    <input type="date" name="birthDate" onChange={this.handleInputChange} value={this.state.birthDate}/>
                    <br></br>
                    <label>Address</label>
                    <textarea name="address" onChange={this.handleInputChange} value={this.state.address}></textarea>
                    <br></br>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                    { this.state.passwordError ? <div className="error">{this.state.passwordError}</div> : null}
                    <br></br>
                    <label>Confitm Password</label>
                    <input type="password" name="password2" onChange={this.handleInputChange} value={this.state.password2}/>
                    { this.state.password2Error ? <div className="error">{this.state.password2Error}</div> : null}
                    <br></br>
                    <input className="submitButton" type="submit" onClick={this.handleSubmit} value="SignUp"/>
                </form>
                <div className="link">Already have an Account, <Link to="/login">Log In</Link></div>
            </div>
        )
    }
}

export default Signup;