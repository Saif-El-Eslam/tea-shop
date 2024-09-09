"use client";
import React from "react";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import xIcon from "../../assets/x.png";
import Link from "next/link";

const Footer: React.FC = () => {
  const { state } = useAppContext();
  return (
    <div
      className="flex flex-col items-center justify-center bg-lightBeige text-gray-50 w-dvw p-2
        md:flex-row md:justify-between md:items-center md:gap-8 md:px-8"
    >
      <div className="w-full text-darkGreen md:w-fit flex items-center justify-center">
        Copyright 2024 Tea Shop
      </div>
      <nav className="w-fit m-auto md:w-fit md:m-0 text-darkGray bold">
        <ul className="flex gap-6 h-20 items-center justify-center">
          {state.user?.role === "user" && (
            <li className="hover:text-darkGreen">
              <Link href="/">Home</Link>
            </li>
          )}
          <li className="hover:text-darkGreen">
            <Link href="/teas">Shop</Link>
          </li>
          <li className="hover:text-darkGreen">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-darkGreen">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div>
        <nav className="w-fit m-auto md:w-fit md:m-0">
          <ul className="flex gap-4 h-10 items-center justify-center">
            <li className="hover:text-gray-200">
              <a href="https://www.facebook.com">
                <Image
                  src={facebookIcon}
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li className="hover:text-gray-200">
              <a href="https://www.instagram.com">
                <Image
                  src={instagramIcon}
                  alt="instagram"
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li className="hover:text-gray-200">
              <a href="https://www.x.com">
                <Image src={xIcon} alt="x" width={24} height={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
