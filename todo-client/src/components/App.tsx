import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css'
class App extends Component {
  render(){
    return (
      <>
      <Navbar />
      <div className="todo-app container"> 
      
      <Switch>
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/home" component={Home}></Route>
      </Switch>
      
      </div>
      </>
    );
  }
  
}

export default App;
