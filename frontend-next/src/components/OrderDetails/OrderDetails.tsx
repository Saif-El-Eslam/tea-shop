import React, { useRef, useEffect } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { useQuery } from "@apollo/client";

import { useAppContext } from "@/context/AppContext";
import { QUERY_ORDER_DETAILS } from "@/graphQL/Queries/ordersQueries";
import Spinner from "@/components/helpers/Spinner";

import CloseIcone from "@/assets/cross.png";
import Notify from "@/utils/Notify";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const { loading, error, data } = useQuery(QUERY_ORDER_DETAILS, {
    variables: { id: orderId },
  });
  const { state } = useAppContext();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (error) {
    Notify.error(error.message);
  }
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-10 z-50">
        <Spinner loading={loading} size={15} />
      </div>
    );

  const getSubtotal = (quantity: number, price: number) =>
    (quantity * price).toFixed(2);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="w-full max-w-lg mx-4 py-4 rounded-2xl bg-lightBeige flex flex-col justify-center items-start gap-2 lg:flex-row lg:gap-8 relative"
      >
        {state.user?.role === "admin" && (
          <div className="text-[#808080] font-medium text-sm mx-auto">
            USER ID: {data.orders_by_pk.user_id}
          </div>
        )}
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-[#808080] border-b">
              <th className="font-medium text-sm py-[4px] px-[4px] w-4/12">
                PRODUCT
              </th>
              <th className="font-medium text-sm py-[4px] px-[4px] w-2/12">
                PRICE
              </th>
              <th className="font-medium text-sm py-[4px] px-[4px] w-2/12">
                QTY
              </th>
              <th className="font-medium text-sm py-[4px] px-[4px] w-2/12">
                SUBTOTAL
              </th>
              <th className="relative py-[4px] px-[4px] w-2/12">
                <Image
                  className="w-[20px] cursor-pointer m-auto"
                  src={CloseIcone}
                  onClick={onClose}
                  alt="close"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.orders_by_pk.orderitems.map((item: any, i: number) => (
              <tr key={i} className="border-b">
                <td className="font-normal text-sm py-2 px-4 text-center">
                  {item.tea.name}
                </td>
                <td className="font-normal text-sm py-2 px-4 text-center">
                  ${item.price_per_unit.toFixed(2)}
                </td>
                <td className="font-normal text-sm py-2 px-4 text-center">
                  {item.quantity}
                </td>
                <td className="font-normal text-sm py-2 px-4 text-center">
                  ${getSubtotal(item.quantity, item.price_per_unit)}
                </td>
                <td className="font-normal text-sm py-2 px-4 text-center"></td>
              </tr>
            ))}
            <tr className="text-center align-middle">
              <td colSpan={5}>
                <div className="flex justify-center items-center gap-4">
                  <span className="text-[#808080] font-medium text-sm">
                    Total Price:
                  </span>
                  <span className="font-normal text-sm">
                    ${data.orders_by_pk.total_price}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>,
    document.body
  );
};

export default OrderDetailsModal;
