import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Logo from "../../assets/tea-shop-logo.png";
import { useAppContext } from "../../context/AppContext";

const AuthPage: React.FC = () => {
  const { state } = useAppContext();

  if (state.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 h-fit md:grid-cols-2 md:max-h-[80vh] max-w-[90vw] m-auto">
      <div className="order-2 md:order-1 lg:order-1 xl:order-1 max-h-[50vh] md:max-h-[80vh] overflow-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/auth/login" />} />
        </Routes>
      </div>
      <div className="flex items-center justify-center max-h-[25vh] md:max-h-[80vh] md:order-2 md:rounded-lg bg-lightBeige">
        <img
          src={Logo}
          alt="tea-shop-logo-login"
          className="h-full block object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default AuthPage;
