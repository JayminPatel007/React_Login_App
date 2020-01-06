import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

import './App.css';
import './pages/login/login.page'
import Login from './pages/login/login.page';
import SignUp from './pages/signup/signup.page';
import UsersPage from './pages/users/users.page'

class  App extends React.Component {
  constructor(props){
    super(props);
    this.setToken = this.setToken.bind(this);
    this.clearMassage = this.clearMassage.bind(this)
    this.setMassage = this.setMassage.bind(this)
    this.state = {
      massage: "",
      token: ''
    }
  }

  setToken(token){
    console.log(token)
    this.setState({token: token});
    // console.log(this.state)
  }

  setMassage(massage){
    this.setState({massage: massage});
  }



  clearMassage(){
    setTimeout(()=>{ this.setState({massage: ""}) }, 5000);
  }

  render(){

    this.clearMassage()
    return(
      <Router>
        {this.state.massage !== "" &&
          <h1>{this.state.massage}</h1>
        }
        <Switch>
        <Route exact path="/">
            <Login token={this.state.token} setMassage={this.setMassage} setToken={this.setToken}></Login>
          </Route>
          <Route exact path="/login">
            <Login setMassage={this.setMassage} setToken={this.setToken}></Login>
          </Route>
          <Route exact path="/signup">
            <SignUp setMassage={this.setMassage}></SignUp>
          </Route>
          <Route exact path="/users">
            <UsersPage token={this.state.token}></UsersPage>
          </Route>
        </Switch>

      </Router>
    )
      
  }
}

export default App;
