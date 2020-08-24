import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
class App extends Component {
  render(){
    return (
      <>
      <Navbar />
      <div className="todo-app container"> 
      
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/logout" component={Home}></Route>
      </Switch>
      
      </div>
      </>
    );
  }
  
}

export default App;
