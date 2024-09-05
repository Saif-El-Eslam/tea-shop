import BeatLoader from "react-spinners/BeatLoader";

interface LoadingProps {
  loadingMessage?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ loadingMessage, color }) => {
  return (
    <div className="p-16 inset-0 flex flex-col items-center justify-center bg-opacity-75 z-50">
      <BeatLoader color={`${color ?? "#FFBF00"}`} size={15} role="status" />
      {loadingMessage && (
        <p className={`mt-2 text-[${color ?? "#FFBF00"}]`}>{loadingMessage}</p>
      )}
    </div>
  );
};

export default Loading;
