import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";
import TeaCard from "../../components/TeaCard/TeaCard";
import homeLogo from "../../assets/home.png";

const TeasPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center gap-4 bg-gradient-to-r from-darkGreen to-[#98FF98] px-12 md:px-48">
        <img
          src={homeLogo}
          alt="home-logo"
          className={`h-7 ${
            state.user?.role === "user" &&
            "cursor-pointer hover:scale-110 transform transition-transform"
          }`}
          onClick={() => {
            state.user?.role === "user" && navigate("/");
          }}
        />
        <h1 className="text-2xl font-bold py-4"> {">"} Teas Types</h1>
      </div>

      {state.user?.role === "admin" && (
        <div className="flex justify-center items-center bg-lightBeige mx-8 py-4 md:mx-32 md:py-8">
          <button
            className="bg-darkGreen text-white px-4 py-2 rounded hover:bg-[#61783a]"
            onClick={() => {}}
          >
            Create New Tea
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 m-8 md:px-32 md:py-8">
        <TeaCard
          name="Green Tea"
          description="A refreshing green tea with a smooth flavor."
          pricePerUnit={12.99}
          quantityLeft={10}
          isAdmin={state.user?.role === "admin"}
          onBuy={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        />
        <TeaCard
          name="Black Tea"
          pricePerUnit={9.99}
          quantityLeft={0}
          isAdmin={state.user?.role === "admin"}
          onBuy={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        />
        <TeaCard
          name="Green Tea"
          description="A refreshing green tea with a smooth flavor."
          pricePerUnit={12.99}
          quantityLeft={10}
          isAdmin={state.user?.role === "admin"}
          onBuy={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        />
        <TeaCard
          name="Black Tea"
          pricePerUnit={9.99}
          quantityLeft={0}
          isAdmin={state.user?.role === "admin"}
          onBuy={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        />
      </div>
    </div>
  );
};

export default TeasPage;
