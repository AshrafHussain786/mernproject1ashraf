import React, {useContext} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {NavLink} from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {  
    const {state, dispatch} = useContext(UserContext);
    const CommenMenu = () => {
      return (
        <>
              <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>              
        </>
      )
    }

    const RenderMenu =() => {
      if (state) {
        return (
          <>                
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>              
          </>
        )
      } else {
        return (
          <>              
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Registration</NavLink>
              </li>              
          </>
        )
      }

    }

    return (
        <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="#">Navbar</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
      <CommenMenu />
      <RenderMenu />
    </ul>    
  </div>
</nav>
        </>
    );
}

export default Navbar;