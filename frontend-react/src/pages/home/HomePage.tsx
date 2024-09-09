import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import Home1 from "../../assets/home-1.png";
import Home2 from "../../assets/home-2.png";
import Home3 from "../../assets/home-3.png";

const HomePage: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between p-8 md:mx-16 lg:mx-32 md:my-8 bg-[#EDF2EE] rounded-lg relative">
        <div className="flex flex-col gap-4 max-w-md flex-2">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#556B2F]">
            Brewed with Care, <br /> Sipped with Joy
          </h1>
          <div className="space-y-2 md:my-2">
            <p className="text-3xl">
              Sale up to{" "}
              <span className="text-[#FFBF00] font-semibold">30% OFF</span>
            </p>
            <p className="text-xs font-medium text-[#333333]">
              Free shipping on all your orders. We deliver, you enjoy.
            </p>
          </div>
          <button
            className="w-48 bg-[#556B2F] hover:bg-[#627a37] text-white font-semibold px-6 py-2 rounded-full mt-4 transition-colors"
            onClick={() => navigate("/teas")}
          >
            Shop Now
          </button>
        </div>
        <div className="max-w-[24rem] md:max-w-[24rem] md:max-h-[24rem] xl:max-w-[32rem] xl:max-h-[32rem] flex-1 overflow-visible">
          <img
            src={Home1}
            alt="Home 1"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="min-h-36">
            <img
              src={Home2}
              alt="Home 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-h-36 flex flex-col justify-center items-center gap-4 p-8">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#556B2F]">
              Steeped in tradition, <br /> brewed for today
            </div>
            <button
              className="w-48 bg-[#556B2F] hover:bg-[#627a37] text-white font-semibold px-6 py-2 rounded-full mt-4 transition-colors"
              onClick={() => navigate("/teas")}
            >
              Shop Now
            </button>
          </div>
          <div className="min-h-36 order-2 md:order-1 p-8 text-center flex items-center justify-center bg-[#D0E6A5] text-white">
            Crafting tranquility, one brew at a time. Experience the serenity of
            tea at TeaLife, where every sip brings a moment of calm and delight.
          </div>

          <div className="min-h-36 order-1 md:order-2">
            <img
              src={Home3}
              alt="Home 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
