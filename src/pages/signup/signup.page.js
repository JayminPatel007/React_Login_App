import React from 'react';
import {Link, Redirect} from 'react-router-dom';


class Signup extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            email:"",
            name:'',
            gender:'male',
            birthdate:'',
            address: '',
            password: '',
            err:""
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
        const user =  {
            email : data.email,
            name: data.name,
            gender: data.gender,
            birthDate: data.birthdate,
            address: data.address,
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
                    return <Redirect to="/login"></Redirect>
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
                <Link to="/signup">Sign Up</Link>
                <form>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                    <br></br>
                    <label>Name</label>
                    <input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
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
                    <br></br>
                    <input type="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}

export default Signup;