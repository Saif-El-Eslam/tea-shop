import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import PrivateRoute from "./PrivateRoute";
// import AuthPage from "../../pages/auth/AuthPage";

// Mocking necessary modules
jest.mock("../../context/AppContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("PrivateRoute", () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/private" });
  });

  it("renders Spinner when loading", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: true, user: null },
    });

    render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    // Check if the Spinner is rendered by data-testid
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: false, user: { token: "token" } },
    });

    render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", async () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: false, user: null },
    });

    render(
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    );

    await waitFor(() => {
      // Check if Navigate was called with the expected arguments
      expect(Navigate).toHaveBeenCalledWith(
        { to: "/auth/login", state: { from: { pathname: "/private" } } },
        {}
      );
    });
  });

  //   it("redirects to home from login page when user is authenticated", async () => {
  //     (useAppContext as jest.Mock).mockReturnValue({
  //       state: { loading: false, user: { token: "token" } },
  //     });

  //     render(
  //       <PrivateRoute>
  //         <AuthPage />
  //       </PrivateRoute>
  //     );

  //     await waitFor(() => {
  //       // Check if Navigate was called with the expected arguments
  //       expect(Navigate).toHaveBeenCalledWith({ to: "/" }, {});
  //     });
  //   });
});
