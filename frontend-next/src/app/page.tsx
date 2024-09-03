"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Notify from "@/utils/Notify";
import Loading from "@/components/Loading/Loading";

const HomePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  if (state.loading) {
    return <Loading />;
  }
  if (!state.user) {
    router.push("/auth/login");
  }

  const handleShopNow = () => {
    // Add your logic for logging out if necessary
    // if (user) {
    //   logout();
    //   router.push("/teas");
    // }
    // router.push("/teas");
    Notify.success("You are now shopping!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, User!</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
        onClick={handleShopNow}
      >
        Shop Now
      </button>
    </div>
  );
};

export default HomePage;
