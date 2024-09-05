import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from "./page";
import { login } from "@/services/AuthService";
import { useAppContext } from "@/context/AppContext";
import Notify from "@/utils/Notify";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the AppContext
jest.mock("../../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

// Mock the AuthService
jest.mock("../../../services/AuthService", () => ({
  login: jest.fn(),
}));

// Mock the Notify utility
jest.mock("../../../utils/Notify", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Login Component", () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Mock useRouter hook
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock useAppContext
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: false, user: {} },
      dispatch: mockDispatch,
    });

    // Mock login and Notify
    (login as jest.Mock).mockResolvedValue({ token: "mockToken" });
    (Notify.success as jest.Mock).mockImplementation(() => {});
    (Notify.error as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up for free/i })
    ).toBeInTheDocument();
  });

  test("handles form submission and redirects on success", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("1234567890", "password123");
      expect(localStorage.getItem("token")).toBe("mockToken");
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_USER",
        payload: { token: "mockToken" },
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  test("handles form submission error", async () => {
    (login as jest.Mock).mockRejectedValue({ error: "Login failed" });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(Notify.error).toHaveBeenCalledWith("Login failed");
    });
  });

  test("navigates to register page when sign-up link is clicked", () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /sign up for free/i }));

    expect(mockPush).toHaveBeenCalledWith("/auth/register");
  });
});
