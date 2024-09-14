import React from "react";

interface ButtonProps {
  loading: boolean;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactElement | string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  onClick,
  type,
  children,
}) => {
  return (
    <div className="text-white w-full">
      <button
        type={type}
        className="w-full max-w-80 my-2 py-2 px-4 border border-gray rounded-lg bg-yellow hover:bg-yellow-500 mx-auto"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
