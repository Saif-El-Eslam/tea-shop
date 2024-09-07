import React from "react";
import { useAppContext } from "../../context/AppContext";
import { setUser } from "../../context/AppActions";
import { useNavigate, Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import xIcon from "../../assets/x.png";

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center bg-lightBeige text-gray-50 w-dvw
        md:flex-row md:justify-between md:items-center md:gap-8 md:px-8"
    >
      <div
        className="w-full text-darkGreen md:w-fit cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Copyright 2024 Tea Shop
      </div>
      <nav className="w-fit m-auto md:w-fit md:m-0 text-darkGray bold">
        <ul className="flex gap-6 h-20 items-center justify-center">
          {state.user?.role === "user" && (
            <li className="hover:text-darkGreen">
              <Link to="/">Home</Link>
            </li>
          )}
          <li className="hover:text-darkGreen">
            <Link to="/teas">Shop</Link>
          </li>
          <li className="hover:text-darkGreen">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-darkGreen">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div>
        <nav className="w-fit m-auto md:w-fit md:m-0">
          <ul className="flex gap-4 h-10 items-center justify-center">
            <li className="hover:text-gray-200">
              <a href="https://www.facebook.com">
                <img src={facebookIcon} alt="facebook" className="h-6 w-6" />
              </a>
            </li>
            <li className="hover:text-gray-200">
              <a href="https://www.instagram.com">
                <img src={instagramIcon} alt="instagram" className="h-6 w-6" />
              </a>
            </li>
            <li className="hover:text-gray-200">
              <a href="https://www.x.com">
                <img src={xIcon} alt="x" className="h-6 w-6" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
