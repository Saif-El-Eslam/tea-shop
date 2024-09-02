import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { useAppContext } from "../../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the useAppContext hook
jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Header Component", () => {
  test("renders the header with login link when no user is logged in", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Header />);

    // Check for the logo
    expect(screen.getByAltText(/tea-shop-logo/i)).toBeInTheDocument();

    // Check for the login link
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();

    // Check that other navigation links are not present
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/shop/i)).not.toBeInTheDocument();
  });

  test("renders the header with login link when a user is logged in", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDY0OTg1LTkzNDgtNGZiOS04Nzg4LTRiOGJkZjRkMWRjOCIsInBob25lX251bWJlciI6IjAxMDE3MzE3MjcxIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJkZWZhdWx0Il0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiOTc0NjQ5ODUtOTM0OC00ZmI5LTg3ODgtNGI4YmRmNGQxZGM4In0sImlhdCI6MTcyNTMwMjkyNH0.vBtYzkETC8UTd5BXT5MOxu9wKibv0YPv6CxQY3uy1BU",
        },
      },
      dispatch: jest.fn(),
    });

    render(<Header />);

    // Check for the logo
    expect(screen.getByAltText(/tea-shop-logo/i)).toBeInTheDocument();

    // Check for the login link
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();

    // Check that other navigation links are not present
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });
});
