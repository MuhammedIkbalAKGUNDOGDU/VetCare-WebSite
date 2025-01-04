import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Vetlogin from "./pages/auth/vetlogin";
import Vetregister from "./pages/auth/vetregister";
import LandingPage from "./pages/landingPage";
import Shop from "./pages/Shop";
import VeterinerScreen from "./pages/veterinerScreen";
import OrderHistory from "./pages/orderHistory";
const Main = () => {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Sayfaları */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/vetlogin" element={<Vetlogin />} />
        <Route path="/auth/vetregister" element={<Vetregister />} />

        {/* Diğer Sayfalar */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/order-history" element={<OrderHistory />} />
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
