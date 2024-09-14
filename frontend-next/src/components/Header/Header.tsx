"use client";
import Logo from "../../assets/tea-shop-logo.png";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { setUser, setProducts } from "../../context/AppActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "../helpers/Spinner";
import Link from "next/link";

const Header: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  return (
    <div
      className="flex flex-col items-center justify-center bg-darkGray text-gray-50
        md:flex-row md:justify-between md:items-center md:gap-8 md:px-8"
    >
      <div
        className="w-full bg-lightBeige md:w-fit cursor-pointer flex items-center justify-center"
        onClick={() => {
          state.user && state.user.role === "user"
            ? router.push("/home")
            : router.push("/teas");
        }}
      >
        <Image src={Logo} alt="tea-shop-logo" width={50} height={50} />
      </div>
      {state.loading ? (
        <Spinner loading />
      ) : (
        <nav className="w-fit m-auto md:w-fit md:m-0">
          <ul className="flex gap-4 h-10 items-center justify-center">
            {!state.user && (
              <li className="hover:text-gray-200">
                <Link href="/auth/login">Login</Link>
              </li>
            )}

            {state.user && (
              <li className="hover:text-gray-200">
                <Link href="/teas">Shop</Link>
              </li>
            )}
            {state.user && (
              <li className="hover:text-gray-200">
                <Link href="/orders">Orders</Link>
              </li>
            )}
            <li className="hover:text-gray-200">
              <Link href="/about">About Us</Link>
            </li>
            <li className="hover:text-gray-200">
              <Link href="/contact">Contact</Link>
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
                <Link href="/auth/login">Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
