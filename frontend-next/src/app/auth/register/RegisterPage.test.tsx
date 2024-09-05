import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Register from "./page"; // Adjust path as necessary
import { register } from "@/services/AuthService";
import { useAppContext } from "@/context/AppContext";
import Notify from "@/utils/Notify";

// Mock the necessary modules
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../../services/AuthService", () => ({
  register: jest.fn(),
}));

jest.mock("../../../utils/Notify", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("Register Component", () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Mock useRouter hook
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock useAppContext
    (useAppContext as jest.Mock).mockReturnValue({
      state: { loading: false },
      dispatch: mockDispatch,
    });

    // Mock register and Notify
    (register as jest.Mock).mockResolvedValue({});
    (Notify.success as jest.Mock).mockImplementation(() => {});
    (Notify.error as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
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
    expect(
      screen.getByRole("button", { name: /log in!/i })
    ).toBeInTheDocument();
  });

  test("handles form submission and redirects on success", async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Verify Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(
        "John Doe",
        "1234567890",
        "password123",
        "password123"
      );
      expect(Notify.success).toHaveBeenCalledWith("Registered Successfully");
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    });
  });

  test("handles form submission error", async () => {
    (register as jest.Mock).mockRejectedValue({ error: "Registration failed" });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Verify Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(Notify.error).toHaveBeenCalledWith("Registration failed");
    });
  });

  test("navigates to login page when log in button is clicked", () => {
    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: /log in!/i }));

    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });
});
