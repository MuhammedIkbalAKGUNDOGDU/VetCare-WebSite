  import React, { useState } from "react";
  import axios from "axios";
  import "../../styles/auth/login.css";
  import loginPhoto from "../../assets/images/login.webp";
  import { useNavigate } from "react-router-dom";

  function Login() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRadioButtonChange = () => {
      setIsChecked((prev) => !prev);
      navigate("/auth/vetlogin")
    };

    const handleSubmit = async () => {
      const loginData = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "http://localhost:8081/owner/login_owner",
          loginData
        );
        if (response.data.isSuccess === true) {
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          navigate("/"); // Başarılı giriş sonrası yönlendirme
        } else {
          setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
      } catch (error) {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        console.error("Hata oluştu:", error);
      }
    };

    return (
      <div className="loginContainer">
        <div className="loginForm">
          <div className="loginBrand">
            <h1 className="font-bold text-2xl">Evcil Hayvanım</h1>
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
                className="login-input border p-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E postanı gir"
                required
              />
              <input
                className="login-input border p-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifreni gir"
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleRadioButtonChange}
                />
                Veterinerim
              </label>
              <div className="loginContinueButton" onClick={handleSubmit}>
                Continue
              </div>
              {error && <p className="error-message">{error}</p>}
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

  export default Login;
