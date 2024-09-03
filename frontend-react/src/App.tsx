import React from "react";
import {
  // BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthPage from "./pages/auth/AuthPage";
import Home from "./pages/home/HomePage";
import Teas from "./pages/teas/TeasPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  // is auth route ?
  const location = useLocation();
  let isAuth = location.pathname.includes("/auth");

  return (
    <AppProvider>
      {/* <Router> */}
      <>
        <div className="App bg-[#F5F5F5] min-h-dvh flex flex-col justify-between">
          <header className="App-header">
            <Header />
          </header>

          <Routes>
            <Route path="/auth/*" element={<AuthPage />} />
            <Route
              path="/teas"
              element={
                <PrivateRoute>
                  <Teas />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route path="/register/*" element={<AuthPage />} />
            <Route path="/login/*" element={<AuthPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                // make a 404 page
                <div className="flex flex-col items-center justify-center h-full text-alert font-bold text-2xl">
                  <h1>404</h1>
                  <h2>Page not found</h2>
                </div>
              }
            />
          </Routes>

          {!isAuth && (
            <footer className="App-footer">
              <Footer />
            </footer>
          )}
        </div>
        <ToastContainer />
      </>
      {/* </Router> */}
    </AppProvider>
  );
};

export default App;
