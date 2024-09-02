import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, User!</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
        onClick={() => {
          // if (user) {
          //   logout();
          //   navigate("/teas");
          // }
        }}
      >
        Shop Now
      </button>
    </div>
  );
};

export default HomePage;
