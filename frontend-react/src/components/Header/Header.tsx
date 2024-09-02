import Logo from "../../assets/tea-shop-logo.png";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { setUser } from "../../context/AppActions";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center  bg-darkGray text-gray-50
        md:flex-row md:justify-between md:items-center md:gap-8 md:px-8"
    >
      <div
        className="w-full bg-lightBeige md:w-fit cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src={Logo} alt="tea-shop-logo" className="h-14 m-auto" />
      </div>
      <nav className="w-fit m-auto md:w-fit md:m-0">
        <ul className="flex gap-4 h-10 items-center justify-center">
          {!state.user && (
            <li className="hover:text-gray-200">
              <a href="/auth/login">Login</a>
            </li>
          )}

          {state.user && (
            <li className="hover:text-gray-200">
              <a href="/">Home</a>
            </li>
          )}
          {state.user && (
            <li className="hover:text-gray-200">
              <a href="/teas">Shop</a>
            </li>
          )}
          <li className="hover:text-gray-200">
            <a href="/about">About Us</a>
          </li>
          <li className="hover:text-gray-200">
            <a href="/contact">Contact</a>
          </li>

          {state?.user && (
            <li
              className="hover:text-gray-200"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
              }}
            >
              <a href="/auth/login">Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
