import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css'
import { TodoAppState } from '../store/reducer';
import { connect } from 'react-redux';
import { AuthorizedRoute } from './AuthorizedRoute';
import { clearError } from '../store/actions';

interface StoreState {
  error: string,
  loggedIn: boolean
}
interface DispatchProps {
  clearError: typeof clearError
}
interface LocalState {
  error: string
  loggedIn: boolean
}
type Props = StoreState & LocalState & DispatchProps;

class App extends Component<Props> { 
  state: LocalState = { 
    error: '',
    loggedIn: this.props.loggedIn
  };
notify = (error: string) => {
  alert(error);
}
  
static getDerivedStateFromProps(props: StoreState, state: LocalState) {    
  if(props.error !== state.error){
    return{
      error: props.error
    };
  }
    
    return null;  
}
componentDidUpdate(){
  if(this.state.error !== ''){
    this.notify(this.state.error)
    this.props.clearError();
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
function mapStateToProps(state: TodoAppState): StoreState{
  return {
      loggedIn: state.loggedIn,
      error: state.error
  }
}
const container = connect(
  mapStateToProps,
  { 
    clearError
  }
)(App)

export default container;
