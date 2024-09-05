import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

// Mocking Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />; // Mock the Image component with a regular img tag
  },
}));

describe("Footer Component", () => {
  test("renders the footer with", () => {
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
    render(<Footer />);

    // click on home
    const home = screen.getByRole("link", { name: /home/i });
    home.click();

    // check if the navigate function is called
    expect(home).toHaveAttribute("href", "/");
  });

  test("navigate to teas when clicking on shop", () => {
    render(<Footer />);

    // click on shop
    const shop = screen.getByRole("link", { name: /shop/i });
    shop.click();

    // check if the navigate function is called
    expect(shop).toHaveAttribute("href", "/teas");
  });

  test("navigate to about us when clicking on about us", () => {
    render(<Footer />);

    // click on about us
    const about = screen.getByRole("link", { name: /about us/i });
    about.click();

    // check if the navigate function is called
    expect(about).toHaveAttribute("href", "/about");
  });

  test("navigate to contact when clicking on contact", () => {
    render(<Footer />);

    // click on contact
    const contact = screen.getByRole("link", { name: /contact/i });
    contact.click();

    // check if the navigate function is called
    expect(contact).toHaveAttribute("href", "/contact");
  });
});
