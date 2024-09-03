import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { register } from "../../services/AuthService";
import { useAppContext } from "../../context/AppContext";
import Notify from "../../utils/Notify";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../services/AuthService");
jest.mock("../../context/AppContext");
jest.mock("../../utils/Notify");

describe("Register Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: false },
      dispatch: mockDispatch,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test("renders register form", () => {
    render(<Register />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Verify Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("handles form submission and redirects on success", async () => {
    (register as jest.Mock).mockResolvedValueOnce({});

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Verify Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(
        "John Doe",
        "1234567890",
        "password",
        "password"
      );
    });

    await waitFor(() => {
      expect(Notify.success).toHaveBeenCalledWith("Registered Successfully");
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING",
      payload: false,
    });
  });

  test("handles form submission error", async () => {
    (register as jest.Mock).mockRejectedValueOnce({
      errors: [{ msg: "Registration failed" }],
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Verify Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(
        "John Doe",
        "1234567890",
        "password",
        "password"
      );
    });

    await waitFor(() => {
      expect(Notify.error).toHaveBeenCalledWith("Registration failed");
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING",
      payload: false,
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("navigates to the login page when login link is clicked", () => {
    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
  });
});
