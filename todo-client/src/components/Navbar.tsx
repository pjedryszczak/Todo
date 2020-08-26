import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
  user?: User
}
type Props = DispatchProps & StoreState;
class Navbar extends Component<Props> {
  logout = () => {    
    this.props.logout();
  }
        render(){
          
      return (
        <nav className="nav-wrapper blue darken-3">
            <div className="cointainer">
                <a href="/" className="brand-logo" ><BiBookBookmark/> Todo App</a>
                <ul className="right">
                    <li><NavLink to="/" onClick={this.logout}>Log out</NavLink></li>
                </ul>
            </div>
        </nav>
      );
    }
    
  }
  function mapStateToProps(state: TodoAppState, props: any){
    return {
        loggedId: state.loggedId,
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