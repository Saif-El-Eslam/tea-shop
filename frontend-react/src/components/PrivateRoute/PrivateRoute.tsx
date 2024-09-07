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
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner loading={true} />
      </div>
    );
  }

  if (
    state.user &&
    state.user.role === "admin" &&
    (location.pathname === "/home" || location.pathname === "/")
  ) {
    return <Navigate to="/teas" />;
  }

  return state.user ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
