import React from "react";
import "../../styles/auth/login.css";
import loginPhoto from "../../assets/images/login.webp";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function login() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginBrand">
          <h1>Evcil Hayvanım</h1>
        </div>
        <div className="flexmid">
          <div className="LoginWelcome">
            <h3>Welcome Back</h3>
            <p>Welcome Back Please enter Your details</p>
          </div>
          <div className="loginOrRegisterButton">
            <div className="active loginswitch">
              <p>Sign In</p>
            </div>
            <div
              onClick={() => navigate("/auth/register")}
              className="loginswitch"
            >
              Sign Up
            </div>
          </div>
          <div className="formElements">
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="E postanı gir"
              required
            />
            <label
              className="green underlined login-label"
              for="password"
            ></label>
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Şifreni gir"
              required
            />{" "}
            <div className="loginContinueButton">Continue</div>
          </div>
        </div>
        <div className="loginFooterText">
          <p>Hi Welcome To World's Best Pet Website</p>
        </div>
      </div>
      <div className="loginPhoto">
        <img src={loginPhoto} alt="" />
      </div>
    </div>
  );
}

export default login;