import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { useAppContext } from "../../context/AppContext";
import * as AuthService from "../../services/AuthService";
import Notify from "../../utils/Notify";

// Mock the AuthService login function and Notify
jest.mock("../../services/AuthService", () => ({
  login: jest.fn(),
}));

jest.mock("../../utils/Notify", () => ({
  error: jest.fn(),
}));

// Mock the useAppContext hook
jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  // Setup mock for useAppContext
  const dispatch = jest.fn();
  const useAppContextMock = useAppContext as jest.Mock;

  beforeEach(() => {
    useAppContextMock.mockReturnValue({
      state: { loading: false, user: null },
      dispatch,
    });
  });

  test("renders login form", () => {
    render(<Login />);

    // Check if form elements are present
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up for free!/i })
    ).toBeInTheDocument();
  });

  test("handles form submission and redirects on success", async () => {
    (AuthService.login as jest.Mock).mockResolvedValue({ token: "fake-token" });

    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
      target: { value: "01017317271" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "user1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith("01017317271", "user1234");
    });

    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_USER",
      payload: { token: "fake-token" },
    });
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("handles form submission error", async () => {
    (AuthService.login as jest.Mock).mockRejectedValue({
      error: "Invalid credentials",
    });
    (Notify.error as jest.Mock).mockImplementation(() => {});

    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(Notify.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  test("navigates to the register page when sign up link is clicked", () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /sign up for free!/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/auth/register");
  });
});
