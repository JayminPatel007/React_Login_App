import React from 'react';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            name:'',
            gender:'male',
            birthdate:'',
            address: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleInputChange(event){
        const target = event.target;
        this.setState({[target.name]:target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state;
        console.log(data)
        // const res = await fetch()
        // console.log(res)
    }

    render(){
        return (
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
        )
    }
}

export default Signup;