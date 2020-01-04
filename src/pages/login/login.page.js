import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
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
        // const res = await fetch()
        // console.log(res)
    }
    render(){
        return (
            <form>
                <label>Email</label>
                <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                <br />
                <label>Password</label>
                <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                <br />
                <input type="submit" onClick={this.handleSubmit}/>
            </form>
        )
    }
}

export default Login;