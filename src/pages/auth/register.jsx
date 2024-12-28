import React from "react";
import "../../styles/auth/login.css";
import loginPhoto from "../../assets/images/login.webp";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function register() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginBrand">
          <h1>Evcil Hayvanım</h1>
        </div>
        <div className="flexmid">
          <div className="LoginWelcome">
            <h3>Welcome</h3>
            <p>Welcome Please enter Your details</p>
          </div>
          <div className="loginOrRegisterButton">
            <div onClick={() => navigate("/auth/login")} className=" loginswitch">
              <p>Sign In</p>
            </div>
            <div className="active loginswitch">Sign Up</div>
          </div>
          <div className="formElements">
            <input
              className="login-input"
              type="text"
              id="email"
              placeholder="Adını gir"
              required
            />
            <label
              className="green underlined login-label"
              for="password"
            ></label>
            <input
              className="login-input"
              type="text"
              id="email"
              placeholder="Soyadını gir"
              required
            />{" "}
            <label
              className="green underlined login-label"
              for="password"
            ></label>
            <input
              className="login-input"
              type="number"
              id="email"
              placeholder="TC No gir"
              required
            />{" "}
            <label
              className="green underlined login-label"
              for="password"
            ></label>
            <input
              className="login-input"
              type="number"
              id="email"
              placeholder="Telefon Numarası gir"
              required
            />{" "}
            <label
              className="green underlined login-label"
              for="password"
            ></label>
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="E postanı gir"
              required
            />{" "}
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

export default register;
