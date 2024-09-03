"use client";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Spinner from "../../components/helpers/Spinner"; // Assuming you have a Spinner component
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
//   children,
// }) => {
//   const { state } = useAppContext();
//   const location = useLocation();

//   if (state.loading) {
//     return <Spinner loading={true} />;
//   }

//   return state.user ? (
//     children
//   ) : (
//     <Navigate to="/auth/login" state={{ from: location }} />
//   );
// };

// export default PrivateRoute;

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const { state } = useAppContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (state.loading) {
        setLoading(true);
      } else {
        setLoading(false);
        if (!state.user) {
          router.push("/auth/login");
        }
      }
    }, [state, router]);

    if (loading) {
      return <Spinner loading={true} />;
    }

    return state.user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default PrivateRoute;
