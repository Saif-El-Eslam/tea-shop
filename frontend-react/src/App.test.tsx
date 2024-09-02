import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { MemoryRouter } from "react-router-dom";

describe("App Component", () => {
  test("renders the header component", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    // // check the login img
    // expect(screen.getByAltText("tea-shop-logo")).toBeInTheDocument();
    // // check the nav
    // expect(screen.getByRole("navigation")).toBeInTheDocument();
    // // check the ul
    // expect(screen.getByRole("list")).toBeInTheDocument();
    // // check the li
    // expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("renders the 404 page on an unknown route", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/unknown"]}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  test("renders the AuthPage when visiting /auth", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/auth"]}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("redirects to login if not authenticated", () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={["/teas"]}>
          <App />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
