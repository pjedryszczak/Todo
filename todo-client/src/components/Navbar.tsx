import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
        render(){
      return (
        <nav className="nav-wrapper red darken-3">
            <div className="cointainer">
                <a href="/" className="brand-logo" style={{inlineSize: "fit-content"}}>Todo App</a>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/logout">Log out</NavLink></li>
                </ul>
            </div>
        </nav>
      );
    }
    
  }
  
  export default Navbar;