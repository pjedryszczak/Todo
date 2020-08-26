import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css'
import { TodoAppState } from '../store/reducer';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';
import { User } from '../models';
import { toast } from 'react-toastify';
import { AuthorizedRoute } from './AuthorizedRoute';

interface StoreState {
  loggedIn: boolean,
  user: User,
  error: string
}
interface LocalState {
  error: string
}
type Props = StoreState & LocalState & RouteComponentProps;

class App extends Component<Props> { 
  state = { 
    error: ''
  };
notify = (error: string) => {
  alert(error);
}
  
static getDerivedStateFromProps(props: StoreState, state: LocalState) {    
     return{
      error: props.error
    };     
}
componentDidUpdate(){
  if(this.state.error != ''){
    this.notify(this.state.error)
  }
}
  render(){
    return (
      <>
      <Navbar />
      <div className="todo-app container"> 
      <Switch>
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <AuthorizedRoute path="/home" component={Home} loggedIn={this.props.loggedIn}/>
      </Switch>
      
      </div>
      </>
    );
  }
  
}
function mapStateToProps(state: TodoAppState, props: any){
  return {
      loggedIn: state.loggedIn,
      error: state.error
  }
}
const container = connect(
  mapStateToProps,
  { }
)(App)

export default container;
