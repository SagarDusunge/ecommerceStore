import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

import ProductListing from "./Component/ProductListing";

jest.mock("./Component/ProductListing", () => () => (
  <div data-testid="productlisting">ProductListing</div>
));

describe("App Component", () => {
  test("The App component should render without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });

  test("The App component should render Navbar, CartNote, and ProductListing components", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("productlisting")).toBeInTheDocument();
  });

  test('The App component should have a div with className "App logincontainer"', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("App logincontainer");
  });
});
