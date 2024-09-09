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
import ContactUsPage from "./pages/contactUs/ContactUsPage";
import AboutUsPage from "./pages/aboutUs/AboutUsPage";

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

      <div className="App min-h-screen flex flex-col bg-[#F5F5F5] overflow-hidden">
        <header className="App-header">
          <Header />
        </header>

        <main className="flex-grow overflow-auto">
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
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about" element={<AboutUsPage />} />

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
                <div className="flex flex-col items-center justify-center h-[60vh] text-alert font-bold text-2xl">
                  <h1>404</h1>
                  <h2>Page not found</h2>
                </div>
              }
            />
          </Routes>
        </main>

        {!isAuth && (
          <footer className="App-footer">
            <Footer />
          </footer>
        )}
      </div>
      <ToastContainer />

      {/* </Router> */}
    </AppProvider>
  );
};

export default App;
