import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading Component", () => {
  test("renders loader with no message", () => {
    render(<Loading />);

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).toBeNull();
  });

  test("renders loader with custom message", () => {
    render(<Loading loadingMessage="Please wait..." color="rgb(255, 0, 0)" />);

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const message = screen.getByText(/please wait/i);
    expect(message).toBeInTheDocument();
  });
});
