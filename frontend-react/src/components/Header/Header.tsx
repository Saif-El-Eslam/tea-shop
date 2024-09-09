import Logo from "../../assets/tea-shop-logo.png";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { setUser, setProducts } from "../../context/AppActions";
import { useNavigate, Link } from "react-router-dom";

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center bg-darkGray text-gray-50
        md:flex-row md:justify-between md:items-center md:gap-8 md:px-8"
    >
      <div
        className="w-full bg-lightBeige md:w-fit cursor-pointer flex items-center justify-center"
        onClick={() => navigate("/home")}
      >
        <img src={Logo} alt="tea-shop-logo" className="h-14 m-auto" />
      </div>
      <nav className="w-fit m-auto md:w-fit md:m-0">
        <ul className="flex gap-4 h-10 items-center justify-center">
          {!state.user && (
            <li className="hover:text-gray-200">
              <Link to="/auth/login">Login</Link>
            </li>
          )}

          {state.user && state.user?.role === "user" && (
            <li className="hover:text-gray-200">
              <Link to="/home">Home</Link>
            </li>
          )}
          {state.user && (
            <li className="hover:text-gray-200">
              <Link to="/teas">Shop</Link>
            </li>
          )}
          <li className="hover:text-gray-200">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-gray-200">
            <Link to="/contact">Contact</Link>
          </li>

          {state?.user && (
            <li
              className="hover:text-gray-200"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("teas");
                dispatch(setUser(null));
                dispatch(setProducts([]));
              }}
            >
              <Link to="/auth/login">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
