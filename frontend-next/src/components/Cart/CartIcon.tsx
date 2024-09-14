"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAppContext } from "../../context/AppContext";

import Cart from "@/assets/drink.png";

const CartIcon: React.FC = () => {
  const router = useRouter();
  const { state } = useAppContext();

  const itemsInCart = state.cart.reduce(
    (acc, item) => acc + item.quantityInCart,
    0
  );

  return (
    <div
      className="fixed bottom-10 right-10 bg-lightBeige text-white p-3 rounded-full shadow-lg cursor-pointer 
                  hover:bg-[#dbd8c8] active:scale-95 transition-transform"
      onClick={() => router.push("/cart")}
    >
      {itemsInCart > 0 && (
        <span className="absolute -top-2 -right-2 bg-brown text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemsInCart}
        </span>
      )}

      <Image src={Cart} alt="cart" width={30} />
    </div>
  );
};

export default CartIcon;
