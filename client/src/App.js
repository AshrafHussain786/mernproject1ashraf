import React, {createContext, useReducer} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {Switch, Route } from "react-router-dom"
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Errorpage from "./components/404";
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import {initialState, reducer} from "./reducer/UseReducer"

// 1. ContextAPI
export const UserContext = createContext();

const Routing = () => {
  return (    
      <Switch>
          <Route exact path="/" component={Home} />  
          <Route exact path="/about" component={About} /> 
          <Route exact path="/contact" component={Contact} />           
          <Route exact path="/login" component={Login} />     
          <Route exact path="/register" component={Register} /> 
          <Route exact path="/logout" component={Logout} /> 
          <Route component={Errorpage} />                    
      </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (        
      <>
        <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
        </UserContext.Provider>
      </>    
  );
}

export default App;
