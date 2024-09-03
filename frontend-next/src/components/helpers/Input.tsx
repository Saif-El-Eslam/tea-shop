import React from "react";

interface LoginProps {
  field: string;
  setField: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const Login: React.FC<LoginProps> = ({
  field,
  setField,
  placeholder = "input text",
  type = "text",
  required = false,
}) => {
  return (
    <div className="text-darkGray flex flex-col">
      <label htmlFor={type} className="font-bold text-xs">
        {placeholder}
      </label>

      <input
        type={type}
        value={field}
        onChange={(e) => setField(e.target.value)}
        placeholder={placeholder}
        className="min-w-80 my-2 py-2 px-4 border border-gray rounded-lg"
        required={required}
      />
    </div>
  );
};

export default Login;
