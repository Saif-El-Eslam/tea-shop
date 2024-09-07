import React from "react";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import buyIcon from "../../assets/buy.png";

interface TeaCardProps {
  name: string;
  description?: string;
  pricePerUnit: number;
  quantityLeft: number;
  isAdmin: boolean;
  onBuy: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const TeaCard: React.FC<TeaCardProps> = ({
  name,
  description,
  pricePerUnit,
  quantityLeft,
  isAdmin,
  onBuy,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-6 m-2 w-[20rem] max-w-xs">
      <h2 className="text-xl font-semibold mb-2 text-darkGreen">{name}</h2>
      {description && (
        <p className="text-darkGray mb-2 text-xs font-medium">{description}</p>
      )}
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold">${pricePerUnit.toFixed(2)}</span>
        <span
          className={`text-sm font-bold ${
            quantityLeft > 0 ? "text-darkGreen" : "text-alert"
          }`}
        >
          {quantityLeft > 0 ? `${quantityLeft} left` : "Out of stock"}
        </span>
      </div>
      <div className="flex justify-between items-left mt-auto ml-auto">
        {!isAdmin && (
          <button
            onClick={onBuy}
            className={`border-2 border-lightGreen text-white px-4 py-2 rounded flex items-center ${
              quantityLeft === 0
                ? "bg-gray-100 cursor-not-allowed"
                : "hover:bg-green-100"
            }`}
            disabled={quantityLeft === 0}
          >
            <img src={buyIcon} alt="buy" className="w-4 h-4" />
          </button>
        )}
        {isAdmin && (
          <div className="flex space-x-2">
            <button
              onClick={onUpdate}
              className="border-2 border-yellow text-white px-4 py-2 rounded flex items-center hover:bg-yellow-100"
            >
              <img src={editIcon} alt="edit" className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="border-2 border-alert text-white px-4 py-2 rounded flex items-center hover:bg-red-100"
            >
              <img src={deleteIcon} alt="delete" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaCard;
