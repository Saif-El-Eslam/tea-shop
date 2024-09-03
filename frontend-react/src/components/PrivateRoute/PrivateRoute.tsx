import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Spinner from "../../components/helpers/Spinner"; // Assuming you have a Spinner component

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { state } = useAppContext();
  const location = useLocation();

  if (state.loading) {
    return <Spinner loading={true} />;
  }

  return state.user ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
