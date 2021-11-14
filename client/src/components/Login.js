import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Image1 from "../images/register-img.png";

import { UserContext } from "../App";

const Login = () => {

  const {state, dispatch} = useContext(UserContext)

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const loginUser = async (e) => {
      e.preventDefault();

      const res = await fetch("/signin", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
              email, password
          })
      })
      const data = res.json();      
      console.log(data)
      if (res.status === 400 || !data) {
        console.log("Invalid creditentials in login file .... ")
      } else {
        dispatch({type: "USER", payload: true})
        console.log("Login successfull .... ")
        history.push("/");
      }
  }

  return (
    <section className="sign-in">
      <div className="container mt-5">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={Image1} alt="login-img" />
            </figure>
            <NavLink to="./register" className="signin-image-link">
              Create an account
            </NavLink>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Login</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email ..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Your Password ..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group form-button">
                <input
                  type="submit"
                  name="login"
                  id="login"
                  className="form-submit"
                  value="Login"
                  onClick={loginUser}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
