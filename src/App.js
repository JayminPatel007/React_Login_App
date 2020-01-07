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
    this.clearMassage = this.clearMassage.bind(this);
    this.setMassage = this.setMassage.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      massage: "",
      token: ''
    }
  }

  componentWillMount(){
    try{
      const allCookies = document.cookie;
      if (allCookies !== ""){
        const tokent = allCookies.split("=")[1]
        this.setState({token: tokent})
      }
    }catch{
      this.setState({token: ""})
    }
  }

  async setToken(token){
    console.log(token)
    await this.setState({token: token});
    document.cookie = `token=${token}`
    // console.log(this.state)
  }

  setMassage(massage){
    this.setState({massage: massage});
  }

  async logOut(){
    console.log("Log Out Button Clicked!")
    await this.setState({token: ""});
    document.cookie = `token=`;
    console.log(this.state)
  }

  clearMassage(){
    setTimeout(()=>{ this.setState({massage: ""}) }, 10000);
  }

  render(){
    console.log("render: App Component")

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
            <Login setMassage={this.setMassage} setToken={this.setToken} token={this.state.token}></Login>
          </Route>
          <Route exact path="/signup">
            <SignUp setMassage={this.setMassage}></SignUp>
          </Route>
          <Route exact path="/users">
            <UsersPage token={this.state.token} logOut={this.logOut}></UsersPage>
          </Route>
        </Switch>

      </Router>
    )
      
  }
}

export default App;
