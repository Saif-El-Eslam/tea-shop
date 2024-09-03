import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { useAppContext } from "../../context/AppContext";

// Mock the useAppContext hook
jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Footer Component", () => {
  test("renders the footer with", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Footer />);

    // get by href
    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute(
      "href",
      "/teas"
    );

    // get by alt text
    expect(screen.getByAltText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByAltText(/x/i)).toBeInTheDocument();
    expect(screen.getByAltText(/instagram/i)).toBeInTheDocument();
  });

  test("navigate to home when clicking on home", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Footer />);

    // click on home
    const home = screen.getByRole("link", { name: /home/i });
    home.click();

    // check if the navigate function is called
    expect(home).toHaveAttribute("href", "/");
  });

  test("navigate to teas when clicking on shop", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Footer />);

    // click on shop
    const shop = screen.getByRole("link", { name: /shop/i });
    shop.click();

    // check if the navigate function is called
    expect(shop).toHaveAttribute("href", "/teas");
  });

  test("navigate to about us when clicking on about us", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Footer />);

    // click on about us
    const about = screen.getByRole("link", { name: /about us/i });
    about.click();

    // check if the navigate function is called
    expect(about).toHaveAttribute("href", "/about");
  });

  test("navigate to contact when clicking on contact", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: null },
      dispatch: jest.fn(),
    });

    render(<Footer />);

    // click on contact
    const contact = screen.getByRole("link", { name: /contact/i });
    contact.click();

    // check if the navigate function is called
    expect(contact).toHaveAttribute("href", "/contact");
  });
});
