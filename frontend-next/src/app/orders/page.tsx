"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import { QUERY_ORDERS } from "@/graphQL/Queries/ordersQueries";
import { useAppContext } from "@/context/AppContext";
import OrderDetailsModal from "@/components/OrderDetails/OrderDetails";
import CartIcon from "@/components/Cart/CartIcon";
import Spinner from "@/components/helpers/Spinner";
import { setRefetchOrders } from "@/context/AppActions";

import homeLogo from "@/assets/home.png";
import Notify from "@/utils/Notify";

const OrdersPage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_ORDERS);
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderID, setSelectedOrderID] = useState<string>("");

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderID(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderID("");
  };

  if (error) {
    console.error(error);
    Notify.error(error.message);
  }

  useEffect(() => {
    state.refetchOrders && refetch();
    dispatch(setRefetchOrders(false));
  }, []); // eslint-disable-line

  return (
    <div className="w-full flex flex-col flex-grow">
      <div className="flex items-center h-16 bg-gradient-to-r from-darkGreen to-[#98FF98] px-12 md:px-48">
        <Image
          src={homeLogo}
          alt="home-logo"
          className={`h-5 w-5 ${
            state.user?.role === "user" &&
            "cursor-pointer hover:scale-110 transform transition-transform"
          }`}
          onClick={() => {
            state.user?.role === "user" && router.push("/");
          }}
        />
        <h1 className="text-xs py-4 text-white">
          <span className="font-bold px-2">{">"}</span> Orders
        </h1>
      </div>

      <div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Spinner loading={loading} />
          </div>
        )}
        {!loading && (
          <div className="w-full px-4 py-8 flex flex-col justify-center items-start gap-4 lg:flex-row lg:gap-8 md:px-24">
            <table className="w-full bg-white rounded-2xl">
              <thead className="text-[#808080] text-sm border-b-2 p-2">
                <tr>
                  <th className="font-bold py-2 px-[4px] sm:px-[8px]">
                    Order ID
                  </th>
                  <th className="font-bold py-2 px-[4px] sm:px-[8px]">
                    Total Items
                  </th>
                  <th className="font-bold py-2 px-[4px] sm:px-[8px]">
                    Total Price
                  </th>
                  <th className="font-bold py-2 px-[4px] sm:px-[8px]">Time</th>
                </tr>
              </thead>
              <tbody className="text-[#909090] p-2">
                {data?.orders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="text-center align-middle border-b-2 hover:bg-[#f9f9f9] cursor-pointer"
                    onClick={() => handleOpenModal(order.id)}
                  >
                    <td className="font-medium text-sm py-2 px-[4px] sm:px-[8px] w-4/12 max-w-[15ch] truncate overflow-hidden whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="font-medium text-sm py-2 px-[4px] sm:px-[8px] w-2/12">
                      {order.orderitems_aggregate.aggregate.sum.quantity}
                    </td>
                    <td className="font-medium text-sm py-2 px-[4px] sm:px-[8px] w-2/12">
                      ${order.total_price.toFixed(2)}
                    </td>
                    <td className="font-medium text-sm py-2 px-[4px] sm:px-[8px] w-4/12">
                      {new Date(order.createdAt)
                        .toLocaleString()
                        .split(",")[0] === new Date().toLocaleDateString()
                        ? "Today"
                        : new Date(order.createdAt)
                            .toLocaleString()
                            .split(",")[0] ===
                          new Date(
                            new Date().setDate(new Date().getDate() - 1)
                          ).toLocaleDateString()
                        ? "Yesterday"
                        : new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="text-center align-middle border-b-2">
                  <td colSpan={4}>
                    <div className="flex justify-center items-center gap-4 py-4">
                      <button
                        className="font-medium text-sm text-[#505050] bg-lightBeige hover:bg-[#f0ecda] py-[4px] px-4 rounded-full transition-colors active:scale-95"
                        onClick={() => router.push("/teas")}
                      >
                        Return to Shop
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {state.user?.role === "user" && <CartIcon />}

        {isModalOpen && (
          <OrderDetailsModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            orderId={selectedOrderID}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
