import React, { Component } from 'react';
import {  RouteComponentProps } from 'react-router-dom';
import { BiBookBookmark } from 'react-icons/bi'
import { logout } from '../store/actions';
import { TodoAppState } from '../store/reducer';
import { User } from '../models';
import { connect } from 'react-redux';
interface DispatchProps {
  logout: typeof logout
}
interface StoreState {
  loggedIn: boolean,
  user: User
}
interface LocalState {
  loggedIn: boolean,
  user: User
}
type Props = DispatchProps & StoreState & RouteComponentProps;
class Navbar extends Component<Props, LocalState> {
  state: LocalState={
    loggedIn: false,
    user: this.props.user
  }
  static getDerivedStateFromProps(props: StoreState, state: LocalState) {
        
    return {
      loggedIn: props.loggedIn,
      user: props.user
    };          
}
  logout = () => {    
    this.props.logout(this.props.history);
  }
      render(){
      return (
        <nav className="nav-wrapper blue darken-3">
            <div className="cointainer">
                <a href="/" className="brand-logo" ><BiBookBookmark/> Todo App</a>
                <ul className="right">                     
                    {this.props.loggedIn ? <a href="/" onClick={(e) => this.logout()}>Log Out</a> : <></>}
                </ul>
                <ul className="right">
                {this.props.loggedIn ? <span>Hello, {this.props.user.firstName} :)</span> : <></>}
                </ul>
            </div>
        </nav>
      );
    }
    
  }
  function mapStateToProps(state: TodoAppState, props: any){
    return {
      loggedIn: state.loggedIn,
      user: state.user
     }
}
  const container = connect(
    mapStateToProps,
    {
    logout
    }
  )(Navbar)

export default container;