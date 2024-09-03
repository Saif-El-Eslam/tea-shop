import React from "react";
import { render, screen } from "@testing-library/react";
import AuthPage from "./AuthPage";
import { useAppContext } from "../../context/AppContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../context/AppContext");

describe("AuthPage", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null }, // Simulate an unauthenticated user
    });
  });

  it("renders login form on route /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthPage />
      </MemoryRouter>
    );

    // check if the img is present
    expect(screen.getByAltText("tea-shop-logo-auth")).toBeInTheDocument();

    // check if the login form is present
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up for free!/i })
    ).toBeInTheDocument();
  });

  it("renders login form on route /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthPage />
      </MemoryRouter>
    );

    // check if the img is present
    expect(screen.getByAltText("tea-shop-logo-auth")).toBeInTheDocument();

    // check if the login form is present
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up for free!/i })
    ).toBeInTheDocument();
  });

  it("renders register form on route /register", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <AuthPage />
      </MemoryRouter>
    );

    // check if the img is present
    expect(screen.getByAltText("tea-shop-logo-auth")).toBeInTheDocument();

    // check if the signup form is present
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    expect(passwordInputs).toHaveLength(2);
    expect(passwordInputs[0]).toHaveAttribute("placeholder", "Password");
    expect(passwordInputs[1]).toHaveAttribute("placeholder", "Verify Password");
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
});
