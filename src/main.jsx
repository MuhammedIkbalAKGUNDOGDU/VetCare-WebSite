import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import LandingPage from "./pages/landingPage";
import Shop from "./pages/Shop";
import VeterinerScreen from "./pages/veterinerScreen";

const Main = () => {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Sayfaları */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Diğer Sayfalar */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/veteriner" element={<VeterinerScreen />} />
      </Routes>
    </Router>
  );
};

// React Root Render
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
