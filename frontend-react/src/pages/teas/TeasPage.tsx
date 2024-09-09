import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";
import { setLoading, setProducts, addProduct } from "../../context/AppActions";
import { getTeas, deleteTea } from "../../services/TeasService";

import TeaCard from "../../components/TeaCard/TeaCard";
import CreateUpdateTeaComponent from "../../components/CreateUpdateTea/CreateUpdateTea";
import homeLogo from "../../assets/home.png";
import CreateLogo from "../../assets/create-white.png";
import Notify from "../../utils/Notify";
import { TeaType } from "../../Types/types";

const TeasPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [createUpdateOpen, setCreateUpdateOpen] = useState(false);
  const [selectedTea, setSelectedTea] = useState<TeaType | null>(null);

  const handleGetTeas = async () => {
    dispatch(setLoading(true));
    try {
      const teas = await getTeas();
      localStorage.setItem("teas", JSON.stringify(teas));
      dispatch(setProducts(teas));
    } catch (err: any) {
      err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBuy = () => {};

  const handleDelete = async (id: string) => {
    return deleteTea(id)
      .then(() => {
        dispatch(setProducts(state.products.filter((tea) => tea.id !== id)));
        localStorage.setItem("teas", JSON.stringify(state.products));
        Notify.success("Tea deleted successfully!");
      })
      .catch((err: any) => {
        err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
      })
      .finally(() => {
        // setSubmittingMap((prev) => ({ ...prev, [id]: false }));
      });
  };

  const handleUpdate = (tea: TeaType) => {
    setSelectedTea(tea);
    setCreateUpdateOpen(true);
  };

  const handleCreate = () => {
    setSelectedTea(null);
    setCreateUpdateOpen(true);
  };

  const handleClosePopup = () => {
    setCreateUpdateOpen(false);
    setSelectedTea(null);
  };

  const onSuccessfulCreateUpdate = (tea: TeaType) => {
    const teaForDispatch: {
      id: string;
      name: string;
      description: string;
      price_per_unit: number;
      quantity: number;
    } = {
      id: tea.id,
      name: tea.name,
      description: tea.description,
      price_per_unit: tea.price_per_unit,
      quantity: tea.quantity,
    };

    if (state.products.some((t) => t.id === tea.id)) {
      dispatch(
        setProducts(
          state.products.map((t) => {
            if (t.id === tea.id) return teaForDispatch;
            return t;
          })
        )
      );
    } else {
      dispatch(addProduct(teaForDispatch));
    }

    localStorage.setItem("teas", JSON.stringify(state.products));
    setCreateUpdateOpen(false);
    setSelectedTea(null);
  };

  useEffect(() => {
    if (state.products.length === 0) handleGetTeas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            className="flex justify-center items-center gap-2 bg-darkGreen text-white px-4 py-2 rounded hover:bg-[#61783a]"
            onClick={handleCreate}
          >
            <img src={CreateLogo} alt="add" className="w-4 h-4" />
            Create New Tea
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 m-8 lg:px-32">
        {state.products.map((tea) => (
          <TeaCard
            key={tea.id}
            name={tea.name}
            description={tea.description}
            pricePerUnit={tea.price_per_unit}
            quantityLeft={tea.quantity}
            isAdmin={state.user?.role === "admin"}
            onBuy={handleBuy}
            onDelete={() => handleDelete(tea.id)}
            onUpdate={() => handleUpdate(tea)}
          />
        ))}
      </div>

      {createUpdateOpen && (
        <CreateUpdateTeaComponent
          tea={selectedTea}
          onSuccess={onSuccessfulCreateUpdate}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default TeasPage;
