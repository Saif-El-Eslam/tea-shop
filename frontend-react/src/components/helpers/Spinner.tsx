// src/components/SpinnerWrapper.tsx
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface SpinnerWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  loadingMessage?: string;
  color?: string;
}

const SpinnerWrapper: React.FC<SpinnerWrapperProps> = ({
  loading,
  children,
  loadingMessage,
  color,
}) => {
  return (
    <div className="relative" data-testid="spinner-wrapper">
      {loading ? (
        <div className="p-16 inset-0 flex flex-col items-center justify-center bg-opacity-75 z-50">
          <BeatLoader color={color ?? "#FFBF00"} loading={loading} size={15} />
          {loadingMessage && (
            <p className="mt-2 text-gray-600">{loadingMessage}</p>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

interface SpinnerProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, color, size }) => {
  return (
    <BeatLoader
      color={color ?? "#FFBF00"}
      loading={loading}
      size={size ?? 8}
      data-testid="spinner"
    />
  );
};

export default Spinner;
export { SpinnerWrapper };
