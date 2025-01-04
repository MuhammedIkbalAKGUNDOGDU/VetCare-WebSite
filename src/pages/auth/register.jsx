import React, { useState } from "react";
import axios from "axios";  // Axios import edildi
import "../../styles/auth/login.css";
import loginPhoto from "../../assets/images/login.webp";
import { useNavigate } from "react-router-dom"; // useNavigate hook'u import edildi

function Register() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    tcKimlik: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRadioButtonChange = () => {
    setIsChecked((prev) => !prev);
  };

  // Form verilerini güncelle
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Formu gönder
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/owner/owner_register",
        formData
      );
      console.log("Kayıt Başarılı:", response.data);

      if (response.data.isSuccess === true) {
        navigate("/auth/login");  // Kayıt başarılıysa login sayfasına yönlendir
      } else {
        setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (error) {
      setError("Sunucuyla bağlantı kurulamadı. Lütfen tekrar deneyin.");
      console.error("Kayıt sırasında hata oluştu:", error);
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
            <h3>Welcome</h3>
            <p>Welcome Please enter Your details</p>
          </div>
          <div className="loginOrRegisterButton">
            <div
              onClick={() => navigate("/auth/login")}
              className=" loginswitch"
            >
              <p>Sign In</p>
            </div>
            <div className="active loginswitch">Sign Up</div>
          </div>
          <div className="formElements">
            <input
              className="login-input border p-2"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Adını gir"
              required
            />
            <input
              className="login-input border p-2"
              type="text"
              id="surname"
              value={formData.surname}
              onChange={handleInputChange}
              placeholder="Soyadını gir"
              required
            />
            <input
              className="login-input border p-2"
              type="number"
              id="tcKimlik"
              value={formData.tcKimlik}
              onChange={handleInputChange}
              placeholder="TC No gir"
              required
            />
            <input
              className="login-input border p-2"
              type="number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Telefon Numarası gir"
              required
            />
            <input
              className="login-input border p-2"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E postanı gir"
              required
            />
            <input
              className="login-input border p-2"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
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
            <div
              className="loginContinueButton"
              onClick={handleSubmit}  // Kayıt butonuna tıklanınca handleSubmit çağrılır
            >
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

export default Register;
