import React from 'react';

import './App.css';
import './pages/login/login.page'
import Login from './pages/login/login.page';
import Signup from './pages/signup/signup.page'

class  App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogInButton = this.handleLogInButton.bind(this);
    this.handleLogOutButton = this.handleLogOutButton.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
    this.state = {
      isLoginPage: true,
      isRegisterPage: false,
      isUsersPage: false
    }
  }

  handleLogInButton(){
    this.setState({
      isLoginPage: true,
      isRegisterPage: false,
      isUsersPage: false
    })
  }

  handleSignUpButton(){
    this.setState({
      isLoginPage: false,
      isRegisterPage: true,
      isUsersPage: false
    })
  }
  handleLogOutButton(){
    this.setState({
      isLoginPage: true,
      isRegisterPage: false,
      isUsersPage: false
    })
  }

  render(){

    let isLoginPage= this.state.isLoginPage;
    let isRegisterPage = this.state.isRegisterPage;
    let isUsersPage = this.state.isUsersPage;
    return(
      <div>
        { isLoginPage &&
        <button onClick={this.handleSignUpButton}>
          SignUp
        </button>
      }
      {isRegisterPage &&
      <button onClick={this.handleLogInButton}>
        LogIn
      </button>
      }{isUsersPage &&
        <button onClick={this.handleLogOutButton}>
          LogOut
        </button>
      }{isLoginPage &&
        <Login></Login>
      }{isRegisterPage &&
        <div><Signup></Signup></div>
      }{isUsersPage &&
        <div>Users Page</div>
      }
      </div>
    )
      
  }
}

export default App;
